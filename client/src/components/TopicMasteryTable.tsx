import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { MasteryBadge } from './MasteryBadge'
import type { TopicStats } from '@/types'

interface TopicMasteryTableProps {
  topics: TopicStats[]
  onTopicClick?: (subtopic: string) => void
}

export function TopicMasteryTable({ topics, onTopicClick }: TopicMasteryTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Topic Mastery</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topics.map((topic) => (
            <div
              key={topic.subtopic}
              className={`p-4 border rounded-lg ${
                onTopicClick ? 'hover:bg-muted cursor-pointer' : ''
              }`}
              onClick={() => onTopicClick?.(topic.subtopic)}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">{topic.display_name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {topic.correct}/{topic.total} correct
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold">
                    {topic.total > 0 ? Math.round(topic.accuracy) : 0}%
                  </span>
                  <MasteryBadge mastery={topic.mastery} />
                </div>
              </div>
              <Progress
                value={topic.total > 0 ? topic.accuracy : 0}
                className="h-2"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
