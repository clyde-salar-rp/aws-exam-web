import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MasteryBadge } from '@/components/MasteryBadge'
import { getSections, getSection, getTopicProgress } from '@/lib/api'
import type { Section } from '@/types'
import { ArrowLeft, BookOpen } from 'lucide-react'

function removeImageTags(html: string): string {
  return html.replace(/<img[^>]*>/gi, '')
}

export function Review() {
  const [selectedSection, setSelectedSection] = useState<string | null>(null)

  const { data: sections = [] } = useQuery({
    queryKey: ['sections'],
    queryFn: getSections,
  })

  const { data: topics = [] } = useQuery({
    queryKey: ['topicProgress'],
    queryFn: getTopicProgress,
  })

  const { data: sectionContent, isLoading: contentLoading } = useQuery({
    queryKey: ['section', selectedSection],
    queryFn: () => getSection(selectedSection!),
    enabled: !!selectedSection,
  })

  const topicMap = topics.reduce(
    (acc, topic) => {
      acc[topic.subtopic] = topic
      return acc
    },
    {} as Record<string, (typeof topics)[0]>
  )

  if (selectedSection && sectionContent) {
    return (
      <div className="min-h-screen">
        {/* Sticky header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b mb-8">
          <div className="flex items-center gap-4 py-4">
            <Button variant="outline" size="sm" onClick={() => setSelectedSection(null)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-xl font-bold">{sectionContent.display_name}</h1>
              <p className="text-sm text-muted-foreground">Study Material</p>
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="pb-16">
          {contentLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-muted-foreground">Loading content...</div>
            </div>
          ) : (
            <Card className="max-w-5xl">
              <CardContent className="p-8 lg:p-12">
                <article
                  className="study-content prose prose-slate lg:prose-lg max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: removeImageTags(sectionContent.content || '') }}
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Study Materials</h1>
        <p className="text-muted-foreground">
          Review study materials for each topic
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((section: Section) => {
          const topic = topicMap[section.id]
          return (
            <Card
              key={section.id}
              className="cursor-pointer hover:bg-muted transition-colors"
              onClick={() => setSelectedSection(section.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{section.display_name}</CardTitle>
                  {topic && <MasteryBadge mastery={topic.mastery} />}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-muted-foreground">
                    <BookOpen className="mr-2 h-4 w-4" />
                    <span className="text-sm">Read material</span>
                  </div>
                  {topic && (
                    <span className="text-sm font-medium">
                      {Math.round(topic.accuracy)}% accuracy
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
