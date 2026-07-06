import urllib.request
import re
import html

url = "https://www.canva.com/design/DAG2f4N9Ad4/bYnTP1_zAWE4R9TVyRAg1A/edit"
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36'}
req = urllib.request.Request(url, headers=headers)

try:
    with urllib.request.urlopen(req) as response:
        content = response.read().decode('utf-8')
        # Canva escape characters could be HTML entities or slash escaped
        # Let's search for the preview url
        match = re.search(r'(https://document-export\.canva\.com/[^\s\"<>#]+preview/0001\.png[^\s\"<>#]*)', content)
        if match:
            img_url = html.unescape(match.group(1))
            # replace backslashes if any
            img_url = img_url.replace('\\u0026', '&').replace('\\', '')
            print("Found MCNA image URL:", img_url)
            
            dest = r"d:\Coding Fiverr\the-banker-2026\public\images\sponsors\mcna.png"
            urllib.request.urlretrieve(img_url, dest)
            print("Successfully downloaded mcna.png")
        else:
            print("Could not find the document-export URL in the Canva page.")
except Exception as e:
    print("Error:", e)
