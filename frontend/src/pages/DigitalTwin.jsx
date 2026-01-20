import React from "react";
import { Cpu, TrendingUp, Package, AlertCircle } from "lucide-react";

function DigitalTwin() {
  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(to bottom right, #f8fafc, #ffffff, #f8fafc)",
      padding: "3rem"
    }}>
      <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
        {/* Main Card */}
        <div style={{
          backgroundColor: "white",
          border: "1px solid #e2e8f0",
          borderRadius: "1rem",
          padding: "3rem",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
        }}>
          

          {/* Title */}
          <h1 style={{
            fontSize: "3rem",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "1rem",
            color: "#1e293b"
          }}>
            Digital Twin
          </h1>
          
          {/* Subtitle */}
          <p style={{
            color: "#64748b",
            textAlign: "center",
            fontSize: "1.125rem",
            marginBottom: "3rem"
          }}>
            AI-Powered Construction Waste Prediction
          </p>

          {/* Coming Soon Badge */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "3rem" }}>
            <span style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#ecfeff",
              border: "1px solid #a5f3fc",
              borderRadius: "9999px",
              color: "#0891b2",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}>
              <AlertCircle style={{ width: "1.25rem", height: "1.25rem" }} />
              Coming Soon
            </span>
          </div>

          {/* Features Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
            marginBottom: "2rem"
          }}>
            <div style={{
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "0.75rem",
              padding: "1.5rem",
              transition: "all 0.3s"
            }}>
              <div style={{
                backgroundColor: "#cffafe",
                width: "3rem",
                height: "3rem",
                borderRadius: "0.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem"
              }}>
                <TrendingUp style={{ width: "1.5rem", height: "1.5rem", color: "#0891b2" }} />
              </div>
              <h3 style={{
                color: "#1e293b",
                fontWeight: "600",
                marginBottom: "0.5rem"
              }}>
                Predictive Analytics
              </h3>
              <p style={{
                color: "#64748b",
                fontSize: "0.875rem"
              }}>
                Forecast waste generation with advanced AI models
              </p>
            </div>

            <div style={{
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "0.75rem",
              padding: "1.5rem",
              transition: "all 0.3s"
            }}>
              <div style={{
                backgroundColor: "#d1fae5",
                width: "3rem",
                height: "3rem",
                borderRadius: "0.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem"
              }}>
                <Package style={{ width: "1.5rem", height: "1.5rem", color: "#059669" }} />
              </div>
              <h3 style={{
                color: "#1e293b",
                fontWeight: "600",
                marginBottom: "0.5rem"
              }}>
                Resource Optimization
              </h3>
              <p style={{
                color: "#64748b",
                fontSize: "0.875rem"
              }}>
                Minimize waste and maximize material efficiency
              </p>
            </div>

            <div style={{
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "0.75rem",
              padding: "1.5rem",
              transition: "all 0.3s"
            }}>
              <div style={{
                backgroundColor: "#ccfbf1",
                width: "3rem",
                height: "3rem",
                borderRadius: "0.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem"
              }}>
                <Cpu style={{ width: "1.5rem", height: "1.5rem", color: "#0d9488" }} />
              </div>
              <h3 style={{
                color: "#1e293b",
                fontWeight: "600",
                marginBottom: "0.5rem"
              }}>
                Real-time Monitoring
              </h3>
              <p style={{
                color: "#64748b",
                fontSize: "0.875rem"
              }}>
                Track project metrics and adjust predictions live
              </p>
            </div>
          </div>

          {/* CTA */}
          <div style={{ textAlign: "center" }}>
            <button style={{
              padding: "1rem 2rem",
              background: "linear-gradient(to right, #10b981, #059669)",
              color: "white",
              fontWeight: "600",
              borderRadius: "0.75rem",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s"
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              Get Notified When Available
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <p style={{
          textAlign: "center",
          color: "#94a3b8",
          marginTop: "2rem",
          fontSize: "0.875rem"
        }}>
          Our Digital Twin technology will revolutionize how you manage construction waste
        </p>
      </div>
    </div>
  );
}

export default DigitalTwin;