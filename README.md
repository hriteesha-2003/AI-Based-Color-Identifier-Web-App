# 🎨 AI-Based Color Identifier Web App

This project is a **Color Detection AI Web App** using **ReactJS** (Frontend) and **FastAPI** (Backend). It allows users to upload an image and identifies the most dominant colors using AI/ML, visualizing the result with a pie chart and providing HEX codes and color names.

---

## 🌟 Features

- 📤 Upload an image
- 🧠 AI detects dominant colors using KMeans clustering
- 🌈 Shows HEX code, color name, and percentage
- 📊 Pie chart visualization
- 🔢 User input: how many top colors to show
- 📥 Download detected color palette as `.txt`

---

## 🧰 Tech Stack

### Frontend:
- ReactJS
- Chart.js
- Axios
- Tailwind CSS

### Backend:
- FastAPI
- Python
- OpenCV
- NumPy
- scikit-learn
- webcolors

---

## 📁 Project Structure
📦 color-identifier-front  (React Frontend)
├── 📂 src
│   ├── logo.svg
│   ├── reportWebVitals.js
│   ├── setupTests.js
│   └── ...
├── package.json
└── README.md

📦 colour_identifier_ai  (FastAPI Backend)
├── 📂 backend
│   ├── 📂 data
│   └── 📂 models
│       ├── train_model.py
│       ├── server_api.py
│       └── utils.py
├── main.py
├── .env
├── requirements.txt
└── README.md

---

## 🚀 How It Works

1. **Upload an image** from the UI
2. Image is sent to FastAPI backend
3. Image is processed with OpenCV & NumPy
4. KMeans finds the top N dominant colors
5. Each color is matched to its closest name (webcolors)
6. The result is returned to React
7. Pie chart + palette cards are shown
8. User can download color details as `.txt`

---

## ⚙️ How to Run Locally

### 🖥️ Backend (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate    # For Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
cd frontend
npm install
npm start

