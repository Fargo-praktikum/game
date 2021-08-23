# FargoCards

A game inspired by TinyCards developed by Duolingo. 
An educational card quiz game.

# Try

[Here](https://fargo-cards-5.ya-praktikum.tech/)

# Install dev https

- install mkcert and run mkcert -install
follow this guide https://web.dev/how-to-use-local-https/
- go to server/devCert create a cert using 
`mkcert -key-file key.pem -cert-file cert.pem ya-praktikum.tech *.ya-praktikum.tech`

# Run

use `npm run start:container`

# OAuth
Check at https://localhost:5000

# Basic auth
https://local.ya-praktikum.tech:5000/

# Technologies, languages, etc

Client (with SSR)
- Typescript
- React
- Redux
- Service Worker
- Canvas for rendering game UI

Server
- Typescript
- PostgreSQL
- Sequelize

Build & run
- webpack
- npm
- Docker-compose
- Github actions for CI/CD
- nodejs
- express
- nginx (on cloud side)
