# 🌍 Rox's Wanderlust Ops

<div align="center">

![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-7.0-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-🐳-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-Proxy-009639?style=for-the-badge&logo=nginx&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)

</div>

## El Blog de Viajes Definitivo 🌍 ✈️ para Ti

Una aplicación fullstack de blog de viajes moderna y escalable, construida con React, Node.js, MongoDB y Redis. Este proyecto es una implementación mejorada del proyecto open-source [Wanderlust](https://github.com/krishnaacharyaa/wanderlust) de Krishna Acharya.

## 📋 Descripción

Wanderlust es una plataforma de blog de viajes que permite a los usuarios compartir sus experiencias, descubrir nuevos destinos y conectar con otros viajeros. La aplicación cuenta con autenticación de usuarios, creación de posts, sistema de categorías y caché con Redis para optimizar el rendimiento.

## 🎯 Objetivo del Proyecto

Este proyecto tiene dos objetivos principales:

1. **Iniciar tu Viaje en Open Source**: Diseñado para facilitar tu entrada al mundo del código abierto. Aquí aprenderás los fundamentos de Git y obtendrás un dominio sólido del stack MERN. Creemos firmemente que aprender y construir deben ir de la mano.

2. **Dominio de React**: Una vez que domines los conceptos básicos, comienza una nueva aventura de maestría en React. Este proyecto cubre todo, desde validación de formularios simples hasta mejoras avanzadas de rendimiento.

## 🚀 Características

- ⭐ **Posts Destacados**: Resalta las mejores historias y destinos de viaje en la página principal para mostrar el mejor contenido e inspirar a los lectores con experiencias emocionantes
- ✨ **Interfaz Intuitiva**: Navega sin esfuerzo a través de contenido de viaje cautivador con nuestro diseño intuitivo y moderno
- 🔍 **Descubrir por Categorías**: Explora diversas experiencias de viaje categorizadas por Viaje, Naturaleza, Ciudad, Aventura y Playas
- 📝 **Gestión Completa de Posts**: Crear, leer, actualizar y explorar publicaciones de viajes con editor enriquecido
- 🔐 **Autenticación Segura**: Sistema JWT robusto con cookies HTTP-only y encriptación bcryptjs
- 🎨 **UI Elegante**: Styled con Tailwind CSS y componentes personalizados con shadcn/ui
- 🏷️ **Sistema de Tags**: Organización flexible por destinos, tipos de viaje y etiquetas personalizadas
- ⚡ **Caché con Redis**: Optimización de consultas frecuentes para rendimiento máximo
- 🐳 **Completamente Dockerizado**: Deployment completo con Docker Compose para desarrollo y producción
- 🧪 **Testing Comprehensivo**: Suite completa de tests unitarios e integración con Jest y Supertest
- 🌓 **Dark Mode**: Soporte completo para tema oscuro con toggle dinámico
- 📱 **Diseño Responsive**: Experiencia optimizada para móviles, tablets y escritorio
- ♿ **Accesibilidad**: Componentes accesibles siguiendo estándares WCAG

## 🛠️ Stack Tecnológico

### Frontend
- React 18 con TypeScript
- Vite como build tool
- Tailwind CSS para estilos
- React Router para navegación
- React Hook Form + Zod para formularios
- Axios para peticiones HTTP
- Jest + React Testing Library

### Backend
- Node.js + Express
- MongoDB con Mongoose
- Redis para caché
- JWT para autenticación
- bcryptjs para encriptación
- Jest + Supertest para testing

### DevOps
- Docker & Docker Compose
- MongoDB oficial image
- Redis Alpine
- Nodemon para desarrollo

## 📦 Requisitos Previos

- Node.js (v18 o superior)
- npm o yarn
- Docker y Docker Compose (opcional, para deployment containerizado)
- MongoDB (si no usas Docker)
- Redis (si no usas Docker)

## 🔧 Instalación

### Opción 1: Instalación Local

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd roxs-wanderlust-ops
```

2. **Instalar todas las dependencias**
```bash
npm run installer
```

Este comando instalará las dependencias del root, backend y frontend automáticamente.

3. **Configurar variables de entorno**

Backend (`backend/.env`):
```env
PORT=8080
MONGODB_URI=mongodb://localhost:27017/wanderlust
JWT_SECRET=tu_secreto_jwt_aqui
REDIS_HOST=localhost
REDIS_PORT=6379
NODE_ENV=development
```

Frontend (`frontend/.env`):
```env
VITE_API_URL=http://localhost:8080/api
```

4. **Iniciar MongoDB y Redis localmente**
```bash
# MongoDB
mongod

# Redis
redis-server
```

5. **Iniciar la aplicación**
```bash
npm start
```

Esto iniciará el frontend en `http://localhost:5173` y el backend en `http://localhost:8080`.

### Opción 2: Con Docker Compose (Recomendado)

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd roxs-wanderlust-ops
```

2. **Configurar variables de entorno para Docker**

Backend (`backend/.env.docker`):
```env
PORT=8080
MONGODB_URI=mongodb://mongo-service:27017/wanderlust
JWT_SECRET=tu_secreto_jwt_aqui
REDIS_HOST=redis-service
REDIS_PORT=6379
NODE_ENV=production
```

Frontend (`frontend/.env.docker`):
```env
VITE_API_URL=http://localhost:8080/api
```

3. **Levantar todos los servicios**
```bash
docker-compose up --build
```

Servicios disponibles:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:8080
- **MongoDB**: localhost:27017
- **Redis**: localhost:6379 (expuesto internamente)

## 📝 Scripts Disponibles

### Root
```bash
npm start              # Inicia frontend y backend concurrentemente
npm run installer      # Instala todas las dependencias
npm run start-frontend # Solo inicia el frontend
npm run start-backend  # Solo inicia el backend
```

### Backend
```bash
npm start              # Inicia el servidor con nodemon
npm test               # Ejecuta tests con coverage
npm run format         # Formatea código con Prettier
npm run check          # Verifica formato del código
```

### Frontend
```bash
npm run dev            # Inicia servidor de desarrollo
npm run build          # Build para producción
npm run preview        # Preview del build de producción
npm test               # Ejecuta tests
npm run lint           # Linter con ESLint
npm run format         # Formatea código con Prettier
```

## 🏗️ Estructura del Proyecto

```
roxs-wanderlust-ops/
├── backend/              # API REST con Node.js/Express
│   ├── api/             # Entry point para Vercel
│   ├── config/          # Configuración de DB y utilidades
│   ├── controllers/     # Lógica de negocio
│   ├── models/          # Modelos de MongoDB
│   ├── routes/          # Definición de rutas
│   ├── services/        # Servicios (Redis, etc.)
│   ├── utils/           # Utilidades y middleware
│   └── tests/           # Tests unitarios e integración
├── frontend/            # SPA con React + TypeScript
│   ├── src/
│   │   ├── components/  # Componentes reutilizables
│   │   ├── pages/       # Páginas de la aplicación
│   │   ├── layouts/     # Layouts (header, footer)
│   │   ├── utils/       # Funciones auxiliares
│   │   └── types/       # Tipos de TypeScript
│   └── public/          # Assets estáticos
├── database/            # Configuración de base de datos
└── docker-compose.yml   # Orquestación de contenedores
```

## 🧪 Testing

### Backend
```bash
cd backend
npm test
```
- Tests unitarios de controladores
- Tests de integración de API
- Coverage reports generados automáticamente

### Frontend
```bash
cd frontend
npm test
```
- Tests de componentes con React Testing Library
- Tests de integración de páginas
- Mocks configurados para assets

## 🐳 Docker

### Servicios en Docker Compose

| Servicio | Puerto | Descripción |
|----------|--------|-------------|
| frontend | 5173 | Aplicación React |
| backend | 31100 | API REST |
| mongodb | 27017 | Base de datos |
| redis | 6379 | Caché (interno) |

### Comandos útiles de Docker

```bash
# Levantar servicios
docker-compose up -d

# Ver logs
docker-compose logs -f [servicio]

# Detener servicios
docker-compose down

# Rebuild específico
docker-compose up --build [servicio]

# Acceder a MongoDB
docker exec -it mongo-service mongosh

# Acceder a Redis
docker exec -it redis-service redis-cli
```

## 🔐 Seguridad

- ✅ Passwords hasheados con bcryptjs
- ✅ JWT tokens almacenados en HTTP-only cookies
- ✅ CORS configurado
- ✅ Validación de entrada con Zod
- ✅ Variables de entorno para secretos
- ✅ Sanitización de datos con Mongoose

## 🌐 Demo

Visita la versión en vivo del proyecto original: [wanderlust-beta.vercel.app](https://wanderlust-beta.vercel.app/)

## 🙏 Créditos y Reconocimientos

Este proyecto es un fork/implementación basada en el proyecto open-source **Wanderlust** creado por [Krishna Acharya](https://github.com/krishnaacharyaa).

- 📦 **Repositorio Original**: [krishnaacharyaa/wanderlust](https://github.com/krishnaacharyaa/wanderlust)
- ⭐ **Stars**: 280+ estrellas en GitHub
- 🤝 **Contributors**: 44+ contribuidores
- 🏆 **Open Source Program**: Parte de GirlScript Summer of Code 2024

Agradecemos a todos los contribuidores del proyecto original por crear esta increíble base educativa para aprender el stack MERN.

### Mejoras en Esta Versión

- ✅ Integración completa de Redis para caché
- ✅ Dockerización completa con Docker Compose
- ✅ Scripts optimizados para desarrollo
- ✅ Configuración mejorada de ambiente
- ✅ Testing expandido
- ✅ Documentación en español

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la [Licencia MIT](LICENSE).

## 👥 Autores

- **Rox** - Implementación y mejoras operacionales
- **[Krishna Acharya](https://github.com/krishnaacharyaa)** - Proyecto original Wanderlust
- **Comunidad Open Source** - 44+ contribuidores del proyecto original

## 💻 Stack MERN

Este proyecto es un ejemplo completo del stack MERN:
- **M**ongoDB - Base de datos NoSQL
- **E**xpress.js - Framework web para Node.js
- **R**eact - Biblioteca de UI
- **N**ode.js - Entorno de ejecución JavaScript

Además incorpora:
- **TypeScript** para type safety
- **Redis** para caché distribuido
- **Docker** para containerización
- **Jest** para testing

## 🌟 Temas de GitHub

`react` `javascript` `typescript` `mern` `mern-stack` `mongodb` `express` `nodejs` `tailwind-css` `docker` `redis` `jwt` `blog` `travel` `webapp`

## 📞 Soporte

Si tienes alguna pregunta o problema:
- 🐛 Abre un [issue](../../issues) en el repositorio
- 💬 Consulta el proyecto original: [krishnaacharyaa/wanderlust](https://github.com/krishnaacharyaa/wanderlust)
- 📧 Contacta al equipo de desarrollo

## 💖 Muestra tu Apoyo

Si encuentras este proyecto interesante e inspirador, por favor considera mostrar tu apoyo dándole una estrella en GitHub. Tu estrella ayuda mucho a alcanzar más desarrolladores y nos anima a seguir mejorando el proyecto.

---

⭐ **Si te gusta este proyecto, no olvides darle una estrella en GitHub!**

🔗 **Proyecto Original**: [krishnaacharyaa/wanderlust](https://github.com/krishnaacharyaa/wanderlust)


