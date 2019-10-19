from urllib import request
import chardet
import re

def getImgs(url):
    response = request.urlopen(url)
    page = response.read()
    print(chardet.detect(page))

    reg_img = re.compile('src="(.+?\.jpg)"')
    imglist = reg_img.findall(page.decode('utf-8'))

    x = 0

    for img in imglist:
        print(img)
        request.urlretrieve(img, '%s.jpg'  % x)
        x += 1

#getImgs('http://xxx.com')
