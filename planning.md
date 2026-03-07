# Turkey Manufacturers Platform - 2 Haftalik Sprint Plani

Bu dokuman, MVP gelistirme surecini 14 gunluk onceliklendirilmis sprint planina donusturur.
Amac: kullanilabilir MVP'yi hizlica yayina almak, sonra iyilestirmek.

## Sprint Hedefi (Hafta 1 + Hafta 2)

- [ ] Public marketplace canli
- [ ] Alicilar tedarikci ve urunleri goruntuleyebiliyor
- [ ] Alicilar RFQ gonderebiliyor
- [ ] Admin tedarikci basvurularini onaylayip RFQ'lari gorebiliyor
- [ ] Platform Vercel + Supabase ile deploy edilmis

---

## Oncelik Kurallari

- `P0` = bu sprintte kesinlikle bitmeli
- `P1` = zaman kalirsa bitmeli
- `P2` = sonraki sprint'e aktar

---

## Hafta 1 (Temel Kurulum + Veri Yapisi + Public Sayfalar)

### Gun 1 - Proje Kurulumu (`P0`)

- [ ] MVP kapsamini netlestir (buyer, supplier, admin)
- [ ] Teknoloji yiginini kesinlestir: Next.js + TypeScript + Tailwind + Supabase + Vercel
- [ ] Repo ve proje klasor yapisini kur
- [ ] Lint/format ve environment ayarlarini yap

Teslimatlar:
- [ ] Uygulama `http://localhost:3000` uzerinde calisiyor
- [ ] Temel klasorler hazir: `src/app`, `components`, `lib`, `types`, `services`

### Gun 2 - Veritabani + Auth Temeli (`P0`)

- [ ] Supabase projesi olustur ve `.env.local` baglantisini yap
- [ ] Tablolari olustur: `users`, `companies`, `categories`, `products`, `rfqs`, `supplier_applications`
- [ ] Supabase Auth (signup/login/logout) kur
- [ ] Rol modeli ekle: `admin`, `supplier`, `buyer`

Teslimatlar:
- [ ] Auth uc uca calisiyor
- [ ] Kullanici rolu kaydediliyor ve okunabiliyor

### Gun 3 - Public Bilgi Mimarisi + Route Yapisi (`P0`)

- [ ] Su sayfa rotalarini olustur:
- [ ] `/` (anasayfa)
- [ ] `/categories/[slug]`
- [ ] `/suppliers/[id]`
- [ ] `/products/[id]`
- [ ] `/rfq`
- [ ] `/apply-supplier`

Teslimatlar:
- [ ] Navigasyon iskeleti tamam
- [ ] Tum sayfalar placeholder durumlariyla render oluyor

### Gun 4 - Tedarikci Basvuru Akisi (`P0`)

- [ ] Tedarikci basvuru formu gelistir
- [ ] Basvurulari `supplier_applications` tablosuna kaydet
- [ ] Zorunlu alan validasyonu ve durum mesaji ekle

Teslimatlar:
- [ ] Tedarikci basvuru gonderebiliyor
- [ ] Basvuru veritabaninda gorunuyor

### Gun 5 - Urun Katalogu MVP (`P0`)

- [ ] Supplier tarafi urun ekle/duzenle formu yap
- [ ] Urun alanlari: isim, aciklama, kategori, MOQ
- [ ] Public sayfalarda urun listeleme yap

Teslimatlar:
- [ ] En az 10 ornek urun listeleniyor
- [ ] Temel kategori filtreleme calisiyor

### Gun 6 - RFQ Formu + Kayit (`P0`)

- [ ] Buyer icin RFQ formu olustur
- [ ] RFQ kayitlarini `rfqs` tablosuna yaz
- [ ] Basarili/basarisiz gonderim UI durumlarini ekle

Teslimatlar:
- [ ] Buyer RFQ gonderebiliyor
- [ ] Admin RFQ kayitlarini veritabaninda gorebiliyor

### Gun 7 - Hafta 1 Stabilizasyon (`P0`)

