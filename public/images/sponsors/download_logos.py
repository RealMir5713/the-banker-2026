import urllib.request
import os

os.makedirs(r"d:\Coding Fiverr\the-banker-2026\public\images\sponsors", exist_ok=True)

files = {
    "tocotoco.png": "18Juf66rFnQLBH2W3dnONMA8e9OEtF91N",
    "edu2review_1.png": "1-KoQTiwgVaZTn9HsKDaAxJElWoxjiWY2",
    "edu2review_2.png": "MlnAEpJN9b_JyfzARH1sf1MLVVJB8RD0"
}

for filename, file_id in files.items():
    url = f"https://drive.google.com/uc?export=download&id={file_id}"
    dest = os.path.join(r"d:\Coding Fiverr\the-banker-2026\public\images\sponsors", filename)
    print(f"Downloading {filename} from {url}...")
    try:
        urllib.request.urlretrieve(url, dest)
        print(f"Saved to {dest}")
    except Exception as e:
        print(f"Failed to download {filename}: {e}")
