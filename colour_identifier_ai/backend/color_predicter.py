import pickle
import os

model_path = os.path.join('models', 'knn_color_model.pkl')

with open(model_path, 'rb') as file:
    model = pickle.load(file)

print("Model loaded successfully from:", model_path)
print(model)

def predict_colour(r,g,b):
    colour = model.predict([[r,g,b]])
    return colour[0]

if __name__ == "__main__":
    r = int(input("Enter Red value (0-255): "))
    g = int(input("Enter Green value (0-255): "))
    b = int(input("Enter Blue value (0-255): "))
    
    predicted_colour = predict_colour(r, g, b)
    print(f"The predicted color name is: {predicted_colour}")