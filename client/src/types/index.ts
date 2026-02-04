export interface AnswerOption {
  letter: string
  text: string
}

export interface Question {
  id: string
  text: string
  options: AnswerOption[]
  correct_answers: string[]
  question_type: 'single' | 'multi'
  explanation: string | null
  source_file: string
  question_number: number
  subtopic: string
}

export interface Session {
  id: number
  timestamp: string
  total_questions: number
  correct: number
  percentage: number
}

export interface QuestionResult {
  id: number
  session_id: number
  question_id: string
  question_text: string
  user_answer: string
  correct_answer: string
  is_correct: boolean
  subtopic: string
}

export interface TopicStats {
  subtopic: string
  display_name: string
  total: number
  correct: number
  accuracy: number
  mastery: 'not_started' | 'learning' | 'needs_work' | 'proficient' | 'mastered'
}

export interface ProgressSummary {
  total_questions_answered: number
  total_correct: number
  overall_accuracy: number
  sessions_completed: number
  exam_readiness: number
  topics: TopicStats[]
}

export interface Section {
  id: string
  title: string
  display_name: string
  content?: string
}

export type ExamMode = 'adaptive' | 'random' | 'weak' | 'missed' | 'new'

export interface ExamConfig {
  mode: ExamMode
  questionCount: number
  subtopic?: string
}

export interface ExamState {
  questions: Question[]
  currentIndex: number
  answers: Record<string, string[]>
  submitted: boolean
  results?: ExamResults
}

export interface ExamResults {
  total: number
  correct: number
  percentage: number
  questions: Array<{
    question: Question
    userAnswer: string[]
    isCorrect: boolean
  }>
}
