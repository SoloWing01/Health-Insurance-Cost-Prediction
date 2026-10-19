'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

const initialForm = {
  Age: 30,
  Sex: 'Female',
  Bmi: 25,
  Children: 0,
  Smoker: 'No',
  Region: 'southeast',
};

export default function InsuranceForm() {
  const router = useRouter();
  const [formData, setFormData] = useState(initialForm);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'Age' || name === 'Children' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.detail || 'Prediction failed. Please try again.');
      }

      const query = new URLSearchParams({
        amount: String(payload.predictedCharges),
        age: String(formData.Age),
        sex: formData.Sex,
        bmi: String(formData.Bmi),
        children: String(formData.Children),
        smoker: formData.Smoker,
        region: formData.Region,
      });

      router.push(`/result?${query.toString()}`);
    } catch (err) {
      setError(err.message || 'Something went wrong while predicting costs.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <div className="section-heading">
        <h2>Insurance Information</h2>
        <p>Fill in these details to estimate premium charges.</p>
      </div>

      <div className="form-grid">
        <label>
          Age
          <input
            name="Age"
            type="number"
            min="18"
            max="100"
            value={formData.Age}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Sex
          <select name="Sex" value={formData.Sex} onChange={handleChange}>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
        </label>

        <label>
          BMI
          <input
            name="Bmi"
            type="number"
            min="15"
            step="0.1"
            value={formData.Bmi}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Children
          <input
            name="Children"
            type="number"
            min="0"
            max="5"
            value={formData.Children}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Smoker
          <select name="Smoker" value={formData.Smoker} onChange={handleChange}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label>
          Region
          <select name="Region" value={formData.Region} onChange={handleChange}>
            <option value="southeast">Southeast</option>
            <option value="southwest">Southwest</option>
            <option value="northeast">Northeast</option>
            <option value="northwest">Northwest</option>
          </select>
        </label>
      </div>

      {error ? <div className="error-box">{error}</div> : null}

      <button className="primary-btn full-width" type="submit" disabled={isLoading}>
        {isLoading ? 'Predicting...' : 'Get Insurance Estimate'}
      </button>
    </form>
  );
}
