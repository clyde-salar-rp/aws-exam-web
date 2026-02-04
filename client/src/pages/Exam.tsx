import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { QuestionCard } from '@/components/QuestionCard'
import { ExamConfigDialog } from '@/components/ExamConfigDialog'
import { ResultsSummary } from '@/components/ResultsSummary'
import { getQuestions, getTopicProgress, saveSession } from '@/lib/api'
import type { ExamConfig, ExamResults, ExamState, Question } from '@/types'
import { ChevronLeft, ChevronRight, Flag } from 'lucide-react'

export function Exam() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [configOpen, setConfigOpen] = useState(true)
  const [examState, setExamState] = useState<ExamState | null>(null)
  const [reviewIndex, setReviewIndex] = useState<number | null>(null)

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

  const startExam = async (config: ExamConfig) => {
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

    const results: ExamResults = {
      total: examState.questions.length,
      correct: 0,
      percentage: 0,
      questions: examState.questions.map((question) => {
        const userAnswer = examState.answers[question.id] || []
        const isCorrect =
          userAnswer.length === question.correct_answers.length &&
          userAnswer.every((a) => question.correct_answers.includes(a))

        if (isCorrect) results.correct++

        return {
          question,
          userAnswer,
          isCorrect,
        }
      }),
    }

    results.percentage = (results.correct / results.total) * 100

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
        <ExamConfigDialog
          open={configOpen}
          onOpenChange={setConfigOpen}
          onStart={startExam}
          topics={topics}
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
        onRestart={() => {
          setExamState(null)
          setConfigOpen(true)
        }}
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
          disabled={answeredCount === 0}
          className="w-full sm:w-auto"
        >
          <Flag className="mr-2 h-4 w-4" />
          Submit Exam
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
