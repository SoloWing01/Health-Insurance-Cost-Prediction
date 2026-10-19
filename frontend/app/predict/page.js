import Link from 'next/link';
import InsuranceForm from '@/components/InsuranceForm';

export default function PredictPage() {
  return (
    <main className="page-shell narrow">
      <div className="topbar">
        <Link href="/" className="nav-link">
          ← Back to home
        </Link>
      </div>

      <InsuranceForm />
    </main>
  );
}
