# Medical Insurance Cost Predictor

This project predicts medical insurance charges using a machine learning model trained on a public medical insurance dataset. The app provides both a FastAPI backend and a colorful Next.js frontend so users can enter personal health details and receive an insurance cost estimate.

## Project Overview

The project uses the Medical Insurance dataset from Kaggle, which includes records with these main variables:

- age
- sex
- bmi
- children
- smoker
- region
- charges

The notebook in [ml_random_forest15.ipynb](ml_random_forest15.ipynb) explores the dataset, cleans and transforms the features, compares multiple regression models, and trains a final model.

## Model and Prediction Workflow

The trained model is saved as [MedicalInsurance.pkl](MedicalInsurance.pkl). The backend loads this model and uses it to predict the `charges` value based on the user inputs.

The prediction flow is:

1. User enters personal information on the frontend.
2. The frontend sends the data to the FastAPI backend.
3. The backend converts the values into the model's expected format.
4. The trained Random Forest regressor returns the predicted charge.
5. The result is displayed on the result page.

## Technical Stack

- Python
- FastAPI
- pandas
- scikit-learn
- joblib
- Next.js
- React

## Project Structure

```text
MedicalInsurance/
├── main.py                 # FastAPI backend
├── MedicalInsurance.pkl    # Trained ML model
├── ml_random_forest15.ipynb # Model training and evaluation notebook
├── frontend/              # Next.js frontend
│   ├── app/
│   ├── components/
│   ├── package.json
│   ├── .env.example
│   └── next.config.mjs
├── README.md
├── .gitignore
└── frontend/.env.local    # local environment file (not committed)
```

## Backend API Contract

The backend exposes a `POST /predict` endpoint.

### Request body

```json
{
  "Age": 30,
  "Sex": "Female",
  "Bmi": 25.5,
  "Children": 2,
  "Smoker": "Yes",
  "Region": "southeast"
}
```

### Response body

```json
{
  "predictedCharges": 12345.67
}
```

## Allowed Input Values

- `Sex`: `Female`, `Male`
- `Smoker`: `Yes`, `No`
- `Region`: `southeast`, `southwest`, `northwest`, `northeast`
- `Age`: 18 to 100
- `Children`: 0 to 5
- `Bmi`: greater than or equal to 15

## Run the Backend

From the project root:

```bash
python -m venv .venv
source .venv/bin/activate
pip install fastapi uvicorn pandas joblib scikit-learn
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Then access:

```text
http://localhost:8000
```

## Run the Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Frontend Environment

Create a `.env.local` file inside the `frontend` folder with:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

## App Flow

1. The landing page explains the project and its purpose.
2. The user clicks “Start Prediction.”
3. They fill out age, sex, BMI, number of children, smoker status, and region.
4. The form sends the values to the backend.
5. The model predicts the estimated insurance cost.
6. The result page displays the predicted charge and relevant inputs.

## Notes

This project is a practical demo of ML in a web application. It is not a medical advisory tool and should only be used as a learning or prototype example for insurance cost estimation.
