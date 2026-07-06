import urllib.request
import ssl
import re

url = "https://twings.edu.vn"
# Ignore SSL verification
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36'}
req = urllib.request.Request(url, headers=headers)

try:
    with urllib.request.urlopen(req, context=ctx) as response:
        html = response.read().decode('utf-8')
        print("HTML length:", len(html))
        # Look for images
        images = re.findall(r'<img [^>]*src="([^"]+)"', html, re.IGNORECASE)
        print("Found images on TWings homepage:")
        for img in set(images):
            print(img)
            
        # Let's also look for logo specifically
        logo_imgs = [img for img in images if 'logo' in img.lower()]
        print("\nLogo images:")
        for l in set(logo_imgs):
            print(l)
except Exception as e:
    print("Error:", e)
