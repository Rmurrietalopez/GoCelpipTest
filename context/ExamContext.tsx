'use client';
import React, { createContext, useContext, useState } from 'react';

// Define the type for exam answers
export type ExamAnswers = {
  listening: number[];          // Listening section answers
  readingTest1: number[];       // Reading Test Part 1 answers
  readingTest2: number[];       // Reading Test Part 2 answers
  writing: string;              // Writing section answer
  speaking1: string | null;     // Speaking answer 1 (audio URL)
  speaking2: string | null;     // Speaking answer 2 (audio URL)
  speaking3: string | null;     // Speaking answer 3 (audio URL)
};

type StudentInfo = {
  name: string;  // Student name
  email: string; // Student email
};

type ExamContextType = {
  answers: ExamAnswers;                            // Holds all exam answers
  setAnswers: React.Dispatch<React.SetStateAction<ExamAnswers>>;  // Function to update answers
  studentInfo: StudentInfo;                        // Student information
  setStudentInfo: React.Dispatch<React.SetStateAction<StudentInfo>>;  // Function to update student info
};

// Create the ExamContext with a default value of undefined (which will be checked later)
const ExamContext = createContext<ExamContextType | undefined>(undefined);

// ExamProvider is a component that will wrap your app and provide the context value to all child components
export const ExamProvider = ({ children }: { children: React.ReactNode }) => {
  const [answers, setAnswers] = useState<ExamAnswers>({
    listening: [],          // Initialize listening answers as an empty array
    readingTest1: [],       // Initialize reading test 1 answers as an empty array
    readingTest2: [],       // Initialize reading test 2 answers as an empty array
    writing: '',            // Initialize writing answer as an empty string
    speaking1: null,        // Initialize speaking1 audio URL as null
    speaking2: null,        // Initialize speaking2 audio URL as null
    speaking3: null,        // Initialize speaking3 audio URL as null
  });

  const [studentInfo, setStudentInfo] = useState<StudentInfo>({ name: '', email: '' });

  return (
    <ExamContext.Provider value={{ answers, setAnswers, studentInfo, setStudentInfo }}>
      {children}
    </ExamContext.Provider>
  );
};

// Custom hook to use the ExamContext and access the exam answers and student info
export const useExam = () => {
  const context = useContext(ExamContext);  // Access the context value

  if (!context) {
    throw new Error('useExam must be used within an ExamProvider');  // Error if the hook is used outside the provider
  }

  return context;  // Return the context value (answers and student info)
};








