import React, { useState } from 'react';

export default function PipeDeliveryPage() {
  const [formData, setFormData] = useState({
    sl_no: '',
    receipt_date: '',
    vehicle_no: '',
    invoice_no: '',
    received_from: '',
    pipe_150mm_nos: '',
    pipe_150mm_mtr: '',
    pipe_250mm_nos: '',
    pipe_250mm_mtr: '',
    pipe_300mm_nos: '',
    pipe_300mm_mtr: '',
    pipe_450mm_nos: '',
    pipe_450mm_mtr: ''
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
    
    setTimeout(() => {
      const pipe150Total = (parseFloat(formData.pipe_150mm_nos) || 0);
      const pipe250Total = (parseFloat(formData.pipe_250mm_nos) || 0);
      const pipe300Total = (parseFloat(formData.pipe_300mm_nos) || 0);
      const pipe450Total = (parseFloat(formData.pipe_450mm_nos) || 0);
      
      const totalNos = pipe150Total + pipe250Total + pipe300Total + pipe450Total;
      
      const pipe150Mtr = (parseFloat(formData.pipe_150mm_mtr) || 0);
      const pipe250Mtr = (parseFloat(formData.pipe_250mm_mtr) || 0);
      const pipe300Mtr = (parseFloat(formData.pipe_300mm_mtr) || 0);
      const pipe450Mtr = (parseFloat(formData.pipe_450mm_mtr) || 0);
      
      const totalMtr = pipe150Mtr + pipe250Mtr + pipe300Mtr + pipe450Mtr;
      
      const wasteRate = 0.035;
      const predictedWasteNos = (totalNos * wasteRate).toFixed(2);
      const predictedWasteMtr = (totalMtr * wasteRate).toFixed(2);
      
      setResults({
        summary: {
          totalNos: totalNos.toFixed(2),
          totalMtr: totalMtr.toFixed(2),
          predictedWasteNos: predictedWasteNos,
          predictedWasteMtr: predictedWasteMtr,
          wastePercentage: "3.5%"
        },
        bySize: {
          pipe150: {
            nos: pipe150Total,
            mtr: pipe150Mtr,
            wasteNos: (pipe150Total * wasteRate).toFixed(2),
            wasteMtr: (pipe150Mtr * wasteRate).toFixed(2)
          },
          pipe250: {
            nos: pipe250Total,
            mtr: pipe250Mtr,
            wasteNos: (pipe250Total * wasteRate).toFixed(2),
            wasteMtr: (pipe250Mtr * wasteRate).toFixed(2)
          },
          pipe300: {
            nos: pipe300Total,
            mtr: pipe300Mtr,
            wasteNos: (pipe300Total * wasteRate).toFixed(2),
            wasteMtr: (pipe300Mtr * wasteRate).toFixed(2)
          },
          pipe450: {
            nos: pipe450Total,
            mtr: pipe450Mtr,
            wasteNos: (pipe450Total * wasteRate).toFixed(2),
            wasteMtr: (pipe450Mtr * wasteRate).toFixed(2)
          }
        },
        breakdown: {
          transportDamage: (parseFloat(predictedWasteNos) * 0.35).toFixed(2),
          handlingBreakage: (parseFloat(predictedWasteNos) * 0.30).toFixed(2),
          cuttingWaste: (parseFloat(predictedWasteNos) * 0.25).toFixed(2),
          qualityRejection: (parseFloat(predictedWasteNos) * 0.10).toFixed(2)
        },
        recommendations: [
          "Inspect pipes immediately upon delivery for transport damage",
          "Use proper lifting equipment and techniques to prevent handling damage",
          "Store pipes on level ground with adequate support to prevent deformation",
          "Plan cutting operations carefully to minimize waste from offcuts",
          "Larger diameter pipes (450mm) require extra care due to higher replacement cost",
          "Train workers on proper handling procedures for different pipe sizes"
        ]
      });
      setLoading(false);
    }, 1500);
  };

  const containerStyle = {
    margin: 0,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    minHeight: '100vh',
    paddingTop: '80px'
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '20px',
    padding: '32px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    marginBottom: '32px'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '14px'
  };

  return (
    <div style={containerStyle}>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      
      <div style={{maxWidth: '1400px', margin: '0 auto', padding: '40px 24px'}}>
        <header style={{textAlign: 'center', marginBottom: '48px'}}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #ffffff 0%, #4facfe 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '0 0 16px 0'
          }}>
            🔧 Pipe Delivery Tracker
          </h1>
          <p style={{fontSize: '18px', color: 'rgba(255, 255, 255, 0.8)', margin: 0}}>
            C&D Waste Estimation for RCC and HDPE Pipe Deliveries
          </p>
        </header>
        
        <div style={cardStyle}>
          <h2 style={{fontSize: '24px', fontWeight: 700, color: '#1e293b', margin: '0 0 24px 0', paddingBottom: '16px', borderBottom: '2px solid #e2e8f0'}}>
            Delivery Information
          </h2>
          
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px'}}>
            <div>
              <label style={{display: 'block', fontSize: '13px', fontWeight: 600, color: '#475569', marginBottom: '6px'}}>Sl. No.</label>
              <input type="text" name="sl_no" style={inputStyle} placeholder="Serial number" value={formData.sl_no} onChange={handleInputChange} />
            </div>
            <div>
              <label style={{display: 'block', fontSize: '13px', fontWeight: 600, color: '#475569', marginBottom: '6px'}}>Receipt Date</label>
              <input type="date" name="receipt_date" style={inputStyle} value={formData.receipt_date} onChange={handleInputChange} />
            </div>
            <div>
              <label style={{display: 'block', fontSize: '13px', fontWeight: 600, color: '#475569', marginBottom: '6px'}}>Vehicle No</label>
              <input type="text" name="vehicle_no" style={inputStyle} placeholder="e.g., GJ05YY-8528" value={formData.vehicle_no} onChange={handleInputChange} />
            </div>
            <div>
              <label style={{display: 'block', fontSize: '13px', fontWeight: 600, color: '#475569', marginBottom: '6px'}}>Invoice No.</label>
              <input type="text" name="invoice_no" style={inputStyle} placeholder="Invoice number" value={formData.invoice_no} onChange={handleInputChange} />
            </div>
          </div>
          
          <div style={{marginBottom: '24px'}}>
            <label style={{display: 'block', fontSize: '13px', fontWeight: 600, color: '#475569', marginBottom: '6px'}}>Received From</label>
            <input type="text" name="received_from" style={inputStyle} placeholder="e.g., Shreeji Pipe Industries" value={formData.received_from} onChange={handleInputChange} />
          </div>
          
          <h3 style={{fontSize: '16px', fontWeight: 700, color: '#2563eb', margin: '0 0 16px 0', padding: '12px 16px', background: 'rgba(37, 99, 235, 0.1)', borderRadius: '8px', borderLeft: '4px solid #2563eb'}}>
            Pipe Quantities by Size
          </h3>
          
          {[
            {size: '150mm* 2.5mtr', nosField: 'pipe_150mm_nos', mtrField: 'pipe_150mm_mtr'},
            {size: '250mm* 2mtr', nosField: 'pipe_250mm_nos', mtrField: 'pipe_250mm_mtr'},
            {size: '300mm* 2.5mtr', nosField: 'pipe_300mm_nos', mtrField: 'pipe_300mm_mtr'},
            {size: '450mm* 2.5mtr', nosField: 'pipe_450mm_nos', mtrField: 'pipe_450mm_mtr'}
          ].map((pipe, idx) => (
            <div key={idx} style={{marginBottom: '24px'}}>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)', color: 'white', borderRadius: '12px', marginBottom: '12px', fontWeight: 700, fontSize: '16px'}}>
                <span>{pipe.size}</span>
                <span>📏</span>
              </div>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', padding: '0 8px'}}>
                <div>
                  <label style={{display: 'block', fontSize: '13px', fontWeight: 600, color: '#475569', marginBottom: '6px'}}>nos (Numbers)</label>
                  <input type="number" step="0.01" name={pipe.nosField} style={inputStyle} placeholder="0" value={formData[pipe.nosField]} onChange={handleInputChange} />
                </div>
                <div>
                  <label style={{display: 'block', fontSize: '13px', fontWeight: 600, color: '#475569', marginBottom: '6px'}}>mtr (Meters)</label>
                  <input type="number" step="0.01" name={pipe.mtrField} style={inputStyle} placeholder="0" value={formData[pipe.mtrField]} onChange={handleInputChange} />
                </div>
              </div>
            </div>
          ))}
          
          <button onClick={handleSubmit} disabled={loading} style={{width: '100%', padding: '14px 24px', background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)', color: 'white', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', boxShadow: '0 4px 16px rgba(37, 99, 235, 0.3)', marginTop: '24px', opacity: loading ? 0.6 : 1}}>
            {loading ? 'Analyzing...' : 'Analyze Waste Generation'}
          </button>
        </div>
        
        {loading && (
          <div style={cardStyle}>
            <div style={{textAlign: 'center', color: '#1e293b'}}>
              <div style={{border: '4px solid rgba(37, 99, 235, 0.1)', borderTop: '4px solid #2563eb', borderRadius: '50%', width: '50px', height: '50px', animation: 'spin 1s linear infinite', margin: '0 auto 16px'}}></div>
              <div>Analyzing pipe delivery and waste predictions...</div>
            </div>
          </div>
        )}
        
        {results && !loading && (
          <>
            <div style={cardStyle}>
              <h2 style={{fontSize: '24px', fontWeight: 700, color: '#1e293b', margin: '0 0 24px 0', paddingBottom: '16px', borderBottom: '2px solid #e2e8f0'}}>Overall Summary</h2>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px'}}>
                {[
                  {label: 'Total Pipes', value: `${results.summary.totalNos} nos`},
                  {label: 'Total Length', value: `${results.summary.totalMtr} mtr`},
                  {label: 'Predicted Waste', value: `${results.summary.predictedWasteNos} nos`},
                  {label: 'Waste %', value: results.summary.wastePercentage}
                ].map((item, idx) => (
                  <div key={idx} style={{background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)', padding: '24px', borderRadius: '16px', color: 'white', textAlign: 'center'}}>
                    <div style={{fontSize: '13px', opacity: 0.9, marginBottom: '8px', textTransform: 'uppercase'}}>{item.label}</div>
                    <div style={{fontSize: '28px', fontWeight: 800}}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div style={cardStyle}>
              <h2 style={{fontSize: '24px', fontWeight: 700, color: '#1e293b', margin: '0 0 24px 0', paddingBottom: '16px', borderBottom: '2px solid #e2e8f0'}}>Waste Prediction by Pipe Size</h2>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px'}}>
                {[
                  {title: '150mm* 2.5mtr Pipes', data: results.bySize.pipe150},
                  {title: '250mm* 2mtr Pipes', data: results.bySize.pipe250},
                  {title: '300mm* 2.5mtr Pipes', data: results.bySize.pipe300},
                  {title: '450mm* 2.5mtr Pipes', data: results.bySize.pipe450}
                ].map((pipe, idx) => (
                  <div key={idx} style={{background: '#f8fafc', padding: '24px', borderRadius: '16px', border: '2px solid #e2e8f0'}}>
                    <div style={{fontSize: '20px', fontWeight: 700, color: '#1e293b', marginBottom: '16px', paddingBottom: '12px', borderBottom: '2px solid #e2e8f0'}}>{pipe.title}</div>
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px'}}>
                      {[
                        {label: 'Received', value: `${pipe.data.nos} nos`},
                        {label: 'Length', value: `${pipe.data.mtr} mtr`},
                        {label: 'Waste (nos)', value: pipe.data.wasteNos},
                        {label: 'Waste (mtr)', value: pipe.data.wasteMtr}
                      ].map((stat, i) => (
                        <div key={i} style={{textAlign: 'center', padding: '12px', background: 'rgba(37, 99, 235, 0.05)', borderRadius: '8px'}}>
                          <div style={{fontSize: '12px', color: '#64748b', marginBottom: '4px', fontWeight: 600}}>{stat.label}</div>
                          <div style={{fontSize: '18px', fontWeight: 700, color: '#2563eb'}}>{stat.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div style={cardStyle}>
              <h2 style={{fontSize: '24px', fontWeight: 700, color: '#1e293b', margin: '0 0 24px 0', paddingBottom: '16px', borderBottom: '2px solid #e2e8f0'}}>Waste Breakdown by Source</h2>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px'}}>
                {[
                  {title: 'Transport Damage', desc: 'Pipes damaged during loading, transit, and unloading', value: results.breakdown.transportDamage, percent: '35%'},
                  {title: 'Handling Breakage', desc: 'Material broken during handling and storage', value: results.breakdown.handlingBreakage, percent: '30%'},
                  {title: 'Cutting Waste', desc: 'Material lost during cutting operations', value: results.breakdown.cuttingWaste, percent: '25%'},
                  {title: 'Quality Rejection', desc: 'Pipes rejected due to defects', value: results.breakdown.qualityRejection, percent: '10%'}
                ].map((item, idx) => (
                  <div key={idx} style={{background: '#f8fafc', padding: '24px', borderRadius: '16px', border: '2px solid #e2e8f0'}}>
                    <h3 style={{fontSize: '18px', fontWeight: 700, color: '#1e293b', margin: '0 0 12px 0'}}>{item.title}</h3>
                    <p style={{fontSize: '14px', color: '#64748b', lineHeight: 1.6, margin: '0 0 16px 0'}}>{item.desc}</p>
                    <div style={{fontSize: '32px', fontWeight: 800, color: '#2563eb', marginBottom: '8px'}}>{item.value} nos</div>
                    <span style={{padding: '6px 12px', background: 'rgba(37, 99, 235, 0.1)', borderRadius: '6px', fontSize: '12px', fontWeight: 600, color: '#2563eb'}}>{item.percent} of total</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div style={cardStyle}>
              <h2 style={{fontSize: '24px', fontWeight: 700, color: '#1e293b', margin: '0 0 24px 0', paddingBottom: '16px', borderBottom: '2px solid #e2e8f0'}}>Waste Reduction Recommendations</h2>
              <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                {results.recommendations.map((rec, index) => (
                  <div key={index} style={{display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '16px', background: '#f8fafc', borderRadius: '12px', borderLeft: '4px solid #2563eb'}}>
                    <span style={{fontSize: '24px', flexShrink: 0}}>💡</span>
                    <span style={{fontSize: '15px', color: '#475569', lineHeight: 1.6}}>{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        
        <div style={cardStyle}>
          <div style={{background: 'rgba(37, 99, 235, 0.1)', padding: '20px', borderRadius: '12px', marginBottom: '24px', borderLeft: '4px solid #2563eb'}}>
            <h3 style={{fontSize: '16px', fontWeight: 700, color: '#2563eb', margin: '0 0 8px 0'}}>About RCC and HDPE Pipes</h3>
            <p style={{fontSize: '14px', color: '#475569', margin: '0 0 12px 0', lineHeight: 1.6}}>
              <strong>RCC (Reinforced Cement Concrete) Pipes:</strong> Heavy-duty pipes with steel reinforcement, commonly used for drainage and sewerage. Higher waste due to breakage during handling (4-6% typical waste rate). Concrete can be crushed for aggregate use.
            </p>
            <p style={{fontSize: '14px', color: '#475569', margin: '0', lineHeight: 1.6}}>
              <strong>HDPE (High-Density Polyethylene) Pipes:</strong> Lightweight, flexible plastic pipes resistant to corrosion. Lower waste rate (2-3%) due to durability. HDPE waste can be recycled into new products, making it environmentally preferable for C&D waste management.
            </p>
          </div>
          
          <h2 style={{fontSize: '24px', fontWeight: 700, color: '#1e293b', margin: '0 0 24px 0', paddingBottom: '16px', borderBottom: '2px solid #e2e8f0'}}>C&D Waste Management Information</h2>
          
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '24px'}}>
            <div style={{background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', padding: '24px', borderRadius: '16px', border: '2px solid #86efac'}}>
              <div style={{fontSize: '40px', marginBottom: '12px'}}>🏗️</div>
              <h3 style={{fontSize: '20px', fontWeight: 700, color: '#166534', margin: '0 0 12px 0'}}>RCC Pipes - C&D Waste Profile</h3>
              <p style={{fontSize: '14px', color: '#166534', lineHeight: 1.6, margin: '0 0 8px 0'}}><strong>Material Type:</strong> Reinforced Cement Concrete</p>
              <p style={{fontSize: '14px', color: '#166534', lineHeight: 1.6, margin: '0 0 8px 0'}}><strong>Typical Waste Rate:</strong> 4-6%</p>
              <p style={{fontSize: '14px', color: '#166534', lineHeight: 1.6, margin: '0 0 8px 0'}}><strong>Main Waste Sources:</strong> Transport damage (40%), handling breakage (35%), installation damage (15%), quality rejection (10%)</p>
              <p style={{fontSize: '14px', color: '#166534', lineHeight: 1.6, margin: '0 0 8px 0'}}><strong>Recycling:</strong> Broken pipes can be crushed for recycled concrete aggregate (RCA). Steel reinforcement can be separated and recycled.</p>
              <p style={{fontSize: '14px', color: '#166534', lineHeight: 1.6, margin: 0}}><strong>Impact:</strong> Recycling reduces landfill burden and saves virgin aggregate resources.</p>
            </div>
            
            <div style={{background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', padding: '24px', borderRadius: '16px', border: '2px solid #93c5fd'}}>
              <div style={{fontSize: '40px', marginBottom: '12px'}}>♻️</div>
              <h3 style={{fontSize: '20px', fontWeight: 700, color: '#1e3a8a', margin: '0 0 12px 0'}}>HDPE Pipes - C&D Waste Profile</h3>
              <p style={{fontSize: '14px', color: '#1e3a8a', lineHeight: 1.6, margin: '0 0 8px 0'}}><strong>Material Type:</strong> High-Density Polyethylene</p>
              <p style={{fontSize: '14px', color: '#1e3a8a', lineHeight: 1.6, margin: '0 0 8px 0'}}><strong>Typical Waste Rate:</strong> 2-3%</p>
              <p style={{fontSize: '14px', color: '#1e3a8a', lineHeight: 1.6, margin: '0 0 8px 0'}}><strong>Main Waste Sources:</strong> Cutting waste (50%), joint failures (20%), installation errors (20%), quality defects (10%)</p>
              <p style={{fontSize: '14px', color: '#1e3a8a', lineHeight: 1.6, margin: '0 0 8px 0'}}><strong>Recycling:</strong> Offcuts and damaged pipes can be reprocessed into new HDPE products or plastic lumber. Clean HDPE maintains high recycling value.</p>
              <p style={{fontSize: '14px', color: '#1e3a8a', lineHeight: 1.6, margin: 0}}><strong>Impact:</strong> Recycling saves petroleum resources and reduces plastic waste. Preferred for sustainable C&D practices.</p>
            </div>
          </div>
          
          <div style={{padding: '20px', background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', borderRadius: '12px', borderLeft: '4px solid #f59e0b'}}>
            <h3 style={{fontSize: '16px', fontWeight: 700, color: '#92400e', margin: '0 0 12px 0'}}>💡 C&D Waste Management Best Practices</h3>
            <ul style={{fontSize: '14px', color: '#92400e', lineHeight: 1.8, margin: 0, paddingLeft: '20px'}}>
              <li><strong>Segregation at Source:</strong> Separate RCC and HDPE waste immediately for different recycling streams</li>
              <li><strong>On-site Storage:</strong> Designated collection areas prevent contamination and maximize recycling value</li>
              <li><strong>Minimize Cutting Waste:</strong> Plan pipe lengths carefully to reduce offcuts, especially for HDPE</li>
              <li><strong>Partner with Recyclers:</strong> Establish relationships with certified C&D waste recyclers in your area</li>
              <li><strong>Documentation:</strong> Track waste quantities for compliance with local C&D waste management regulations</li>
              <li><strong>Worker Training:</strong> Educate crews on proper handling to reduce breakage and waste generation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}