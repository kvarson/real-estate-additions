# MVC Architecture with Next.js + PostgreSQL + Sequelize

Bu proje, Next.js App Router kullanarak **MVC (Model-View-Controller)** pattern'i ile geliştirilmiştir. Traditional MVC yapısını modern web framework'ler ile nasıl uygulayabileceğinizi gösterir.

## 🏗️ Mimari Yapısı

### 📁 Klasör Organizasyonu

```
src/
├── controllers/          # Controller katmanı
│   ├── BaseController.ts      # Temel controller sınıfı
│   └── ProjectController.ts   # Proje CRUD işlemleri
├── services/             # Business Logic katmanı
│   ├── ProjectService.ts      # Proje veritabanı işlemleri
│   └── FileService.ts         # S3 dosya yönetimi (hazır)
├── models/               # Model katmanı (Sequelize ORM)
│   └── Project.ts             # Proje modeli
├── actions/              # Server Actions (Form handling)
│   └── projectActions.ts      # Proje form işlemleri
├── app/                  # Next.js App Router (Views)
│   ├── page.tsx               # Ana sayfa
│   ├── projects/              # Proje sayfaları
│   │   ├── page.tsx           # Proje listesi
│   │   ├── create/page.tsx    # Proje oluşturma
│   │   └── [id]/
│   │       ├── page.tsx       # Proje detayı
│   │       └── edit/page.tsx  # Proje düzenleme
│   └── api/projects/          # API endpoints
│       ├── route.ts           # CRUD API
│       └── [id]/route.ts      # Tek proje API
└── components/           # UI Components
    └── DeleteProjectButton.tsx
```

## 🔄 MVC Flow

### 1. **Model** (Data Layer)

- **Sequelize ORM** ile PostgreSQL entegrasyonu
- `src/models/Project.ts` - Veri modeli tanımları
- `src/services/ProjectService.ts` - Veritabanı işlemleri

### 2. **View** (Presentation Layer)

- **Next.js Server Components** - HTML rendering
- **Server Actions** - Form submissions
- `src/app/projects/` - Sayfa componentleri

### 3. **Controller** (Business Logic)

- `src/controllers/ProjectController.ts` - API logic
- `src/actions/projectActions.ts` - Form handling
- HTTP isteklerini yönetir ve servisleri çağırır

## 📝 Özellikler

### ✅ Tamamlanan MVC Fonksiyonları

1. **CRUD İşlemleri**
     - ✅ Proje listesi (GET /projects)
     - ✅ Proje detayı (GET /projects/:id)
     - ✅ Proje oluşturma (POST /projects)
     - ✅ Proje güncelleme (PUT /projects/:id)
     - ✅ Proje silme (DELETE /projects/:id)

2. **HTML Form Submissions**
     - ✅ Server Actions ile direkt POST
     - ✅ Form validation
     - ✅ Error handling
     - ✅ Success/Error redirects

3. **Database Integration**
     - ✅ PostgreSQL connection
     - ✅ Sequelize ORM
     - ✅ Model definitions
     - ✅ Database sync

### 🚀 Gelecek için Hazır

1. **Amazon S3 Integration**
     - ✅ FileService.ts hazır
     - ✅ Model'de imageUrl ve attachments alanları
     - 🔄 S3 SDK entegrasyonu için hazır

2. **Dosya Yükleme**
     - ✅ File validation fonksiyonları
     - ✅ Güvenli dosya isimlendirme
     - ✅ Proje-bazlı klasör organizasyonu

## 🛠️ Teknoloji Stack'i

- **Frontend**: Next.js 15 + TypeScript + Tailwind CSS
- **Backend**: Next.js API Routes + Server Actions
- **Database**: PostgreSQL + Sequelize ORM
- **Cloud Storage**: Amazon S3 (hazır entegrasyon)
- **Architecture**: MVC Pattern

## 🚀 Çalıştırma

### 1. Bağımlılıkları Yükle

```bash
npm install
```

### 2. Environment Variables (.env.local)

```env
DATABASE_URL=postgresql://postgres:4pPAn4kpXFK3@65.108.255.102:5432/alians_db
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name
```

### 3. Development Server

```bash
npm run dev
```

### 4. Tarayıcıda Aç

```
http://localhost:3001
```

Uygulamaya localhost üzerinden erişebilirsiniz: `http://localhost:3001`

## 📖 Kullanım

### Ana Sayfa

- MVC demo navigation'u ile `/projects` sayfasına git

### Proje Yönetimi

1. **Listele**: `/projects` - Tüm projeler
2. **Oluştur**: `/projects/create` - Yeni proje formu
3. **Görüntüle**: `/projects/:id` - Proje detayları
4. **Düzenle**: `/projects/:id/edit` - Proje güncelleme formu
5. **Sil**: Delete button ile onaylı silme

### API Endpoints

- `GET /api/projects` - Proje listesi
- `POST /api/projects` - Proje oluşturma
- `GET /api/projects/:id` - Tek proje
- `PUT /api/projects/:id` - Proje güncelleme
- `DELETE /api/projects/:id` - Proje silme

## 🔐 Güvenlik Özellikleri

- ✅ Input validation
- ✅ SQL injection korunması (Sequelize ORM)
- ✅ XSS korunması (Next.js built-in)
- ✅ CSRF korunması (Server Actions)

## 📈 Amazon S3 Entegrasyonu

### FileService.ts Özellikleri

- Dosya türü validasyonu
- Dosya boyutu kontrolü
- Güvenli dosya isimlendirme
- Proje-bazlı klasör organizasyonu
- S3 upload/delete fonksiyonları (hazır)

### S3 Kullanımı için:

1. AWS credentials'ları `.env.local`'e ekle
2. `FileService.ts`'deki TODO kısımlarını S3 SDK ile değiştir
3. Model'deki `imageUrl` ve `attachments` alanlarını kullan

## 🎯 Avantajları

1. **Separation of Concerns**: Her katman ayrı sorumluluk
2. **Maintainability**: Kolay bakım ve genişletme
3. **Testability**: Her katman ayrı test edilebilir
4. **Scalability**: Büyük projeler için uygun
5. **Standard Pattern**: Yaygın kullanılan mimari

Bu MVC implementation'ı modern web development best practices'leri ile traditional MVC pattern'ini birleştirerek ölçeklenebilir ve maintainable bir yapı sunar.
