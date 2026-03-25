import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MasteryBadge } from '@/components/MasteryBadge'
import { getProgress } from '@/lib/api'
import { AlertTriangle, CheckCircle, Target, TrendingUp, Loader2 } from 'lucide-react'

export function StudyNotes() {
  const { data: progress, isLoading } = useQuery({
    queryKey: ['progress'],
    queryFn: getProgress,
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <div className="text-muted-foreground">Loading study notes...</div>
        </div>
      </div>
    )
  }

  const topics = progress?.topics || []

  // Categorize topics by priority
  const criticalTopics = topics.filter(
    (t) => t.total > 0 && t.accuracy < 50
  )
  const needsWorkTopics = topics.filter(
    (t) => t.total > 0 && t.accuracy >= 50 && t.accuracy < 70
  )
  const learningTopics = topics.filter(
    (t) => t.total > 0 && t.accuracy >= 70 && t.accuracy < 85
  )
  const strongTopics = topics.filter(
    (t) => t.total > 0 && t.accuracy >= 85
  )
  const notStartedTopics = topics.filter((t) => t.total === 0)

  const examReadiness = progress?.exam_readiness || 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Study Notes</h1>
        <p className="text-muted-foreground">
          Personalized study recommendations based on your performance
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Exam Readiness: {Math.round(examReadiness)}%
          </CardTitle>
          <CardDescription>
            {examReadiness >= 80
              ? "You're well prepared! Focus on maintaining your knowledge."
              : examReadiness >= 60
              ? 'Good progress! Focus on your weak areas to improve further.'
              : examReadiness >= 40
              ? 'Keep practicing! Target your weakest topics first.'
              : 'Just getting started. Begin with the foundational topics.'}
          </CardDescription>
        </CardHeader>
      </Card>

      {criticalTopics.length > 0 && (
        <Card className="border-red-200 dark:border-red-900 bg-red-50/50 dark:bg-red-950/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
              <AlertTriangle className="h-5 w-5" />
              Critical - Needs Immediate Attention
            </CardTitle>
            <CardDescription className="text-red-600 dark:text-red-400/80">
              These topics are below 50% accuracy. Focus here first.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {criticalTopics.map((topic) => (
                <div
                  key={topic.subtopic}
                  className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 p-3 bg-card rounded-lg border border-red-200 dark:border-red-900"
                >
                  <div>
                    <h4 className="font-medium">{topic.display_name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {topic.correct}/{topic.total} correct
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="destructive">{Math.round(topic.accuracy)}%</Badge>
                    <MasteryBadge mastery={topic.mastery} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {needsWorkTopics.length > 0 && (
        <Card className="border-orange-200 dark:border-orange-900 bg-orange-50/50 dark:bg-orange-950/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-400">
              <TrendingUp className="h-5 w-5" />
              Needs Work - Below Passing
            </CardTitle>
            <CardDescription className="text-orange-600 dark:text-orange-400/80">
              These topics are between 50-70%. Study these to reach passing level.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {needsWorkTopics.map((topic) => (
                <div
                  key={topic.subtopic}
                  className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 p-3 bg-card rounded-lg border border-orange-200 dark:border-orange-900"
                >
                  <div>
                    <h4 className="font-medium">{topic.display_name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {topic.correct}/{topic.total} correct
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="warning">{Math.round(topic.accuracy)}%</Badge>
                    <MasteryBadge mastery={topic.mastery} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {learningTopics.length > 0 && (
        <Card className="border-yellow-200 dark:border-yellow-900 bg-yellow-50/50 dark:bg-yellow-950/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-700 dark:text-yellow-400">
              <TrendingUp className="h-5 w-5" />
              Learning - Passing but Room to Grow
            </CardTitle>
            <CardDescription className="text-yellow-600 dark:text-yellow-400/80">
              These topics are between 70-85%. Good foundation, keep practicing.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {learningTopics.map((topic) => (
                <div
                  key={topic.subtopic}
                  className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 p-3 bg-card rounded-lg border border-yellow-200 dark:border-yellow-900"
                >
                  <div>
                    <h4 className="font-medium">{topic.display_name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {topic.correct}/{topic.total} correct
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{Math.round(topic.accuracy)}%</Badge>
                    <MasteryBadge mastery={topic.mastery} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {strongTopics.length > 0 && (
        <Card className="border-green-200 dark:border-green-900 bg-green-50/50 dark:bg-green-950/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
              <CheckCircle className="h-5 w-5" />
              Strong - Well Prepared
            </CardTitle>
            <CardDescription className="text-green-600 dark:text-green-400/80">
              These topics are at 85%+ accuracy. Great job!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {strongTopics.map((topic) => (
                <div
                  key={topic.subtopic}
                  className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 p-3 bg-card rounded-lg border border-green-200 dark:border-green-900"
                >
                  <div>
                    <h4 className="font-medium">{topic.display_name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {topic.correct}/{topic.total} correct
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="success">{Math.round(topic.accuracy)}%</Badge>
                    <MasteryBadge mastery={topic.mastery} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {notStartedTopics.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Not Yet Started</CardTitle>
            <CardDescription>
              You haven't answered questions from these topics yet.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {notStartedTopics.map((topic) => (
                <Badge key={topic.subtopic} variant="outline">
                  {topic.display_name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
