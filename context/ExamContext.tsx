'use client';
import React, { createContext, useContext, useState } from 'react';

// Define the type for exam answers
export type ExamAnswers = {
  listening: { [key: string]: number };  // For listening section answers
  reading: { [key: string]: number };    // For reading section answers
  writing: string;                       // For writing section answer
  speaking1: string | null;              // Store audio URLs for speaking exercise 1
  speaking2: string | null;              // Store audio URLs for speaking exercise 2
  speaking3: string | null;              // Store audio URLs for speaking exercise 3
};

type StudentInfo = {
  name: string;  // Student name
  email: string; // Student email
};

type ExamContextType = {
  answers: ExamAnswers;                            // Holds all exam answers, including audio URLs
  setAnswers: React.Dispatch<React.SetStateAction<ExamAnswers>>;  // Function to update answers
  studentInfo: StudentInfo;                        // Student information
  setStudentInfo: React.Dispatch<React.SetStateAction<StudentInfo>>;  // Function to update student info
};

// Create the ExamContext with a default value of undefined (which will be checked later)
const ExamContext = createContext<ExamContextType | undefined>(undefined);

// ExamProvider is a component that will wrap your app and provide the context value to all child components
export const ExamProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize state for exam answers with null values for speaking exercises
  const [answers, setAnswers] = useState<ExamAnswers>({
    listening: {},  // Initialize listening answers as empty object
    reading: {},    // Initialize reading answers as empty object
    writing: '',    // Initialize writing answer as empty string
    speaking1: null,  // Initialize speaking1 audio URL as null
    speaking2: null,  // Initialize speaking2 audio URL as null
    speaking3: null,  // Initialize speaking3 audio URL as null
  });

  // Initialize state for student information (name and email)
  const [studentInfo, setStudentInfo] = useState<StudentInfo>({ name: '', email: '' });

  // Return the provider component with answers and student info state passed as values
  return (
    <ExamContext.Provider value={{ answers, setAnswers, studentInfo, setStudentInfo }}>
      {children}  {/* The children of this component will have access to the context */}
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



