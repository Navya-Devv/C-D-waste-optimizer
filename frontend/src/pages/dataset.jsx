import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

export default function Dataset() {
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const [loadingPreview, setLoadingPreview] = useState(false);

  useEffect(() => {
    fetchDatasets();
  }, []);

  const fetchDatasets = async () => {
    try {
      const response = await fetch('http://localhost:5000/datasets');
      const data = await response.json();
      
      if (data.success) {
        setDatasets(data.datasets);
      } else {
        console.error('Error fetching datasets:', data.error);
        alert('Failed to load datasets: ' + data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to connect to backend. Make sure the server is running on http://localhost:5000');
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = async (filename) => {
    setLoadingPreview(true);
    setSelectedDataset(filename);
    
    try {
      const response = await fetch(`http://localhost:5000/datasets/${filename}/preview`);
      const data = await response.json();
      
      if (data.success) {
        setPreviewData(data);
      } else {
        alert('Error loading preview: ' + data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to load preview');
    } finally {
      setLoadingPreview(false);
    }
  };

  const handleDownload = (filename) => {
    window.open(`http://localhost:5000/datasets/${filename}`, '_blank');
  };

  const closePreview = () => {
    setSelectedDataset(null);
    setPreviewData(null);
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
        }
        
        .dataset-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px 24px;
        }
        
        .dataset-header {
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
        
        .dataset-title {
          font-size: 48px;
          font-weight: 800;
          background: linear-gradient(135deg, #ffffff 0%, #a8dadc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0 0 16px 0;
        }
        
        .dataset-subtitle {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
        }
        
        .datasets-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
          animation: fadeInUp 0.8s ease-out;
        }
        
        .dataset-card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .dataset-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
        }
        
        .dataset-name {
          font-size: 20px;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 12px 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .dataset-icon {
          font-size: 24px;
        }
        
        .dataset-info {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-bottom: 16px;
        }
        
        .info-item {
          background: #f8fafc;
          padding: 12px;
          border-radius: 8px;
          border-left: 3px solid #1abc9c;
        }
        
        .info-label {
          font-size: 12px;
          color: #64748b;
          font-weight: 600;
          margin-bottom: 4px;
        }
        
        .info-value {
          font-size: 16px;
          color: #1e293b;
          font-weight: 700;
        }
        
        .dataset-actions {
          display: flex;
          gap: 8px;
          margin-top: 16px;
        }
        
        .btn {
          flex: 1;
          padding: 10px 16px;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .btn-preview {
          background: linear-gradient(135deg, #1abc9c 0%, #16a085 100%);
          color: white;
        }
        
        .btn-preview:hover {
          transform: scale(1.02);
          box-shadow: 0 4px 12px rgba(26, 188, 156, 0.3);
        }
        
        .btn-download {
          background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
          color: white;
        }
        
        .btn-download:hover {
          transform: scale(1.02);
          box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
        }
        
        .loading {
          text-align: center;
          color: white;
          font-size: 24px;
          padding: 60px;
        }
        
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .modal-content {
          background: white;
          border-radius: 16px;
          padding: 32px;
          max-width: 95vw;
          max-height: 90vh;
          overflow: auto;
          position: relative;
          animation: scaleIn 0.3s ease-out;
        }
        
        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 2px solid #e2e8f0;
        }
        
        .modal-title {
          font-size: 24px;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
        }
        
        .close-btn {
          background: #ef4444;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .close-btn:hover {
          background: #dc2626;
        }
        
        .preview-info {
          background: #f8fafc;
          padding: 16px;
          border-radius: 8px;
          margin-bottom: 24px;
          border-left: 4px solid #1abc9c;
        }
        
        .preview-info p {
          margin: 4px 0;
          color: #475569;
          font-size: 14px;
        }
        
        .table-container {
          overflow-x: auto;
        }
        
        .data-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }
        
        .data-table th {
          background: linear-gradient(135deg, #1abc9c 0%, #16a085 100%);
          color: white;
          padding: 12px;
          text-align: left;
          font-weight: 600;
          white-space: nowrap;
          position: sticky;
          top: 0;
          z-index: 10;
        }
        
        .data-table td {
          padding: 10px 12px;
          border-bottom: 1px solid #e2e8f0;
          color: #1e293b;
        }
        
        .data-table tr:hover {
          background: #f8fafc;
        }
        
        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: white;
        }
        
        .empty-state-icon {
          font-size: 64px;
          margin-bottom: 16px;
        }
        
        .empty-state-text {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        
        .empty-state-subtext {
          font-size: 16px;
          opacity: 0.8;
        }
      `}</style>

      <div className="dataset-container">
        <div className="dataset-header">
          <h1 className="dataset-title">📊 Training Datasets</h1>
          <p className="dataset-subtitle">
            Explore and download the datasets used to train our waste prediction models
          </p>
        </div>

        {loading ? (
          <div className="loading">Loading datasets...</div>
        ) : datasets.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📁</div>
            <div className="empty-state-text">No Datasets Found</div>
            <div className="empty-state-subtext">
              Make sure the backend server is running and datasets are available
            </div>
          </div>
        ) : (
          <div className="datasets-grid">
            {datasets.map((dataset, index) => (
              <div key={index} className="dataset-card">
                <h3 className="dataset-name">
                  <span className="dataset-icon">📄</span>
                  {dataset.filename}
                </h3>
                
                <div className="dataset-info">
                  <div className="info-item">
                    <div className="info-label">Rows</div>
                    <div className="info-value">{dataset.rows.toLocaleString()}</div>
                  </div>
                  <div className="info-item">
                    <div className="info-label">Columns</div>
                    <div className="info-value">{dataset.columns}</div>
                  </div>
                  <div className="info-item">
                    <div className="info-label">Size</div>
                    <div className="info-value">{dataset.size_kb} KB</div>
                  </div>
                  <div className="info-item">
                    <div className="info-label">Format</div>
                    <div className="info-value">CSV</div>
                  </div>
                </div>

                <div className="dataset-actions">
                  <button 
                    className="btn btn-preview"
                    onClick={() => handlePreview(dataset.filename)}
                  >
                    👁️ Preview
                  </button>
                  <button 
                    className="btn btn-download"
                    onClick={() => handleDownload(dataset.filename)}
                  >
                    ⬇️ Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedDataset && (
        <div className="modal-overlay" onClick={closePreview}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Preview: {selectedDataset}</h2>
              <button className="close-btn" onClick={closePreview}>
                ✕ Close
              </button>
            </div>

            {loadingPreview ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                Loading preview...
              </div>
            ) : previewData ? (
              <>
                <div className="preview-info">
                  <p><strong>Total Rows:</strong> {previewData.total_rows.toLocaleString()}</p>
                  <p><strong>Columns:</strong> {previewData.columns.length}</p>
                  <p><strong>Showing:</strong> First 10 rows</p>
                </div>

                <div className="table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        {previewData.columns.map((col, idx) => (
                          <th key={idx}>{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {previewData.preview.map((row, rowIdx) => (
                        <tr key={rowIdx}>
                          {previewData.columns.map((col, colIdx) => (
                            <td key={colIdx}>
                              {row[col] !== null && row[col] !== undefined 
                                ? String(row[col]) 
                                : '-'}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}
