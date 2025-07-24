from PIL import Image
import numpy as np
import joblib
from io import BytesIO
from sklearn.cluster import KMeans
import os


def load_model():
    return joblib.load("backend/models/knn_color_model.pkl")


model = load_model()

def extract_rgb(image_bytes: bytes):
    image = Image.open(BytesIO(image_bytes)).convert('RGB')
    np_image = np.array(image)
    average_color = np.mean(np_image.reshape(-1, 3), axis=0)
    rgb = tuple(average_color)

    predicted_color = model.predict([rgb])[0]

    return predicted_color, rgb

def rgb_to_hex(rgb):
    r, g, b = [int(x) for x in rgb] 
    return '#{:02x}{:02x}{:02x}'.format(r, g, b)

