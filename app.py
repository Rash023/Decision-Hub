from flask import Flask, render_template, request, redirect, send_file
import pandas as pd
from io import BytesIO
import plotly.express as px

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return redirect(request.url)
    file = request.files['file']
    if file.filename == '':
        return redirect(request.url)
    if file:
        if file.filename.endswith('.csv'):
            df = pd.read_csv(file)
            return render_template('tables.html', tables=list(df.columns))
    return 'Invalid file format. Please upload a CSV file.'

@app.route('/process', methods=['POST'])
def process_data():
    table_name = request.form['table']
    option = request.form['option']
    if option == 'create_table':
        result_df = pd.DataFrame(columns=[table_name, 'Column1', 'Column2'])
    elif option == 'fetch_data':
        result_df = pd.DataFrame(columns=[table_name, 'Column1', 'Column2'])
    elif option == 'fetch_column_data':
        column_name = request.form['column']
        result_df = pd.DataFrame(columns=[table_name, column_name])
    elif option == 'bar_chart':
        fig = px.bar(result_df, x=table_name, y=column_name, title=f'Bar Chart for {column_name}')
        output_file = BytesIO()
        fig.write_image(output_file, format='png')
        output_file.seek(0)
        return send_file(output_file, as_attachment=True, download_name=f'{table_name}_{column_name}_bar_chart.png')
    elif option == 'histogram':
        fig = px.histogram(result_df, x=column_name, title=f'Histogram for {column_name}')
        output_file = BytesIO()
        fig.write_image(output_file, format='png')
        output_file.seek(0)
        return send_file(output_file, as_attachment=True, download_name=f'{table_name}_{column_name}_histogram.png')
    elif option in ['mean', 'count', 'average']:
        column_name = request.form['column']
        if option == 'mean':
            result_value = result_df[column_name].mean()
        elif option == 'count':
            result_value = result_df[column_name].count()
        elif option == 'average':
            result_value = result_df[column_name].sum() / result_df[column_name].count()
        return f"{option.capitalize()} for {column_name}: {result_value}"
    output_file = BytesIO()
    result_df.to_csv(output_file, index=False)
    output_file.seek(0)
    return send_file(output_file, as_attachment=True, download_name=f'{table_name}_output.csv')
if __name__ == '__main__':
    app.run(host='127.0.0.1',port='4000',debug=True)
