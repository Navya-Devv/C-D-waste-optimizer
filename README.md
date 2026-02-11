Sustainable Urban Construction Data Pipeline
Waste Prediction for the Indian Construction Sector

A hybrid, statistically grounded framework for predicting construction material wastage in data-scarce environments.

This project combines limited real-world procurement records with controlled synthetic augmentation to enable reliable exploratory modeling, benchmarking, and decision-support for sustainable construction planning.

🔍 Problem

Construction projects in India often lack standardized material wastage reporting.
The absence of structured datasets limits reliable forecasting, optimization, and sustainability assessment.

⚙️ Solution

We propose a reproducible data pipeline that:

Cleans and validates procurement records using physical feasibility constraints

Expands coverage through controlled bootstrap-based synthetic augmentation

Introduces a relevance-based extrapolation confidence metric

Trains material-specific XGBoost regression models for waste percentage prediction

Materials modeled:

Steel

Cement

Granite

Sand

Bricks

📊 Key Features

Statistically consistent synthetic dataset (~600–700 records per material)

Non-linear waste modeling via XGBoost

Extrapolation confidence scoring

Lightweight decision-support architecture for early-stage planning

🏗️ Deployment Vision

Designed as a client–server advisory system where engineers input project parameters and receive:

Estimated waste percentage

Waste quantity projections

Scenario-based procurement insights

Supports proactive material optimization instead of post-construction auditing.

🌍 Sustainability Impact

Aligned with SDG-11 (Sustainable Cities & Communities) by enabling data-driven waste reduction and resource-efficient construction practices.

⚠️ Note

This framework operates under partially synthetic augmentation and is intended for exploratory modeling and benchmarking — not deterministic forecasting.

👥 Authors

R. V. College of Engineering (RVCE), Bengaluru

Rajeswara Rao K. V. S.
Ishan Kumar
Navya Madiraju
Anant Ahlawat
Aayush Pandey
