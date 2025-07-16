'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type AnswerContextType = {
  listeningAnswers: number[]
  setListeningAnswers: (answers: number[]) => void

  readingAnswers: number[]
  setReadingAnswers: (answers: number[]) => void

  writingAnswer: string
  setWritingAnswer: (text: string) => void

  speakingBlobUrl: string | null
  setSpeakingBlobUrl: (url: string | null) => void
}

const defaultContext: AnswerContextType = {
  listeningAnswers: [],
  setListeningAnswers: () => {},

  readingAnswers: [],
  setReadingAnswers: () => {},

  writingAnswer: '',
  setWritingAnswer: () => {},

  speakingBlobUrl: null,
  setSpeakingBlobUrl: () => {},
}

const AnswerContext = createContext<AnswerContextType>(defaultContext)

export const useAnswers = () => useContext(AnswerContext)

export const AnswerProvider = ({ children }: { children: React.ReactNode }) => {
  const [listeningAnswers, setListeningAnswers] = useState<number[]>([])
  const [readingAnswers, setReadingAnswers] = useState<number[]>([])
  const [writingAnswer, setWritingAnswer] = useState('')
  const [speakingBlobUrl, setSpeakingBlobUrl] = useState<string | null>(null)

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('answers')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setListeningAnswers(parsed.listeningAnswers || [])
        setReadingAnswers(parsed.readingAnswers || [])
        setWritingAnswer(parsed.writingAnswer || '')
        setSpeakingBlobUrl(parsed.speakingBlobUrl || null)
      } catch (e) {
        console.error('Failed to parse localStorage answers:', e)
      }
    }
  }, [])

  // Save to localStorage whenever answers change
  useEffect(() => {
    localStorage.setItem(
      'answers',
      JSON.stringify({ listeningAnswers, readingAnswers, writingAnswer, speakingBlobUrl })
    )
  }, [listeningAnswers, readingAnswers, writingAnswer, speakingBlobUrl])

  return (
    <AnswerContext.Provider
      value={{
        listeningAnswers,
        setListeningAnswers,
        readingAnswers,
        setReadingAnswers,
        writingAnswer,
        setWritingAnswer,
        speakingBlobUrl,
        setSpeakingBlobUrl,
      }}
    >
      {children}
    </AnswerContext.Provider>
  )
}
