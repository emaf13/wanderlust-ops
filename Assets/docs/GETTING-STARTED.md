# 🚀 Guía de Inicio - Wanderlust

Esta guía te llevará paso a paso desde cero hasta tener la aplicación corriendo localmente en tu máquina.

## 📋 Tabla de Contenidos

- [Requisitos Previos](#-requisitos-previos)
- [Instalación Local](#-instalación-local)
- [Configuración de Variables de Entorno](#-configuración-de-variables-de-entorno)
- [Iniciar Servicios](#-iniciar-servicios)
- [Verificación](#-verificación)
- [Solución de Problemas](#-solución-de-problemas)

---

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

### Obligatorios

- **Node.js** (v18 o superior)
  ```bash
  node --version  # Debe mostrar v18.x.x o superior
  ```
  📥 [Descargar Node.js](https://nodejs.org/)

- **npm** o **yarn**
  ```bash
  npm --version   # Viene incluido con Node.js
  ```

### Para desarrollo local (sin Docker)

- **MongoDB** (v7.0 o superior)
  ```bash
  mongod --version
  ```
  📥 [Descargar MongoDB Community](https://www.mongodb.com/try/download/community)

- **Redis** (v7.0 o superior)
  ```bash
  redis-server --version
  ```
  📥 Instalación:
  - macOS: `brew install redis`
  - Linux: `sudo apt-get install redis-server`
  - Windows: [Redis para Windows](https://github.com/microsoftarchive/redis/releases)

### Herramientas Recomendadas

- **Git**
  ```bash
  git --version
  ```

- **VS Code** u otro editor de código
- **Postman** o **Thunder Client** para probar el API
- **MongoDB Compass** para visualizar la base de datos

---

## 🔧 Instalación Local

### Paso 1: Clonar el repositorio

```bash
# HTTPS
git clone https://github.com/tu-usuario/roxs-wanderlust-ops.git

# O con SSH
git clone git@github.com:tu-usuario/roxs-wanderlust-ops.git

# Entrar al directorio
cd roxs-wanderlust-ops
```

### Paso 2: Instalar todas las dependencias

Opción A: **Instalación automática** (recomendado)

```bash
npm run installer
```

Este comando ejecuta:
1. `npm install` en el root
2. `npm install` en backend/
3. `npm install` en frontend/

Opción B: **Instalación manual**

```bash
# Root
npm install

# Backend
cd backend
npm install
cd ..

# Frontend
cd frontend
npm install
cd ..
```

### Paso 3: Verificar instalación

```bash
# Verificar que node_modules exista
ls backend/node_modules
ls frontend/node_modules

# Ver scripts disponibles
npm run
```

---

## ⚙️ Configuración de Variables de Entorno

### Backend

Crea el archivo `backend/.env`:

```bash
cd backend
touch .env
```

Contenido de `backend/.env`:

```env
# Puerto del servidor
PORT=8080

# Base de datos MongoDB
MONGODB_URI=mongodb://localhost:27017/wanderlust

# Secret para JWT (genera uno único)
JWT_SECRET=tu_secreto_super_seguro_aqui_cambiar_en_produccion

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Entorno
NODE_ENV=development

# Frontend URL (para CORS)
FRONTEND_URL=http://localhost:5173

# Configuración de cookies y tokens
ACCESS_COOKIE_MAXAGE=120000
ACCESS_TOKEN_EXPIRES_IN=120s
REFRESH_COOKIE_MAXAGE=120000
REFRESH_TOKEN_EXPIRES_IN=120s

# OAuth (Opcional - si vas a usar Google/GitHub login)
# GOOGLE_CLIENT_ID=tu-google-client-id
# GOOGLE_CLIENT_SECRET=tu-google-client-secret
# GOOGLE_CALLBACK_URL=http://localhost:8080/auth/google/callback

# GITHUB_CLIENT_ID=tu-github-client-id
# GITHUB_CLIENT_SECRET=tu-github-client-secret
# GITHUB_CALLBACK_URL=http://localhost:8080/auth/github/callback
```

### Frontend

Crea el archivo `frontend/.env`:

```bash
cd frontend
touch .env
```

Contenido de `frontend/.env`:

```env
# URL del backend API
VITE_API_PATH=http://localhost:8080
```

### 🔒 Generar JWT_SECRET seguro

Puedes generar un secret aleatorio con:

```bash
# Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# OpenSSL
openssl rand -hex 64

# Python
python3 -c "import secrets; print(secrets.token_hex(64))"
```

---

## 🚀 Iniciar Servicios

### Opción 1: Todo en uno (Recomendado para desarrollo)

```bash
# Desde el root del proyecto
npm start
```

Esto iniciará:
- ✅ Frontend en `http://localhost:5173`
- ✅ Backend en `http://localhost:8080`

### Opción 2: Servicios individuales

**Terminal 1 - MongoDB:**
```bash
mongod
# O con configuración personalizada
mongod --dbpath /ruta/a/datos --port 27017
```

**Terminal 2 - Redis:**
```bash
redis-server
# O con configuración
redis-server --port 6379
```

**Terminal 3 - Backend:**
```bash
npm run start-backend
# O
cd backend && npm start
```

**Terminal 4 - Frontend:**
```bash
npm run start-frontend
# O
cd frontend && npm run dev
```

### 🛑 Detener los servicios

- **npm start:** `Ctrl + C`
- **MongoDB:** `Ctrl + C` en la terminal donde corre
- **Redis:** `Ctrl + C` en la terminal donde corre

---

## ✅ Verificación

### 1. Verificar que los servicios estén corriendo

**Backend:**
```bash
curl http://localhost:8080/api/posts
# Debería responder con un JSON
```

**Frontend:**
```bash
# Abrir en el navegador
open http://localhost:5173
```

**MongoDB:**
```bash
mongosh
> show dbs
> use wanderlust
> show collections
```

**Redis:**
```bash
redis-cli
> ping
PONG
> keys *
```

### 2. Probar el flujo completo

1. **Abrir la aplicación:** `http://localhost:5173`
2. **Verificar posts:** Deberías ver posts de ejemplo
3. **Crear cuenta:** Click en "Sign Up"
4. **Iniciar sesión:** Login con tu cuenta
5. **Crear un post:** Click en "Add Blog"
6. **Verificar post creado:** Debería aparecer en el feed

### 3. Verificar Swagger UI

```bash
# Abrir en el navegador
open http://localhost:8080/api-docs
```

Deberías ver la documentación interactiva del API.

---

## 🐛 Solución de Problemas

### Problema: "Cannot find module"

**Causa:** Dependencias no instaladas

**Solución:**
```bash
# Limpiar e instalar de nuevo
rm -rf node_modules backend/node_modules frontend/node_modules
npm run installer
```

### Problema: "Port 8080 already in use"

**Causa:** Otro proceso está usando el puerto

**Solución:**
```bash
# Ver qué proceso usa el puerto
lsof -i :8080

# Matar el proceso (reemplaza PID con el número real)
kill -9 PID

# O cambiar el puerto en backend/.env
PORT=3000
```

### Problema: "MongoDB connection failed"

**Causa:** MongoDB no está corriendo

**Solución:**
```bash
# Verificar si MongoDB está corriendo
ps aux | grep mongod

# Iniciar MongoDB
mongod

# Verificar conexión
mongosh mongodb://localhost:27017/wanderlust
```

### Problema: "Redis connection refused"

**Causa:** Redis no está corriendo

**Solución:**
```bash
# Verificar si Redis está corriendo
redis-cli ping

# Iniciar Redis
redis-server

# O en macOS con Homebrew
brew services start redis
```

### Problema: "CORS error" en el navegador

**Causa:** URL del frontend no está en la lista de CORS

**Solución:**
Verifica que `FRONTEND_URL` en `backend/.env` sea correcto:
```env
FRONTEND_URL=http://localhost:5173
```

### Problema: Variables de entorno no se cargan

**Solución:**
```bash
# Verificar que los archivos existan
ls backend/.env
ls frontend/.env

# Verificar que no haya errores de sintaxis
cat backend/.env
cat frontend/.env

# Reiniciar el servidor
```

### Problema: "EADDRINUSE" - Puerto ya en uso

**Solución:**
```bash
# Encontrar y matar el proceso
# macOS/Linux
lsof -ti:8080 | xargs kill -9
lsof -ti:5173 | xargs kill -9

# Windows
netstat -ano | findstr :8080
taskkill /PID [número_pid] /F
```

---

## 🔄 Comandos Útiles

### Desarrollo

```bash
# Iniciar todo
npm start

# Iniciar solo backend
npm run start-backend

# Iniciar solo frontend
npm run start-frontend

# Ver logs del backend
cd backend && npm start

# Build del frontend
cd frontend && npm run build
```

### Testing

```bash
# Correr todos los tests
npm test

# Tests del backend
cd backend && npm test

# Tests del frontend
cd frontend && npm test

# Tests con coverage
npm run test:coverage
```

### Linting y formato

```bash
# Backend
cd backend
npm run format  # Formatear con Prettier
npm run check   # Verificar formato

# Frontend
cd frontend
npm run lint    # ESLint
npm run format  # Prettier
```

### Base de datos

```bash
# Conectar a MongoDB
mongosh mongodb://localhost:27017/wanderlust

# Comandos útiles en mongosh
show dbs                    # Ver bases de datos
use wanderlust              # Usar base de datos
show collections            # Ver colecciones
db.posts.find()             # Ver todos los posts
db.users.find()             # Ver todos los usuarios
db.posts.countDocuments()   # Contar posts
db.posts.drop()             # Borrar colección (¡cuidado!)

# Redis CLI
redis-cli
> keys *                    # Ver todas las keys
> get key_name              # Obtener valor
> del key_name              # Borrar key
> flushall                  # Borrar todo (¡cuidado!)
```

---

## 📚 Próximos Pasos

Una vez que tengas todo corriendo localmente:

1. 📖 Lee la [Guía de Desarrollo](DEVELOPMENT.md) para entender la estructura del proyecto
2. 🐳 Prueba [Docker Compose](DOCKER-COMPOSE-GUIDE.md) para un setup más fácil
3. 📖 Explora el [Swagger UI](SWAGGER-GUIDE.md) para conocer todos los endpoints
4. ☸️ Cuando estés listo, aprende sobre [Kubernetes](KUBERNETES-GUIDE.md)

---

## 🆘 ¿Necesitas ayuda?

- 🐛 [Abrir un issue](../../issues)
- 💬 Consultar la documentación del proyecto original
- 📧 Contactar al equipo de desarrollo

---

**¡Listo para empezar a desarrollar! 🚀**
