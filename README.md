# FargoCards

Игра по мотивам TinyCards

# Поиграть

[На Heroku](https://fargocards.herokuapp.com/)

# Установка dev https
- нужно установить mkcert и запустить mkcert -install
инфа здесь https://web.dev/how-to-use-local-https/
- перейти во вкладку server/devCert и создать сертификат
`mkcert -key-file key.pem -cert-file cert.pem ya-praktikum.tech *.ya-praktikum.tech`

# OAuth
Проверем на адресе https://localhost:5000

# Обычная (и серверная) аутентификация
Адрес https://local.ya-praktikum.tech:5000/

# Сводка по переменным
- dev режим: NODE_ENV=development, HTTP_PROTOCOL=(http|https)
- prod режим: NODE_ENV=production, HTTP_PROTOCOL=http
- heroku режим: NODE_ENV=development, HTTP_PROTOCOL=http

