import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { SessionHistoryList } from '@/components/SessionHistoryList'
import { getProgress, getSessions } from '@/lib/api'
import {
  GraduationCap,
  BookOpen,
  BarChart2,
  Target,
  TrendingUp,
  Award,
  Loader2,
} from 'lucide-react'

export function Dashboard() {
  const navigate = useNavigate()

  const { data: progress, isLoading: progressLoading } = useQuery({
    queryKey: ['progress'],
    queryFn: getProgress,
  })

  const { data: sessions = [], isLoading: sessionsLoading } = useQuery({
    queryKey: ['sessions'],
    queryFn: getSessions,
  })

  const recentSessions = sessions.slice(0, 5)

  const getReadinessColor = (readiness: number) => {
    if (readiness >= 80) return 'text-green-600'
    if (readiness >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getReadinessLabel = (readiness: number) => {
    if (readiness >= 80) return 'Ready for Exam'
    if (readiness >= 60) return 'Almost Ready'
    if (readiness >= 40) return 'Keep Practicing'
    return 'Just Starting'
  }

  if (progressLoading || sessionsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <div className="text-muted-foreground">Loading dashboard...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Track your AWS Cloud Practitioner exam preparation
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Exam Readiness</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getReadinessColor(progress?.exam_readiness || 0)}`}>
              {Math.round(progress?.exam_readiness || 0)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {getReadinessLabel(progress?.exam_readiness || 0)}
            </p>
            <Progress value={progress?.exam_readiness || 0} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Accuracy</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(progress?.overall_accuracy || 0)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {progress?.total_correct || 0} of {progress?.total_questions_answered || 0} correct
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sessions</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {progress?.sessions_completed || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Exams completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Questions Seen</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {progress?.total_questions_answered || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Out of 1,142 total
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Start practicing or review your progress</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Button
              size="lg"
              className="h-24 text-lg"
              onClick={() => navigate('/exam')}
            >
              <GraduationCap className="mr-2 h-6 w-6" />
              Start Exam
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-24 text-lg"
              onClick={() => navigate('/progress')}
            >
              <BarChart2 className="mr-2 h-6 w-6" />
              View Progress
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-24 text-lg"
              onClick={() => navigate('/review')}
            >
              <BookOpen className="mr-2 h-6 w-6" />
              Study Materials
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-24 text-lg"
              onClick={() => navigate('/study-notes')}
            >
              <Target className="mr-2 h-6 w-6" />
              Study Notes
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {progress?.topics && progress.topics.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Weak Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {progress.topics
                    .filter((t) => t.mastery === 'needs_work' || t.mastery === 'learning')
                    .slice(0, 3)
                    .map((topic) => (
                      <div
                        key={topic.subtopic}
                        className="flex justify-between items-center p-2 bg-muted rounded"
                      >
                        <span className="text-sm">{topic.display_name}</span>
                        <span className="text-sm font-medium">
                          {Math.round(topic.accuracy)}%
                        </span>
                      </div>
                    ))}
                  {progress.topics.filter(
                    (t) => t.mastery === 'needs_work' || t.mastery === 'learning'
                  ).length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      No weak topics found. Great job!
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <SessionHistoryList
        sessions={recentSessions}
        onSessionClick={(session) => navigate(`/exam?session=${session.id}`)}
      />
    </div>
  )
}
