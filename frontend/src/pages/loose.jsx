import React, { useState } from 'react';
import Navbar from '../components/Navbar';
export default function LooseCementPage() {
  const [formData, setFormData] = useState({
    rec_qty: ''
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
      const response = await fetch('http://localhost:5000/predict/concrete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rec_qty: parseFloat(formData.rec_qty) || 0,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        const prediction = data.prediction;
        
        setResults({
          predictions: {
            predictedWastage: prediction.wastage.toFixed(2),
            predictedWastePercent: prediction.waste_percentage.toFixed(2) + "%",
            expectedUsage: prediction.usage.toFixed(2),
            confidenceScore: "ML Model",
            totalReceived: prediction.rec_qty
          },
          breakdown: {
            spillageWaste: (prediction.wastage * 0.35).toFixed(2),
            expirationWaste: (prediction.wastage * 0.30).toFixed(2),
            moistureWaste: (prediction.wastage * 0.25).toFixed(2),
            bagHandling: (prediction.wastage * 0.10).toFixed(2)
          },
          recommendations: [
            "Store cement in dry, elevated locations to prevent moisture damage",
            "Use FIFO (First In, First Out) method to minimize expiration waste",
            "Handle bags carefully to reduce spillage during transport",
            "Monitor storage conditions regularly for humidity and temperature"
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
        
        .warning-box {
          background: linear-gradient(135deg, rgba(241, 196, 15, 0.15) 0%, rgba(243, 156, 18, 0.15) 100%);
          padding: 16px;
          border-radius: 10px;
          border-left: 4px solid #f39c12;
          margin-bottom: 24px;
        }
        
        .warning-text {
          font-size: 13px;
          color: #d68910;
          margin: 0;
          font-weight: 500;
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
          grid-template-columns: repeat(4, 1fr);
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
        
        .reuse-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        
        .reuse-card {
          background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
          padding: 24px;
          border-radius: 16px;
          border: 2px solid #e2e8f0;
          transition: all 0.3s ease;
        }
        
        .reuse-card:hover {
          transform: translateY(-4px);
          border-color: #1abc9c;
          box-shadow: 0 12px 32px rgba(26, 188, 156, 0.15);
        }
        
        .reuse-title {
          font-size: 18px;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 12px 0;
        }
        
        .reuse-description {
          font-size: 14px;
          color: #64748b;
          line-height: 1.6;
          margin: 0 0 16px 0;
        }
        
        .reuse-meta {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        
        .meta-badge {
          padding: 6px 12px;
          background: rgba(26, 188, 156, 0.1);
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          color: #1abc9c;
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
            grid-template-columns: repeat(2, 1fr);
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
          
          .value-card {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      
      <div className="page-container">
        <header className="page-header">
          <h1 className="page-title">
            <span>🏗️</span>
            Loose Cement Waste Analysis
          </h1>
          <p className="page-subtitle">
            Analyze your loose cement waste and discover reuse opportunities
          </p>
        </header>
        
        <div className="content-grid">
          <div className="card">
            <h2 className="card-title">Input Parameters</h2>
            
            <div className="info-section">
              <h3 className="info-title">About Cement Waste Prediction</h3>
              <p className="info-text">
                Our ML model analyzes cement procurement and usage patterns to predict expected 
                wastage based on storage conditions, handling practices, and historical data.
              </p>
            </div>
            
            <div className="warning-box">
              <p className="warning-text">
                ⚠️ Note: Cement quality degrades over time when exposed to moisture. Assess cement condition before reuse applications.
              </p>
            </div>
            
            <div>
              <div className="form-group">
                <label className="form-label">Rec. Qty (Received Quantity)</label>
                <input
                  type="number"
                  step="0.01"
                  name="rec_qty"
                  className="form-input"
                  placeholder="Enter received quantity (kg or bags)"
                  value={formData.rec_qty}
                  onChange={handleInputChange}
                />
              </div>
              
              <button onClick={handleSubmit} className="submit-btn" disabled={loading}>
                {loading ? 'Predicting...' : 'Predict Waste Generation'}
              </button>
            </div>
          </div>
          
          <div className="card">
            <h2 className="card-title">Why Predict Cement Waste?</h2>
            
            <div className="info-section">
              <h3 className="info-title">Cost Control</h3>
              <p className="info-text">
                Cement is a significant cost component in construction. Predicting waste helps 
                optimize procurement quantities and reduce unnecessary expenses.
              </p>
            </div>
            
            <div className="info-section">
              <h3 className="info-title">Storage Management</h3>
              <p className="info-text">
                Cement has a limited shelf life (typically 3 months). Accurate waste predictions 
                help you order appropriate quantities and implement proper storage rotation.
              </p>
            </div>
            
            <div className="info-section">
              <h3 className="info-title">Quality Assurance</h3>
              <p className="info-text">
                Understanding waste patterns helps identify quality issues early, such as moisture 
                exposure, improper storage, or handling problems that lead to material degradation.
              </p>
            </div>
            
            <div className="info-section">
              <h3 className="info-title">Environmental Impact</h3>
              <p className="info-text">
                Cement production accounts for 8% of global CO₂ emissions. Reducing waste directly 
                decreases your project's carbon footprint and environmental impact.
              </p>
            </div>
          </div>
        </div>
        
        {loading && (
          <div className="card loading-spinner">
            <div className="spinner"></div>
            <div>Analyzing your loose cement waste data...</div>
          </div>
        )}
        
        {results && !loading && (
          <div className="card results-section">
            <h2 className="card-title">Waste Generation Prediction</h2>
            
            <div className="value-card">
              <div className="value-item">
                <div className="value-label">Predicted Wastage</div>
                <div className="value-number">{results.predictions.predictedWastage} kg</div>
              </div>
              <div className="value-item">
                <div className="value-label">Waste %</div>
                <div className="value-number">{results.predictions.predictedWastePercent}</div>
              </div>
              <div className="value-item">
                <div className="value-label">Expected Usage</div>
                <div className="value-number">{results.predictions.expectedUsage} kg</div>
              </div>
              <div className="value-item">
                <div className="value-label">Confidence</div>
                <div className="value-number">{results.predictions.confidenceScore}</div>
              </div>
            </div>
            
            <h3 className="card-title">Waste Breakdown by Source</h3>
            <div className="reuse-grid">
              <div className="reuse-card">
                <h3 className="reuse-title">Spillage Loss</h3>
                <p className="reuse-description">Material lost during handling and transport operations</p>
                <div className="stat-number" style={{color: '#1abc9c', fontSize: '32px'}}>{results.breakdown.spillageWaste} kg</div>
                <span className="meta-badge">35% of total waste</span>
              </div>
              <div className="reuse-card">
                <h3 className="reuse-title">Expiration/Aging</h3>
                <p className="reuse-description">Cement that loses strength due to prolonged storage</p>
                <div className="stat-number" style={{color: '#1abc9c', fontSize: '32px'}}>{results.breakdown.expirationWaste} kg</div>
                <span className="meta-badge">30% of total waste</span>
              </div>
              <div className="reuse-card">
                <h3 className="reuse-title">Moisture Damage</h3>
                <p className="reuse-description">Material hardened or contaminated by moisture exposure</p>
                <div className="stat-number" style={{color: '#1abc9c', fontSize: '32px'}}>{results.breakdown.moistureWaste} kg</div>
                <span className="meta-badge">25% of total waste</span>
              </div>
              <div className="reuse-card">
                <h3 className="reuse-title">Bag Handling</h3>
                <p className="reuse-description">Torn bags and handling-related material loss</p>
                <div className="stat-number" style={{color: '#1abc9c', fontSize: '32px'}}>{results.breakdown.bagHandling} kg</div>
                <span className="meta-badge">10% of total waste</span>
              </div>
            </div>
            
            <h3 className="card-title">Waste Reduction Recommendations</h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
              {results.recommendations.map((rec, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '16px',
                  background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
                  borderRadius: '12px',
                  borderLeft: '4px solid #1abc9c'
                }}>
                  <span style={{fontSize: '24px', flexShrink: 0}}>💡</span>
                  <span style={{fontSize: '15px', color: '#475569', lineHeight: 1.6}}>{rec}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}