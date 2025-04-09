import requests
from bs4 import BeautifulSoup
import json

url = "https://www.etu.edu.tr/tr/bolum/yapay-zeka-muhendisligi/ders-mufredati"
response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')

dersler = []

for row in soup.find_all('tr'):
    columns = row.find_all('td')
    if len(columns) >= 2:
        ders_kodu = columns[0].text.strip()
        ders_adi = columns[1].text.strip()
        ders_kredi = columns[2].text.strip()

        # Boş veya başlık satırlarını atla
        if ders_kodu and ders_kodu != "Dersin Kodu":
            dersler.append({"code": ders_kodu, "name": ders_adi, "credit": ders_kredi})

# JSON çıktısı
with open('dersler.json', 'w', encoding='utf-8') as f:
    json.dump(dersler, f, ensure_ascii=False, indent=4)

print("Toplam ders sayısı:", len(dersler))