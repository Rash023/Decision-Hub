from flask import Flask, render_template, request, redirect, url_for
import os
import sqlite3
import google.generativeai as genai
from dotenv import load_dotenv
import jsonify

load_dotenv()

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
DB_INFO = ''  
FILE_NAME = ''

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() == 'db'

def execute(filename):
    global DB_INFO  
    con = sqlite3.connect(filename)
    cursor = con.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cursor.fetchall()
    for table in tables:
        table_name = table[0]
        cursor.execute(f'PRAGMA table_info({table_name})')
        columns_info = cursor.fetchall()

        if not columns_info:
            print(f"No information available for table '{table_name}'.")
            continue

        table_info_string = f"Table: {table_name}\n"
        table_info_string += f"Column information for table '{table_name}':\n"
        
        for column_info in columns_info:
            column_name = column_info[1]
            data_type = column_info[2]
            table_info_string += f"  {column_name}, Data Type: {data_type}\n"

        cursor.execute(f"PRAGMA foreign_key_list({table_name});")
        foreign_keys = cursor.fetchall()

        table_info_string += f"Foreign Key information for table '{table_name}':\n"
        for fk in foreign_keys:
            table_info_string += f"  Foreign Key: {fk[3]} references {fk[2]}({fk[4]})\n"

        DB_INFO += table_info_string

@app.route('/')
def index():
    return render_template('index.html')

def execute(filename):
    tables_info = {}  # Store the tables and their columns
    con = sqlite3.connect(filename)
    cursor = con.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = [table[0] for table in cursor.fetchall()]

    for table in tables:
        cursor.execute(f'PRAGMA table_info({table})')
        columns_info = cursor.fetchall()
        columns = [column[1] for column in columns_info]
        tables_info[table] = columns

    return tables_info  # Return the tables and their columns

@app.route('/upload', methods=['POST'])
def upload_file():
    global FILE_NAME
    if 'file' not in request.files:
        return redirect(url_for('index'))

    file = request.files['file']

    if file.filename == '':
        return redirect(url_for('index'))

    if file and allowed_file(file.filename):
        if not os.path.exists('uploads'):
            os.makedirs('uploads')
        filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filename)
        tables_info = execute(filename)
        FILE_NAME = filename
        return render_template('index.html', message="File uploaded successfully!", filename=file.filename, tables_info=tables_info)

    return redirect(url_for('index'))

@app.route('/generate_query', methods=['POST'])
def generate_query():
    global DB_INFO
    if 'query' in request.form:
        user_query = request.form['query']
        generated_query = get_query(user_query)
        modified_query = generated_query[6:-3]
        return render_template('index.html', message="Query generated successfully!", generated_query=modified_query)
    return redirect(url_for('index'))

@app.route('/apply_query', methods = ['POST'])
def execute_query():
    global FILE_NAME
    if 'query' in request.form:
        query = request.form['query']
        con = sqlite3.connect(FILE_NAME)
        cursor = con.cursor()
        cursor.execute(query)
        data = cursor.fetchall()
        print(data)
        return render_template('result.html', data=data)


@app.route('/col_info/<table>')
def col_info(table):
    try:
        con = sqlite3.connect(FILE_NAME)
        cursor = con.cursor()
        cursor.execute(f'PRAGMA table_info({table})')
        columns_info = cursor.fetchall()
        columns = [column[1] for column in columns_info]
        return render_template('col_info.html', columns=columns)
    except Exception as e:
        print(f"Error fetching column information for table {table}: {str(e)}")

@app.route('/get_columns/<table>')
def get_columns(table):
    try:
        con = sqlite3.connect(FILE_NAME)
        cursor = con.cursor()
        cursor.execute(f'PRAGMA table_info({table})')
        columns_info = cursor.fetchall()
        columns = [column[1] for column in columns_info]
        return jsonify({'columns': columns})
    except Exception as e:
        print(f"Error fetching columns for table {table}: {str(e)}")
        return jsonify({'error': 'Internal Server Error'}), 500


def get_query(query):
    api_key = os.getenv("API_KEY")
    genai.configure(api_key=api_key)
    model_text = genai.GenerativeModel('gemini-pro')
    initial_text = "Here is my database info."
    question_text = f"Please generate me a SQL Query for this database for the following user query: {query}. I need just the query"
    response_text = model_text.generate_content(initial_text + DB_INFO + question_text)
    print(response_text.text)
    return response_text.text

if __name__ == '__main__':
    app.run()
