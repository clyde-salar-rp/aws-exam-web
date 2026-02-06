import { useState, useEffect, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useLocation } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MasteryBadge } from '@/components/MasteryBadge'
import { getSections, getSection, getTopicProgress } from '@/lib/api'
import type { Section } from '@/types'
import { ArrowLeft, BookOpen, Loader2 } from 'lucide-react'

export function Review() {
  const [selectedSection, setSelectedSection] = useState<string | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  const { data: sections = [], isLoading: sectionsLoading } = useQuery({
    queryKey: ['sections'],
    queryFn: getSections,
  })

  const { data: topics = [], isLoading: topicsLoading } = useQuery({
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

  // Scroll to hash element after content loads
  useEffect(() => {
    if (sectionContent && !contentLoading && location.hash) {
      // Small delay to ensure DOM is updated
      const timeoutId = setTimeout(() => {
        const elementId = location.hash.slice(1) // Remove the # prefix
        const element = document.getElementById(elementId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
      return () => clearTimeout(timeoutId)
    }
  }, [sectionContent, contentLoading, location.hash])

  // Handle clicks on internal anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a')

      if (anchor && anchor.hash && anchor.getAttribute('href')?.startsWith('#')) {
        e.preventDefault()
        const elementId = anchor.hash.slice(1)
        const element = document.getElementById(elementId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          // Update URL hash without causing navigation
          window.history.pushState(null, '', anchor.hash)
        }
      }
    }

    const contentElement = contentRef.current
    if (contentElement) {
      contentElement.addEventListener('click', handleAnchorClick)
      return () => contentElement.removeEventListener('click', handleAnchorClick)
    }
  }, [sectionContent])

  if (selectedSection && sectionContent) {
    return (
      <div className="min-h-screen">
        {/* Sticky header */}
        <div className="sticky top-14 md:top-0 z-10 bg-background/95 backdrop-blur border-b mb-6 md:mb-8">
          <div className="flex items-center gap-3 md:gap-4 py-3 md:py-4">
            <Button variant="outline" size="sm" onClick={() => setSelectedSection(null)}>
              <ArrowLeft className="mr-1 md:mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Back</span>
            </Button>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg md:text-xl font-bold truncate">{sectionContent.display_name}</h1>
              <p className="text-xs md:text-sm text-muted-foreground">Study Material</p>
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="pb-16" ref={contentRef}>
          {contentLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                <div className="text-muted-foreground">Loading content...</div>
              </div>
            </div>
          ) : (
            <Card className="max-w-5xl">
              <CardContent className="p-4 sm:p-6 md:p-8 lg:p-12">
                <article
                  className="study-content prose prose-slate lg:prose-lg max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: sectionContent.content || '' }}
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    )
  }

  if (sectionsLoading || topicsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <div className="text-muted-foreground">Loading study materials...</div>
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
