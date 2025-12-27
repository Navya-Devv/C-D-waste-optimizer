import React, { useState } from "react";

const styles = `
  .upload-container {
    padding-top: 100px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-header {
    text-align: center;
    margin-bottom: 48px;
  }

  .section-title {
    font-size: 42px;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 12px;
  }

  .section-subtitle {
    color: #94a3b8;
    font-size: 16px;
  }

  .upload-grid {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 32px;
    margin-bottom: 48px;
  }

  .form-section {
    position: sticky;
    top: 120px;
    height: fit-content;
  }

  .input-group {
    margin-bottom: 20px;
  }

  .input-label {
    display: block;
    color: #06b6d4;
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 8px;
  }

  .action-buttons {
    display: flex;
    gap: 12px;
    margin-top: 24px;
  }

  .info-box {
    background: rgba(6, 182, 212, 0.1);
    border-left: 3px solid #06b6d4;
    padding: 16px;
    border-radius: 8px;
    margin-top: 24px;
  }

  .materials-section {
    min-height: 400px;
  }

  .material-card {
    background: rgba(30, 41, 59, 0.6);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(100, 255, 218, 0.1);
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 16px;
    transition: all 0.3s ease;
  }

  .material-card:hover {
    border-color: rgba(100, 255, 218, 0.3);
    transform: translateX(4px);
    box-shadow: 0 8px 24px rgba(6, 182, 212, 0.15);
  }

  .material-header {
    display: flex;
    justify-content: space-between;
    align-items: start;
    margin-bottom: 16px;
  }

  .material-info {
    flex: 1;
  }

  .material-name {
    font-size: 20px;
    font-weight: 600;
    color: #e2e8f0;
    margin-bottom: 4px;
  }

  .material-quantity {
    color: #06b6d4;
    font-size: 14px;
    font-weight: 500;
  }

  .suggestion-box {
    background: rgba(15, 23, 42, 0.6);
    border-radius: 12px;
    padding: 16px;
    border-left: 3px solid #06b6d4;
  }

  .suggestion-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #06b6d4;
    margin-bottom: 8px;
    font-weight: 600;
  }

  .suggestion-text {
    color: #cbd5e1;
    line-height: 1.6;
    font-size: 14px;
  }

  .empty-state {
    text-align: center;
    padding: 80px 20px;
    color: #64748b;
  }

  .empty-icon {
    font-size: 64px;
    margin-bottom: 16px;
    opacity: 0.3;
  }

  .remove-btn {
    padding: 8px 16px;
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: 8px;
    color: #ef4444;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .remove-btn:hover {
    background: rgba(239, 68, 68, 0.2);
    border-color: rgba(239, 68, 68, 0.5);
    transform: translateY(-1px);
  }

  @media (max-width: 968px) {
    .upload-grid {
      grid-template-columns: 1fr;
    }

    .form-section {
      position: relative;
      top: 0;
    }

    .section-title {
      font-size: 32px;
    }
  }
`;

const recyclingSuggestions = {
  concrete: "Crushed into aggregate for road base / new concrete mix",
  wood: "Refurbished into plywood, furniture, or biomass fuel",
  bricks: "Cleaned and reused for masonry; broken bricks used as filler",
  steel: "Melted and recast into reinforcement rods",
  glass: "Crushed and re-melted into glass wool or tiles",
  plastic: "Shredded and converted into recycled plastic lumber or panels",
  tiles: "Powdered and reused as ceramic aggregate",
  cement: "Reprocessed and blended into new cement mixtures",
  sand: "Reused in filling, landscaping, and construction base layers",
};

const getSuggestion = (materialName) => {
  const lower = materialName.toLowerCase();
  const key = Object.keys(recyclingSuggestions).find((k) =>
    lower.includes(k)
  );
  return key
    ? recyclingSuggestions[key]
    : "No direct suggestion found. Digital Twin will provide a detailed prediction.";
};

export default function UploadMaterials() {
  const [material, setMaterial] = useState("");
  const [quantity, setQuantity] = useState("");
  const [items, setItems] = useState([]);

  const add = () => {
    if (!material || !quantity) {
      alert("Please fill all fields");
      return;
    }
    const suggestion = getSuggestion(material);
    setItems((prev) => [
      ...prev,
      { id: Date.now(), material, quantity, suggestion },
    ]);
    setMaterial("");
    setQuantity("");
  };

  const remove = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <div className="upload-container">
      <style>{styles}</style>

      <div className="section-header">
        <h1 className="section-title">Upload Materials</h1>
        <p className="section-subtitle">
          Add construction waste materials and get instant recycling suggestions
        </p>
      </div>

      <div className="upload-grid">
        <div className="form-section">
          <div className="card form-card">
            <h2 style={{ marginTop: 0, color: "#1e293b" }}>Add New Material</h2>

            <div className="input-group">
              <label className="input-label">Material Type</label>
              <input
                className="input"
                placeholder="e.g., Concrete, Wood, Steel"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Quantity</label>
              <input
                className="input"
                placeholder="e.g., 2 tons, 500 kg"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div className="action-buttons">
              <button className="btn" onClick={add} style={{ flex: 1 }}>
                Add Material
              </button>
              <button
                className="btn secondary"
                onClick={() => {
                  setMaterial("");
                  setQuantity("");
                }}
              >
                Clear
              </button>
            </div>

            <div className="info-box">
              <div className="small-muted">
                💡 Suggestions are auto-generated based on material type. Our
                Digital Twin will provide more detailed predictions soon.
              </div>
            </div>
          </div>
        </div>

        <div className="materials-section">
          <div className="card" style={{ padding: items.length === 0 ? 0 : 32 }}>
            <h3 style={{ marginTop: 0, marginBottom: 24, padding: items.length === 0 ? "32px 32px 0" : 0 }}>
              Materials & Recycling Methods
            </h3>

            {items.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📦</div>
                <h4 style={{ color: "#64748b", marginBottom: 8 }}>
                  No materials added yet
                </h4>
                <p className="small-muted">
                  Start by adding materials from the form on the left
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="material-card">
                  <div className="material-header">
                    <div className="material-info">
                      <div className="material-name">{item.material}</div>
                      <div className="material-quantity">
                        Quantity: {item.quantity}
                      </div>
                    </div>
                    <button className="remove-btn" onClick={() => remove(item.id)}>
                      Remove
                    </button>
                  </div>

                  <div className="suggestion-box">
                    <div className="suggestion-label">
                      ♻️ Suggested Recycling Method
                    </div>
                    <div className="suggestion-text">{item.suggestion}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}