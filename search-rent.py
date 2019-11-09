from bs4 import BeautifulSoup
import requests
import xlwt
from urllib import request
import os
import re
from pprint import pprint

houseList = []

#设置表格样式
def set_style(name,height,bold=False):
    style = xlwt.XFStyle()
    font = xlwt.Font()
    font.name = name
    font.bold = bold
    font.color_index = 4
    font.height = height
    style.font = font
    return style

#写Excel 
def write_excel(url):
    response = requests.get(url, headers={})
    response.encoding = 'gb2312'
    soup = BeautifulSoup(response.text, 'lxml')

    listLen = len(soup.find_all('dd', class_='listItem'))

    # folder = ''

    # if not os.path.exists(folder):
    #    os.mkdir(folder)

    for titleHref in soup.find_all('dd', class_='listItem'):
        houseObj = {}
        imgs=titleHref.find_all('a')[0].find_all('img')
        houseObj['src'] = imgs[0].get('src')
        houseObj['title'] = imgs[0].get('alt')
        houseObj['address'] = titleHref.find_all('div', class_='item')[0].text
        houseObj['info'] = titleHref.find_all('div', class_='item')[1].text
        houseObj['owner'] = titleHref.find_all('div', class_='item')[2].text
        houseObj['price'] = titleHref.find_all('div', class_ = 'price')[0].text

        houseList.append(houseObj)

    # x = 0
    # for imgurl in houseList:
    #     request.urlretrieve(imgurl.get('src'), folder + '\%s.jpg' % x)
    #     x+=1

    f = xlwt.Workbook()        
    houseSheet = f.add_sheet('房源信息', cell_overwrite_ok=True)
    tableHeader = [
      {'code': 'title', 'name': '名称', 'width': 256 * 50 },
      {'code': 'address', 'name': '地址', 'width': 256 * 40 },
      {'code': 'info', 'name': '详情', 'width': 256 * 20 },
      {'code': 'owner', 'name': '房东', 'width': 256 * 40 },
      {'code': 'price', 'name': '价格', 'width': 256 * 20 },
    ]

    headIdx = 0
    for row in tableHeader:
        houseSheet.write(0, headIdx, row['name'], set_style('微软雅黑', 220, True))
        houseSheet.col(headIdx).width = row['width']
        headIdx += 1

    for i in range(1, len(houseList) + 1):
        colIdx = 0
        for row in tableHeader:
            houseSheet.write(i, colIdx, houseList[i-1][tableHeader[colIdx]['code']], set_style('微软雅黑', 220, False))
            colIdx += 1
 
    f.save('test.xls')

url = 'http://nj.rent.house365.com/district_i1/dl_x1.html'
write_excel(url)
