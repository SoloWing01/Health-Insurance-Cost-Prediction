import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Literal

model=joblib.load('MedicalInsurance.pkl')


class UserInfo(BaseModel):
    Age: int=Field(...,ge=18,le=100)
    Sex:Literal['Female','Male']
    Bmi:float=Field(...,ge=15)
    Children:int=Field(...,ge=0,le=5)
    Smoker:Literal['Yes','No']
    Region:Literal['southeast','southwest','northwest','northeast']

class PredictionResponse(BaseModel):
    predictedCharges:float

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def greet():
    return f'Hello Your are visiting the backend of Medical Insurance'


@app.post("/predict", response_model=PredictionResponse)
def predict(data: UserInfo):
    gender = {"Female": 0, "Male": 1}[data.Sex]
    smoke = {"Yes": 1, "No": 0}[data.Smoker]

    input_row = pd.DataFrame([{
        "age": data.Age,
        "sex": gender,
        "bmi": data.Bmi,
        "children": data.Children,
        "smoker": smoke,
        "region": data.Region,
    }])

    try:
        print("Input columns:", input_row.columns.tolist())
        print("Input data:\n", input_row)
        print("Model type:", type(model))

        prediction = model.predict(input_row)[0]

        print("Prediction:", prediction)

        return PredictionResponse(
            predictedCharges=round(float(prediction),2)
        )

    except Exception as e:
        import traceback
        traceback.print_exc()

        raise HTTPException(
            status_code=500,
            detail=f"{type(e).__name__}: {str(e)}"
        )
