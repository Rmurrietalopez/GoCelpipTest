'use client';

import { useState, useRef } from 'react';
import { useExam } from '@/context/ExamContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { uploadAudio } from '@/lib/firebaseHelpers/uploadAudio';
import { saveExamResults } from '@/lib/firebaseHelpers/saveExamResults';

export default function SpeakingTest() {
  const { answers, setAnswers, studentInfo } = useExam();
  const [isRecording, setIsRecording] = useState([false, false, false]);
  const [audioBlobs, setAudioBlobs] = useState<(Blob | null)[]>([null, null, null]);
  const [audioURLs, setAudioURLs] = useState<(string | null)[]>([null, null, null]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const router = useRouter();

  const startRecording = (index: number) => {
    setIsRecording((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (e) => {
        const blob = e.data;
        const audioURL = URL.createObjectURL(blob);

        setAudioBlobs((prev) => {
          const updated = [...prev];
          updated[index] = blob;
          return updated;
        });
        setAudioURLs((prev) => {
          const updated = [...prev];
          updated[index] = audioURL;
          return updated;
        });
      };
      mediaRecorderRef.current.start();
    });
  };

  const stopRecording = (index: number) => {
    setIsRecording((prev) => {
      const updated = [...prev];
      updated[index] = false;
      return updated;
    });

    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      setError('');

      const audio1Url = audioBlobs[0] ? await uploadAudio(audioBlobs[0], studentInfo.email) : null;
      const audio2Url = audioBlobs[1] ? await uploadAudio(audioBlobs[1], studentInfo.email) : null;
      const audio3Url = audioBlobs[2] ? await uploadAudio(audioBlobs[2], studentInfo.email) : null;

      setAnswers((prev) => ({
        ...prev,
        speaking1: audio1Url,
        speaking2: audio2Url,
        speaking3: audio3Url,
      }));

      await saveExamResults(studentInfo.name, studentInfo.email, {
        ...answers,
        speaking1: audio1Url,
        speaking2: audio2Url,
        speaking3: audio3Url,
      });

      router.push('/exam/results');
    } catch (err) {
      console.error('Submission failed:', err);
      setError('There was an error submitting your test. Please try again.');
      setIsSubmitting(false); // allow retry
    }
  };

  return (
    <main className="p-6 max-w-4xl mx-auto bg-base-100 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-primary text-center mb-6">Speaking Test</h1>

      {/* Exercise 1 */}
      <div className="mb-6">
        <p className="text-lg">
          🎤 <strong>Exercise 1: Give an Advice 👍</strong>
        </p>
        <p className="text-lg mb-4">
          Your friend has to work with a classmate on a school project. The classmate doesn’t do any work, so your friend does everything. Your friend feels upset and angry. Advise your friend about what he should do to solve this problem.
        </p>
        <div className="flex gap-4 mt-4">
          <button
            className={`w-auto py-2 px-6 mt-6 mx-auto block bg-green-500 text-white text-center rounded ${isRecording[0] ? 'bg-red-500' : ''}`}
            onClick={() => (isRecording[0] ? stopRecording(0) : startRecording(0))}
          >
            {isRecording[0] ? 'Stop Recording' : 'Start Recording'}
          </button>
          {audioURLs[0] && <audio controls src={audioURLs[0]} className="mt-2 w-full" />}
        </div>
      </div>

      {/* Exercise 2 */}
      <div className="mb-6">
        <p className="text-lg">
          🎤 <strong>Exercise 2: Describe the Picture</strong>
        </p>
        <p className="text-lg mb-4">
          Describe some things that are happening in the picture below as well as you can. The person with whom you are speaking cannot see the picture.
        </p>
        <div className="flex justify-center mb-4">
          <Image
            src="/assets/speaking1.png"
            alt="Speaking exercise 1"
            width={600}
            height={400}
            className="rounded shadow"
          />
        </div>
        <div className="flex gap-4 mt-4">
          <button
            className={`w-auto py-2 px-6 mt-6 mx-auto block bg-green-500 text-white text-center rounded ${isRecording[1] ? 'bg-red-500' : ''}`}
            onClick={() => (isRecording[1] ? stopRecording(1) : startRecording(1))}
          >
            {isRecording[1] ? 'Stop Recording' : 'Start Recording'}
          </button>
          {audioURLs[1] && <audio controls src={audioURLs[1]} className="mt-2 w-full" />}
        </div>
      </div>

      {/* Exercise 3 */}
      <div className="mb-6">
        <p className="text-lg">
          🎤 <strong>Exercise 3: Follow the Instructions</strong>
        </p>
        <p className="text-lg mb-4">
          Please listen carefully to the instructions shown in the image below, and provide your response by recording your voice.
        </p>
        <div className="flex justify-center mb-4">
          <Image
            src="/assets/speaking2.png"
            alt="Speaking exercise 2 instructions"
            width={600}
            height={400}
            className="rounded shadow"
          />
        </div>
        <div className="flex gap-4 mt-4">
          <button
            className={`w-auto py-2 px-6 mt-6 mx-auto block bg-green-500 text-white text-center rounded ${isRecording[2] ? 'bg-red-500' : ''}`}
            onClick={() => (isRecording[2] ? stopRecording(2) : startRecording(2))}
          >
            {isRecording[2] ? 'Stop Recording' : 'Start Recording'}
          </button>
          {audioURLs[2] && <audio controls src={audioURLs[2]} className="mt-2 w-full" />}
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6 text-center">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-auto py-2 px-6 mt-6 mx-auto block bg-primary text-white text-center rounded disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit and finish'}
        </button>
        {error && (
          <p className="text-red-500 text-sm mt-4">{error}</p>
        )}
      </div>
    </main>
  );
}




