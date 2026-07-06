import urllib.request

url = "https://drive.google.com/drive/folders/1cQQU3c9LrXfpvegdoFEbzikAnpyL7gAv"
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
req = urllib.request.Request(url, headers=headers)

try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8')
        with open(r"C:\Users\Laptop Flash\Downloads\unigroup.html", "w", encoding="utf-8") as f:
            f.write(html)
        print("Wrote unigroup.html successfully.")
except Exception as e:
    print("Error:", e)
