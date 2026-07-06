import urllib.request
import os

os.makedirs(r"d:\Coding Fiverr\the-banker-2026\public\images\sponsors", exist_ok=True)

# Test the correct ID for edu2review_2
edu2review_2_url = "https://drive.google.com/uc?export=download&id=1MlnAEpJN9b_JyfzARH1sf1MLVVJB8RD0"
try:
    urllib.request.urlretrieve(edu2review_2_url, r"d:\Coding Fiverr\the-banker-2026\public\images\sponsors\edu2review_2.png")
    print("Downloaded edu2review_2.png successfully.")
except Exception as e:
    print("Failed to download edu2review_2.png:", e)

# Let's inspect the potential file IDs for other sponsors
test_ids = {
    "SAPP": ['1L_TMugcm6jnX5lQqdgosRLHE0BUeyq2d', '1u55RcrheaQUTh_Ay51_vq1sWtVm0Srf1', '1QHOg9fIOSr77fCF-WxV88eAAniax5-MQ', '1Cc-I_blg_0FZVE96vPX29vQ7U2IMIfdC'],
    "Hemera": ['1dKzZkIvp9MiIZtLUVWPXhShvNDuIooFh', '14JrOmq3xlQHGerOTASW5GPfNn8VsZpaV', '1_McKsqUd1FRqA4fzJQyRJsVZfei3U_1s', '1TZC2oLyRmpsJvLoSoPwOkwJc01eCet5j', '1YYv2xwL1R7nYb4nT1y9dkSO4qxim8_b1', '1yb_psuJyMsb1SGtqe4COAThdN3GLkVYF'],
    "UniGroup": ['1nRaENUTLAIIbzpcWi_BNZ-oKDaibUJQW', '1ZJdEKaRhspHast6jozYnojqGS3YnfX48', '18D2dyszZxxC-2ntmAMzbndjojUjAowUE', '17ZcOP0KJDedrcCD_VnspwLo4SdZmUq_2'],
    "Onemore": ['1eNS2UL_0_js5-bFrhQb-3NKk5tCfgDt-', '1brZpvvjS8CSMDl7uAyqGtf6I5qq9EliT', '1FRsS-eS4h8twPz1Sj5MxRAM6KcVlbFt8', '1Xf2BNyJP_quYQkk9KjU301Tg2X2Ni5Kk', '1dE4W38Mil-6Fqzvl6SdDNa8HjxUo-46N', '1yGfsvU6zo6yD-f8BIUs40ECiO1kflFuL', '1CaH5oYAGzzxEJRbB_L3x39GWjLEnDrc-']
}

for name, ids in test_ids.items():
    print(f"\n--- Testing IDs for {name} ---")
    for fid in ids:
        url = f"https://drive.google.com/uc?export=download&id={fid}"
        temp_dest = os.path.join(r"d:\Coding Fiverr\the-banker-2026\public\images\sponsors", f"temp_{name}_{fid}")
        try:
            # Send a request to get headers first to check content type/size without downloading whole file if it is huge
            req = urllib.request.Request(url, method='HEAD')
            with urllib.request.urlopen(req) as resp:
                info = resp.info()
                content_type = info.get_content_type()
                print(f"ID {fid} content type: {content_type}")
            
            # Download file
            urllib.request.urlretrieve(url, temp_dest)
            
            # Check file size
            size = os.path.getsize(temp_dest)
            if size == 0:
                os.remove(temp_dest)
                continue
                
            # Read first few bytes to check if it's an image
            with open(temp_dest, 'rb') as f:
                header = f.read(16)
                
            is_image = False
            ext = ""
            if header.startswith(b'\x89PNG\r\n\x1a\n'):
                is_image = True
                ext = ".png"
            elif header.startswith(b'\xff\xd8\xff'):
                is_image = True
                ext = ".jpg"
            elif b'svg' in header.lower() or b'<svg' in header.lower():
                is_image = True
                ext = ".svg"
            elif header.startswith(b'GIF87a') or header.startswith(b'GIF89a'):
                is_image = True
                ext = ".gif"
                
            if is_image:
                final_name = f"{name.lower()}{ext}"
                final_dest = os.path.join(r"d:\Coding Fiverr\the-banker-2026\public\images\sponsors", final_name)
                # If file already exists, we could keep it or rename it if we want multiple
                if os.path.exists(final_dest):
                    # add index
                    idx = 1
                    while os.path.exists(os.path.join(r"d:\Coding Fiverr\the-banker-2026\public\images\sponsors", f"{name.lower()}_{idx}{ext}")):
                        idx += 1
                    final_dest = os.path.join(r"d:\Coding Fiverr\the-banker-2026\public\images\sponsors", f"{name.lower()}_{idx}{ext}")
                
                os.rename(temp_dest, final_dest)
                print(f"-> SUCCESS: ID {fid} is an image! Saved to {final_dest} ({size} bytes)")
            else:
                # print a bit of content
                print(f"-> Not an image. Starts with: {header} ({size} bytes)")
                os.remove(temp_dest)
        except Exception as e:
            print(f"Failed for ID {fid}: {e}")
            if os.path.exists(temp_dest):
                os.remove(temp_dest)
