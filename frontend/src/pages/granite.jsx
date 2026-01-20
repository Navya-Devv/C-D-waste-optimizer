import React, { useState } from 'react';
import Navbar from '../components/Navbar';
export default function GranitePage() {
  const [formData, setFormData] = useState({
    sqFt: '',
    nos: ''
  });

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Call backend API
      const response = await fetch('http://localhost:5000/predict/granite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sqft: parseFloat(formData.sqFt) || 0,
          nos: parseFloat(formData.nos) || 0,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        const prediction = data.prediction;
        
        setResults({
          predictions: {
            predictedWastePieces: prediction.wasted_nos.toFixed(2),
            predictedWasteSqFt: prediction.wasted_sqft.toFixed(2),
            wastePercentage: prediction.waste_percentage.toFixed(2) + "%",
            confidenceScore: "ML Model",
            totalInput: prediction.total_sqft,
            totalPieces: prediction.total_nos
          },
          breakdown: {
            breakageWaste: (prediction.wasted_nos * 0.6).toFixed(0),
            cuttingWaste: (prediction.wasted_nos * 0.25).toFixed(0),
            handlingDamage: (prediction.wasted_nos * 0.15).toFixed(0)
          },
          recommendations: [
            "Store granite slabs on padded supports to reduce breakage",
            "Plan cuts carefully to minimize offcuts and waste",
            "Use water jet cutting for precision and reduced material loss",
            "Implement proper handling procedures during transport"
          ]
        });
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Error calling prediction API:', error);
      alert('Failed to get prediction. Make sure the backend server is running on http://localhost:5000');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar />

      <div style={{ paddingTop: "90px" }}></div>
      <style>{`
        * {
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
          background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
          min-height: 100vh;
          padding-top: 80px;
        }
        
        .page-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 24px;
        }
        
        .page-header {
          text-align: center;
          margin-bottom: 48px;
          animation: fadeInDown 0.8s ease-out;
        }
        
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .page-title {
          font-size: 48px;
          font-weight: 800;
          background: linear-gradient(135deg, #ffffff 0%, #a8dadc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0 0 16px 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
        }
        
        .page-subtitle {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
        }
        
        .content-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          margin-bottom: 40px;
        }
        
        .card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
          animation: fadeInUp 0.8s ease-out;
        }
        
        .card-title {
          font-size: 24px;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 24px 0;
          padding-bottom: 16px;
          border-bottom: 2px solid #e2e8f0;
        }
        
        .form-group {
          margin-bottom: 20px;
        }
        
        .form-label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #475569;
          margin-bottom: 8px;
        }
        
        .form-input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 15px;
          transition: all 0.3s ease;
          background: white;
        }
        
        .form-input:focus {
          outline: none;
          border-color: #1abc9c;
          box-shadow: 0 0 0 3px rgba(26, 188, 156, 0.1);
        }
        
        .form-input::placeholder {
          color: #94a3b8;
        }
        
        .submit-btn {
          width: 100%;
          padding: 14px 24px;
          background: linear-gradient(135deg, #1abc9c 0%, #3498db 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(26, 188, 156, 0.3);
        }
        
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(26, 188, 156, 0.4);
        }
        
        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .info-section {
          background: linear-gradient(135deg, rgba(26, 188, 156, 0.1) 0%, rgba(52, 152, 219, 0.1) 100%);
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 24px;
        }
        
        .info-title {
          font-size: 16px;
          font-weight: 700;
          color: #1abc9c;
          margin: 0 0 8px 0;
        }
        
        .info-text {
          font-size: 14px;
          color: #475569;
          margin: 0;
          line-height: 1.6;
        }
        
        .results-section {
          grid-column: 1 / -1;
          animation: fadeInUp 0.8s ease-out;
        }
        
        .value-card {
          background: linear-gradient(135deg, #1abc9c 0%, #3498db 100%);
          padding: 24px;
          border-radius: 16px;
          color: white;
          margin-bottom: 32px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        
        .value-item {
          text-align: center;
        }
        
        .value-label {
          font-size: 13px;
          opacity: 0.9;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .value-number {
          font-size: 28px;
          font-weight: 800;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 32px;
        }
        
        .recommendations-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .recommendation-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 16px;
          background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
          border-radius: 12px;
          border-left: 4px solid #1abc9c;
        }
        
        .rec-icon {
          font-size: 24px;
          flex-shrink: 0;
        }
        
        .rec-text {
          font-size: 15px;
          color: #475569;
          line-height: 1.6;
        }
        
        .loading-spinner {
          text-align: center;
          padding: 40px;
          color: white;
          font-size: 18px;
        }
        
        .spinner {
          border: 4px solid rgba(255, 255, 255, 0.1);
          border-top: 4px solid #1abc9c;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
          margin: 0 auto 16px;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 1024px) {
          .content-grid {
            grid-template-columns: 1fr;
          }
          
          .reuse-grid {
            grid-template-columns: 1fr;
          }
          
          .value-card {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }
        
        @media (max-width: 640px) {
          .page-title {
            font-size: 32px;
          }
          
          .card {
            padding: 24px;
          }
        }
      `}</style>
      
      <div className="page-container">
        <header className="page-header">
          <h1 className="page-title">
            <span>🪨</span>
            Granite Waste Analysis
          </h1>
          <p className="page-subtitle">
            Analyze your granite waste and discover reuse opportunities
          </p>
        </header>
        
        <div className="content-grid">
          <div className="card">
            <h2 className="card-title">Input Parameters</h2>
            
            <div className="info-section">
              <h3 className="info-title">About Granite Waste Prediction</h3>
              <p className="info-text">
                Our ML model analyzes your granite procurement data to predict expected waste 
                generation based on historical patterns and industry benchmarks.
              </p>
            </div>
            
            <div>
              <div className="form-group">
                <label className="form-label">Sq. Ft</label>
                <input
                  type="number"
                  name="sqFt"
                  className="form-input"
                  placeholder="Enter total square footage"
                  value={formData.sqFt}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Nos (Number of pieces)</label>
                <input
                  type="number"
                  name="nos"
                  className="form-input"
                  placeholder="Enter total number of pieces"
                  value={formData.nos}
                  onChange={handleInputChange}
                />
              </div>
              
              <button onClick={handleSubmit} className="submit-btn" disabled={loading}>
                {loading ? 'Predicting...' : 'Predict Waste Generation'}
              </button>
            </div>
          </div>
          
          <div className="card">
            <h2 className="card-title">Why Reuse Granite Waste?</h2>
            
            <div className="info-section">
              <h3 className="info-title">Environmental Benefits</h3>
              <p className="info-text">
                Reusing granite waste prevents unnecessary quarrying, reduces landfill burden, 
                and conserves natural resources. Granite is 100% recyclable and retains its 
                properties indefinitely.
              </p>
            </div>
            
            <div className="info-section">
              <h3 className="info-title">Economic Value</h3>
              <p className="info-text">
                Granite waste can be sold or repurposed at 30-70% of virgin material cost, 
                creating significant savings for construction projects while generating revenue 
                from materials that would otherwise be discarded.
              </p>
            </div>
            
            <div className="info-section">
              <h3 className="info-title">Common Applications</h3>
              <p className="info-text">
                Crushed granite aggregate, landscaping materials, road base, concrete filler, 
                decorative features, and drainage solutions are just a few ways granite waste 
                can be effectively repurposed.
              </p>
            </div>
          </div>
        </div>
        
        {loading && (
          <div className="card loading-spinner">
            <div className="spinner"></div>
            <div>Analyzing your granite waste data...</div>
          </div>
        )}
        
        {results && !loading && (
          <div className="card results-section">
            <h2 className="card-title">Waste Generation Prediction</h2>
            
            <div className="value-card">
              <div className="value-item">
                <div className="value-label">Predicted Waste</div>
                <div className="value-number">{results.predictions.predictedWasteSqFt} sqft</div>
              </div>
              <div className="value-item">
                <div className="value-label">Waste Pieces</div>
                <div className="value-number">{results.predictions.predictedWastePieces}</div>
              </div>
              <div className="value-item">
                <div className="value-label">Waste %</div>
                <div className="value-number">{results.predictions.wastePercentage}</div>
              </div>
              <div className="value-item">
                <div className="value-label">Confidence</div>
                <div className="value-number">{results.predictions.confidenceScore}</div>
              </div>
            </div>
            
            <h3 className="card-title">Waste Breakdown by Type</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">{results.breakdown.breakageWaste}</div>
                <div className="stat-label">Pieces from Breakage (60%)</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{results.breakdown.cuttingWaste}</div>
                <div className="stat-label">Pieces from Cutting (25%)</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{results.breakdown.handlingDamage}</div>
                <div className="stat-label">Pieces from Handling (15%)</div>
              </div>
            </div>
            
            <h3 className="card-title">Waste Reduction Recommendations</h3>
            <div className="recommendations-list">
              {results.recommendations.map((rec, index) => (
                <div key={index} className="recommendation-item">
                  <span className="rec-icon">💡</span>
                  <span className="rec-text">{rec}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}