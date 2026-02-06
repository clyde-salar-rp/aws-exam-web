import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress as ProgressBar } from '@/components/ui/progress'
import { TopicMasteryTable } from '@/components/TopicMasteryTable'
import { SessionHistoryList } from '@/components/SessionHistoryList'
import { getProgress, getSessions } from '@/lib/api'
import { Target, TrendingUp, Award, BookOpen, Loader2 } from 'lucide-react'

export function Progress() {
  const navigate = useNavigate()
  const { data: progress, isLoading: progressLoading } = useQuery({
    queryKey: ['progress'],
    queryFn: getProgress,
  })

  const { data: sessions = [], isLoading: sessionsLoading } = useQuery({
    queryKey: ['sessions'],
    queryFn: getSessions,
  })

  if (progressLoading || sessionsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <div className="text-muted-foreground">Loading progress...</div>
        </div>
      </div>
    )
  }

  const masteredCount = progress?.topics?.filter((t) => t.mastery === 'mastered').length || 0
  const proficientCount = progress?.topics?.filter((t) => t.mastery === 'proficient').length || 0
  const learningCount = progress?.topics?.filter((t) => t.mastery === 'learning').length || 0
  const needsWorkCount = progress?.topics?.filter((t) => t.mastery === 'needs_work').length || 0
  const notStartedCount = progress?.topics?.filter((t) => t.mastery === 'not_started').length || 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Progress</h1>
        <p className="text-muted-foreground">
          Track your exam preparation progress
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Exam Readiness</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(progress?.exam_readiness || 0)}%
            </div>
            <ProgressBar value={progress?.exam_readiness || 0} className="mt-2 h-2" />
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
            <CardTitle className="text-sm font-medium">Exams Completed</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {progress?.sessions_completed || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Practice sessions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Questions Answered</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {progress?.total_questions_answered || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Out of 1,142 available
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Topic Mastery Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 text-center">
            <div className="p-3 sm:p-4 bg-green-50 dark:bg-green-950/50 rounded-lg">
              <div className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">{masteredCount}</div>
              <div className="text-xs sm:text-sm text-green-700 dark:text-green-400/80">Mastered</div>
            </div>
            <div className="p-3 sm:p-4 bg-blue-50 dark:bg-blue-950/50 rounded-lg">
              <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">{proficientCount}</div>
              <div className="text-xs sm:text-sm text-blue-700 dark:text-blue-400/80">Proficient</div>
            </div>
            <div className="p-3 sm:p-4 bg-yellow-50 dark:bg-yellow-950/50 rounded-lg">
              <div className="text-xl sm:text-2xl font-bold text-yellow-600 dark:text-yellow-400">{learningCount}</div>
              <div className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-400/80">Learning</div>
            </div>
            <div className="p-3 sm:p-4 bg-orange-50 dark:bg-orange-950/50 rounded-lg">
              <div className="text-xl sm:text-2xl font-bold text-orange-600 dark:text-orange-400">{needsWorkCount}</div>
              <div className="text-xs sm:text-sm text-orange-700 dark:text-orange-400/80">Needs Work</div>
            </div>
            <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg col-span-2 sm:col-span-1">
              <div className="text-xl sm:text-2xl font-bold text-gray-600 dark:text-gray-400">{notStartedCount}</div>
              <div className="text-xs sm:text-sm text-gray-700 dark:text-gray-400/80">Not Started</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <TopicMasteryTable topics={progress?.topics || []} />
        <SessionHistoryList
          sessions={sessions}
          onSessionClick={(session) => navigate(`/exam?session=${session.id}`)}
        />
      </div>
    </div>
  )
}
