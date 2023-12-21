from flask import Flask, render_template, request, redirect, send_file, jsonify
import os
import pandas as pd
from pandas.api.types import is_numeric_dtype
import plotly
import plotly.graph_objects as go
import json

def plotly_Scatter(column1, column2, column1_name, column2_name, mode='markers', marker_size=5):
    fig = go.Figure()
    fig.add_trace(go.Scatter(x=column1, y=column2, mode=mode, marker_size=int(marker_size)))
    fig.update_layout(
        xaxis_title=column1_name, yaxis_title=column2_name
    )
    fig.show()

def plotly_Bar(column1, column2, column1_name, column2_name):
    fig = go.Figure()
    fig.add_trace(go.Bar(x=column1, y=column2))
    fig.update_layout(
        xaxis_title=column1_name, yaxis_title=column2_name
    )
    fig.show()

def plotly_Histogram(column1, column1_name):
    fig = go.Figure()
    fig.add_trace(go.Histogram(x=column1))
    fig.update_layout(
        xaxis_title=column1_name,
    )
    fig.show()

def plotly_Scatter3D(column1, column2, column3, column1_name, column2_name, column3_name, mode='markers'):
    fig = go.Figure()
    fig.add_trace(go.Scatter3d(x=column1, y=column2, z=column3, mode=mode))
    fig.update_layout(
        scene=dict(
            xaxis_title=column1_name, yaxis_title=column2_name, zaxis_title=column3_name
        )
    )
    fig.show()

app = Flask(__name__)
FILE_NAME = ''
TABLES = []
df = None

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    global FILE_NAME, TABLES, df
    if 'file' not in request.files:
        return redirect(request.url)
    file = request.files['file']
    if file:
        if not os.path.exists('uploads'):
            os.makedirs('uploads')
        filename = os.path.join('uploads', file.filename)
        file.save(filename)
        FILE_NAME = filename
    df = pd.read_csv(FILE_NAME)
    for i in df.columns:
        if is_numeric_dtype(df[i]):
            TABLES.append(i)
    return render_template('index.html', tables=TABLES)

@app.route('/generate', methods=['POST'])
def generate():
    data = json.loads(request.data.decode('utf-8'))
    plotLibrary = data["plotLibrary"]
    plotType = data["plotType"]
    mode = data.get("scatterMode", "")  
    size = data.get("markerSize", "")   
    tables = data["selectedTables"]
    print(plotLibrary, plotType, mode, size, tables)
    
    if plotLibrary == 'plotly':
        if plotType == "scatter":
            x = df[tables[0]]
            y = df[tables[1]]
            mode = mode
            size = size
            plotly_Scatter(x, y, tables[0], tables[1], mode, size)
            return
        elif plotType == "bar":
            x = df[tables[0]]
            y = df[tables[1]]
            plotly_Bar(x, y, tables[0], tables[1])
            return 
        elif plotType == "histogram":
            x = df[tables[0]]
            plotly_Bar(x, tables[0])
            return
        else:
            x = df[tables[0]]
            y = df[tables[1]]
            z = df[tables[2]]
            mode = mode
            plotly_Scatter3D(x, y, z, tables[0], tables[1], tables[2], mode)
            return
    else:
        return

if __name__ == '__main__':
    app.run()
