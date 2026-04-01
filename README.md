# Karekod Doğrulayıcı v7

EBİS ve GİB e-belge QR kodlarını kamera, resim veya manuel metin ile doğrulayan **PWA** uygulaması.

---

## Özellikler

| Özellik | Açıklama |
|---|---|
| 📷 Kamera tarama | jsQR ile gerçek zamanlı QR okuma |
| 🖼 Resimden okuma | PNG / JPG / WEBP drag-drop veya dosya seç |
| ⌨️ Manuel test | QR içeriğini yapıştırarak doğrula |
| ✅ EBİS doğrulama | 17 alan, format ve mantık kontrolü |
| ✅ GİB doğrulama | e-Fatura, e-İrsaliye, e-SMM, e-MM, e-Sigorta, e-Arşiv |
| 📲 PWA kurulum | Android "Ana Ekrana Ekle", iOS Safari manuel adımlar |
| 🔔 Bildirimler | Tarama sonucu push bildirimi (standalone mod) |
| ⬆️ Otomatik güncelleme | Yeni sürüm hazır banner → tek tıkla güncelle |
| 🌙 3 tema | Koyu / Açık / Bej-Kahve |
| ✈️ Çevrimdışı | Service Worker cache — internet olmadan çalışır |

---

## Kurulum & Çalıştırma

**Tek dosya** — sadece `index.html` + `sw.js` aynı klasörde olmalı.

```
karekod/
├── index.html
├── sw.js
└── README.md
```

### Yerel sunucu (HTTPS değil — kamera çalışmaz, diğerleri çalışır)
```bash
python3 -m http.server 8080
# → http://localhost:8080
```

### HTTPS ile tam özellik (kamera dahil)
```bash
# Node.js
npx serve .
# → http://localhost:3000
```

### Ücretsiz HTTPS hosting
- **GitHub Pages**: `index.html` yükle → Settings → Pages → aktif et
- **Netlify / Vercel**: klasörü sürükle-bırak, otomatik HTTPS

> ⚠️ Kamera **yalnızca** `https://` veya `localhost` üzerinde çalışır. Bu Web API kısıtlamasıdır.

---

## PWA Kurulumu

### Android (Chrome)
Adres çubuğunda **⊕ Ana ekrana ekle** ikonu çıkar.  
Veya headerda **📲** butonuna bas.

### iOS (Safari)
1. Safari'de aç
2. **Paylaş** butonu → **Ana Ekrana Ekle**

PWA olarak kurulunca:
- Tam ekran çalışır (adres çubuğu yok)
- Çevrimdışı çalışır (cache)
- Tarama bildirimleri aktif olur

---

## Bildirimler

İlk açılışta **🔔 butonu** görünür. İzin verilirse:

- **Standalone mod** (ana ekrandan açıldığında): tarama tamamlanınca bildirim gelir
- **Push bildirim** (sunucu tarafı): `registration.pushManager.subscribe()` ile VAPID entegrasyonu yapılabilir

```js
// Sunucu tarafından push göndermek için örnek payload:
{
  "title": "Karekod",
  "body": "İrsaliye doğrulandı ✓",
  "tag": "scan-result",
  "url": "./"
}
```

---

## Otomatik Güncelleme

Service Worker her **5 dakikada** bir güncelleme kontrolü yapar.  
Yeni `sw.js` / `index.html` deploy edildiğinde:

1. Arka planda yeni SW yüklenir
2. Sarı **"Yeni sürüm hazır!"** banner belirir
3. **Güncelle & Yenile** butonuna basınca `SKIP_WAITING` tetiklenir, sayfa yenilenir

### Versiyon yükseltme adımları
```js
// sw.js içinde sadece VER sabitini değiştir:
const VER = 'karekod-v8';   // ← arttır
```
Deploy edince SW otomatik değişikliği algılar.

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
- Metin giriş kutusuna `│` veya `|` karakteri GS sayılır

## GİB Karekod Formatı

```json
{
  "vkntckn":  "1234567890",
  "avkntckn": "9876543210",
  "senaryo":  "TEMELFATURA",
  "tarih":    "2024-01-15",
  "no":       "ABC202400000001",
  "ettn":     "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
}
```

---

## Bağımlılıklar

| Kütüphane | Kaynak | Amaç |
|---|---|---|
| jsQR 1.4.0 | jsDelivr CDN | QR kod çözme |
| Inter / Inter Tight | Google Fonts | Tipografi |

Harici bağımlılık yok — jQuery, React, framework kullanılmadı.

---

## Teknik Notlar

- **Service Worker stratejisi**: `index.html` → network-first, CDN → stale-while-revalidate, diğer → cache-first
- **SW güncelleme akışı**: `updatefound` → `statechange:installed` → banner → `SKIP_WAITING` → `controllerchange` → `reload()`
- `skipWaiting()` install anında çağrılır (yeni sekmelerde hemen aktif)
- Manifest `Blob URL` ile dinamik olarak oluşturulur (tek dosya deploy)
- iOS `standalone` tespiti: `window.navigator.standalone === true`

---

## Lisans

© 2026 Unicasoft — Dahili kullanım
