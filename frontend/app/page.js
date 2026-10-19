import Link from 'next/link';

const highlights = [
  { label: 'Dataset', value: '1,338 records' },
  { label: 'Target', value: 'Insurance charges' },
  { label: 'Model', value: 'Random Forest Regressor' },
  { label: 'Use case', value: 'Premium estimation' },
];

const projectFactors = [
  { title: 'Age', text: 'Age strongly impacts healthcare risk and premium cost.' },
  { title: 'Smoking status', text: 'Smokers usually face significantly higher insurance charges.' },
  { title: 'BMI', text: 'Body mass index is an important health indicator in cost prediction.' },
  { title: 'Region', text: 'Location affects insurance pricing across different areas.' },
  { title: 'Children', text: 'Family size can influence expected healthcare needs.' },
  { title: 'Sex', text: 'The model includes demographic factors in its estimation logic.' },
];

const steps = [
  'Enter the user profile and health information.',
  'The frontend sends the details to the FastAPI backend.',
  'The trained machine learning model predicts the monthly insurance cost.',
];

export default function HomePage() {
  return (
    <main className="landing-page">
      <section className="hero-card">
        <div className="hero-copy">
          <div className="badge">Medical Insurance Predictor</div>
          <h1>Make smarter premium estimates with ML.</h1>
          <p>
            This project analyzes health and demographic details to estimate insurance charges using a
            trained machine learning model. It is designed to help users quickly understand how factors
            like smoking, BMI, region, and age affect coverage cost.
          </p>

          <div className="cta-row">
            <Link href="/predict" className="primary-btn">
              Start Prediction
            </Link>
            <Link href="/result" className="secondary-btn">
              View Sample Result
            </Link>
          </div>

          <div className="mini-facts">
            <span>FastAPI backend</span>
            <span>Next.js interface</span>
            <span>Real-time prediction</span>
          </div>
        </div>

        <div className="hero-panel">
          <div className="panel-header">Prediction snapshot</div>
          <div className="score-box">
            <span className="score-label">Sample estimate</span>
            <strong>$12,760</strong>
            <small>Based on typical profile inputs</small>
          </div>

          <div className="factor-list">
            <div>
              <span>Age</span>
              <b>35</b>
            </div>
            <div>
              <span>BMI</span>
              <b>28.2</b>
            </div>
            <div>
              <span>Smoker</span>
              <b>Yes</b>
            </div>
            <div>
              <span>Region</span>
              <b>Southeast</b>
            </div>
          </div>
        </div>
      </section>

      <section className="info-section">
        <div className="section-heading compact">
          <span className="eyebrow">Project overview</span>
          <h2>Built around real medical insurance data.</h2>
        </div>

        <div className="stats-grid">
          {highlights.map((item) => (
            <div key={item.label} className="stat-card">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="feature-grid">
        {projectFactors.map((factor) => (
          <div key={factor.title} className="feature-box">
            <strong>{factor.title}</strong>
            <span>{factor.text}</span>
          </div>
        ))}
      </section>

      <section className="story-section">
        <div className="story-card">
          <div className="section-heading compact left">
            <span className="eyebrow">How it works</span>
            <h2>From user input to cost prediction.</h2>
          </div>

          <div className="step-list">
            {steps.map((step, index) => (
              <div className="step-item" key={step}>
                <div className="step-number">0{index + 1}</div>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
