from bs4 import BeautifulSoup
import urllib.request as request
import requests
import xlwt

houseList = []

url = 'http://nj.rent.house365.com/district_i1/dl_x1.html'
    
headers = {
	"Accept": "application/json, text/javascript, */*; q=0.01",
	"Accept-Encoding": "gzip, deflate",
	"Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
	"Connection": "keep-alive",
	"Cookie": "new_sessionid=555847152; sessionguid=555847152%5E1601833417; _my_city=nj; Hm_lvt_951cc35d48efc1a61a321fa481114379=1572767909; __utmc=1; __utmz=1.1572767909.1.1.utmcsr=baidu|utmccn=(organic)|utmcmd=organic; PHPSESSID=liqt0v1ahpe413g2i9c15k1re3; website_jumpto_city=nj; new_todayfirst=false; new_bwlasttime=1572767917.425; new_guid=1601833417; __utmc=124532309; __utmz=124532309.1572767918.1.1.utmcsr=nj.house365.com|utmccn=(referral)|utmcmd=referral|utmcct=/; Hm_lvt_0b205a603c31227fef664277aedbf2c0=1572767918; lastpage=5%252C148http%253A//nj.rent.house365.com/district_i1/dl_x1.html; __utma=1.347992860.1572767909.1572767909.1572791189.2; __utmt=1; __utma=124532309.1650098225.1572767918.1572767918.1572791189.2; __utmt_t2=1; Hm_lpvt_951cc35d48efc1a61a321fa481114379=1572791386; __utmb=1.2.10.1572791189; __utmb=124532309.2.10.1572791189; Hm_lpvt_0b205a603c31227fef664277aedbf2c0=1572791507; bwlasttime=1572791507.054; lasttime=1572791507.054",
	"Host": "nj.rent.house365.com",
	"Referer": "http://nj.rent.house365.com/district_i1/dl_x1.html",
	"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36",
	"X-Requested-With": "XMLHttpRequest"	
}

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
def write_excel():
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, 'lxml')
    listLen = len(soup.find_all('dd', class_='listItem'))
    for titleHref in soup.find_all('dd', class_='listItem'):
        houseObj = {}
        imgs=titleHref.find_all('a')[0].find_all('img')
        houseObj['src'] = imgs[0].get('src')
        houseList.append(houseObj)

        print(houseList)
        f = xlwt.Workbook()        
        sheet1 = f.add_sheet('房源信息',cell_overwrite_ok=True)
        # row0 = ["姓名","年龄","出生日期","爱好"]
        row0 = ["小图片"]
        sheet1.write(0,0,row0[0],set_style('Times New Roman',220,True))
        for i in range(1, len(houseList) +1):
            sheet1.write(i,0,houseList[i-1]['src'],set_style('Times New Roman',220,True))

        f.save('test.xls')
if __name__ == '__main__':
    write_excel()
