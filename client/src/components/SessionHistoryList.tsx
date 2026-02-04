import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import type { Session } from '@/types'

interface SessionHistoryListProps {
  sessions: Session[]
  onSessionClick?: (session: Session) => void
}

export function SessionHistoryList({ sessions, onSessionClick }: SessionHistoryListProps) {
  if (sessions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Session History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            No exam sessions yet. Start your first exam to see history here.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Session History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sessions.map((session) => {
            const isPassing = session.percentage >= 70
            return (
              <div
                key={session.id}
                className={`p-4 border rounded-lg flex justify-between items-center ${
                  onSessionClick ? 'hover:bg-muted cursor-pointer' : ''
                }`}
                onClick={() => onSessionClick?.(session)}
              >
                <div>
                  <div className="font-medium">
                    {session.total_questions} Questions
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatDate(session.timestamp)}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="font-semibold">
                      {session.correct}/{session.total_questions}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {Math.round(session.percentage)}%
                    </div>
                  </div>
                  <Badge variant={isPassing ? 'success' : 'destructive'}>
                    {isPassing ? 'Pass' : 'Fail'}
                  </Badge>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
