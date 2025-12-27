import React, { useState } from 'react';
import Navbar from '../components/Navbar';

export default function BricksPage() {
  const [formData, setFormData] = useState({
    sl_no: '',
    receipt: '',
    date: '',
    vehicle_no: '',
    lr_no: '',
    invoice_no: '',
    supplier: '',
    unit: '',
    qty_nos: '',
    cum_qty_nos: '',
    cum: '',
    cum_cum: ''
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
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call - replace with actual backend endpoint
    setTimeout(() => {
      const qtyNos = parseFloat(formData.qty_nos) || 0;
      const cumQtyNos = parseFloat(formData.cum_qty_nos) || 0;
      
      // Bricks typically have 8-12% waste due to breakage, transport damage, and cutting
      const predictedWaste = (qtyNos * 0.10).toFixed(2);
      const predictedUsage = (qtyNos * 0.90).toFixed(2);
      const wastePercentage = "8-12%";
      
      setResults({
        predictions: {
          predictedWaste: predictedWaste,
          predictedUsage: predictedUsage,
          wastePercentage: wastePercentage,
          confidenceScore: "87%",
          receivedQty: qtyNos,
          cumulativeQty: cumQtyNos
        },
        breakdown: {
          transportBreakage: (predictedWaste * 0.40).toFixed(2),
          handlingDamage: (predictedWaste * 0.30).toFixed(2),
          cuttingWaste: (predictedWaste * 0.20).toFixed(2),
          qualityRejection: (predictedWaste * 0.10).toFixed(2)
        },
        recommendations: [
          "Inspect bricks immediately upon delivery for transport damage",
          "Use proper unloading techniques to minimize breakage during handling",
          "Store bricks on pallets or level surfaces to prevent moisture damage",
          "Plan masonry work to minimize need for cutting and half bricks",
          "Implement quality checks to reject defective bricks before use",
          "Train workers on proper brick handling and laying techniques"
        ]
      });
      setLoading(false);
    }, 1500);
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
            <span>🧱</span>
            Bricks Waste Analysis
          </h1>
          <p className="page-subtitle">
            Track brick deliveries and predict waste generation based on delivery parameters
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
                  <label className="form-label">Vehicle No.</label>
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
                  <label className="form-label">LR No.</label>
                  <input
                    type="text"
                    name="lr_no"
                    className="form-input"
                    placeholder="Lorry receipt number"
                    value={formData.lr_no}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Inv./Bill No.</label>
                  <input
                    type="text"
                    name="invoice_no"
                    className="form-input"
                    placeholder="Invoice/Bill number"
                    value={formData.invoice_no}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group form-group-full">
                  <label className="form-label">Supplier/Company</label>
                  <input
                    type="text"
                    name="supplier"
                    className="form-input"
                    placeholder="Supplier or company name"
                    value={formData.supplier}
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
                    placeholder="Nos / Thousands"
                    value={formData.unit}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Qty nos</label>
                  <input
                    type="number"
                    step="0.01"
                    name="qty_nos"
                    className="form-input"
                    placeholder="Quantity in numbers"
                    value={formData.qty_nos}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Cum.Qty nos</label>
                  <input
                    type="number"
                    step="0.01"
                    name="cum_qty_nos"
                    className="form-input"
                    placeholder="Cumulative quantity"
                    value={formData.cum_qty_nos}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">CUM</label>
                  <input
                    type="text"
                    name="cum"
                    className="form-input"
                    placeholder="Cumulative unit"
                    value={formData.cum}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group form-group-full">
                  <label className="form-label">Cum. CUM</label>
                  <input
                    type="text"
                    name="cum_cum"
                    className="form-input"
                    placeholder="Cumulative cumulative"
                    value={formData.cum_cum}
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
            <h2 className="card-title">Why Track Brick Waste?</h2>
            
            <div className="highlight-box">
              <div className="highlight-number">8-12%</div>
              <div className="highlight-text">
                Average brick waste in construction projects - prediction helps minimize this loss
              </div>
            </div>
            
            <div className="info-section">
              <h3 className="info-title">Significant Waste Factor</h3>
              <p className="info-text">
                Bricks typically generate 8-12% waste due to transport breakage, handling damage, 
                cutting operations, and quality rejections. Proper tracking helps minimize losses.
              </p>
            </div>
            
            <div className="info-section">
              <h3 className="info-title">Cost Impact</h3>
              <p className="info-text">
                Bricks represent a significant material cost. Even a 10% waste rate can translate 
                to substantial financial losses, especially for large masonry projects.
              </p>
            </div>
            
            <div className="info-section">
              <h3 className="info-title">Waste Sources</h3>
              <p className="info-text">
                Primary waste sources include transport breakage (40%), handling damage (30%), 
                cutting waste from fitting operations (20%), and quality rejections (10%).
              </p>
            </div>
            
            <div className="info-section">
              <h3 className="info-title">Prevention Benefits</h3>
              <p className="info-text">
                Accurate waste prediction enables better procurement planning, improved handling 
                procedures, and targeted training programs to reduce overall material losses.
              </p>
            </div>
          </div>
        </div>
        
        {loading && (
          <div className="card loading-spinner">
            <div className="spinner"></div>
            <div>Predicting brick waste generation...</div>
          </div>
        )}
        
        {results && !loading && (
          <div className="card results-section">
            <h2 className="card-title">Waste Generation Prediction</h2>
            
            <div className="breakdown-section">
              <div className="breakdown-card">
                <div className="breakdown-label">Total Received</div>
                <div className="breakdown-value">{results.predictions.receivedQty} {formData.unit || 'Nos'}</div>
              </div>
              <div className="breakdown-card">
                <div className="breakdown-label">Predicted Usage</div>
                <div className="breakdown-value">{results.predictions.predictedUsage} {formData.unit || 'Nos'}</div>
              </div>
              <div className="breakdown-card">
                <div className="breakdown-label">Predicted Waste</div>
                <div className="breakdown-value">{results.predictions.predictedWaste} {formData.unit || 'Nos'}</div>
              </div>
            </div>
            
            <div className="value-card">
              <div className="value-item">
                <div className="value-label">Received Qty</div>
                <div className="value-number">{results.predictions.receivedQty} {formData.unit || 'Nos'}</div>
              </div>
              <div className="value-item">
                <div className="value-label">Waste Amount</div>
                <div className="value-number">{results.predictions.predictedWaste} {formData.unit || 'Nos'}</div>
              </div>
              <div className="value-item">
                <div className="value-label">Waste %</div>
                <div className="value-number">{results.predictions.wastePercentage}</div>
              </div>
              <div className="value-item">
                <div className="value-label">Expected Usage</div>
                <div className="value-number">{results.predictions.predictedUsage} {formData.unit || 'Nos'}</div>
              </div>
              <div className="value-item">
                <div className="value-label">Confidence</div>
                <div className="value-number">{results.predictions.confidenceScore}</div>
              </div>
            </div>
            
            <h3 className="card-title">Waste Breakdown by Source</h3>
            <div className="breakdown-section" style={{gridTemplateColumns: 'repeat(4, 1fr)'}}>
              <div className="breakdown-card">
                <div className="breakdown-label">Transport Breakage</div>
                <div className="breakdown-value">{results.breakdown.transportBreakage} {formData.unit || 'Nos'}</div>
                <span className="meta-badge">40% of total</span>
              </div>
              <div className="breakdown-card">
                <div className="breakdown-label">Handling Damage</div>
                <div className="breakdown-value">{results.breakdown.handlingDamage} {formData.unit || 'Nos'}</div>
                <span className="meta-badge">30% of total</span>
              </div>
              <div className="breakdown-card">
                <div className="breakdown-label">Cutting Waste</div>
                <div className="breakdown-value">{results.breakdown.cuttingWaste} {formData.unit || 'Nos'}</div>
                <span className="meta-badge">20% of total</span>
              </div>
              <div className="breakdown-card">
                <div className="breakdown-label">Quality Rejection</div>
                <div className="breakdown-value">{results.breakdown.qualityRejection} {formData.unit || 'Nos'}</div>
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