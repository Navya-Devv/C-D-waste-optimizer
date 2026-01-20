# C&D Waste Optimizer Backend

Flask backend API for predicting construction and demolition waste using machine learning models.

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Run the Backend Server

```bash
python app.py
```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check
**GET** `/health`

Check if the backend is running and all models are loaded.

**Response:**
```json
{
  "status": "healthy",
  "message": "Backend is operational",
  "models_loaded": {
    "steel": true,
    "granite": true,
    "concrete": true
  }
}
```

### Steel Waste Prediction
**POST** `/predict/steel`

Predict steel waste based on material quantities and project details.

**Request Body:**
```json
{
  "steel_8mm_mt": 10.5,
  "steel_10mm_mt": 15.2,
  "steel_12mm_mt": 20.0,
  "steel_16mm_mt": 25.5,
  "steel_20mm_mt": 12.0,
  "steel_25mm_mt": 8.5,
  "steel_32mm_mt": 5.0,
  "total_procured_mt": 96.7,
  "built_up_area_sqft": 5000
}
```

**Response:**
```json
{
  "success": true,
  "prediction": {
    "waste_mt": 6.45,
    "waste_percentage": 6.67,
    "total_procured_mt": 96.7,
    "consumption_mt": 90.25
  }
}
```

### Granite Waste Prediction
**POST** `/predict/granite`

Predict granite waste percentage based on area and number of pieces.

**Request Body:**
```json
{
  "sqft": 1000,
  "nos": 50
}
```

**Response:**
```json
{
  "success": true,
  "prediction": {
    "waste_percentage": 10.5,
    "wasted_nos": 5.25,
    "wasted_sqft": 105.0,
    "total_sqft": 1000,
    "total_nos": 50
  }
}
```

### Concrete/Loose Cement Waste Prediction
**POST** `/predict/concrete`

Predict concrete/loose cement wastage based on received quantity.

**Request Body:**
```json
{
  "rec_qty": 100
}
```

**Response:**
```json
{
  "success": true,
  "prediction": {
    "wastage": 7.5,
    "waste_percentage": 7.5,
    "usage": 92.5,
    "rec_qty": 100
  }
}
```

## Testing the API

You can test the health endpoint using curl:

```bash
curl http://localhost:5000/health
```

Test steel prediction:

```bash
curl -X POST http://localhost:5000/predict/steel \
  -H "Content-Type: application/json" \
  -d '{
    "steel_8mm_mt": 10,
    "steel_10mm_mt": 15,
    "steel_12mm_mt": 20,
    "steel_16mm_mt": 25,
    "steel_20mm_mt": 12,
    "steel_25mm_mt": 8,
    "steel_32mm_mt": 5,
    "total_procured_mt": 95,
    "built_up_area_sqft": 5000
  }'
```

## Models Used

- **Steel Model**: `steelModel_v1.joblib` - XGBoost Regressor
- **Granite Model**: `graniteModel_v1.joblib` - XGBoost Regressor
- **Concrete Model**: `concreteModel_v1.joblib` - XGBoost Regressor

All models are trained using XGBoost and saved in the `models/` directory.

## CORS Configuration

CORS is enabled for all origins to allow the frontend to communicate with the backend during development. For production, you should restrict this to your specific frontend domain.

## Error Handling

All endpoints return appropriate error messages if:
- Invalid input is provided
- Models fail to load
- Prediction fails

Error response format:
```json
{
  "success": false,
  "error": "Error message here"
}
```
