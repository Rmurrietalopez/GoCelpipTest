'use client';

import { useState } from 'react';
import { useExam } from '@/context/ExamContext';
import { useRouter } from 'next/navigation';

export default function ExamStartPage() {
  const { studentInfo, setStudentInfo } = useExam();
  const [name, setName] = useState(studentInfo.name || '');
  const [email, setEmail] = useState(studentInfo.email || '');
  const router = useRouter();

  const handleStart = () => {
    if (!name || !email) {
      alert('Please enter both name and email.');
      return;
    }
    setStudentInfo({ name, email });
    router.push('/exam/listening');
  };

  return (
    <main className="max-w-3xl mx-auto p-6 bg-base-100 rounded-xl shadow-lg mt-12">
      <h1 className="text-3xl font-bold text-primary text-center mb-6">Welcome, Please Fill In:</h1>
      <div className="space-y-4">
        <div>
          <label className="text-lg font-semibold text-neutral">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="input input-bordered w-full py-3 px-4 border-2 border-neutral rounded-md focus:ring-primary focus:border-primary"
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label className="text-lg font-semibold text-neutral">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="input input-bordered w-full py-3 px-4 border-2 border-neutral rounded-md focus:ring-primary focus:border-primary"
            placeholder="jane@example.com"
          />
        </div>
      </div>
      <div className="text-center mt-6">
        <button 
          className="bg-primary text-white py-3 px-6 rounded-lg text-lg font-bold hover:bg-primary-dark transition-all" 
          onClick={handleStart}
        >
          Start Exam
        </button>
      </div>
      <section className="mt-8 text-neutral">
        <p className="font-semibold">Before starting:</p>
        <ul className="list-disc list-inside">
          <li>Be in a quiet environment</li>
          <li>Use a computer (not a phone)</li>
          <li>This test takes ~45 minutes</li>
        </ul>
      </section>
    </main>
  );
}




