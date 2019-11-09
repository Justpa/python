
from urllib import request
import os
import re
import chardet

def saveImg(url, folder):
    page = request.urlopen(url)
    html = page.read()
    encode_type = chardet.detect(html)
    html = html.decode(encode_type['encoding'])

    if not os.path.exists(folder):
       os.mkdir(folder)

    imglist = re.findall(re.compile('src="(.+?\.jpg)" alt='), html)
    x = 0
    for imgurl in imglist:
        request.urlretrieve(imgurl, folder + '\%s.jpg' % x)
        x+=1
    return imglist

url = "http://pic.yxdown.com/list/0_0_1.html"
folder =  #绝对路径
saveImg(url, folder)
