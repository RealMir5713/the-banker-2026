import urllib.request
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

url = "https://drive.google.com/drive/folders/1cQQU3c9LrXfpvegdoFEbzikAnpyL7gAv"
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
        # Print file name patterns or matches
        # In Google Drive folder page HTML, filenames are usually present in JSON arrays like ["filename.png", "image/png", ...]
        # Let's search for filenames with extensions png, jpg, jpeg, svg
        matches = re.findall(r'\"([^\"]+\.(?:png|jpg|jpeg|svg|gif))\"', html, re.IGNORECASE)
        print("Found file names in UniGroup folder HTML:", list(set(matches)))
        
        # Let's also print all occurrences of drive IDs that are 33 characters and look at their surrounding text
        # Let's extract blocks of text around potential 33-char IDs
        potential_ids = re.findall(r'([a-zA-Z0-9_-]{33})', html)
        potential_ids = list(set(potential_ids))
        print("Potential IDs found:", potential_ids)
except Exception as e:
    print("Error:", e)
