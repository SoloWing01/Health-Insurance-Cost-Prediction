'use client';

import { useSearchParams } from 'next/navigation';

export default function ResultDetails() {
  const searchParams = useSearchParams();
  const amount = Number(searchParams.get('amount') || 0);
  const age = searchParams.get('age') || 'N/A';
  const sex = searchParams.get('sex') || 'N/A';
  const bmi = searchParams.get('bmi') || 'N/A';
  const children = searchParams.get('children') || 'N/A';
  const smoker = searchParams.get('smoker') || 'N/A';
  const region = searchParams.get('region') || 'N/A';

  return (
    <section className="result-card">
      <div className="badge success">Prediction Complete</div>
      <h1>Estimated insurance charge</h1>

      <div className="price-box">
        <span className="currency">$</span>
        <span>{amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
      </div>

      <div className="result-grid">
        <div>
          <span>Age</span>
          <strong>{age}</strong>
        </div>
        <div>
          <span>Sex</span>
          <strong>{sex}</strong>
        </div>
        <div>
          <span>BMI</span>
          <strong>{bmi}</strong>
        </div>
        <div>
          <span>Children</span>
          <strong>{children}</strong>
        </div>
        <div>
          <span>Smoker</span>
          <strong>{smoker}</strong>
        </div>
        <div>
          <span>Region</span>
          <strong>{region}</strong>
        </div>
      </div>
    </section>
  );
}
