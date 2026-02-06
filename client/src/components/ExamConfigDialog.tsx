import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Loader2 } from 'lucide-react'
import type { ExamConfig, ExamMode, TopicStats } from '@/types'

interface ExamConfigDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onStart: (config: ExamConfig) => void
  topics?: TopicStats[]
  isLoading?: boolean
}

const examModes: { value: ExamMode; label: string; description: string }[] = [
  { value: 'adaptive', label: 'Adaptive', description: 'Focuses on your weak areas' },
  { value: 'random', label: 'Random', description: 'Random selection from all questions' },
  { value: 'weak', label: 'Weak Topics', description: 'Only from topics below 70%' },
  { value: 'missed', label: 'Missed Questions', description: 'Questions you got wrong before' },
  { value: 'new', label: 'New Questions', description: 'Questions you haven\'t seen yet' },
]

const questionCounts = [10, 20, 30, 50, 65]

export function ExamConfigDialog({
  open,
  onOpenChange,
  onStart,
  topics = [],
  isLoading = false,
}: ExamConfigDialogProps) {
  const [mode, setMode] = useState<ExamMode>('adaptive')
  const [questionCount, setQuestionCount] = useState(20)
  const [subtopic, setSubtopic] = useState<string>('all')

  const handleStart = () => {
    onStart({
      mode,
      questionCount,
      subtopic: subtopic === 'all' ? undefined : subtopic,
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Configure Your Exam</DialogTitle>
          <DialogDescription>
            Set up your practice exam parameters
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6 py-4 overflow-y-auto flex-1 -mx-6 px-6">
          <div className="space-y-3">
            <Label>Exam Mode</Label>
            <RadioGroup value={mode} onValueChange={(v) => setMode(v as ExamMode)}>
              {examModes.map((m) => (
                <div
                  key={m.value}
                  className="flex items-start space-x-3 p-2 sm:p-3 rounded-lg border hover:bg-muted cursor-pointer"
                  onClick={() => setMode(m.value)}
                >
                  <RadioGroupItem value={m.value} id={m.value} className="mt-0.5" />
                  <div className="flex-1">
                    <Label htmlFor={m.value} className="cursor-pointer font-medium text-sm sm:text-base">
                      {m.label}
                    </Label>
                    <p className="text-xs sm:text-sm text-muted-foreground">{m.description}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label>Number of Questions</Label>
            <Select
              value={questionCount.toString()}
              onValueChange={(v) => setQuestionCount(parseInt(v))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {questionCounts.map((count) => (
                  <SelectItem key={count} value={count.toString()}>
                    {count} questions{count === 65 && ' (Full exam)'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Topic Filter (Optional)</Label>
            <Select value={subtopic} onValueChange={setSubtopic}>
              <SelectTrigger>
                <SelectValue placeholder="All topics" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All topics</SelectItem>
                {topics.map((topic) => (
                  <SelectItem key={topic.subtopic} value={topic.subtopic}>
                    {topic.display_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="flex-col-reverse sm:flex-row gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleStart}
            className="w-full sm:w-auto"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading Questions...
              </>
            ) : (
              'Start Exam'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
