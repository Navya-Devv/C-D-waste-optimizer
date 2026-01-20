import React from "react";
import Navbar from "../components/Navbar";

const MATERIALS = [
  { name: "Granite", link: "/granite", icon: "🪨" },
  { name: "Loose Cement", link: "/loose", icon: "🏗️" },
  { name: "Steel", link: "/steel", icon: "⚙️" },
  { name: "RCC & HDPE", link: "/rcc", icon: "🔧" },
  { name: "Dataset", link: "/dataset", icon: "📊" }
];

export default function Landing() {
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
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
          min-height: 100vh;
          overflow-x: hidden;
        }

        .container {
          max-width: 1400px;
          margin: auto;
          padding: 60px 24px 80px;
        }

        .hero {
          text-align: center;
          margin-bottom: 80px;
          position: relative;
        }

        .title {
          font-size: 64px;
          font-weight: 900;
          background: linear-gradient(135deg, #ffffff, #a8dadc, #1abc9c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 24px;
          line-height: 1.2;
          animation: fadeInUp 0.8s ease-out;
          letter-spacing: -1px;
        }

        .subtitle {
          max-width: 720px;
          margin: 0 auto 40px;
          color: #282d3aff;
          font-size: 20px;
          line-height: 1.6;
          animation: fadeInUp 0.8s ease-out 0.2s backwards;
          font-weight: 300;
        }

        .stats-bar {
          display: flex;
          justify-content: center;
          gap: 60px;
          margin-top: 40px;
          animation: fadeInUp 0.8s ease-out 0.4s backwards;
        }

        .stat {
          text-align: center;
        }

        .stat-number {
          font-size: 36px;
          font-weight: 800;
          color: #1abc9c;
          display: block;
        }

        .stat-label {
          font-size: 14px;
          color: #299293ff;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 8px;
        }

        .materials {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 32px;
          margin-bottom: 100px;
        }

        .card {
          background: linear-gradient(135deg, rgba(248, 250, 252, 0.95), rgba(241, 245, 249, 0.95));
          padding: 40px 32px;
          border-radius: 20px;
          text-align: center;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          text-decoration: none;
          color: #1e293b;
          border: 2px solid transparent;
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(26, 188, 156, 0.2), transparent);
          transition: left 0.5s;
        }

        .card:hover::before {
          left: 100%;
        }

        .card:hover {
          transform: translateY(-12px) scale(1.02);
          border-color: #1abc9c;
          box-shadow: 0 25px 50px rgba(26, 188, 156, 0.3);
        }

        .card-icon {
          font-size: 56px;
          margin-bottom: 16px;
          display: inline-block;
          transition: transform 0.3s ease;
        }

        .card:hover .card-icon {
          transform: scale(1.2) rotate(5deg);
        }

        .card-title {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .impact {
          background: linear-gradient(135deg, rgba(255,255,255,0.98), rgba(248,250,252,0.98));
          padding: 80px;
          border-radius: 32px;
          box-shadow: 0 30px 80px rgba(0,0,0,0.3);
          position: relative;
          overflow: hidden;
        }

        .impact::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -10%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(26, 188, 156, 0.1), transparent);
          border-radius: 50%;
        }

        .impact h2 {
          text-align: center;
          font-size: 42px;
          margin-bottom: 48px;
          color: #1e293b;
          font-weight: 800;
          position: relative;
          padding-bottom: 20px;
        }

        .impact h2::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 4px;
          background: linear-gradient(90deg, #1abc9c, #a8dadc);
          border-radius: 2px;
        }

        .impact p {
          font-size: 18px;
          line-height: 2;
          color: #475569;
          margin-bottom: 28px;
          position: relative;
          padding-left: 24px;
          border-left: 3px solid #1abc9c;
        }

        .impact p strong {
          color: #1abc9c;
          font-weight: 700;
        }

        .highlight-box {
          background: linear-gradient(135deg, #1abc9c, #16a085);
          color: white;
          padding: 32px;
          border-radius: 16px;
          margin-top: 40px;
          text-align: center;
          box-shadow: 0 15px 40px rgba(26, 188, 156, 0.3);
        }

        .highlight-box p {
          border: none;
          padding: 0;
          margin: 0;
          color: white;
          font-size: 19px;
          font-weight: 500;
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

        @media (max-width: 768px) {
          .title { 
            font-size: 42px; 
          }
          
          .subtitle {
            font-size: 18px;
          }
          
          .stats-bar {
            flex-direction: column;
            gap: 30px;
          }
          
          .impact { 
            padding: 40px 28px; 
          }
          
          .impact h2 {
            font-size: 32px;
          }
          
          .materials {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="container">
        <div className="hero">
          <h1 className="title">Turning Debris into Opportunity</h1>
          <p className="subtitle">
            Every brick, every beam, every fragment holds potential. Discover how construction waste becomes tomorrow's building blocks.
          </p>
          
          <div className="stats-bar">
            <div className="stat">
              <span className="stat-number">30%</span>
              <span className="stat-label">Global Waste</span>
            </div>
            <div className="stat">
              <span className="stat-number">150M</span>
              <span className="stat-label">Tonnes/Year</span>
            </div>
            <div className="stat">
              <span className="stat-number">$363B</span>
              <span className="stat-label">Market by 2033</span>
            </div>
          </div>
        </div>

        <div className="materials">
          {MATERIALS.map(item => (
            <a href={item.link} key={item.name} className="card">
              <div className="card-icon">{item.icon}</div>
              <div className="card-title">{item.name}</div>
            </a>
          ))}
        </div>

        <section className="impact">
          <h2>The Hidden Crisis in Plain Sight</h2>

          <p>
            Picture this: mountains of concrete, twisted steel, shattered bricks—rising higher each day. 
            The construction industry generates nearly <strong>30% of all solid waste globally</strong>, 
            and in India, we're talking about <strong>150 million tonnes</strong> annually. 
            That's roughly equivalent to the weight of 25,000 Eiffel Towers. Every. Single. Year.
          </p>

          <p>
            Here's where it gets uncomfortable: less than <strong>1%</strong> gets recycled. 
            The remaining 99%? It chokes our landfills, pollutes our rivers, and accumulates in 
            illegal dumps—creating environmental time bombs in communities that can least afford them. 
            We're literally burying treasure while paying for the privilege.
          </p>

          <p>
            But there's a plot twist. India's C&D recycling market is exploding—from 
            <strong> USD 245.4 billion in 2024</strong> to a projected 
            <strong> USD 362.9 billion by 2033</strong>. The opportunity is massive, the need is urgent, 
            and the technology exists.
          </p>

          <div className="highlight-box">
            <p>
              What's missing? A bridge between waste and reuse. That's exactly what we're building here—a smarter, circular construction ecosystem where waste isn't the end of the story, but the beginning of something valuable.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}