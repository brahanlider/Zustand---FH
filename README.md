# React + TypeScript + Vite + Zustand + TailwindCSS + ReactRouterDom

Este es un cascarón de proyecto, siéntete libre de usarlo para tus proyectos.

<img src="https://github.com/Klerith/zustand-mini-curso/blob/main/public/screenshot.png?raw=true" alt="Dashboard Screenshot">

## Instalar

1. Clonar proyecto
2. Instalar dependencias `npm install`
3. Correr en desarrollo `npm run dev`

- Agregar docker-compose.yaml

- .env=>

```bash
APP_VERSION=0.0.1

STAGE=prod

DB_PASSWORD=MySecr3tPassWord@as2
DB_NAME=TesloDB
DB_HOST=TesloDB
DB_PORT=5432
DB_USERNAME=postgres

PORT=3000
HOST_API=http://localhost:3000/api

JWT_SECRET=Est3EsMISE3Dsecreto32s
```

---

LUEGO =>

4. Correr en desarrollo `docker compose up -d`
