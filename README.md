# Karekod Doğrulayıcı v11

EBİS ve GİB e-belge **QR kodlarını** + **barkodları** kamera, resim veya manuel metin ile doğrulayan **PWA** uygulaması.

---

## Özellikler

| Özellik | Açıklama |
|---|---|
| 📷 Kamera tarama | Otomatik başlar — QR + barkod, çok motorlu |
| 🖼 Resimden okuma | PNG / JPG / WEBP drag-drop, dosya seç veya Ctrl+V yapıştır |
| ⌨️ Manuel test | QR içeriğini yapıştırarak doğrula |
| ✅ EBİS doğrulama | 17 alan, format ve mantık kontrolü |
| ✅ GİB doğrulama | e-Fatura, e-İrsaliye (+miktar/malzeme), e-SMM, e-MM, e-Sigorta, e-Arşiv |
| 📊 Barkod | EAN-8, EAN-13, Code128, Code39, QR, DataMatrix, PDF417 |
| 📲 PWA kurulum | Android "Ana Ekrana Ekle", iOS Safari manuel adımlar |
| 🔔 Bildirimler | Tarama sonucu push bildirimi (standalone mod) |
| ⬆️ Otomatik güncelleme | Yeni sürüm hazır banner → tek tıkla güncelle |
| 🌙 3 tema | Koyu / Açık / Bej-Kahve |
| ✈️ Çevrimdışı | Service Worker cache — internet olmadan çalışır |
| 🔠 Font boyutu | A− / A / A+ seçeneği, LocalStorage'a kaydedilir |

---

## Kurulum & Çalıştırma

**3 dosya** — `index.html` + `sw.js` + `zbar-wasm.js` aynı klasörde olmalı.

```
karekod/
├── index.html
├── sw.js
├── zbar-wasm.js
└── README.md
```

### Yerel sunucu (HTTPS değil — kamera çalışmaz)
```bash
python3 -m http.server 8080
# → http://localhost:8080   (localhost'ta kamera da çalışır)
```

### HTTPS ile tam özellik
```bash
npx serve .
# → http://localhost:3000
```

### Ücretsiz HTTPS hosting
- **GitHub Pages**: `index.html`, `sw.js`, `zbar-wasm.js` → Settings → Pages
- **Netlify / Vercel**: klasörü sürükle-bırak, otomatik HTTPS

> ⚠️ Kamera **yalnızca** `https://` veya `localhost` üzerinde çalışır.

---

## Kamera Motoru — Takılma Önlemi

Her tarama döngüsünde **4 motor** paralel çalışır:

| Motor | Sıklık | Ne okur |
|---|---|---|
| **jsQR** | Her kare (senkron) | QR kod |
| **jsQR kontrast boost** | 30'da bir | Zor / bulanık QR |
| **ZXing MultiFormatReader** | 5'te bir (async) | QR + tüm barkodlar |
| **zbar-wasm** (libzbar) | 8'de bir (async) | QR + barkod, en güçlü |

**Takılma önlemi:** Her 200 karede bir ZXing reader otomatik sıfırlanır.  
**Yeni tarama:** Sonuç ekranından "↺ Yeni Tarama" basınca kamera otomatik yeniden başlar.

---

## Resim / Ekran Görüntüsü Okuma (Monitörden)

Monitörde açık PDF/ekrandan kamera ile okumak yerine:

1. `Win + Shift + S` (veya Print Screen) ile QR'ı ekran görüntüsüne al
2. Uygulamada **Ctrl+V** bas → otomatik resim paneline geçer ve okur

Bu yöntem çok daha güvenilirdir. Motor sırası:

```
zbar-wasm → jsQR → ZXing MultiFormat → jsQR kontrast ×4 → ZXing preprocessed
```

---

## EBİS Karekod Formatı

```
E1[GS]<seri>[GS]<vergiNo>[GS]<YYYYAAGGSSDk>[GS]<miktar/toplam>
[GS]<dayanım>[GS]<7/28oran>[GS]<kıvam>[GS]<yoğunluk>[GS]<klorür>
[GS]<dmax>[GS]<s/c>[GS]<plaka>[GS]<çimento>[GS]<kimyasal>
[GS]<mineral>[GS]<lifler>
```
- 16 adet ASCII 29 (GS) ayracı = 17 alan
- Tarih: `YYYYAAGGSSDDK` — 12 karakter

## GİB Karekod Formatı (e-İrsaliye örneği)

```json
{
  "vkntckn":   "4240545842",
  "avkntckn":  "16439645514",
  "senaryo":   "TEMELIRSALIYE",
  "tip":       "SEVK",
  "tarih":     "2026-04-09",
  "no":        "DUB2026000002213",
  "ettn":      "409d04ae-140a-45d3-949f-5d8f52dbdeec",
  "sevktarihi":"2026-04-09",
  "sevkzamani":"17:10:34",
  "tasiyicivkn":"4240545842",
  "plaka":     "41BDU275",
  "miktar":    "5,5",
  "malzeme":   "C30/37 TARIF EDILMIS BETON"
}
```

> `miktar` ve `malzeme` zorunlu GİB alanı dışında, sektör standardı olarak eklenmektedir.

---

## PWA Kurulumu

### Android (Chrome)
Adres çubuğunda **⊕ Ana ekrana ekle** ikonu çıkar veya headerda **📲** butonu.

### iOS (Safari)
1. Safari'de aç
2. **Paylaş** → **Ana Ekrana Ekle**

---

## Bağımlılıklar

| Kütüphane | Kaynak | Amaç |
|---|---|---|
| jsQR 1.4.0 | jsDelivr CDN | QR kod çözme (senkron) |
| @zxing/library 0.20.0 | jsDelivr CDN | Çok formatlı barkod/QR |
| @undecaf/zbar-wasm | Lokal (zbar-wasm.js) | libzbar WASM — en güçlü motor |
| Inter / Inter Tight | Google Fonts | Tipografi |

Framework yok — saf JavaScript.

---

## Service Worker Güncelleme

```js
// sw.js içinde VER sabitini arttır:
const VER = 'karekod-v12';
```

Deploy edince SW otomatik güncelleme algılar, sarı banner belirir.

---

## Teknik Notlar

- Manifest `Blob URL` ile dinamik oluşturulur (tek dizin deploy)
- zbar-wasm WASM base64 gömülü → CDN gerektirmez
- Kamera `facingMode: environment` (arka kamera)
- ZXing MultiFormatReader her `startCam()`/`stopCam()` çağrısında sıfırlanır (bellek sızıntısı önlemi)
- Kontrast preprocessing: luminance → `(L-128)×k+128`, tek kanaldan RGBA

---

## Lisans

© 2026 Unicasoft — Dahili kullanım
