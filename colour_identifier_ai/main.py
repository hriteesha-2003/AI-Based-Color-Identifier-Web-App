from fastapi import FastAPI
from backend.server_api import router as server_api
from backend.utils import load_model, extract_rgb
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.include_router(server_api, prefix="/api")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])   


