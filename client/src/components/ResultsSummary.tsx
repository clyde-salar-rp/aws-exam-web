import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { CheckCircle, XCircle, RotateCcw, Home } from 'lucide-react'
import type { ExamResults } from '@/types'

interface ResultsSummaryProps {
  results: ExamResults
  onRestart: () => void
  onHome: () => void
  onReviewQuestion: (index: number) => void
}

export function ResultsSummary({
  results,
  onRestart,
  onHome,
  onReviewQuestion,
}: ResultsSummaryProps) {
  const isPassing = results.percentage >= 70

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Exam Complete!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div
              className={`text-5xl sm:text-6xl font-bold ${
                isPassing ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {Math.round(results.percentage)}%
            </div>
            <p className="text-muted-foreground mt-2">
              {results.correct} of {results.total} correct
            </p>
            <div className={`mt-4 text-base sm:text-lg font-medium ${
              isPassing ? 'text-green-600' : 'text-red-600'
            }`}>
              {isPassing ? 'PASSED' : 'NEEDS MORE PRACTICE'}
            </div>
          </div>

          <Progress value={results.percentage} className="h-3" />

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-green-50 rounded-lg">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">{results.correct}</div>
              <div className="text-sm text-green-700">Correct</div>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-600">
                {results.total - results.correct}
              </div>
              <div className="text-sm text-red-700">Incorrect</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button onClick={onRestart} className="flex-1">
              <RotateCcw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            <Button onClick={onHome} variant="outline" className="flex-1">
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Question Review</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {results.questions.map((result, index) => (
              <button
                key={index}
                onClick={() => onReviewQuestion(index)}
                className={`p-3 sm:p-2 rounded text-sm font-medium transition-colors ${
                  result.isCorrect
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
