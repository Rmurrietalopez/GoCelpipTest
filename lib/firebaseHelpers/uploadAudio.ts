import { storage } from '../firebaseConfig';  // Ensure Firebase Storage is initialized
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export async function uploadAudio(blob: Blob, studentEmail: string) {
  const fileRef = ref(storage, `audio_submissions/${studentEmail}-${Date.now()}.webm`);

  try {
    await uploadBytes(fileRef, blob);  // Upload audio to Firebase Storage
    const downloadURL = await getDownloadURL(fileRef);  // Get the download URL
    return downloadURL;  // Return the download URL
  } catch (error) {
    console.error("Error uploading audio to Firebase:", error);
    throw error;  // Throw error if any issue occurs
  }
}




