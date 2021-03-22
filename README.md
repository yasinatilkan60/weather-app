## Hava Durumu Uygulaması

Girilecek lokasyon bilgisine göre hava durumuna ait kısa metin bilgisi, anlık olarak sıcaklık, hissedilen sıcaklık ve nem oranı gösterilmektedir.

## Proje Hakkında

Projede lokasyonun enlem ve boylam bilgisini elde etmek için Mapbox API, hava durumu için Weatherstack API kullanılmıştır. Projenin çalıştırılması için aşağıdaki adımlar gerçekleştirilmelidir.

- **src/utils uzantısında forecast.js ve geocode.js** içerisindeki **forecast_api_key ve mapbox_api_key** repository içerisinde bulunmayan **.env** dosyasından gelmektedir. Uygulamanın çalıştırılması için bu key'ler gereklidir.

- node_modules klasörü repository içerisinde olmadığı için aşağıdaki komutlar takip edilmelidir.

```
    cd app
    npm install
    npm run dev

```

## Uygulama Ekranı

![Ana ekran](/public/img/main.png)

## Kaynak

The Complete Node.js Developer Course(3rd Edition), Andrew Mead, Udemy

