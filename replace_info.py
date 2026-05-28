import os
import re

replacements = {
    "Ujjwal": "Ujjwal Kumar",
    "Zain Ahmad": "Ujjwal Kumar",
    "zainahmadfahrezi": "uxzwal",
    "zain-portofolio": "uzxwal",
    "ZainAhmadF28": "uxzwal",
    "zainahmadf28": "uxzwal",
    "zain.ahmadf": "uxzwal",
    "zainahmad.f": "uxzwal",
    "www.zainahmadfahrezi.me": "uxzwal.dev",
    "ZAINFIX": "id-card",
    "zain-ahmad-fahrezi-7a8a912a7": "uxzwal",
    "Junior Web Developer": "DevOps Engineer",
    "JUNIOR WEB DEVELOPER": "DEVOPS ENGINEER"
}

def process_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except UnicodeDecodeError:
        return
    
    new_content = content
    for old, new in replacements.items():
        # case insensitive replacement for some
        new_content = new_content.replace(old, new)
        
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk('.'):
    if '.git' in root or 'node_modules' in root:
        continue
    for file in files:
        if file.endswith(('.jsx', '.js', '.html', '.md', '.json')):
            process_file(os.path.join(root, file))
