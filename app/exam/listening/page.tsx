'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useExam } from '@/context/ExamContext';

const options = [
  'A. Significant day in many people´s lives.',
  'B. An everyday occurrence.',
  'C. A moment just before or after a flight.',
  'D. Some dramatic weather.',
  'E. Finding something beautiful.',
  'F. Something that others may find quite boring.',
  'G. Receiving advice from a parent.',
  'H. Seeing a photo of themselves.',
  'I. Damage to a property.',
  'J. Feeling anxious about this day.',
];

const speakers = ['Speaker 1', 'Speaker 2', 'Speaker 3', 'Speaker 4', 'Speaker 5'];

export default function ListeningPage() {
  const { answers, setAnswers } = useExam();
  const [localAnswers, setLocalAnswers] = useState<{ [key: number]: number }>({});
  const router = useRouter();

  // Handle the option change for each speaker
  const handleOptionChange = (speakerIndex: number, selectedOption: number) => {
    setLocalAnswers((prev) => ({
      ...prev,
      [speakerIndex]: selectedOption,
    }));
  };

  // When the "Next Section" button is clicked
  const handleNext = () => {
    // Save the answers for the listening section
    setAnswers((prev) => ({
      ...prev,
      listening: localAnswers,
    }));
    // Navigate to the next section (Reading Test 1)
    router.push('/exam/reading/test1');
  };

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold mb-4">Listening Section</h1>
      <p className="text-gray-700 mb-4">
        Watch the video and match each speaker to the correct statement.
      </p>

      {/* YouTube Video */}
      <div className="mb-6">
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/6eIRrzzpDyI"
            title="YouTube video"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Questions for each speaker */}
      {speakers.map((speaker, idx) => (
        <div key={idx} className="border-b border-gray-200 pb-4 mb-4">
          <p className="font-semibold mb-2">{speaker}</p>
          <div className="space-y-2">
            {options.map((option, optIdx) => (
              <label key={optIdx} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={`speaker-${idx}`}
                  checked={localAnswers[idx] === optIdx}
                  onChange={() => handleOptionChange(idx, optIdx)}
                  className="radio radio-primary"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>
      ))}

      {/* Next Section Button */}
      <div className="mt-6">
        <button onClick={handleNext} className="w-auto py-2 px-6 mt-6 mx-auto block bg-primary text-white text-center rounded">
          Next Section
        </button>
      </div>
    </main>
  );
}









