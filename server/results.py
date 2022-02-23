from flask import Flask
from flask import request
import pandas as pd;

app = Flask(__name__)

@app.route("/results", methods = ["POST"])
def readData():
    req = request.form['req']
    excel_file = "역대 대선 결과.xlsx"
    df = pd.read_excel(excel_file, sheet_name="{}대".format(req))
    json = df.to_json()
    return json

if __name__ == "__main__":
    app.run(debug=True)