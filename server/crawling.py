from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
from bs4 import BeautifulSoup
import re
import datetime
import pandas as pd;

chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument('--headless')
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--single-process')
chrome_options.add_argument("--disable-dev-shm-usage")

driver = webdriver.Chrome('./chromedriver', options=chrome_options)
driver = webdriver.Chrome('./chromedriver')
driver.implicitly_wait(10)
driver.get('http://info.nec.go.kr/main/showDocument.xhtml?electionId=0020220309&topMenuId=VC&secondMenuId=VCCP09')
driver.find_element(By.XPATH, value = '//*[@id="electionId1"]').click()

def crawling(city):

    elem = driver.find_element(By.XPATH, value = '//*[@id="cityCode"]')
    elem.send_keys(city)
    time.sleep(0.5)

    driver.find_element(By.XPATH, value = '//*[@id="spanSubmit"]/input').click()
    driver.implicitly_wait(10)

    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')
    table = soup.find('table', id = 'table01')
    tableBody = table.find('tbody')
    tr = tableBody.find_all('tr')

    # making dataframe column
    first_tr = tr[0]
    td = first_tr.find_all('td')
    if city == '▷ 전 체':
        col = ['시도명', '선거인수', '투표수']
    else:
        col = ['구시군명', '선거인수', '투표수']

    for i in range(3,16):
        raw_tag = td[i]
        toStr = str(raw_tag)
        replace = toStr.replace('<br/>', '_')
        name = re.sub('<.+?>','',replace)
        col.append(name)
    col.append('개표율')

    # writing data
    numArr = []
    for x in range(len(tr)):
        arr = []
        if((x % 2) == 1):
            num = tr[x].find_all('td')
            for j in num: 
                strWoTag = str(j)
                pureNum = re.sub('<.+?>','',strWoTag)
                pureNum_up = re.sub('\s.+?','',pureNum)
                arr.append(pureNum_up)
            numArr.append(arr)
        

    raw_data = {}
    for index in range(len(col)):
        data = []
        for arr in numArr:
            if index != (len(col)-1):
                data.append(arr[index])
            elif index == (len(col)-1):
                data.append(arr[-1])
            raw_data[col[index]] = data

    df = pd.DataFrame(raw_data)
    file_path = './20대_개표현황.xlsx'
    if city == '▷ 전 체':
        city = '전국'
    elif city == '전라남도':
        city = '전남'
    elif city == '전라북도':
        city = '전북'
    elif city == '경상남도':
        city = '경남'
    elif city == '경상북도':
        city = '경북'
    elif city == '충청남도':
        city = '충남'
    elif city == '충청북도':
        city = '충북'
    city = re.sub('특별시', '', city)
    city = re.sub('광역시', '', city)
    city = re.sub('특별자치시','',city)
    city = re.sub('도', '', city) 
    city = re.sub('특별자치도', '', city)
    with pd.ExcelWriter(file_path, mode="a", engine="openpyxl", if_sheet_exists="replace") as writer:    
        df.to_excel(writer, sheet_name="{}".format(city), na_rep ='', header=True, index=False)  

cityArr = ['▷ 전 체', '서울특별시', '부산광역시', '대구광역시', '인천광역시', '광주광역시', '대전광역시', '울산광역시', '세종특별자치시', '경기도', '강원도', '충청남도', '충청북도', '전라북도', '전라남도', '경상북도', '경상남도', '제주특별자치도']
for city in cityArr:
    crawling(city)
print('write success')