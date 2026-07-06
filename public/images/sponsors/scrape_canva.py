import urllib.request
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

url = "https://www.canva.com/design/DAG2f4N9Ad4/bYnTP1_zAWE4R9TVyRAg1A/edit"
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36'}
req = urllib.request.Request(url, headers=headers)

try:
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
        print("HTML length:", len(html))
        # Let's search for image URLs in the html
        # Canva images often contain 'media.canva.com' or 'images.canva.com' or standard CDN paths
        image_urls = re.findall(r'(https://[^\"]*canva[^\"]*\.(?:png|jpg|jpeg|svg))', html, re.IGNORECASE)
        print("Found Canva image URLs:", list(set(image_urls)))
        
        # Let's search for other links
        links = re.findall(r'(https?://[^\s\"<>#]+)', html)
        print("First 20 links found:")
        for l in list(set(links))[:20]:
            print(l)
except Exception as e:
    print("Error:", e)
