from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
from PIL import Image
import io
import numpy as np
from sklearn.cluster import KMeans
import webcolors
from .utils import load_model, extract_rgb, rgb_to_hex

router = APIRouter()
model = load_model()

# @router.post("/predict-color/")
# async def predict_color(file: UploadFile = File(...)):
#     contents = await file.read()
#     color_name, rgb = extract_rgb(contents)
#     return {
#         "color_name": color_name,
#         "rgb": rgb
#     }
@router.post("/closest-color")
async def close_colour(file:UploadFile = File(...),num_colors:int = 8):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert('RGB')
    image = image.resize((100, 100))
    pixels = np.array(image).reshape(-1, 3)
    kmeans = KMeans(n_clusters=num_colors, random_state=0).fit(pixels)
   

    colors= kmeans.cluster_centers_
    hex_colors = [rgb_to_hex(rgb) for rgb in colors]
    result=[]
    for rgb in colors:
        rgb_tuple = tuple(int(x) for x in rgb)  
        color_name = str(model.predict([rgb_tuple])[0])  
        result.append({
            "color_name": color_name,
            "rgb": tuple(rgb),
            "hex": rgb_to_hex(tuple(rgb))
        })
    return {"colors": result} 