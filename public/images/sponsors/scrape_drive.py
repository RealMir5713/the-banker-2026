import urllib.request
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

urls = {
    "SAPP": "https://drive.google.com/drive/folders/1X9p-FGK92jg85GweDW68OZWKXJNIG2WP",
    "Hemera": "https://drive.google.com/drive/folders/1HIL1NbrNNETTtitbbM_J-9qKYCJGDu3p",
    "UniGroup": "https://drive.google.com/drive/folders/1cQQU3c9LrXfpvegdoFEbzikAnpyL7gAv",
    "Onemore": "https://drive.google.com/drive/folders/1inp_iLu1iDycPTRLtVv2beUp9Q0UaIJ9"
}

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for name, url in urls.items():
    print(f"\n--- {name} ---")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response:
            html = response.read().decode('utf-8')
            # Look for file IDs in the page. Google Drive folder HTML usually contains file IDs inside JSON data
            # Pattern for Google Drive file IDs: 33 characters, alphanumeric, hyphens, underscores
            # e.g., 1x9... or 1HIL... or similar
            # Let's search for patterns like: /file/d/([a-zA-Z0-9_-]{28,45}) or standard IDs
            file_ids = set(re.findall(r'\"([a-zA-Z0-9_-]{28,40})\"', html))
            print(f"Found {len(file_ids)} possible IDs in HTML:")
            valid_ids = []
            for fid in file_ids:
                # We can check if it looks like a valid drive ID
                # Usually starts with '1' and contains uppercase, lowercase, digits
                if len(fid) == 33 and (fid.startswith('1') or fid.startswith('0')):
                    valid_ids.append(fid)
            print("Filtered valid IDs (len=33):", valid_ids)
    except Exception as e:
        print(f"Failed to fetch {url}: {e}")
