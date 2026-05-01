# Karekod Doğrulayıcı

**EBİS** ve **GİB e-Belge** QR kodlarını + barkodları kamera, resim veya metin ile doğrulayan PWA uygulaması.

🔗 **[github.com/unicasoft/ebis](https://github.com/unicasoft/ebis)**

---

## Özellikler

| Özellik | Açıklama |
|---|---|
| 📷 **Kamera tarama** | BarcodeDetector API + 8 motorlu fallback, 2.2s debounce |
| 🎯 **ROI Tarama Modu** | QR (kare) / Çubuk Barkod (dikdörtgen) / Tam Ekran seçimi |
| 🔢 **Çoklu barkod** | Aynı karede N kod: snapshot + numara + buton seçimi |
| 🖼 **Resimden okuma** | 10 bölge × 8 açı, BarcodeDetector + jsQR + zbar zinciri |
| 📋 **Ctrl+V paste** | Ekran görüntüsü veya metin yapıştırma |
| ✅ **EBİS doğrulama** | 17 alan format ve mantık kontrolü |
| ✅ **GİB doğrulama** | e-İrsaliye, e-Fatura, e-SMM, e-MM, e-Sigorta, e-Arşiv |
| 🔍 **Format tespiti** | URL, vCard, Wi-Fi, SMS, EAN/UPC, Code39/128, Düz Metin |
| 🕐 **Geçmiş** | Son 50 tarama, TXT/CSV/JSON/HTML aktar, temizle |
| ⭐ **Favoriler** | Yıldız ile kaydet, dışa aktar |
| 📲 **PWA kurulum** | Android "Ana Ekrana Ekle", iOS Safari |
| 🔦 **El feneri** | Android Chrome/Edge destekli |
| 🌙 **3 tema** | Koyu / Açık / Bej-Kahve |
| ✈️ **Çevrimdışı** | Service Worker cache |

---

## Kurulum

```
index.html   ← Ana uygulama
sw.js        ← Service Worker (offline)
zbar-wasm.js ← libzbar WASM motoru (333KB)
```

```bash
python3 -m http.server 8080
# → http://localhost:8080
```

GitHub Pages: Settings → Pages → Branch: main → Root

---

## ROI Tarama Modları

| Mod | ROI Şekli | Kullanım |
|---|---|---|
| **QR Kodu** | Kare (%72 min-boyut) | QR, DataMatrix |
| **Çubuk Barkod** | Geniş dikdörtgen (%90×%34) | EAN-13, Code128 |
| **Tam Ekran** | Tüm görüntü | Karışık / bilinmeyen |

BarcodeDetector yalnızca ROI crop'u tarar → yanlış okuma ve yarım EAN sorunu çözülür.

---

## Çoklu Kod

- **Kamera:** 2.2s debounce → IoU dedup → soldan sağa sıralama → buton şeridi
- **Resim:** Thumbnail + kırpılmış önizleme seçim listesi → "Tümünü Oku" kart görünümü

---

## Sürüm Geçmişi

### v30 — 2026-05-01
- **ROI Tarama Modu**: QR / Çubuk Barkod / Tam Ekran toolbar
- Snapshot gecikmesi çözüldü: `detect(smCnv)` → frame-sync garantili
- jsQR ROI fallback: crop ImageData
- bbox ROI→smCnv koordinat dönüşümü
- Tam ekran: corners gizlenir, overlay yok

### v29 — 2026-05-01
- IoU bbox dedup (%30 eşik)
- Soldan sağa sıralama (boundingBox.x)
- `selAllMultiCam` → `stopCam()` çağrısı (OCR bug düzeltme)
- `histAdd(bc.rawValue)` bug fix

### v28 — 2026-05-01
- 2.2s debounce, favori JSON fix (index-based onclick)
- Geçmiş/Favori: TXT/CSV/JSON/HTML aktar + Temizle
- Buton arka planı tema uyumlu

### v27 — 2026-05-01
- Kamera çoklu: canvas=görsel, butonlar=seçim
- BarcodeDetector primary engine

### v26 — 2026-05-01
- Resimde çoklu seçim listesi + thumbnail
- Drawer body scroll lock

### v25 — 2026-05-01
- Alan Detayları EBİS/GİB dışında gizlenir
- Kamera bbox overlay + buton şeridi

### v19–v10 — 2026-04-30/29
- Metin Doğrulama, GİB belge tipleri, zbar WASM, Otsu preprocessing

---

## Lisans

© 2026 Unicasoft  
[unicasoft@hotmail.com](mailto:unicasoft@hotmail.com)
