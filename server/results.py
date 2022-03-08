from flask import Flask
from flask import request
import pandas as pd;
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
from bs4 import BeautifulSoup
import re
import datetime

app = Flask(__name__)

@app.route("/results", methods = ["POST"])
def readData():
    req = request.form['req']
    excel_file = "역대 대선 결과.xlsx"
    df = pd.read_excel(excel_file, sheet_name="{}대".format(req))
    json = df.to_json()
    return json

@app.route("/detail", methods=["POST"])
def readDetailData():
    year = request.form['year']
    region = request.form['region']
    excel_file = "{}대_지역별.xlsx".format(year)
    df = pd.read_excel(excel_file, sheet_name="{}".format(region))
    json = df.to_json()
    return json
    
@app.route("/current", methods=["POST"])
def readCurrentData():
    excel_file = "20대_개표현황.xlsx"
    df = pd.read_excel(excel_file, sheet_name = "전국")
    json = df.to_json()
    return json

@app.route("/currentdetail", methods = ["POST"])
def readCurrentDetailData():
    region = request.form['region']
    excel_file = "20대_개표현황.xlsx"
    df = pd.read_excel(excel_file, sheet_name = "{}".format(region))
    json = df.to_json()
    return json


if __name__ == "__main__":
    app.run(debug=True)