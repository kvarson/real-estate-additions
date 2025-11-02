# İç İçe Geçmiş (Nested) API Belgeleri

Bu belge, projeler için iç içe geçmiş verileri destekleyen yeni API'nın nasıl kullanılacağını açıklar.

## API Endpoint

```
POST /api/projects
```

## Desteklenen Veri Formatları

API hem JSON hem de FormData formatlarını destekler. FormData formatı dosya yüklemeleri için önerilir.

## FormData ile POST İsteği

### Temel Alanlar

| Alan        | Tür    | Zorunlu | Açıklama          |
| ----------- | ------ | ------- | ----------------- |
| name        | string | Evet    | Proje adı         |
| description | string | Hayır   | Proje açıklaması  |
| image       | file   | Hayır   | Ana proje görseli |
| location    | string | Hayır   | Proje konumu      |
| status      | string | Hayır   | Proje durumu      |
| year        | number | Hayır   | Proje yılı        |
| area        | string | Hayır   | Proje alanı       |
| block       | number | Hayır   | Blok sayısı       |

### İlişkisel Alanlar

| Alan               | Tür    | Zorunlu | Açıklama           |
| ------------------ | ------ | ------- | ------------------ |
| headerImage        | file   | Hayır   | Başlık görseli     |
| catalogUrl         | file   | Hayır   | Katalog dosyası    |
| featureTitle       | string | Hayır   | Özellik başlığı    |
| featureDescription | string | Hayır   | Özellik açıklaması |
| featureImage       | file   | Hayır   | Özellik görseli    |
| generalPlanImage   | file   | Hayır   | Genel plan görseli |

### İç İçe Diziler

#### İç Mekan Görselleri (interiorImages)

- `interiorImages[]` - Dosya dizisi
- `interiorImageCaptions[]` - Açıklama dizisi (isteğe bağlı)

#### İnşaat Görselleri (constructionImages)

- `constructionImages[]` - Dosya dizisi

#### Daire Tipleri (apartments)

- `apartmentTypes[]` - Daire tipi dizisi (1|2|3|4 enum)
- `apartmentSquareMeters[]` - Metrekare dizisi
- `apartmentLayoutImages[]` - Plan görseli dosya dizisi
- `apartmentLayoutTotalAreas[]` - Toplam alan dizisi
- `apartmentLayoutRoomAreas[]` - Oda alanı dizisi (isteğe bağlı)
- `apartmentLayoutKitchenAreas[]` - Mutfak alanı dizisi (isteğe bağlı)
- `apartmentLayoutBathroomAreas[]` - Banyo alanı dizisi (isteğe bağlı)
- `apartmentLayoutBalconyAreas[]` - Balkon alanı dizisi (isteğe bağlı)

## Örnek FormData İsteği

```
POST /api/projects
Content-Type: multipart/form-data

name: Metro Park Bakıxanov
description: Metro Park Bakıxanov yaşayış kompleksi unikal müasir layihəsi üzrə inşa edilən, rahat planlı mənzillərə sahib olan çoxmərtəbəli binalardan ibarətdir.
location: Bakıxanov qəsəbəsi, Sülh küçəsi
status: Təhvil verilib
year: 2019
area: 4.5 Hektar
block: 12
headerImage: (dosya)
catalogUrl: (dosya)
featureTitle: İnsan Həyatına Dəyər
featureDescription: Həyatın dəyərini anlayanlar üçün dizayn edilmiş bu məkan, sizə və sevdiklərinizə keyfiyyətli zaman keçirmək üçün hər cür imkan yaradır.
featureImage: (dosya)
generalPlanImage: (dosya)

interiorImages[]: (dosya1)
interiorImageCaptions[]: Qonaq otağı
interiorImages[]: (dosya2)
interiorImageCaptions[]: Yataq otağı

constructionImages[]: (dosya1)
constructionImages[]: (dosya2)

apartmentTypes[]: 1
apartmentSquareMeters[]: 44.40 m²
apartmentLayoutImages[]: (dosya1)
apartmentLayoutTotalAreas[]: 44.40
apartmentLayoutRoomAreas[]: 16.45
apartmentLayoutKitchenAreas[]: 12.00
apartmentLayoutBathroomAreas[]: 4.50
apartmentLayoutBalconyAreas[]: 4.40

apartmentTypes[]: 2
apartmentSquareMeters[]: 68.50 m²
apartmentLayoutImages[]: (dosya2)
apartmentLayoutTotalAreas[]: 68.50
apartmentLayoutRoomAreas[]: 25.00
apartmentLayoutKitchenAreas[]: 15.00
apartmentLayoutBathroomAreas[]: 5.00
apartmentLayoutBalconyAreas[]: 6.50
```

## JSON ile POST İsteği

JSON formatında istek yaparken dosya yüklemesi yapılamaz. Sadece URL'ler kullanılabilir.

### Örnek JSON

