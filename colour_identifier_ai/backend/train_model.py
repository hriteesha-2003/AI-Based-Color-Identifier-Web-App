import pandas as pd
from sklearn.neighbors import KNeighborsClassifier
import pickle
import os

data_path = os.path.join('data', 'color_names.csv')
df = pd.read_csv(data_path)

df.columns = df.columns.str.strip()  
df.rename(columns={'Red (8 bit)': 'R',
    'Green (8 bit)': 'G',
    'Blue (8 bit)': 'B',
    'Name': 'color_name'}, inplace=True)

x= df[['R', 'G', 'B']]
y = df['color_name']

model = KNeighborsClassifier(n_neighbors=3)
model.fit(x, y)


os.makedirs('models', exist_ok=True)  
model_path = os.path.join('models', 'knn_color_model.pkl')
with open(model_path, 'wb') as file:
    pickle.dump(model, file)


print("Model trained and saved successfully at:", model_path)
