'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';
import Link from 'next/link';

type Submission = {
  id: string;
  studentName: string;
  studentEmail: string;
  submittedAt: string;
};

export default function DashboardPage() {
  const [results, setResults] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, 'examResults'));
      const data: Submission[] = snapshot.docs.map((doc) => {
        const raw = doc.data();
        const submittedAt =
          raw.submittedAt?.toDate?.() instanceof Date
            ? raw.submittedAt.toDate().toLocaleString()
            : new Date(raw.submittedAt).toLocaleString();

        return {
          id: doc.id,
          studentName: raw.studentName,
          studentEmail: raw.studentEmail,
          submittedAt,
        };
      });

      // Sort by most recent
      data.sort(
        (a, b) =>
          new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      );

      setResults(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = confirm('Are you sure you want to delete this submission?');
    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, 'examResults', id));
      setResults((prev) => prev.filter((r) => r.id !== id));
    } catch (error) {
      console.error('Failed to delete document:', error);
    }
  };

  return (
    <main className="min-h-screen bg-base-200 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-6 text-center text-primary">Teacher Dashboard</h1>

        {loading ? (
          <p className="text-center">Loading submissions...</p>
        ) : results.length === 0 ? (
          <p className="text-center text-gray-600">No exam submissions yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left">
              <thead>
                <tr>
                  <th className="px-4 py-2 font-semibold text-lg text-neutral">Student</th>
                  <th className="px-4 py-2 font-semibold text-lg text-neutral">Email</th>
                  <th className="px-4 py-2 font-semibold text-lg text-neutral">Submitted</th>
                  <th className="px-4 py-2 font-semibold text-lg text-neutral">Actions</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result) => (
                  <tr key={result.id}>
                    <td className="px-4 py-2 text-sm text-neutral">{result.studentName}</td>
                    <td className="px-4 py-2 text-sm text-neutral">{result.studentEmail}</td>
                    <td className="px-4 py-2 text-sm text-neutral">{result.submittedAt}</td>
                    <td className="px-4 py-2 flex gap-4">
                      <Link
                        href={`/dashboard/${result.id}`}
                        className="inline-block py-2 px-4 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={() => handleDelete(result.id)}
                        className="inline-block py-2 px-4 bg-red-500 text-white text-sm rounded-md hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}






