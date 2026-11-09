# Expense Tracker – Harcama Takip Uygulaması

Bu proje React ve JavaScript kullanılarak geliştirilmiş, kullanıcıların günlük harcamalarını kaydetmesini, görüntülemesini, düzenlemesini ve silmesini sağlayan basit bir harcama takip uygulamasıdır.

## Kullanılan Teknolojiler

- React
- JavaScript
- HTML5
- CSS3
- Vite
- LocalStorage
- Git & GitHub

## Özellikler

- Yeni harcama ekleme
- Kayıtlı harcamaları listeleme
- Mevcut harcamaları düzenleme
- Harcamaları silme
- Günlük toplam harcama tutarını görüntüleme
- Tüm harcamaların toplam tutarını görüntüleme
- Verileri LocalStorage üzerinde saklama
- Gelecek tarihli harcama girişini engelleme
- Boş ve geçersiz form girişlerini kontrol etme
- Mobil cihazlarla uyumlu responsive tasarım

## Veri Saklama

Uygulama, harcama kayıtlarını tarayıcının LocalStorage özelliğini kullanarak saklar. Bu sayede sayfa yenilendiğinde kayıtlı harcamalar korunur.

Veriler kullanıcının kendi tarayıcısında tutulur; farklı tarayıcılara veya cihazlara otomatik olarak aktarılmaz.

## Kurulum

Projeyi bilgisayarınıza indirin:

```bash
git clone https://github.com/sinansancak/expense-tracker.git
```

Proje klasörüne gidin:

```bash
cd expense-tracker
```

Gerekli paketleri yükleyin:

```bash
npm install
```

Geliştirme sunucusunu başlatın:

```bash
npm run dev
```

Uygulama, http://localhost:5173 adresinde çalışıyor olmalı!