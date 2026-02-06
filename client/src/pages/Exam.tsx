import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { QuestionCard } from '@/components/QuestionCard'
import { ExamConfigDialog } from '@/components/ExamConfigDialog'
import { ResultsSummary } from '@/components/ResultsSummary'
import { getQuestions, getTopicProgress, saveSession, getSession, getQuestion } from '@/lib/api'
import type { ExamConfig, ExamResults, ExamState } from '@/types'
import { ChevronLeft, ChevronRight, Flag, AlertCircle, Loader2 } from 'lucide-react'

export function Exam() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()
  const [configOpen, setConfigOpen] = useState(true)
  const [examState, setExamState] = useState<ExamState | null>(null)
  const [reviewIndex, setReviewIndex] = useState<number | null>(null)

  const sessionId = searchParams.get('session') ? parseInt(searchParams.get('session')!) : null

  const { data: topics = [] } = useQuery({
    queryKey: ['topicProgress'],
    queryFn: getTopicProgress,
  })

  const saveSessionMutation = useMutation({
    mutationFn: saveSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['progress'] })
      queryClient.invalidateQueries({ queryKey: ['sessions'] })
      queryClient.invalidateQueries({ queryKey: ['topicProgress'] })
    },
  })

  // Load session for review using React Query
  const {
    data: sessionData,
    isLoading: loadingSession,
    error: sessionError,
  } = useQuery({
    queryKey: ['session', sessionId],
    queryFn: async () => {
      if (!sessionId) return null

      const { session, results } = await getSession(sessionId)

      // Fetch full question details for each result
      const questionsWithDetails = await Promise.all(
        results.map(async (result) => {
          const question = await getQuestion(result.question_id)
          return {
            question,
            userAnswer: result.user_answer.split(', ').filter((a) => a),
            isCorrect: result.is_correct,
          }
        })
      )

      // Reconstruct answers map
      const answers: Record<string, string[]> = {}
      questionsWithDetails.forEach((item) => {
        answers[item.question.id] = item.userAnswer
      })

      // Create exam results
      const examResults: ExamResults = {
        total: session.total_questions,
        correct: session.correct,
        percentage: session.percentage,
        questions: questionsWithDetails,
      }

      return {
        questions: questionsWithDetails.map((item) => item.question),
        answers,
        examResults,
      }
    },
    enabled: !!sessionId && !examState, // Only run if sessionId exists and examState is not set
    staleTime: Infinity, // Session data doesn't change
  })

  // Set exam state when session data is loaded
  useEffect(() => {
    if (sessionData && !examState) {
      setExamState({
        questions: sessionData.questions,
        currentIndex: 0,
        answers: sessionData.answers,
        submitted: true,
        results: sessionData.examResults,
      })
      setConfigOpen(false)
    }
  }, [sessionData, examState])

  // Handle session error
  useEffect(() => {
    if (sessionError && sessionId) {
      setConfigOpen(true)
    }
  }, [sessionError, sessionId])

  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false)

  const startExam = async (config: ExamConfig) => {
    try {
      setIsLoadingQuestions(true)
      const questions = await getQuestions({
        mode: config.mode,
        count: config.questionCount,
        subtopic: config.subtopic,
      })

      setExamState({
        questions,
        currentIndex: 0,
        answers: {},
        submitted: false,
      })
      setConfigOpen(false)
      setReviewIndex(null)
    } catch (error) {
      console.error('Failed to load questions:', error)
      alert('Failed to load questions. Please try again.')
    } finally {
      setIsLoadingQuestions(false)
    }
  }

  const handleAnswerChange = (questionId: string, answers: string[]) => {
    if (!examState || examState.submitted) return

    setExamState({
      ...examState,
      answers: {
        ...examState.answers,
        [questionId]: answers,
      },
    })
  }

  const goToQuestion = (index: number) => {
    if (!examState) return
    if (index >= 0 && index < examState.questions.length) {
      setExamState({ ...examState, currentIndex: index })
    }
  }

  const submitExam = async () => {
    if (!examState) return

    const questionResults = examState.questions.map((question) => {
      const userAnswer = examState.answers[question.id] || []
      const isCorrect =
        userAnswer.length === question.correct_answers.length &&
        userAnswer.every((a) => question.correct_answers.includes(a))

      return {
        question,
        userAnswer,
        isCorrect,
      }
    })

    const correct = questionResults.filter((r) => r.isCorrect).length

    const results: ExamResults = {
      total: examState.questions.length,
      correct,
      percentage: (correct / examState.questions.length) * 100,
      questions: questionResults,
    }

    // Save session to backend
    await saveSessionMutation.mutateAsync({
      total_questions: results.total,
      correct: results.correct,
      percentage: results.percentage,
      results: results.questions.map((r) => ({
        question_id: r.question.id,
        question_text: r.question.text,
        user_answer: r.userAnswer.join(', '),
        correct_answer: r.question.correct_answers.join(', '),
        is_correct: r.isCorrect,
        subtopic: r.question.subtopic,
      })),
    })

    setExamState({
      ...examState,
      submitted: true,
      results,
    })
  }

  const handleReviewQuestion = (index: number) => {
    setReviewIndex(index)
  }

  const closeReview = () => {
    setReviewIndex(null)
  }

  const restartExam = () => {
    if (!examState) return

    // Restart with the same questions, clearing answers
    setExamState({
      questions: examState.questions,
      currentIndex: 0,
      answers: {},
      submitted: false,
    })
    setReviewIndex(null)
  }

  // Show loading state when loading a session
  if (loadingSession) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading exam session...</div>
      </div>
    )
  }

  // Show config dialog when no exam in progress
  if (!examState) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Practice Exam</h1>
            <p className="text-muted-foreground">
              Configure and start your practice exam
            </p>
          </div>
          {!configOpen && (
            <Button onClick={() => setConfigOpen(true)}>Configure Exam</Button>
          )}
        </div>

        {sessionError && (
          <div className="flex items-center gap-2 p-4 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 rounded-md border border-red-200 dark:border-red-800">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <div>
              <p className="font-medium">Unable to Load Exam Session</p>
              <p className="mt-1">{sessionError.message}</p>
            </div>
          </div>
        )}

        <ExamConfigDialog
          open={configOpen}
          onOpenChange={setConfigOpen}
          onStart={startExam}
          topics={topics}
          isLoading={isLoadingQuestions}
        />
      </div>
    )
  }

  // Show results after submission
  if (examState.submitted && examState.results) {
    // Show individual question review
    if (reviewIndex !== null) {
      const result = examState.results.questions[reviewIndex]
      return (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">
              Question {reviewIndex + 1} of {examState.results.total}
            </h2>
            <Button variant="outline" onClick={closeReview}>
              Back to Results
            </Button>
          </div>
          <QuestionCard
            question={result.question}
            selectedAnswers={result.userAnswer}
            onAnswerChange={() => {}}
            showResult={true}
            disabled={true}
          />
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setReviewIndex(Math.max(0, reviewIndex - 1))}
              disabled={reviewIndex === 0}
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                setReviewIndex(
                  Math.min(examState.results!.questions.length - 1, reviewIndex + 1)
                )
              }
              disabled={reviewIndex === examState.results.questions.length - 1}
            >
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )
    }

    return (
      <ResultsSummary
        results={examState.results}
        onRestart={restartExam}
        onHome={() => navigate('/')}
        onReviewQuestion={handleReviewQuestion}
      />
    )
  }

  // Show exam in progress
  const currentQuestion = examState.questions[examState.currentIndex]
  const currentAnswers = examState.answers[currentQuestion.id] || []
  const answeredCount = Object.keys(examState.answers).length
  const progressPercent =
    ((examState.currentIndex + 1) / examState.questions.length) * 100

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold">
            Question {examState.currentIndex + 1} of {examState.questions.length}
          </h2>
          <p className="text-sm text-muted-foreground">
            {answeredCount} answered
          </p>
        </div>
        <Button
          variant="destructive"
          onClick={submitExam}
          disabled={answeredCount === 0 || saveSessionMutation.isPending}
          className="w-full sm:w-auto"
        >
          {saveSessionMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Flag className="mr-2 h-4 w-4" />
              Submit Exam
            </>
          )}
        </Button>
      </div>

      <Progress value={progressPercent} className="h-2" />

      <div className="flex gap-1.5 sm:gap-1 flex-wrap mb-4">
        {examState.questions.map((q, i) => (
          <button
            key={q.id}
            onClick={() => goToQuestion(i)}
            className={`w-10 h-10 sm:w-8 sm:h-8 text-sm sm:text-xs rounded font-medium ${
              i === examState.currentIndex
                ? 'bg-primary text-primary-foreground'
                : examState.answers[q.id]
                ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300'
                : 'bg-muted'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <QuestionCard
        question={currentQuestion}
        selectedAnswers={currentAnswers}
        onAnswerChange={(answers) =>
          handleAnswerChange(currentQuestion.id, answers)
        }
      />

      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={() => goToQuestion(examState.currentIndex - 1)}
          disabled={examState.currentIndex === 0}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <Button
          onClick={() => goToQuestion(examState.currentIndex + 1)}
          disabled={examState.currentIndex === examState.questions.length - 1}
        >
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
