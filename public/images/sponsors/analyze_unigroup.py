import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open(r"C:\Users\Laptop Flash\Downloads\unigroup.html", "r", encoding="utf-8") as f:
    html = f.read()

print("Searching for occurrences of 'Uni' or 'Group' or 'logo' or 'tiếng Trung'...")
for m in re.finditer(r'([^\"]*(?:UniGroup|logo|TaiTro|Logo)[^\"]*)', html, re.IGNORECASE):
    print("Match:", m.group(0))

print("\n--- Surrounding context of 33-char IDs ---")
seen_ids = set()
for m in re.finditer(r'([a-zA-Z0-9_-]{33})', html):
    fid = m.group(1)
    if fid in seen_ids:
        continue
    seen_ids.add(fid)
    start = max(0, m.start() - 100)
    end = min(len(html), m.end() + 100)
    context = html[start:end].replace('\n', ' ')
    print(f"ID: {fid} | Context: {context}\n")
