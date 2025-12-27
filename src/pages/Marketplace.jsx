import React, { useState } from "react";
import { Hammer, TrendingUp, Package, IndianRupee, Gavel, Plus, Trash2, X } from "lucide-react";

function Marketplace() {
  const [items, setItems] = useState([
    { 
      id: 1, 
      name: "Recycled Bricks", 
      basePrice: 500, 
      highestBid: 620,
      description: "High-quality recycled bricks, perfect for construction",
      quantity: "5000 units",
      icon: "brick"
    },
    { 
      id: 2, 
      name: "Steel Rod Scrap", 
      basePrice: 300, 
      highestBid: 450,
      description: "Premium steel rods suitable for reinforcement",
      quantity: "2 tons",
      icon: "steel"
    },
    { 
      id: 3, 
      name: "Wooden Planks", 
      basePrice: 200, 
      highestBid: 260,
      description: "Reclaimed wooden planks in excellent condition",
      quantity: "150 pieces",
      icon: "wood"
    },
  ]);

  const [bidAmounts, setBidAmounts] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    basePrice: "",
    description: "",
    quantity: ""
  });

  const placeBid = (id) => {
    const bidAmount = bidAmounts[id];
    const item = items.find(i => i.id === id);
    
    if (!bidAmount || bidAmount <= item.highestBid) {
      alert(`Bid must be higher than ₹${item.highestBid}`);
      return;
    }

    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, highestBid: Number(bidAmount) }
          : item
      )
    );
    
    setBidAmounts({ ...bidAmounts, [id]: "" });
    setSuccessMessage(`Bid placed successfully on ${item.name}!`);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const updateBidAmount = (id, value) => {
    setBidAmounts({ ...bidAmounts, [id]: value });
  };

  const addNewMaterial = () => {
    if (!newItem.name || !newItem.basePrice || !newItem.description || !newItem.quantity) {
      alert("Please fill in all fields");
      return;
    }

    const newMaterial = {
      id: items.length + 1,
      name: newItem.name,
      basePrice: Number(newItem.basePrice),
      highestBid: Number(newItem.basePrice),
      description: newItem.description,
      quantity: newItem.quantity,
      icon: "material"
    };

    setItems([...items, newMaterial]);
    setNewItem({ name: "", basePrice: "", description: "", quantity: "" });
    setShowAddForm(false);
    setSuccessMessage(`${newItem.name} added successfully!`);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const removeMaterial = (id) => {
    if (window.confirm("Are you sure you want to remove this material?")) {
      setItems(items.filter(item => item.id !== id));
      setSuccessMessage("Material removed successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(to bottom right, #f8fafc, #ffffff, #f8fafc)",
      padding: "3rem 1.5rem"
    }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
            <div style={{
              background: "linear-gradient(to bottom right, #10b981, #059669)",
              padding: "1rem",
              borderRadius: "1rem",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
            }}>
              <Gavel style={{ width: "2.5rem", height: "2.5rem", color: "white" }} />
            </div>
          </div>
          <h1 style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "#1e293b",
            marginBottom: "0.5rem"
          }}>
            Marketplace
          </h1>
          <p style={{
            color: "#64748b",
            fontSize: "1.125rem"
          }}>
            Bid on recyclable construction materials and sustainable resources
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div style={{
            backgroundColor: "#d1fae5",
            border: "1px solid #6ee7b7",
            borderRadius: "0.5rem",
            padding: "1rem",
            marginBottom: "2rem",
            color: "#065f46",
            textAlign: "center",
            fontWeight: "500"
          }}>
            {successMessage}
          </div>
        )}

        {/* Add Material Button */}
        <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            style={{
              padding: "0.75rem 1.5rem",
              background: "linear-gradient(to right, #10b981, #059669)",
              color: "white",
              fontWeight: "600",
              borderRadius: "0.5rem",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(16, 185, 129, 0.3)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <Plus style={{ width: "1.25rem", height: "1.25rem" }} />
            Add New Material
          </button>
        </div>

        {/* Add Material Form */}
        {showAddForm && (
          <div style={{
            backgroundColor: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "1rem",
            padding: "2rem",
            marginBottom: "2rem",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "1.5rem", fontWeight: "600", color: "#1e293b" }}>
                Add New Material
              </h3>
              <button
                onClick={() => setShowAddForm(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#64748b"
                }}
              >
                <X style={{ width: "1.5rem", height: "1.5rem" }} />
              </button>
            </div>
            
            <div style={{ display: "grid", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", color: "#475569", fontWeight: "500" }}>
                  Material Name
                </label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  placeholder="e.g., Concrete Blocks"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #e2e8f0",
                    borderRadius: "0.5rem",
                    fontSize: "1rem",
                    outline: "none"
                  }}
                />
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", color: "#475569", fontWeight: "500" }}>
                    Base Price (₹)
                  </label>
                  <input
                    type="number"
                    value={newItem.basePrice}
                    onChange={(e) => setNewItem({ ...newItem, basePrice: e.target.value })}
                    placeholder="500"
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #e2e8f0",
                      borderRadius: "0.5rem",
                      fontSize: "1rem",
                      outline: "none"
                    }}
                  />
                </div>
                
                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", color: "#475569", fontWeight: "500" }}>
                    Quantity
                  </label>
                  <input
                    type="text"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                    placeholder="e.g., 1000 units"
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #e2e8f0",
                      borderRadius: "0.5rem",
                      fontSize: "1rem",
                      outline: "none"
                    }}
                  />
                </div>
              </div>
              
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", color: "#475569", fontWeight: "500" }}>
                  Description
                </label>
                <textarea
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  placeholder="Describe the material condition and details"
                  rows="3"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #e2e8f0",
                    borderRadius: "0.5rem",
                    fontSize: "1rem",
                    outline: "none",
                    resize: "vertical"
                  }}
                />
              </div>
              
              <button
                onClick={addNewMaterial}
                style={{
                  padding: "0.75rem 1.5rem",
                  background: "linear-gradient(to right, #10b981, #059669)",
                  color: "white",
                  fontWeight: "600",
                  borderRadius: "0.5rem",
                  border: "none",
                  cursor: "pointer",
                  marginTop: "0.5rem"
                }}
              >
                Add Material
              </button>
            </div>
          </div>
        )}

        {/* Items Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
          gap: "1.5rem"
        }}>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "1rem",
                padding: "1.5rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Item Header */}
              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "space-between",
                marginBottom: "1rem"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{
                    backgroundColor: "#ecfeff",
                    padding: "0.75rem",
                    borderRadius: "0.75rem"
                  }}>
                    <Package style={{ width: "1.5rem", height: "1.5rem", color: "#0891b2" }} />
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: "1.25rem",
                      fontWeight: "600",
                      color: "#1e293b",
                      marginBottom: "0.25rem"
                    }}>
                      {item.name}
                    </h3>
                    <p style={{ fontSize: "0.875rem", color: "#64748b" }}>
                      {item.quantity}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => removeMaterial(item.id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#ef4444",
                    padding: "0.5rem",
                    borderRadius: "0.5rem",
                    transition: "all 0.3s"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#fee2e2";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                  title="Remove material"
                >
                  <Trash2 style={{ width: "1.25rem", height: "1.25rem" }} />
                </button>
              </div>

              {/* Description */}
              <p style={{
                color: "#64748b",
                fontSize: "0.875rem",
                marginBottom: "1rem",
                lineHeight: "1.5"
              }}>
                {item.description}
              </p>

              {/* Price Info */}
              <div style={{
                display: "flex",
                gap: "1rem",
                marginBottom: "1.5rem",
                padding: "1rem",
                backgroundColor: "#f8fafc",
                borderRadius: "0.5rem"
              }}>
                <div style={{ flex: 1 }}>
                  <p style={{ 
                    fontSize: "0.75rem", 
                    color: "#64748b",
                    marginBottom: "0.25rem",
                    textTransform: "uppercase",
                    fontWeight: "600"
                  }}>
                    Base Price
                  </p>
                  <p style={{
                    fontSize: "1.25rem",
                    fontWeight: "700",
                    color: "#475569",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem"
                  }}>
                    <IndianRupee style={{ width: "1rem", height: "1rem" }} />
                    {item.basePrice}
                  </p>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ 
                    fontSize: "0.75rem", 
                    color: "#64748b",
                    marginBottom: "0.25rem",
                    textTransform: "uppercase",
                    fontWeight: "600"
                  }}>
                    Highest Bid
                  </p>
                  <p style={{
                    fontSize: "1.25rem",
                    fontWeight: "700",
                    color: "#10b981",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem"
                  }}>
                    <IndianRupee style={{ width: "1rem", height: "1rem" }} />
                    {item.highestBid}
                  </p>
                </div>
              </div>

              {/* Bid Input */}
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <input
                  type="number"
                  value={bidAmounts[item.id] || ""}
                  placeholder={`Min: ₹${item.highestBid + 1}`}
                  onChange={(e) => updateBidAmount(item.id, e.target.value)}
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    border: "1px solid #e2e8f0",
                    borderRadius: "0.5rem",
                    fontSize: "1rem",
                    outline: "none"
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = "#10b981"}
                  onBlur={(e) => e.currentTarget.style.borderColor = "#e2e8f0"}
                />
                <button
                  onClick={() => placeBid(item.id)}
                  style={{
                    padding: "0.75rem 1.5rem",
                    background: "linear-gradient(to right, #10b981, #059669)",
                    color: "white",
                    fontWeight: "600",
                    borderRadius: "0.5rem",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(16, 185, 129, 0.3)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <TrendingUp style={{ width: "1rem", height: "1rem" }} />
                  Place Bid
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Info Banner */}
        <div style={{
          marginTop: "3rem",
          backgroundColor: "#ecfeff",
          border: "1px solid #a5f3fc",
          borderRadius: "1rem",
          padding: "1.5rem",
          textAlign: "center"
        }}>
          <p style={{ color: "#0891b2", fontSize: "0.875rem" }}>
            💡 <strong>Tip:</strong> All materials are sourced from verified construction sites and meet quality standards
          </p>
        </div>
      </div>
    </div>
  );
}

export default Marketplace;