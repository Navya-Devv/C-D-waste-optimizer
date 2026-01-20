import React, { useState } from 'react';
import Navbar from '../components/Navbar';
export default function SlagMoramPage() {
  const [formData, setFormData] = useState({
    sl_no: '',
    date: '',
    receipt: '',
    vehicle_no: '',
    invoice_no: '',
    received_from: '',
    unit: '',
    rec_qty: '',
    cum_qty: '',
    r_for_slag: ''
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

  const handleSubmit = (e) => {
    setLoading(true);
    
    // Simulate API call - replace with actual backend endpoint
    setTimeout(() => {
      const recQty = parseFloat(formData.rec_qty) || 0;
      const cumQty = parseFloat(formData.cum_qty) || 0;
      
      // Slag moram typically has very low waste (1-3%) due to its forgiving nature
      const predictedWaste = (recQty * 0.02).toFixed(2);
      const predictedUsage = (recQty * 0.98).toFixed(2);
      const wastePercentage = "1-3%";
      
      setResults({
        predictions: {
          predictedWaste: predictedWaste,
          predictedUsage: predictedUsage,
          wastePercentage: wastePercentage,
          confidenceScore: "93%",
          receivedQty: recQty,
          cumulativeQty: cumQty
        },
        breakdown: {
          spillageLoss: (predictedWaste * 0.40).toFixed(2),
          handlingLoss: (predictedWaste * 0.30).toFixed(2),
          moistureContamination: (predictedWaste * 0.20).toFixed(2),
          overspreading: (predictedWaste * 0.10).toFixed(2)
        },
        recommendations: [
          "Use covered trucks during transport to minimize spillage",
          "Implement controlled spreading techniques to avoid over-application",
          "Store in designated areas away from water drainage paths",
          "Use mechanical spreaders for uniform distribution and waste reduction",
          "Monitor moisture content during monsoon season to prevent clumping",
          "Train operators on proper handling and spreading procedures"
        ]
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <>
    <Navbar />

      <div style={{ paddingTop: "90px" }}></div>
      <style>
        {`
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
        
        .form-section {
          margin-bottom: 28px;
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
        
        .results-section {
          grid-column: 1 / -1;
          animation: fadeInUp 0.8s ease-out;
        }
        
        .delivery-info-card {
          background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
          padding: 24px;
          border-radius: 16px;
          border: 2px solid #e2e8f0;
          margin-bottom: 32px;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 20px;
        }
        
        .delivery-item {
          text-align: center;
        }
        
        .delivery-label {
          font-size: 12px;
          color: #64748b;
          margin-bottom: 6px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .delivery-value {
          font-size: 16px;
          font-weight: 700;
          color: #1e293b;
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
          }
          
          .delivery-info-card {
            grid-template-columns: repeat(2, 1fr);
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
            gap: 16px;
          }
          
          .delivery-info-card {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      
      <div className="page-container">
        <header className="page-header">
          <h1 className="page-title">
            <span>🌫️</span>
            Slag Moram Powder Analysis
          </h1>
          <p className="page-subtitle">
            Track deliveries and predict waste generation for slag moram powder
          </p>
        </header>
        
        <div className="content-grid">
          <div className="card">
            <h2 className="card-title">Input Parameters</h2>
            
            <div className="form-section">
              <h3 className="section-header">Delivery Information</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Sl. No</label>
                  <input
                    type="text"
                    name="sl_no"
                    className="form-input"
                    placeholder="Serial number"
                    value={formData.sl_no}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    name="date"
                    className="form-input"
                    value={formData.date}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Receipt</label>
                  <input
                    type="text"
                    name="receipt"
                    className="form-input"
                    placeholder="Receipt number"
                    value={formData.receipt}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Vehicle No</label>
                  <input
                    type="text"
                    name="vehicle_no"
                    className="form-input"
                    placeholder="Vehicle number"
                    value={formData.vehicle_no}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Invoice No</label>
                  <input
                    type="text"
                    name="invoice_no"
                    className="form-input"
                    placeholder="Invoice number"
                    value={formData.invoice_no}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Received From</label>
                  <input
                    type="text"
                    name="received_from"
                    className="form-input"
                    placeholder="Supplier name"
                    value={formData.received_from}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <h3 className="section-header">Quantity Details</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Unit</label>
                  <input
                    type="text"
                    name="unit"
                    className="form-input"
                    placeholder="MT / Cum / Ton"
                    value={formData.unit}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Rec. Qty</label>
                  <input
                    type="number"
                    step="0.01"
                    name="rec_qty"
                    className="form-input"
                    placeholder="Received quantity"
                    value={formData.rec_qty}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Cum Qty</label>
                  <input
                    type="number"
                    step="0.01"
                    name="cum_qty"
                    className="form-input"
                    placeholder="Cumulative quantity"
                    value={formData.cum_qty}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">R for Slag</label>
                  <input
                    type="text"
                    name="r_for_slag"
                    className="form-input"
                    placeholder="Reference/Remarks"
                    value={formData.r_for_slag}
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
            <h2 className="card-title">Why Predict Slag Moram Waste?</h2>
            
            <div className="info-section">
              <h3 className="info-title">Low Waste Material</h3>
              <p className="info-text">
                Slag moram typically generates only 1-3% waste, making it one of the most efficient 
                construction materials. However, even small percentages matter at scale.
              </p>
            </div>
            
            <div className="info-section">
              <h3 className="info-title">Waste Sources</h3>
              <p className="info-text">
                Most slag moram waste comes from spillage during transport (40%), handling and 
                spreading operations (30%), moisture contamination (20%), and over-application (10%).
              </p>
            </div>
            
            <div className="info-section">
              <h3 className="info-title">Quality Consistency</h3>
              <p className="info-text">
                Unlike other materials, slag moram quality is consistent as it's an industrial 
                byproduct. Waste prediction helps optimize procurement and minimize excess ordering.
              </p>
            </div>
            
            <div className="info-section">
              <h3 className="info-title">Environmental Value</h3>
              <p className="info-text">
                Being a steel industry byproduct, every tonne of slag moram used represents waste 
                diverted from landfills. Accurate predictions ensure maximum utilization.
              </p>
            </div>
          </div>
        </div>
        
        {loading && (
                      <div className="card loading-spinner">
            <div className="spinner"></div>
            <div>Predicting slag moram waste...</div>
          </div>
        )}
        
        {results && !loading && (
          <div className="card results-section">
            <h2 className="card-title">Waste Generation Prediction</h2>
            
            <div className="delivery-info-card">
              <div className="delivery-item">
                <div className="delivery-label">Received Qty</div>
                <div className="delivery-value">{results.predictions.receivedQty} {formData.unit || 'MT'}</div>
              </div>
              <div className="delivery-item">
                <div className="delivery-label">Cumulative Qty</div>
                <div className="delivery-value">{results.predictions.cumulativeQty} {formData.unit || 'MT'}</div>
              </div>
              <div className="delivery-item">
                <div className="delivery-label">Predicted Usage</div>
                <div className="delivery-value">{results.predictions.predictedUsage} {formData.unit || 'MT'}</div>
              </div>
              <div className="delivery-item">
                <div className="delivery-label">Predicted Waste</div>
                <div className="delivery-value">{results.predictions.predictedWaste} {formData.unit || 'MT'}</div>
              </div>
              <div className="delivery-item">
                <div className="delivery-label">Waste %</div>
                <div className="delivery-value">{results.predictions.wastePercentage}</div>
              </div>
            </div>
            
            <div className="value-card">
              <div className="value-item">
                <div className="value-label">Waste Amount</div>
                <div className="value-number">{results.predictions.predictedWaste} {formData.unit || 'MT'}</div>
              </div>
              <div className="value-item">
                <div className="value-label">Waste %</div>
                <div className="value-number">{results.predictions.wastePercentage}</div>
              </div>
              <div className="value-item">
                <div className="value-label">Expected Usage</div>
                <div className="value-number">{results.predictions.predictedUsage} {formData.unit || 'MT'}</div>
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
                <p className="reuse-description">Material lost during loading, transport, and unloading operations</p>
                <div style={{fontSize: '32px', fontWeight: 800, color: '#1abc9c', marginBottom: '8px'}}>{results.breakdown.spillageLoss} {formData.unit || 'MT'}</div>
                <span className="meta-badge">40% of total waste</span>
              </div>
              <div className="reuse-card">
                <h3 className="reuse-title">Handling Loss</h3>
                <p className="reuse-description">Material scattered during spreading and leveling activities</p>
                <div style={{fontSize: '32px', fontWeight: 800, color: '#1abc9c', marginBottom: '8px'}}>{results.breakdown.handlingLoss} {formData.unit || 'MT'}</div>
                <span className="meta-badge">30% of total waste</span>
              </div>
              <div className="reuse-card">
                <h3 className="reuse-title">Moisture Contamination</h3>
                <p className="reuse-description">Material rendered unusable due to excessive moisture or water logging</p>
                <div style={{fontSize: '32px', fontWeight: 800, color: '#1abc9c', marginBottom: '8px'}}>{results.breakdown.moistureContamination} {formData.unit || 'MT'}</div>
                <span className="meta-badge">20% of total waste</span>
              </div>
              <div className="reuse-card">
                <h3 className="reuse-title">Over-spreading</h3>
                <p className="reuse-description">Excess material applied beyond design specifications</p>
                <div style={{fontSize: '32px', fontWeight: 800, color: '#1abc9c', marginBottom: '8px'}}>{results.breakdown.overspreading} {formData.unit || 'MT'}</div>
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