- [ ] Formlar icin temel validasyon turu yap
- [ ] Kritik UI/DB hatalarini duzelt
- [ ] Minimum baslangic icerigini seed et (kategori/tedarikci/urun)

Teslimatlar:
- [ ] Stabil Hafta 1 build
- [ ] Signup/apply/product/rfq akislarinda bloklayici bug yok

---

## Hafta 2 (Admin + Deployment + Lansman Hazirligi)

### Gun 8 - Admin Panel Iskeleti (`P0`)

- [ ] Admin rotalarini olustur:
- [ ] `/admin/dashboard`
- [ ] `/admin/companies`
- [ ] `/admin/products`
- [ ] `/admin/rfqs`
- [ ] Admin yetki kontrolu (role guard) ekle

Teslimatlar:
- [ ] Admin-only erisim zorunlu
- [ ] Admin sayfalari tablo placeholder'lari ile aciliyor

### Gun 9 - Tedarikci Onay Akisi (`P0`)

- [ ] Admin basvuru listesini gorsun
- [ ] Onay/red aksiyonlari ekle
- [ ] Onayda company profile olustur/aktif et

Teslimatlar:
- [ ] Uc uca onboarding akisi calisiyor:
- [ ] apply -> review -> approve -> company active

### Gun 10 - Admin Yonetim Temeli (`P0`)

- [ ] Admin company kayitlarini gorup duzenleyebilsin
- [ ] Admin urun kayitlarini gorup duzenleyebilsin
- [ ] Admin RFQ kayitlarini inceleyebilsin

Teslimatlar:
- [ ] Core moderation araclari DB konsolu olmadan kullanilabiliyor

### Gun 11 - Fiyatlandirma + Abonelik Placeholder (`P1`)

- [ ] `/pricing` sayfasini Free/Premium/Gold ile yayinla
- [ ] Premium ozellikleri UI seviyesinde kilitle (placeholder)
- [ ] Odeme entegrasyonunu bu sprint disinda tut (`P2`)

Teslimatlar:
- [ ] Pricing sayfasi yayinlandi
- [ ] Net yukseltime mesaji var

### Gun 12 - Deployment (`P0`)

- [ ] GitHub reposunu Vercel'e bagla
- [ ] Tum environment variable'lari gir
- [ ] Production preview deploy et ve build/runtime sorunlarini duzelt

Teslimatlar:
- [ ] Vercel uzerinde canli URL calisiyor
- [ ] Production DB baglantisi dogrulandi

### Gun 13 - Lansman QA + Temel SEO (`P0`)

- [ ] Kritik akislar icin QA yap (auth, apply, katalog, RFQ, admin onay)
- [ ] SEO temellerini ekle: title, description, sitemap/robots baseline
- [ ] Analytics ekle (zaman kalirsa)

Teslimatlar:
- [ ] Kritik kullanici senaryolari MVP kontrolunden geciyor

### Gun 14 - MVP Lansman (`P0`)

- [ ] MVP'yi yayinla ve duyur
- [ ] Bu sprint kapsamini dondur
- [ ] Post-launch backlog olustur

Teslimatlar:
- [ ] Public erisilebilir MVP
- [ ] Sonraki sprint backlog'u hazir

---

## Definition of Done (Sprint Cikis Kriterleri)

- [ ] Anasayfa, kategori, tedarikci ve urun sayfalari canli
- [ ] Tedarikci basvuru formu calisiyor ve admin onaylayabiliyor
- [ ] RFQ gonderimi calisiyor ve admin panelde gorunuyor
- [ ] Admin rotalarinda rol bazli erisim kontrolu aktif
- [ ] Uygulama Vercel'de deploy edilmis ve public erisilebilir

---

## Sonraki Sprint'e Ertelenenler (`P2`)

- [ ] Odeme entegrasyonu (Stripe/iyzico)
- [ ] Gelismis abonelik kisitlari
- [ ] RFQ e-posta otomasyonu
- [ ] Gelismis SEO landing page genislemesi
- [ ] Blog/icerik pazarlama modulu
