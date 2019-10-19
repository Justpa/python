from urllib import request
import chardet
import re

def getHtmlCode(path):
    html = request.urlopen(path).read().decode('gbk')
    reg = r'<li><a href="(.*?)" title=".*?">(.*?)</a></li>'
    reg = re.compile(reg)
    urls = re.findall(reg, html)
    for url in urls:
        chapter_url = url[0]
        chapter_title = url[1]
        chapter_html = request.urlopen(chapter_url).read().decode('gbk')
        chapter_reg = '</script>&nbsp;&nbsp;&nbsp;&nbsp;.*?<br />(.*?)<script type="text/javascript">'
        chapter_reg = re.compile(chapter_reg, re.S)
        chapter_content = re.findall(chapter_reg, chapter_html)
        for content in chapter_content:
            content.replace("&nbsp;&nbsp;&nbsp;&nbsp;","")
            content.replace("<br />", "")
            print(content)
            # f = open('{}.txt'.format(chapter_title), 'w')
            # f.write(content)

getHtmlCode("http://www.quanshuwang.com/book/44/44683")
