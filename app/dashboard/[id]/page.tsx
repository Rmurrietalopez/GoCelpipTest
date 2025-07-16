'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { db } from '@/lib/firebaseConfig';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { correctAnswers } from '@/lib/constants/correctAnswers';

export default function SubmissionDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [submission, setSubmission] = useState<any>(null);

  useEffect(() => {
    const fetchSubmission = async () => {
      const ref = doc(db, 'examResults', id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setSubmission({
          ...data,
          submittedAt: (data.submittedAt?.toDate?.() ?? new Date()).toLocaleString(),
        });
      }
    };

    fetchSubmission();
  }, [id]);

  const deleteSubmission = async () => {
    if (!confirm('Are you sure you want to delete this submission?')) return;
    await deleteDoc(doc(db, 'examResults', id));
    router.push('/dashboard');
  };

  const sectionLetterMap: Record<string, string[]> = {
    listening: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],  // Listening options expanded
    readingTest1: ['A', 'B', 'C', 'D'],  // Reading Test 1 options
    readingTest2: ['A', 'B', 'C', 'D'],  // Reading Test 2 options
  };

  // Function to render the graded section
  const renderGradedSection = (
    sectionName: 'listening' | 'readingTest1' | 'readingTest2',
    answers: Record<string, number>
  ) => {
    const correct = correctAnswers[sectionName]; // Get correct answers for the section

    // Check if correct answers are available for this section
    if (!correct) {
      return <p>No answers found for this section.</p>;
    }

    const letters = sectionLetterMap[sectionName]; // Map for letter representation of the answers
    let score = 0;

    const rows = correct.map((correctAnswer, idx) => {
      const studentAnswer = answers?.[idx]; // Get student's selected answer
      const isCorrect = studentAnswer === correctAnswer; // Compare the student's answer to the correct answer
      if (isCorrect) score++; // Increment score if the answer is correct

      return (
        <li key={idx}>
          Q{idx + 1}:{' '}
          <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
            {isCorrect ? '✅' : '❌'}
          </span>{' '}
          Student: {letters[studentAnswer] ?? 'N/A'}, Correct: {letters[correctAnswer]}
        </li>
      );
    });

    return (
      <div className="mb-4">
        <h2 className="text-lg font-semibold capitalize">{sectionName} Answers:</h2>
        <p className="mb-2">Score: {score}/{correct.length}</p>
        <ul className="list-disc pl-5">{rows}</ul>
      </div>
    );
  };

  if (!submission) {
    return <p className="text-center mt-6">Loading submission...</p>;
  }

  return (
    <main className="p-6 max-w-4xl mx-auto bg-base-100 rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Submission Details</h1>
      <p><strong>Name:</strong> {submission.studentName}</p>
      <p><strong>Email:</strong> {submission.studentEmail}</p>
      <p><strong>Submitted At:</strong> {submission.submittedAt}</p>

      {/* Graded answers */}
      <div className="mt-6">
        {renderGradedSection('listening', submission.answers.listening)}
        {renderGradedSection('readingTest1', submission.answers.readingTest1)}
        {renderGradedSection('readingTest2', submission.answers.readingTest2)}

        <h2 className="text-lg font-semibold mt-4">Writing Answer:</h2>
        <p className="whitespace-pre-wrap break-words bg-base-100 p-4 rounded">
          {submission.answers.writing || 'No response'}
        </p>

        <h2 className="text-lg font-semibold mt-4">Speaking Answer:</h2>
        {/* Check if the speaking answers are present and display them */}
        {submission.answers.speaking1 ? (
          <audio controls src={submission.answers.speaking1} className="w-full mt-2" />
        ) : (
          <p>No audio submitted for Exercise 1.</p>
        )}
        {submission.answers.speaking2 ? (
          <audio controls src={submission.answers.speaking2} className="w-full mt-2" />
        ) : (
          <p>No audio submitted for Exercise 2.</p>
        )}
        {submission.answers.speaking3 ? (
          <audio controls src={submission.answers.speaking3} className="w-full mt-2" />
        ) : (
          <p>No audio submitted for Exercise 3.</p>
        )}
      </div>

      <div className="mt-6">
        <button onClick={deleteSubmission} className="py-2 px-6 bg-red-500 text-white rounded-md hover:bg-red-600 w-full">
          Delete Submission
        </button>
      </div>
    </main>
  );
}













