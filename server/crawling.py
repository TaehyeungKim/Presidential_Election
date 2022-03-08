from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
from bs4 import BeautifulSoup
import re
import datetime
import pandas as pd;

driver = webdriver.Chrome('./chromedriver')
driver.implicitly_wait(10)
driver.get('http://info.nec.go.kr/main/showDocument.xhtml?electionId=0000000000&topMenuId=VC&secondMenuId=VCCP09')
driver.find_element(By.XPATH, value = '//*[@id="electionType1"]').click()

# 제19대 선택

elem = driver.find_element(By.XPATH, value = '//*[@id="electionName"]')
elem.send_keys('제19대')
time.sleep(0.5)

elem = driver.find_element(By.XPATH, value = '//*[@id="electionCode"]')
elem.send_keys('대통령선거')
time.sleep(0.5)

elem = driver.find_element(By.XPATH, value = '//*[@id="cityCode"]')
elem.send_keys('▷ 전 체')
time.sleep(0.5)

driver.find_element(By.XPATH, value = '//*[@id="searchBtn"]').click()
driver.implicitly_wait(10)

html = driver.page_source
soup = BeautifulSoup(html, 'html.parser')
table = soup.find('table', id = 'table01')
tableHead = table.find('thead')
nameCol = tableHead.find_all('tr')[2]
nameArr = nameCol.find_all('th')
col = ['시도명', '선거인수', '투표수']

for i in nameArr:
    toStr = str(i)
    replace = toStr.replace('<br/>', '_')
    name = re.sub('<.+?>','',replace)
    col.append(name)

tableBody = table.find('tbody')
tr = tableBody.find_all('tr')

numArr = []
for x in range(len(tr)):
    arr = []
    if((x % 2) == 0):
        num = tr[x].find_all('td')
        for j in num: 
            strWoTag = str(j)
            pureNum = re.sub('<.+?>','',strWoTag)
            arr.append(pureNum)
        numArr.append(arr)
    

raw_data = {}
for index in range(len(col)):
    data = []
    for arr in numArr:
        data.append(arr[index])
    raw_data[col[index]] = data

df = pd.DataFrame(raw_data)
file_path = './20대_개표현황.xlsx'
# timeNow = datetime.datetime.now()
df.to_excel(file_path, sheet_name='20대', na_rep='',header=True, index=False)
print('write success')