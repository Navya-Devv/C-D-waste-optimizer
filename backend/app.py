from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import joblib
import numpy as np
import os
import pandas as pd

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the models
MODELS_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'models')

steel_model = joblib.load(os.path.join(MODELS_DIR, 'steelModel_v1.joblib'))
granite_model = joblib.load(os.path.join(MODELS_DIR, 'graniteModel_v1.joblib'))
concrete_model = joblib.load(os.path.join(MODELS_DIR, 'concreteModel_v1.joblib'))

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint to verify backend is running"""
    return jsonify({
        'status': 'healthy',
        'message': 'Backend is operational',
        'models_loaded': {
            'steel': steel_model is not None,
            'granite': granite_model is not None,
            'concrete': concrete_model is not None
        }
    }), 200

@app.route('/predict/steel', methods=['POST'])
def predict_steel():
    """
    Predict steel waste
    Expected inputs:
    - steel_8mm_mt
    - steel_10mm_mt
    - steel_12mm_mt
    - steel_16mm_mt
    - steel_20mm_mt
    - steel_25mm_mt
    - steel_32mm_mt
    - total_procured_mt
    - built_up_area_sqft
    
    Output: waste_mt
    """
    try:
        data = request.get_json()
        
        # Extract features in the correct order
        features = [
            float(data.get('steel_8mm_mt', 0)),
            float(data.get('steel_10mm_mt', 0)),
            float(data.get('steel_12mm_mt', 0)),
            float(data.get('steel_16mm_mt', 0)),
            float(data.get('steel_20mm_mt', 0)),
            float(data.get('steel_25mm_mt', 0)),
            float(data.get('steel_32mm_mt', 0)),
            float(data.get('total_procured_mt', 0)),
            float(data.get('built_up_area_sqft', 0))
        ]
        
        # Make prediction
        features_array = np.array([features])
        prediction = steel_model.predict(features_array)
        waste_mt = float(prediction[0])
        
        # Calculate additional metrics
        total_procured = float(data.get('total_procured_mt', 0))
        waste_percentage = (waste_mt / total_procured * 100) if total_procured > 0 else 0
        
        return jsonify({
            'success': True,
            'prediction': {
                'waste_mt': round(waste_mt, 2),
                'waste_percentage': round(waste_percentage, 2),
                'total_procured_mt': total_procured,
                'consumption_mt': round(total_procured - waste_mt, 2)
            }
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

@app.route('/predict/granite', methods=['POST'])
def predict_granite():
    """
    Predict granite waste percentage
    Expected inputs:
    - Sq. Ft (sqft)
    - Nos (nos)
    
    Output: waste % (waste_percentage)
    """
    try:
        data = request.get_json()
        
        # Extract features
        sqft = float(data.get('sqft', 0))
        nos = float(data.get('nos', 0))
        
        features = [sqft, nos]
        
        # Make prediction
        features_array = np.array([features])
        prediction = granite_model.predict(features_array)
        waste_percentage = float(prediction[0])
        
        # Calculate waste in pieces and sqft
        wasted_nos = (nos * waste_percentage / 100) if nos > 0 else 0
        wasted_sqft = (sqft * waste_percentage / 100) if sqft > 0 else 0
        
        return jsonify({
            'success': True,
            'prediction': {
                'waste_percentage': round(waste_percentage, 2),
                'wasted_nos': round(wasted_nos, 2),
                'wasted_sqft': round(wasted_sqft, 2),
                'total_sqft': sqft,
                'total_nos': nos
            }
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

@app.route('/predict/concrete', methods=['POST'])
def predict_concrete():
    """
    Predict concrete/loose cement wastage
    Expected inputs:
    - Rec. Qty (rec_qty)
    
    Output: Wastage (wastage)
    """
    try:
        data = request.get_json()
        
        # Extract features
        rec_qty = float(data.get('rec_qty', 0))
        
        features = [rec_qty]
        
        # Make prediction
        features_array = np.array([features])
        prediction = concrete_model.predict(features_array)
        wastage = float(prediction[0])
        
        # Calculate additional metrics
        waste_percentage = (wastage / rec_qty * 100) if rec_qty > 0 else 0
        usage = rec_qty - wastage
        
        return jsonify({
            'success': True,
            'prediction': {
                'wastage': round(wastage, 2),
                'waste_percentage': round(waste_percentage, 2),
                'usage': round(usage, 2),
                'rec_qty': rec_qty
            }
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

@app.route('/datasets', methods=['GET'])
def list_datasets():
    """
    List all CSV dataset files in the models directory
    """
    try:
        csv_files = []
        for filename in os.listdir(MODELS_DIR):
            if filename.endswith('.csv'):
                filepath = os.path.join(MODELS_DIR, filename)
                file_size = os.path.getsize(filepath)
                
                # Read CSV to get row count and columns
                df = pd.read_csv(filepath)
                row_count = len(df)
                column_count = len(df.columns)
                
                csv_files.append({
                    'filename': filename,
                    'size': file_size,
                    'size_kb': round(file_size / 1024, 2),
                    'rows': row_count,
                    'columns': column_count,
                    'column_names': df.columns.tolist()
                })
        
        return jsonify({
            'success': True,
            'datasets': csv_files
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

@app.route('/datasets/<filename>', methods=['GET'])
def download_dataset(filename):
    """
    Download a specific dataset file
    """
    try:
        # Security: Only allow CSV files and prevent directory traversal
        if not filename.endswith('.csv'):
            return jsonify({
                'success': False,
                'error': 'Only CSV files are allowed'
            }), 400
        
        filepath = os.path.join(MODELS_DIR, filename)
        
        if not os.path.exists(filepath):
            return jsonify({
                'success': False,
                'error': 'File not found'
            }), 404
        
        return send_file(filepath, as_attachment=True, download_name=filename)
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

@app.route('/datasets/<filename>/preview', methods=['GET'])
def preview_dataset(filename):
    """
    Preview first 10 rows of a dataset
    """
    try:
        if not filename.endswith('.csv'):
            return jsonify({
                'success': False,
                'error': 'Only CSV files are allowed'
            }), 400
        
        filepath = os.path.join(MODELS_DIR, filename)
        
        if not os.path.exists(filepath):
            return jsonify({
                'success': False,
                'error': 'File not found'
            }), 404
        
        df = pd.read_csv(filepath)
        preview_data = df.head(10).to_dict(orient='records')
        
        return jsonify({
            'success': True,
            'filename': filename,
            'columns': df.columns.tolist(),
            'total_rows': len(df),
            'preview': preview_data
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
