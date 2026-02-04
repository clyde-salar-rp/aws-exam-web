import type {
  Question,
  Session,
  QuestionResult,
  ProgressSummary,
  TopicStats,
  Section,
  ExamMode
} from '@/types'

const API_BASE = '/api'

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`)
  }

  return response.json()
}

// Questions API
export async function getQuestions(params?: {
  subtopic?: string
  mode?: ExamMode
  count?: number
}): Promise<Question[]> {
  const searchParams = new URLSearchParams()
  if (params?.subtopic) searchParams.set('subtopic', params.subtopic)
  if (params?.mode) searchParams.set('mode', params.mode)
  if (params?.count) searchParams.set('count', params.count.toString())

  const query = searchParams.toString()
  return fetchAPI<Question[]>(`/questions${query ? `?${query}` : ''}`)
}

export async function getQuestion(id: string): Promise<Question> {
  return fetchAPI<Question>(`/questions/${id}`)
}

// Sections API
export async function getSections(): Promise<Section[]> {
  return fetchAPI<Section[]>('/sections')
}

export async function getSection(id: string): Promise<Section> {
  return fetchAPI<Section>(`/sections/${id}`)
}

// Sessions API
export async function getSessions(): Promise<Session[]> {
  return fetchAPI<Session[]>('/sessions')
}

export async function getSession(id: number): Promise<{ session: Session; results: QuestionResult[] }> {
  return fetchAPI<{ session: Session; results: QuestionResult[] }>(`/sessions/${id}`)
}

export async function saveSession(data: {
  total_questions: number
  correct: number
  percentage: number
  results: Array<{
    question_id: string
    question_text: string
    user_answer: string
    correct_answer: string
    is_correct: boolean
    subtopic: string
  }>
}): Promise<Session> {
  return fetchAPI<Session>('/sessions', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

// Progress API
export async function getProgress(): Promise<ProgressSummary> {
  return fetchAPI<ProgressSummary>('/progress')
}

export async function getTopicProgress(): Promise<TopicStats[]> {
  return fetchAPI<TopicStats[]>('/progress/topics')
}
