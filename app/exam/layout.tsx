// app/exam/layout.tsx
import { ExamProvider } from '@/context/ExamContext';

export default function ExamLayout({ children }: { children: React.ReactNode }) {
  return (
    <ExamProvider>
      {children}
    </ExamProvider>
  );
}
