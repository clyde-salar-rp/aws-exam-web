import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import type { Question } from '@/types'
import { cn } from '@/lib/utils'

interface QuestionCardProps {
  question: Question
  selectedAnswers: string[]
  onAnswerChange: (answers: string[]) => void
  showResult?: boolean
  disabled?: boolean
}

export function QuestionCard({
  question,
  selectedAnswers,
  onAnswerChange,
  showResult = false,
  disabled = false,
}: QuestionCardProps) {
  const isMultiSelect = question.question_type === 'multi'

  const handleSingleSelect = (value: string) => {
    onAnswerChange([value])
  }

  const handleMultiSelect = (letter: string, checked: boolean) => {
    if (checked) {
      onAnswerChange([...selectedAnswers, letter])
    } else {
      onAnswerChange(selectedAnswers.filter((a) => a !== letter))
    }
  }

  const getOptionClass = (letter: string) => {
    if (!showResult) return ''

    const isSelected = selectedAnswers.includes(letter)
    const isCorrect = question.correct_answers.includes(letter)

    if (isCorrect) return 'bg-green-100 dark:bg-green-900/50 border-green-500 dark:border-green-600'
    if (isSelected && !isCorrect) return 'bg-red-100 dark:bg-red-900/50 border-red-500 dark:border-red-600'
    return ''
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <CardTitle className="text-lg font-medium leading-relaxed">
            {question.text}
          </CardTitle>
          <Badge variant={isMultiSelect ? 'secondary' : 'outline'}>
            {isMultiSelect ? 'Select Multiple' : 'Select One'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {isMultiSelect ? (
          <div className="space-y-3">
            {question.options.map((option) => (
              <div
                key={option.letter}
                className={cn(
                  'flex items-start space-x-3 p-3 rounded-lg border transition-colors',
                  getOptionClass(option.letter),
                  !showResult && selectedAnswers.includes(option.letter) && 'bg-muted',
                  !disabled && !showResult && 'hover:bg-muted cursor-pointer'
                )}
                onClick={() => {
                  if (!disabled && !showResult) {
                    handleMultiSelect(option.letter, !selectedAnswers.includes(option.letter))
                  }
                }}
              >
                <Checkbox
                  id={`${question.id}-${option.letter}`}
                  checked={selectedAnswers.includes(option.letter)}
                  onCheckedChange={(checked) =>
                    handleMultiSelect(option.letter, checked as boolean)
                  }
                  disabled={disabled || showResult}
                />
                <Label
                  htmlFor={`${question.id}-${option.letter}`}
                  className={cn(
                    'flex-1 cursor-pointer',
                    (disabled || showResult) && 'cursor-default'
                  )}
                >
                  <span className="font-semibold mr-2">{option.letter}.</span>
                  {option.text}
                </Label>
              </div>
            ))}
          </div>
        ) : (
          <RadioGroup
            value={selectedAnswers[0] || ''}
            onValueChange={handleSingleSelect}
            disabled={disabled || showResult}
          >
            {question.options.map((option) => (
              <div
                key={option.letter}
                className={cn(
                  'flex items-start space-x-3 p-3 rounded-lg border transition-colors',
                  getOptionClass(option.letter),
                  !showResult && selectedAnswers.includes(option.letter) && 'bg-muted',
                  !disabled && !showResult && 'hover:bg-muted cursor-pointer'
                )}
                onClick={() => {
                  if (!disabled && !showResult) {
                    handleSingleSelect(option.letter)
                  }
                }}
              >
                <RadioGroupItem
                  value={option.letter}
                  id={`${question.id}-${option.letter}`}
                />
                <Label
                  htmlFor={`${question.id}-${option.letter}`}
                  className={cn(
                    'flex-1 cursor-pointer',
                    (disabled || showResult) && 'cursor-default'
                  )}
                >
                  <span className="font-semibold mr-2">{option.letter}.</span>
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}

        {showResult && question.explanation && (
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/50 rounded-lg">
            <p className="text-sm font-medium text-blue-900 dark:text-blue-300">Explanation:</p>
            <p className="text-sm text-blue-800 dark:text-blue-300/80 mt-1">{question.explanation}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
