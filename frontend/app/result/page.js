import Link from 'next/link';
import { Suspense } from 'react';
import ResultDetails from '@/components/ResultDetails';

export default function ResultPage() {
  return (
    <main className="page-shell narrow">
      <div className="topbar">
        <Link href="/" className="nav-link">
          ← Home
        </Link>
      </div>

      <Suspense
        fallback={
          <section className="result-card">
            <div className="badge success">Loading prediction...</div>
          </section>
        }
      >
        <ResultDetails />
      </Suspense>

      <div className="cta-row center">
        <Link href="/predict" className="primary-btn">
          Make Another Prediction
        </Link>
      </div>
    </main>
  );
}
