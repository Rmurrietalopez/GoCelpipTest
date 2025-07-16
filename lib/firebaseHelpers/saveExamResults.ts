import { db } from '../firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export const saveExamResults = async (
  studentName: string,
  studentEmail: string,
  answers: Record<string, any>
) => {
  try {
    const docRef = await addDoc(collection(db, 'examResults'), {
      studentName,
      studentEmail,
      answers,
      submittedAt: Timestamp.now(),  // Save timestamp of submission
    });

    console.log('Exam results saved successfully with ID:', docRef.id);
  } catch (error) {
    console.error('Error saving exam results:', error);
  }
};








