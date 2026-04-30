# Karekod Doğrulayıcı

**EBİS** ve **GİB e-Belge** QR kodlarını + barkodları kamera, resim veya metin ile doğrulayan PWA uygulaması.

🔗 **[github.com/unicasoft/ebis](https://github.com/unicasoft/ebis)**

---

## Ekran Görüntüleri

| Kamera Tarama | Sonuç (EBİS) | Sol Menü | Ham Veri (Terminal) |
|:---:|:---:|:---:|:---:|
| Kamera ile anlık okuma | Alan doğrulama + favori | Geçmiş / Favoriler / Metin | JetBrains Mono terminal görünüm |

---

## Özellikler

| Özellik | Açıklama |
|---|---|
| 📷 **Kamera tarama** | 9 motorlu paralel decode, Otsu/BlurOtsu/Yerel Adaptif preprocessing |
| 🖼 **Resimden okuma** | 10 bölge × 8 açı tarama, döndürme desteği |
| 📋 **Ctrl+V paste** | Ekran görüntüsü veya metin yapıştırma |
| ✅ **EBİS doğrulama** | 17 alan format ve mantık kontrolü |
| ✅ **GİB doğrulama** | e-İrsaliye, e-Fatura, e-SMM, e-MM, e-Sigorta, e-Arşiv |
| 🔍 **Format tespiti** | URL, vCard, Wi-Fi, SMS, EAN/UPC, Code39/128, Düz Metin |
| 🕐 **Geçmiş** | Son 50 tarama LocalStorage'da |
| ⭐ **Favoriler** | Yıldız ile kaydet |
| 📲 **PWA kurulum** | Android "Ana Ekrana Ekle", iOS Safari |
| 🔦 **El feneri** | Android Chrome/Edge kamera fener desteği |
| 🌙 **3 tema** | Koyu / Açık / Bej-Kahve |
| ✈️ **Çevrimdışı** | Service Worker cache |

---

## Kurulum

3 dosya aynı klasörde:
```
index.html   ← Ana uygulama
sw.js        ← Service Worker (offline)
zbar-wasm.js ← libzbar WASM motoru (333KB)
```

**Yerel çalıştırma (kamera localhost'ta çalışır):**
```bash
python3 -m http.server 8080
# → http://localhost:8080
```

**GitHub Pages (ücretsiz HTTPS):**
Settings → Pages → Branch: main → Root

---

## Kullanım

- **Kamera:** Uygulama açılınca otomatik başlar. QR'ı çerçeveye al, 1-2 saniye sabitle.
- **Resim:** 📷/🖼 sekmesinden dosya seç veya sürükle-bırak. **Ctrl+V** ile ekran görüntüsü yapıştır.
- **Metin:** Sol üst **☰ Menü** → Metin Doğrula → yapıştır → Doğrula
- **Geçmiş/Favoriler:** ☰ Menü → Geçmiş veya Favoriler
- **Kopyala/Paylaş:** Sonuç ekranı altında veya ☰ Menü'den

---

## Kamera Motoru

Her karede çalışan 9 motor:

| Motor | Sıklık | Yöntem |
|---|---|---|
| jsQR ham | Her kare | Senkron, hızlı |
| jsQR Otsu | Her kare | Global eşik |
| jsQR BlurOtsu | Her kare | Moire giderici |
| zbar TAM RES | Her kare (busy) | libzbar full HD |
| zbar BlurOtsu | Her 2 karede | Preprocessing |
| zbar Köşe crop | Her 5 karede | 4 köşe dönüşümlü |
| zbar Yerel Adaptif | Her 6 karede | Eşitsiz aydınlatma |
| ZXing MultiFormat | Her 25 karede | Barkod (EAN/Code128) |

---

## Sürüm Geçmişi

### v19 — 2026-05-01
- Sol menüden Metin Doğrulama paneli (ana ekrandan kaldırıldı)
- Ana ekran kompakt hale getirildi
- Format tespiti: URL, vCard, Wi-Fi, SMS, GEO, EAN/UPC, Code39/128, Düz Metin
- Sonuç ekranı altına Kopyala / Paylaş butonları eklendi
- Drawer animasyonu 280ms → 160ms, `will-change` optimizasyonu
- Kamera açıkken drawer açılınca RAF döngüsü duraklatılır

### v18 — 2026-04-30
- Sol yan menü (Drawer): Geçmiş, Favoriler, Kopyala, Paylaş, Geçmişi Temizle
- LocalStorage geçmiş (son 50 tarama) ve favoriler (⭐)
- JetBrains Mono terminal ham veri görünümü
- Kontrol karakterleri (GS, LF, CR…) mor etiketle gösteriliyor
- Sonuç başlığına ☆ Favori butonu eklendi
- Tema renk uyumu düzeltildi

### v17 — 2026-04-30
- zbar-wasm TAM ÇÖZÜNÜRLÜK (1280×720) ile çalışıyor (önceden 640×360)
- El feneri butonu (Android Chrome/Edge destekli cihazlarda)
- Bilinmeyen format: flist gizlenir, terminal ham veri gösterilir
- `buildTerminal()` fonksiyonu: ASCII tablo yerine inline kontrol char etiketleri

### v16 — 2026-04-30
- Resim decode: 10 bölge (tam + 4 çeyrek + 4 yarı + merkez) × 8 açı (±10°/20°/35°/45°)
- E-irsaliyede sağ-üst köşedeki QR otomatik yakalanıyor
- Kamera motor 6: 4 köşe crop paralel zbar taraması

### v15 — 2026-04-29
- Pre-allocated buffers (her karede 0 allocation, GC baskısı yok)
- Separable 2-pass box blur (O(6N) yerine O(9N))
- Integer luminance: `(r*77+g*150+b*29)>>8`
- `willReadFrequently:true` canvas optimizasyonu
- ZXing yalnızca barkod için (25 karede bir)

### v14 — 2026-04-29
- Otsu global + Yerel Adaptif (integral görüntü) eşikleme
- Box blur 3×3 (moire/gürültü giderici)
- Yarı ölçek downscale motoru
- `zbBusy` / `zxBusy` flag — async kuyruk birikimi önlendi
- Hareket tespiti (kamera titrerken uyarı)

### v13 — 2026-04-28
- Kamera: küçük canvas (SW×SH = yarı boyut), 4× hızlı işlem
- Otsu binarization (native uygulamaların kullandığı yöntem)
- Unsharp mask (3×3 sharpening kernel)

### v12 — 2026-04-28
- El feneri altyapısı (torchTrack)
- Merkez crop motoru (%60 orta alan)
- Hareket tespiti overlay

### v11 — 2026-04-27
- Kamera: Manuel RAF loop (ZXing callback API bırakıldı)
- `BrowserMultiFormatReader` barkod desteği (EAN, Code128...)
- Her 200 karede ZXing hard reset (takılma önlemi)
- İlk açılışta kamera otomatik başlatma
- Alan Detayları sütun genişliği 44% → 34%

### v10 — 2026-04-26
- zbar-wasm (libzbar WASM) resim decode motoruna eklendi
- ZXing MultiFormatReader barkod motoru
- Resim decode: 5 motorlu sıralı zincir

### v9 — 2026-04-25
- zbar-wasm yerel (CDN'siz, 333KB inline)
- Clipboard görüntü paste (Ctrl+V)
- Font boyutu seçici (A−/A/A+)

### v8 — 2026-04-24
- Service Worker v2, auto-update banner
- GİB e-İrsaliye: `miktar` ve `malzeme` alanları eklendi

---

## Teknik Notlar

- **Kamera:** `facingMode: environment` (arka kamera), `1280×720` ideal
- **zbar-wasm:** `zbarWasm.scanImageData(ImageData)` → Promise&lt;ZBarSymbol[]&gt;
- **Manifest:** Blob URL ile dinamik (tek dizin deploy)
- **Service Worker:** Cache-first, VER sabiti ile güncelleme
- **LocalStorage:** `kk-hist` (geçmiş), `kk-fav` (favoriler), `k-theme`, `k-fsize`

---

## Dosyalar

| Dosya | Boyut | Açıklama |
|---|---|---|
| `index.html` | ~95KB | Tüm uygulama (CSS+JS gömülü) |
| `sw.js` | <1KB | Service Worker |
| `zbar-wasm.js` | 333KB | libzbar WebAssembly |

---

## Lisans

© 2026 Unicasoft — Dahili kullanım  
[unicasoft@hotmail.com](mailto:unicasoft@hotmail.com)
