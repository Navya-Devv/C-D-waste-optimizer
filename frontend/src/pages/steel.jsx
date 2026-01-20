import React, { useState } from 'react';
import Navbar from '../components/Navbar';
export default function SteelPage() {
  const [formData, setFormData] = useState({
    steel_8mm_mt: '',
    steel_10mm_mt: '',
    steel_12mm_mt: '',
    steel_16mm_mt: '',
    steel_20mm_mt: '',
    steel_25mm_mt: '',
    steel_32mm_mt: '',
    total_procured_mt: '',
    built_up_area_sqft: ''
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
      const response = await fetch('http://localhost:5000/predict/steel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          steel_8mm_mt: parseFloat(formData.steel_8mm_mt) || 0,
          steel_10mm_mt: parseFloat(formData.steel_10mm_mt) || 0,
          steel_12mm_mt: parseFloat(formData.steel_12mm_mt) || 0,
          steel_16mm_mt: parseFloat(formData.steel_16mm_mt) || 0,
          steel_20mm_mt: parseFloat(formData.steel_20mm_mt) || 0,
          steel_25mm_mt: parseFloat(formData.steel_25mm_mt) || 0,
          steel_32mm_mt: parseFloat(formData.steel_32mm_mt) || 0,
          total_procured_mt: parseFloat(formData.total_procured_mt) || 0,
          built_up_area_sqft: parseFloat(formData.built_up_area_sqft) || 0,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        const prediction = data.prediction;
        const predictedWasteMT = prediction.waste_mt;
        
        setResults({
          predictions: {
            predictedWasteMT: predictedWasteMT.toFixed(2),
            wastePercentage: prediction.waste_percentage.toFixed(2) + "%",
            predictedConsumption: prediction.consumption_mt.toFixed(2),
            confidenceScore: "ML Model",
            totalProcured: prediction.total_procured_mt
          },
          wasteBySize: {
            waste_8mm: (parseFloat(formData.steel_8mm_mt) * prediction.waste_percentage / 100).toFixed(2),
            waste_10mm: (parseFloat(formData.steel_10mm_mt) * prediction.waste_percentage / 100).toFixed(2),
            waste_12mm: (parseFloat(formData.steel_12mm_mt) * prediction.waste_percentage / 100).toFixed(2),
            waste_16mm: (parseFloat(formData.steel_16mm_mt) * prediction.waste_percentage / 100).toFixed(2),
            waste_20mm: (parseFloat(formData.steel_20mm_mt) * prediction.waste_percentage / 100).toFixed(2),
            waste_25mm: (parseFloat(formData.steel_25mm_mt) * prediction.waste_percentage / 100).toFixed(2),
            waste_32mm: (parseFloat(formData.steel_32mm_mt) * prediction.waste_percentage / 100).toFixed(2)
          },
          breakdown: {
            cuttingWaste: (predictedWasteMT * 0.45).toFixed(2),
            bendingRejects: (predictedWasteMT * 0.25).toFixed(2),
            corrosionDamage: (predictedWasteMT * 0.20).toFixed(2),
            handlingLoss: (predictedWasteMT * 0.10).toFixed(2)
          },
          recommendations: [
            "Optimize bar cutting lists to minimize offcuts and material waste",
            "Use bar bending schedules to reduce bending errors and rejections",
            "Store steel in covered, dry areas to prevent corrosion damage",
            "Implement proper handling procedures with lifting equipment",
            "Plan reinforcement layout to use standard bar lengths efficiently",
            "Train workers on proper cutting and bending techniques"
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
          max-width: 1400px;
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
          grid-template-columns: 1.2fr 0.8fr;
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
        
        .form-section {
          margin-bottom: 32px;
        }
        
        .section-header {
          font-size: 16px;
          font-weight: 700;
          color: #1abc9c;
          margin: 0 0 16px 0;
          padding: 12px 16px;
          background: linear-gradient(135deg, rgba(26, 188, 156, 0.1) 0%, rgba(52, 152, 219, 0.1) 100%);
          border-radius: 8px;
          border-left: 4px solid #1abc9c;
        }
        
        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        
        .form-group {
          margin-bottom: 16px;
        }
        
        .form-group-full {
          grid-column: 1 / -1;
        }
        
        .form-label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #475569;
          margin-bottom: 6px;
        }
        
        .form-input {
          width: 100%;
          padding: 10px 14px;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 14px;
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
          margin-top: 24px;
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
        
        .highlight-box {
          background: linear-gradient(135deg, #1abc9c 0%, #3498db 100%);
          padding: 20px;
          border-radius: 12px;
          color: white;
          margin-bottom: 24px;
        }
        
        .highlight-number {
          font-size: 36px;
          font-weight: 800;
          margin-bottom: 8px;
        }
        
        .highlight-text {
          font-size: 14px;
          opacity: 0.95;
        }
        
        .results-section {
          grid-column: 1 / -1;
          animation: fadeInUp 0.8s ease-out;
        }
        
        .value-card {
          background: linear-gradient(135deg, #1abc9c 0%, #3498db 100%);
          padding: 32px;
          border-radius: 16px;
          color: white;
          margin-bottom: 32px;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 24px;
        }
        
        .value-item {
          text-align: center;
          padding: 16px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          backdrop-filter: blur(10px);
        }
        
        .value-label {
          font-size: 12px;
          opacity: 0.9;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .value-number {
          font-size: 24px;
          font-weight: 800;
        }
        
        .breakdown-section {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 32px;
        }
        
        .breakdown-card {
          background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
          padding: 20px;
          border-radius: 12px;
          border: 2px solid #e2e8f0;
          text-align: center;
        }
        
        .breakdown-label {
          font-size: 13px;
          color: #64748b;
          margin-bottom: 8px;
          font-weight: 500;
        }
        
        .breakdown-value {
          font-size: 28px;
          font-weight: 800;
          color: #1abc9c;
        }
        
        .reuse-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
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
          font-size: 17px;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 12px 0;
        }
        
        .reuse-description {
          font-size: 13px;
          color: #64748b;
          line-height: 1.6;
          margin: 0 0 16px 0;
        }
        
        .reuse-meta {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        
        .meta-badge {
          padding: 5px 10px;
          background: rgba(26, 188, 156, 0.1);
          border-radius: 6px;
          font-size: 11px;
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
        
        @media (max-width: 1200px) {
          .reuse-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 1024px) {
          .content-grid {
            grid-template-columns: 1fr;
          }
          
          .form-grid {
            grid-template-columns: 1fr;
          }
          
          .value-card {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .breakdown-section {
            grid-template-columns: 1fr;
          }
        }
        
        @media (max-width: 768px) {
          .page-title {
            font-size: 32px;
          }
          
          .card {
            padding: 24px;
          }
          
          .reuse-grid {
            grid-template-columns: 1fr;
          }
          
          .value-card {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }
      `}</style>
      
      <div className="page-container">
        <header className="page-header">
          <h1 className="page-title">
            <span>⚙️</span>
            Steel Waste Analysis
          </h1>
          <p className="page-subtitle">
            Predict steel reinforcement waste generation based on project parameters
          </p>
        </header>
        
        <div className="content-grid">
          <div className="card">
            <h2 className="card-title">Input Parameters</h2>
            
            <div className="form-section">
              <h3 className="section-header">Steel Bar Sizes (MT)</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">8mm MT Steel</label>
                  <input
                    type="number"
                    step="0.01"
                    name="steel_8mm_mt"
                    className="form-input"
                    placeholder="Enter 8mm quantity"
                    value={formData.steel_8mm_mt}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">10mm MT Steel</label>
                  <input
                    type="number"
                    step="0.01"
                    name="steel_10mm_mt"
                    className="form-input"
                    placeholder="Enter 10mm quantity"
                    value={formData.steel_10mm_mt}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">12mm MT Steel</label>
                  <input
                    type="number"
                    step="0.01"
                    name="steel_12mm_mt"
                    className="form-input"
                    placeholder="Enter 12mm quantity"
                    value={formData.steel_12mm_mt}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">16mm MT Steel</label>
                  <input
                    type="number"
                    step="0.01"
                    name="steel_16mm_mt"
                    className="form-input"
                    placeholder="Enter 16mm quantity"
                    value={formData.steel_16mm_mt}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">20mm MT Steel</label>
                  <input
                    type="number"
                    step="0.01"
                    name="steel_20mm_mt"
                    className="form-input"
                    placeholder="Enter 20mm quantity"
                    value={formData.steel_20mm_mt}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">25mm MT Steel</label>
                  <input
                    type="number"
                    step="0.01"
                    name="steel_25mm_mt"
                    className="form-input"
                    placeholder="Enter 25mm quantity"
                    value={formData.steel_25mm_mt}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">32mm MT Steel</label>
                  <input
                    type="number"
                    step="0.01"
                    name="steel_32mm_mt"
                    className="form-input"
                    placeholder="Enter 32mm quantity"
                    value={formData.steel_32mm_mt}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <h3 className="section-header">Project Details</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Total Procured (MT)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="total_procured_mt"
                    className="form-input"
                    placeholder="Total steel procured"
                    value={formData.total_procured_mt}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Built Up Area (sqft)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="built_up_area_sqft"
                    className="form-input"
                    placeholder="Total built-up area"
                    value={formData.built_up_area_sqft}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            
            <button onClick={handleSubmit} className="submit-btn" disabled={loading}>
              {loading ? 'Predicting...' : 'Predict Waste Generation'}
            </button>
          </div>
          
          <div className="card">
            <h2 className="card-title">Why Predict Steel Waste?</h2>
            
            <div className="highlight-box">
              <div className="highlight-number">5-8%</div>
              <div className="highlight-text">
                Average steel waste in construction projects - prediction helps minimize this loss
              </div>
            </div>
            
            <div className="info-section">
              <h3 className="info-title">Cost Impact</h3>
              <p className="info-text">
                Steel is one of the most expensive construction materials. A 6.5% waste rate on 
                100 MT of steel represents significant cost loss. Accurate predictions enable 
                better procurement planning.
              </p>
            </div>
            
            <div className="info-section">
              <h3 className="info-title">Waste Sources</h3>
              <p className="info-text">
                Steel waste primarily comes from cutting operations (45%), bending errors (25%), 
                corrosion during storage (20%), and handling damage (10%). Understanding these 
                helps target reduction efforts.
              </p>
            </div>
            
            <div className="info-section">
              <h3 className="info-title">Bar Size Patterns</h3>
              <p className="info-text">
                Smaller diameter bars (8mm, 10mm) typically have higher waste rates due to more 
                frequent cuts. Larger bars (25mm, 32mm) waste more due to handling challenges 
                and limited reusability of offcuts.
              </p>
            </div>
            
            <div className="info-section">
              <h3 className="info-title">Optimization Opportunities</h3>
              <p className="info-text">
                Bar cutting optimization software, proper bending schedules, and covered storage 
                can reduce waste by 30-50%. Our predictions help identify where to focus efforts.
              </p>
            </div>
          </div>
        </div>
        
        {loading && (
                      <div className="card loading-spinner">
            <div className="spinner"></div>
            <div>Predicting steel waste generation...</div>
          </div>
        )}
        
        {results && !loading && (
          <div className="card results-section">
            <h2 className="card-title">Waste Generation Prediction</h2>
            
            <div className="breakdown-section">
              <div className="breakdown-card">
                <div className="breakdown-label">Total Procured</div>
                <div className="breakdown-value">{results.predictions.totalProcured} MT</div>
              </div>
              <div className="breakdown-card">
                <div className="breakdown-label">Predicted Consumption</div>
                <div className="breakdown-value">{results.predictions.predictedConsumption} MT</div>
              </div>
              <div className="breakdown-card">
                <div className="breakdown-label">Predicted Waste</div>
                <div className="breakdown-value">{results.predictions.predictedWasteMT} MT</div>
              </div>
            </div>
            
            <div className="value-card">
              <div className="value-item">
                <div className="value-label">Waste Amount</div>
                <div className="value-number">{results.predictions.predictedWasteMT} MT</div>
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
            
            <h3 className="card-title">Predicted Waste by Bar Size</h3>
            <div className="reuse-grid">
              <div className="reuse-card">
                <h3 className="reuse-title">8mm Bars</h3>
                <div className="breakdown-value">{results.wasteBySize.waste_8mm} MT</div>
                <span className="meta-badge">7% waste rate</span>
              </div>
              <div className="reuse-card">
                <h3 className="reuse-title">10mm Bars</h3>
                <div className="breakdown-value">{results.wasteBySize.waste_10mm} MT</div>
                <span className="meta-badge">6% waste rate</span>
              </div>
              <div className="reuse-card">
                <h3 className="reuse-title">12mm Bars</h3>
                <div className="breakdown-value">{results.wasteBySize.waste_12mm} MT</div>
                <span className="meta-badge">6.5% waste rate</span>
              </div>
              <div className="reuse-card">
                <h3 className="reuse-title">16mm Bars</h3>
                <div className="breakdown-value">{results.wasteBySize.waste_16mm} MT</div>
                <span className="meta-badge">6% waste rate</span>
              </div>
              <div className="reuse-card">
                <h3 className="reuse-title">20mm Bars</h3>
                <div className="breakdown-value">{results.wasteBySize.waste_20mm} MT</div>
                <span className="meta-badge">6.5% waste rate</span>
              </div>
              <div className="reuse-card">
                <h3 className="reuse-title">25mm Bars</h3>
                <div className="breakdown-value">{results.wasteBySize.waste_25mm} MT</div>
                <span className="meta-badge">7% waste rate</span>
              </div>
              <div className="reuse-card">
                <h3 className="reuse-title">32mm Bars</h3>
                <div className="breakdown-value">{results.wasteBySize.waste_32mm} MT</div>
                <span className="meta-badge">8% waste rate</span>
              </div>
            </div>
            
            <h3 className="card-title">Waste Breakdown by Source</h3>
            <div className="breakdown-section" style={{gridTemplateColumns: 'repeat(4, 1fr)'}}>
              <div className="breakdown-card">
                <div className="breakdown-label">Cutting Waste</div>
                <div className="breakdown-value">{results.breakdown.cuttingWaste} MT</div>
                <span className="meta-badge">45% of total</span>
              </div>
              <div className="breakdown-card">
                <div className="breakdown-label">Bending Rejects</div>
                <div className="breakdown-value">{results.breakdown.bendingRejects} MT</div>
                <span className="meta-badge">25% of total</span>
              </div>
              <div className="breakdown-card">
                <div className="breakdown-label">Corrosion Damage</div>
                <div className="breakdown-value">{results.breakdown.corrosionDamage} MT</div>
                <span className="meta-badge">20% of total</span>
              </div>
              <div className="breakdown-card">
                <div className="breakdown-label">Handling Loss</div>
                <div className="breakdown-value">{results.breakdown.handlingLoss} MT</div>
                <span className="meta-badge">10% of total</span>
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