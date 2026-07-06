import urllib.request
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

url = "https://tntalent.vn"
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36'}
req = urllib.request.Request(url, headers=headers)

try:
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
        # Search for logo or images
        images = re.findall(r'<img [^>]*src="([^"]+)"', html, re.IGNORECASE)
        print("TNTalent Images:")
        for img in set(images):
            if 'logo' in img.lower():
                print("Logo match:", img)
except Exception as e:
    print("Error:", e)
