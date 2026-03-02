# 📲 EBİS Karekod Doğrulayıcı

> **Elektronik Beton İzleme Sistemi** — Karekodlu Beton İrsaliyesi Format Doğrulayıcı  
> Tek HTML dosyası · Sıfır kurulum · PWA · Çevrimdışı çalışır

---

## 🔍 Ne İşe Yarar?

**4708 Sayılı Yapı Denetimi Hakkında Kanun** kapsamında taze beton sevkiyatlarında kullanılması zorunlu olan **EBİS Karekodlu Beton İrsaliyelerini** doğrular.

QR kodu okutulduğunda veya içeriği yapıştırıldığında:

- ✅ EBİS format standardına uygunluğu kontrol eder
- ❌ Hangi alanlarda hata var, tam olarak ne hatalı, nasıl olmalı — gösterir
- 📋 17 alanın tamamını okuyup ekranda listeler

---

## 🚀 Nasıl Kullanılır?

### Yöntem 1 — GitHub Pages (önerilen)

```
https://KULLANICI_ADIN.github.io/ebis-dogrulayici/
```

Tarayıcıda açın, kamera izni verin, QR'ı okutun. Bitti.

### Yöntem 2 — Lokal (HTTPS olmadan kamera çalışmaz, resim/metin çalışır)

```bash
# Python ile
python3 -m http.server 8080
# → http://localhost:8080/ebis-karekod-dogrulayici-v4.html

# Node.js ile
npx serve .
# → http://localhost:3000/ebis-karekod-dogrulayici-v4.html
```

### Yöntem 3 — Doğrudan dosyadan (sadece resim/metin modu)

`ebis-karekod-dogrulayici-v4.html` dosyasını tarayıcıda açın.  
Kamera çalışmaz ama **resimden okuma** ve **metin girişi** çalışır.

---

## 📲 Ana Ekrana Ekleme (PWA)

Uygulama **Progressive Web App (PWA)** olarak tasarlanmıştır.  
Ana ekrana eklendiğinde adres çubuğu kaybolur, tam ekran uygulama gibi çalışır.

| Platform | Yöntem |
|---|---|
| **Android Chrome** | Uygulama içindeki 📲 butonuna bas → Chrome yükleme diyaloğu açılır |
| **iOS Safari** | 📲 butonuna bas → Adım adım talimat gösterilir (Paylaş → Ana Ekrana Ekle) |
| **Masaüstü Chrome** | Adres çubuğundaki ⬇ ikonuna veya uygulama içindeki 📲 butonuna bas |

> ⚠️ PWA yükleme için sayfa mutlaka **HTTPS** üzerinden açılmış olmalıdır.

---

## 📋 Doğrulanan Alanlar

| # | Alan | Format | Örnek |
|---|---|---|---|
| 1 | EBİS Tanımlayıcı | `E1` ile başlamalı | `E1` |
| 2 | İrsaliye Seri No | Boşluksuz alfanümerik | `AB12345678` |
| 3 | Vergi No | Tam 10 haneli sayı | `0123456789` |
| 4 | Sevk Tarihi/Saati | `YYYYAAGGSSDD` — 12 karakter | `202309251330` |
| 5 | Beton Miktarı | `mikser/toplam` tam sayı | `12/60` |
| 6 | Dayanım Sınıfı | C veya LC + 2-3 rakam | `C30`, `LC20` |
| 7 | 7/28 Dayanım Oranı | Virgüllü ondalık | `0,7` veya `7/56-0,5` |
| 8 | Kıvam Sınıfı | S1–S5 | `S3` |
| 9 | Yoğunluk Sınıfı | N / H / A | `N` |
| 10 | Klorür İçeriği | Virgüllü ondalık | `0,4` |
| 11 | Dmax (mm) | Sayı, virgüllü olabilir | `22,4` |
| 12 | Su/Çimento Oranı | `0,XX` formatı | `0,41` |
| 13 | Araç Plaka No | Büyük harf, boşluksuz, max 10 | `06EBS01` |
| 14 | Çimento Tipi | Max 30 karakter | `CEM II/A-S 42,5 N` |
| 15 | Kimyasal Katkı | Max 30 karakter | `YAPICHEM AX4117` |
| 16 | Mineral Katkı | Max 30 karakter | `GRANÜLE CÜRUFU` |
| 17 | Lifler | Max 30 karakter | `-` |

