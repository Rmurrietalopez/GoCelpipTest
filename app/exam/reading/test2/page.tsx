'use client';

import Image from 'next/image';
import { useExam } from '@/context/ExamContext';
import Link from 'next/link';

const questions = [
  {
    text: "1. What is the main topic of this article?",
    options: [
      'a convenient tool to assess employees',
      'a productivity monitor for companies',
      'a collaborative way to train workers',
      'a controversial human resources tool',
    ],
  },
  {
    text: "2. David Brown believes PIPs are",
    options: ['unjustified.', 'uninformative.', 'ineffective.', 'insincere.'],
  },
  {
    text: "3. What is probably true about Jane Doris?",
    options: [
      'She doesn’t use any PIPs at her company.',
      'She has little experience in managing staff.',
      'She only uses PIPs for promising staff.',
      'She doesn’t believe in additional training.',
    ],
  },
  {
    text: "4. What would Jane Doris probably agree with?",
    options: [
      'PIPs can rectify gaps in an employee’s understanding.',
      'Employees should write the objectives of their own PIPs.',
      'PIPs help employers to improve their business procedures.',
      'Employers should make quick decisions about employees.',
    ],
  },
  {
    text: "5. What does Demi Vasquez seem to suggest?",
    options: [
      'Employees need PIPs for their daily work.',
      'Employees should show initiative.',
      'Employers should set ambitious goals.',
      'Employers need outside resources.',
    ],
  },
  {
    text: "Unlike David Brown, I firmly believe that employees should look at PIPs as a 6.",
    options: [
      'way forward in their career',
      'path to their termination',
      'legal tool to benefit them',
      'company’s final decision',
    ],
  },
  {
    text: "While a PIP might just seem like a pretext for dismissal, employees can also draw valuable from them 7.",
    options: [
      'information about their abilities',
      'details about new job opportunities',
      'protection from liability',
      'support from their peers',
    ],
  },
  {
    text: "I once naively believed what Jane Doris said about companies by implementing PIPs 8.",
    options: [
      'investing in their workers',
      'delaying difficult decisions',
      'establishing grounds for firing',
      'improving training programs',
    ],
  },
  {
    text: "As Brown suggests, after receiving a PIP, I was 9.",
    options: [
      'provided with training',
      'demoted at work',
      'let go from my job',
      'given a second chance',
    ],
  },
  {
    text: "Your dream job could be just around the corner! Forget about Vazquez’s 10.",
    options: [
      'advice on actions you can take against it',
      'justifications for employers’ policies',
      'resources for creating workplace transparency',
      'suggestions for improving performance',
    ],
  },
];

export default function Test2() {
  const { answers, setAnswers } = useExam();

  // Handle the option change for each question
  const handleChange = (i: number, oi: number) =>
    setAnswers((prev) => ({
      ...prev,
      reading: { ...prev.reading, [i]: oi },
    }));

  return (
    <main className="p-6 max-w-4xl mx-auto bg-base-100 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-primary text-center mb-6">Reading Test 2</h1>

      {/* Image on top */}
      <div className="flex justify-center mb-6">
        <Image
          src="/assets/reading2.png"
          width={600}
          height={800}
          alt="Reading"
          className="rounded shadow max-h-[80vh] object-contain"
        />
      </div>

      {/* Questions 1-5 */}
      <div className="space-y-4">
        {questions.slice(0, 5).map((q, i) => (
          <div key={i} className="bg-base-200 p-4 rounded">
            <p>{q.text}</p>
            <div className="mt-2">
              <select
                className="select select-primary w-full"
                value={answers.reading[i] !== undefined ? answers.reading[i] : ''}
                onChange={(e) => handleChange(i, parseInt(e.target.value))}
              >
                <option disabled value="">
                  Choose an option
                </option>
                {q.options.map((o, oi) => (
                  <option key={oi} value={oi}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* Explanation for questions 6-10 */}
      <p className="mt-6">
        <strong>The following is a comment by a visitor to the website page. Complete the comment by choosing the best option:</strong>
      </p>

      {/* Questions 6-10 as conversation style */}
      <div className="space-y-4 mt-6">
        {questions.slice(5, 10).map((q, i) => (
          <p key={i}>
            {q.text}{" "}
            <span className="inline-block">
              <select
                className="select select-primary w-auto"
                value={answers.reading[i + 5] !== undefined ? answers.reading[i + 5] : ''}
                onChange={(e) => handleChange(i + 5, parseInt(e.target.value))}
              >
                <option disabled value="">
                  Choose an option
                </option>
                {q.options.map((o, oi) => (
                  <option key={oi} value={oi}>
                    {o}
                  </option>
                ))}
              </select>
            </span>
          </p>
        ))}
      </div>

      {/* Continue to Writing */}
      <Link href="/exam/writing" className="w-auto py-2 px-6 mt-6 mx-auto block bg-primary text-white text-center rounded">
        Continue to Writing
      </Link>
    </main>
  );
}









