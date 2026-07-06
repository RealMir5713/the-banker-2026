import urllib.request
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

folders = {
    "UniWrite": "1nRaENUTLAIIbzpcWi_BNZ-oKDaibUJQW",
    "10Education": "18D2dyszZxxC-2ntmAMzbndjojUjAowUE",
    "TheToeicLab": "17ZcOP0KJDedrcCD_VnspwLo4SdZmUq_2",
    "86HSK": "1ZJdEKaRhspHast6jozYnojqGS3YnfX48",
    "GiớiThiệu": "1n880pTj4HUxUmALssYy4YzM9NrolILDX"
}

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for name, fid in folders.items():
    url = f"https://drive.google.com/drive/folders/{fid}"
    print(f"\n--- Scraping {name} ({fid}) ---")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response:
            html = response.read().decode('utf-8')
            # Look for 33-character IDs
            ids = set(re.findall(r'\"([a-zA-Z0-9_-]{33})\"', html))
            print(f"Found IDs in {name}:", list(ids))
            
            # Look for filenames
            filenames = re.findall(r'\"([^\"]+\.(?:png|jpg|jpeg|svg|gif))\"', html, re.IGNORECASE)
            print(f"Found filenames in {name}:", list(set(filenames)))
    except Exception as e:
        print(f"Failed for {name}: {e}")