> Alanlar birbirinden **Grup Ayraç karakteri** (ASCII 29 / `GS`) ile ayrılır.  
> Toplam 16 adet GS karakteri kullanılmalıdır.

---

## 🖥️ Özellikler

| Özellik | Detay |
|---|---|
| 📷 **Kamera tarama** | Arka kamera, canlı QR okuma |
| 🖼️ **Resimden okuma** | Sürükle-bırak veya dosya seç (PNG · JPG · WEBP) |
| ⌨️ **Ham metin girişi** | QR içeriğini yapıştır, `│` karakteri GS olarak kabul edilir |
| 🎨 **3 renk teması** | Koyu · Açık · Turuncu — seçim kaydedilir |
| 📲 **PWA / Ana ekran** | Tam ekran uygulama, adres çubuğu yok |
| 🔖 **Favicon & ikon** | QR deseni SVG ikon, Apple Touch Icon |
| 🌐 **Çevrimdışı** | İnternet olmadan da çalışır (font cache sonrası) |
| 🔑 **Ctrl+V kısayolu** | EBİS içeriği panoya varsa anında doğrula |

---

## 📁 Dosya Yapısı

```
ebis-dogrulayici/
└── index.html          ← Tek dosya, her şey burada
```

Harici bağımlılıklar (CDN'den yüklenir):
- [`jsQR`](https://github.com/cozmo/jsQR) v1.4.0 — QR okuma motoru
- [Google Fonts — Inter](https://fonts.google.com/specimen/Inter) — tipografi

---

## ⚖️ Hukuki Dayanak

Bu uygulama aşağıdaki mevzuat kapsamındaki karekod formatını doğrular:

**"4708 Sayılı Yapı Denetimi Hakkında Kanun Kapsamında Denetimi Yürütülen Yapılara Ait Taze Betondan Numune Alınması, Deneylerinin Yapılması, Raporlanması Süreçlerinin İzlenmesi ve Denetlenmesine Dair Tebliğde Değişiklik Yapılmasına Dair Tebliğ"**  
📅 24.03.2020 tarih · 31078 sayılı Resmî Gazete

Format kaynağı: **EBİS — Elektronik Beton İzleme Sistemi Karekodlu Beton İrsaliyesi Tanım Dokümanı, Sürüm 1**  
🌐 [ebistr.com](https://www.ebistr.com)

---

## 🔧 Geliştirme

### GitHub Pages'e Yayınlama

```bash
# 1. Bu repo'yu fork et veya klonla
git clone https://github.com/KULLANICI/ebis-dogrulayici.git

# 2. Dosyayı güncelle
cp yeni-versiyon.html index.html

# 3. Commit & push
git add index.html
git commit -m "v4.x — açıklama"
git push

# 4. Settings → Pages → main branch → /root
# URL: https://KULLANICI.github.io/ebis-dogrulayici/
```

### Versiyon Geçmişi

| Versiyon | Değişiklikler |
|---|---|
| v4.0 | Favicon, 3 tema (Koyu/Açık/Turuncu), Inter font, okunurluk iyileştirmesi |
| v3.0 | 5 tema, tema kaydetme, HTTPS uyarısı, ham metin girişi |
| v2.0 | Resimden okuma, sürükle-bırak, masaüstü desteği |
| v1.0 | Kamera tarama, temel doğrulama |

---

## 📞 Destek

EBİS Teknik Destek Çağrı Merkezi: **0850 644 32 47**  
Web: [ebistr.com](https://www.ebistr.com)

---

*Bu araç resmi EBİS sistemiyle bağlantısı olmayan bağımsız bir doğrulama yardımcısıdır.*
