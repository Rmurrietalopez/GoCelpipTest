'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useExam } from '@/context/ExamContext';

export default function WritingTest() {
  const { answers, setAnswers } = useExam();
  const [writingAnswer, setWritingAnswer] = useState(answers.writing || '');
  const router = useRouter();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setWritingAnswer(e.target.value);
  };

  const handleSubmit = () => {
    // Save the writing answer to context
    setAnswers((prev) => ({
      ...prev,
      writing: writingAnswer,
    }));

    // Navigate to the first part of the Speaking test
    router.push('/exam/speaking'); // Navigate to speaking/page.tsx
  };

  return (
    <main className="p-6 max-w-4xl mx-auto bg-base-100 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-primary text-center mb-6">Writing Test: Email</h1>

      {/* Task Description */}
      <div className="mb-6">
        <p className="text-lg">
          📨 <strong>Task 1 – Writing an Email (Situación formal, estilo CELPIP)</strong>
        </p>
        <p className="text-lg mb-4">
          <strong>Topic:</strong> Volunteering at a Local Event
        </p>
        <p className="text-lg">
          You recently saw a notice that your local community center is looking for volunteers to help organize a cultural festival. You are interested in volunteering.
        </p>
        <div className="text-lg mb-6">
          Write an email of about 150–200 words to the community center. Your email must include the following points:
          <ul className="list-disc pl-6 mt-2">
            <li>Why you are interested in volunteering</li>
            <li>What relevant experience or skills you have</li>
            <li>How much time you can commit</li>
            <li>What specific tasks you would prefer to do</li>
          </ul>
        </div>
      </div>

      {/* Text Area for Writing */}
      <div className="space-y-4">
        <textarea
          className="textarea textarea-primary w-full h-48 p-4 border border-neutral rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          value={writingAnswer}
          onChange={handleTextChange}
          placeholder="Type your response here..."
        />
      </div>

      {/* Submit Button */}
      <div className="mt-6 text-center">
        <button
          onClick={handleSubmit}
          className="w-auto py-2 px-6 mt-6 mx-auto block bg-primary text-white text-center rounded"
        >
          Continue to speaking section
        </button>
      </div>
    </main>
  );
}






