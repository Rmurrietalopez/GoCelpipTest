'use client';

import { useExam } from '@/context/ExamContext';
import { correctAnswers } from '@/lib/constants/correctAnswers';

export default function ResultsPage() {
  const { answers, studentInfo } = useExam();

  // Function to count the number of correct answers
  const countCorrect = (studentAnswers: number[], correctAnswers: number[]) => {
    let score = 0;
    for (let i = 0; i < correctAnswers.length; i++) {
      if (studentAnswers[i] === correctAnswers[i]) {
        score++;
      }
    }
    return score;
  };

  // Calculate scores for listening and reading
  const listeningScore = countCorrect(answers.listening, correctAnswers.listening);

  // Reading Part 1: Questions 1-8
  const readingPart1Score = countCorrect(answers.readingTest1, correctAnswers.reading.slice(0, 8)); 
  // Reading Part 2: Questions 9-18
  const readingPart2Score = countCorrect(answers.readingTest2, correctAnswers.reading.slice(8)); 

  // Calculate total possible answers for each section
  const totalListening = correctAnswers.listening.length;
  const totalReadingPart1 = 8;  // Part 1 has 8 questions
  const totalReadingPart2 = 10;  // Part 2 has 10 questions

  const totalReading = totalReadingPart1 + totalReadingPart2;

  return (
    <main className="min-h-screen bg-base-200 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center text-success mb-4">Exam Submitted</h1>
        <p className="text-center text-gray-700 mb-6">
          Thank you, {studentInfo.name || 'student'}. Your exam has been submitted.
        </p>

        {/* Listening Section */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Listening Results:</h2>
          <p className="mb-2">
            Score: {listeningScore}/{totalListening}
          </p>
        </section>

        {/* Reading Section Part 1 */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Reading Results - Part 1:</h2>
          <p className="mb-2">
            Score: {readingPart1Score}/{totalReadingPart1}
          </p>
        </section>

        {/* Reading Section Part 2 */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Reading Results - Part 2:</h2>
          <p className="mb-2">
            Score: {readingPart2Score}/{totalReadingPart2}
          </p>
        </section>

        {/* Total Reading Section */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Total Reading Results:</h2>
          <p className="mb-2">
            Score: {readingPart1Score + readingPart2Score}/{totalReading}
          </p>
        </section>

        {/* Writing Section */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Writing Answer:</h2>
          <p className="text-lg text-gray-700">
            Your answer will be reviewed by a teacher and feedback will be provided later.
          </p>
        </section>

        {/* Speaking Section */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Speaking Answer:</h2>
          <p className="text-lg text-gray-700">Your answers will be reviewed by a teacher and feedback will be provided later.</p>

          {answers.speaking1 ? (
            <audio controls src={answers.speaking1} className="w-full mt-2" />
          ) : (
            <p>No audio submitted for Exercise 1.</p>
          )}

          {answers.speaking2 ? (
            <audio controls src={answers.speaking2} className="w-full mt-2" />
          ) : (
            <p>No audio submitted for Exercise 2.</p>
          )}

          {answers.speaking3 ? (
            <audio controls src={answers.speaking3} className="w-full mt-2" />
          ) : (
            <p>No audio submitted for Exercise 3.</p>
          )}
        </section>
      </div>
    </main>
  );
}

