```json
{
     "name": "Metro Park Bakıxanov",
     "description": "Metro Park Bakıxanov yaşayış kompleksi unikal müasir layihəsi üzrə inşa edilən, rahat planlı mənzillərə sahib olan çoxmərtəbəli binalardan ibarətdir.",
     "location": "Bakıxanov qəsəbəsi, Sülh küçəsi",
     "status": "Təhvil verilib",
     "year": 2019,
     "area": "4.5 Hektar",
     "block": 12,
     "headerImageUrl": "/uploads/projects/metropark-header.jpg",
     "catalogUrl": "/uploads/catalogs/metropark-catalog.pdf",
     "featureTitle": "İnsan Həyatına Dəyər",
     "featureDescription": "Həyatın dəyərini anlayanlar üçün dizayn edilmiş bu məkan, sizə və sevdiklərinizə keyfiyyətli zaman keçirmək üçün hər cür imkan yaradır.",
     "featureImageUrl": "/uploads/features/feature-bg.jpg",
     "generalPlanImageUrl": "/uploads/plans/general-plan.jpg",
     "interiorImages": [
          {
               "imageUrl": "/uploads/interiors/metropark-livingroom.jpg",
               "caption": "Qonaq otağı"
          },
          {
               "imageUrl": "/uploads/interiors/metropark-bedroom.jpg",
               "caption": "Yataq otağı"
          }
     ],
     "constructionImages": [
          {
               "imageUrl": "/uploads/construction/progress-1.jpg"
          },
          {
               "imageUrl": "/uploads/construction/progress-2.jpg"
          }
     ],
     "apartments": [
          {
               "apartmentType": "1",
               "squareMeter": "44.40 m²",
               "layoutImageUrl": "/uploads/layouts/1-room.png",
               "totalArea": 44.4,
               "roomArea": 16.45,
               "kitchenArea": 12.0,
               "bathroomArea": 4.5,
               "balconyArea": 4.4
          },
          {
               "apartmentType": "2",
               "squareMeter": "68.50 m²",
               "layoutImageUrl": "/uploads/layouts/2-room.png",
               "totalArea": 68.5,
               "roomArea": 25.0,
               "kitchenArea": 15.0,
               "bathroomArea": 5.0,
               "balconyArea": 6.5
          }
     ]
}
```

## Yanıt Formatı

API başarılı bir şekilde işlem tamamlandığında aşağıdaki formatta yanıt döner:

```json
{
     "success": true,
     "message": "Proje başarıyla oluşturuldu",
     "data": {
          "id": 1,
          "name": "Metro Park Bakıxanov",
          "description": "Metro Park Bakıxanov yaşayış kompleksi unikal müasir layihəsi üzrə inşa edilən, rahat planlı mənzillərə sahib olan çoxmərtəbəli binalardan ibarətdir.",
          "imageUrl": "/uploads/projects/metropark-main.jpg",
          "createdAt": "2023-05-15T10:30:00.000Z",
          "updatedAt": "2023-05-15T10:30:00.000Z",
          "location": "Bakıxanov qəsəbəsi, Sülh küçəsi",
          "status": "Təhvil verilib",
          "year": 2019,
          "area": "4.5 Hektar",
          "block": 12,
          "headerImageUrl": "/uploads/projects/metropark-header.jpg",
          "catalogUrl": "/uploads/catalogs/metropark-catalog.pdf",
          "featureTitle": "İnsan Həyatına Dəyər",
          "featureDescription": "Həyatın dəyərini anlayanlar üçün dizayn edilmiş bu məkan, sizə və sevdiklərinizə keyfiyyətli zaman keçirmək üçün hər cür imkan yaradır.",
          "featureImageUrl": "/uploads/features/feature-bg.jpg",
          "generalPlanImageUrl": "/uploads/plans/general-plan.jpg",
          "interiorImages": [
               {
                    "id": 1,
                    "imageUrl": "/uploads/interiors/metropark-livingroom.jpg",
                    "caption": "Qonaq otağı"
               },
               {
                    "id": 2,
                    "imageUrl": "/uploads/interiors/metropark-bedroom.jpg",
                    "caption": "Yataq otağı"
               }
          ],
          "constructionImages": [
               {
                    "id": 1,
                    "imageUrl": "/uploads/construction/progress-1.jpg"
               },
               {
                    "id": 2,
                    "imageUrl": "/uploads/construction/progress-2.jpg"
               }
          ],
          "apartments": [
               {
                    "id": 1,
                    "apartmentType": "1",
                    "squareMeter": "44.40 m²",
                    "layoutImageUrl": "/uploads/layouts/1-room.png",
                    "totalArea": 44.4,
                    "roomArea": 16.45,
                    "kitchenArea": 12.0,
                    "bathroomArea": 4.5,
                    "balconyArea": 4.4
               },
               {
                    "id": 2,
                    "apartmentType": "2",
                    "squareMeter": "68.50 m²",
                    "layoutImageUrl": "/uploads/layouts/2-room.png",
                    "totalArea": 68.5,
                    "roomArea": 25.0,
                    "kitchenArea": 15.0,
                    "bathroomArea": 5.0,
                    "balconyArea": 6.5
               }
          ]
     }
}
```

## Migrasyon

Yeni modelleri veritabanına eklemek için aşağıdaki komutu çalıştırın:

```bash
npm run db:migrate:new-models
```

Bu komut yeni ilişkisel tabloları oluşturur ve mevcut projects tablosunu günceller.
