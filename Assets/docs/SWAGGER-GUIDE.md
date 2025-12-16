# Guía de Uso de Swagger UI - API Wanderlust

## 📍 Acceso a Swagger

### Con Docker (Recomendado)
```
http://api.127.0.0.1.nip.io/api-docs
```

### Desarrollo Local
```
http://localhost:5000/api-docs
```

---

## 🚀 Primeros Pasos

### 1. Seleccionar el Servidor Correcto

Al abrir Swagger UI, verás un **dropdown de "Servers"** en la parte superior de la página.

**Para Docker:**
- Selecciona: `Docker proxy server - http://api.127.0.0.1.nip.io`

**Para desarrollo local:**
- Selecciona: `Development server - http://localhost:5000`

⚠️ **Importante:** Si no seleccionas el servidor correcto, obtendrás errores de CORS.

---

## 📚 Estructura de la Documentación

Swagger UI organiza los endpoints en dos secciones principales:

### 🔐 Authentication
Endpoints para gestionar usuarios y autenticación:
- Registro e inicio de sesión con email/password
- Autenticación OAuth con Google y GitHub
- Cierre de sesión

### 📝 Posts
Endpoints para gestionar publicaciones de viajes:
- Crear, leer, actualizar y eliminar posts
- Filtrar por categorías
- Obtener posts destacados y recientes

---

## 🎯 Cómo Probar un Endpoint

### Ejemplo: Crear un Post (POST)

1. **Expandir el endpoint**
   - Haz clic en `POST /api/posts` para expandirlo

2. **Ver la documentación**
   - Revisa la descripción del endpoint
   - Observa los parámetros requeridos
   - Verifica los códigos de respuesta posibles

3. **Hacer clic en "Try it out"**
   - Botón ubicado en la esquina superior derecha del endpoint

4. **Editar el Request Body**
   ```json
   {
     "title": "Mi viaje a París",
     "authorName": "Juan Pérez",
     "imageLink": "https://example.com/paris.jpg",
     "categories": ["Travel", "Adventure"],
     "description": "Una increíble aventura por las calles de París...",
     "isFeaturedPost": true
   }
   ```

5. **Ejecutar la petición**
   - Haz clic en el botón azul "Execute"

6. **Ver la respuesta**
   - **Response body:** El JSON devuelto por la API
   - **Response code:** El código HTTP (200, 400, 500, etc.)
   - **Response headers:** Los headers de la respuesta
   - **Curl:** El comando curl equivalente para usar en terminal

---

## 📋 Guía por Tipo de Petición

### GET - Obtener Datos

**Ejemplo: Obtener todos los posts**

```
GET /api/posts
```

1. Expande el endpoint
2. Clic en "Try it out"
3. Clic en "Execute"
4. La respuesta mostrará un array con todos los posts

**Ejemplo: Obtener un post específico**

```
GET /api/posts/{id}
```

1. Expande el endpoint
2. Clic en "Try it out"
3. Ingresa el ID del post (ej: `507f1f77bcf86cd799439011`)
4. Clic en "Execute"

### POST - Crear Datos

**Ejemplo: Crear un nuevo post**

```
POST /api/posts
```

**Request Body obligatorio:**
```json
{
  "title": "string",
  "authorName": "string",
  "imageLink": "string (URL con .jpg, .jpeg, .png o .webp)",
  "categories": ["string"] (máximo 3),
  "description": "string",
  "isFeaturedPost": false (opcional)
}
```

**Validaciones:**
- `imageLink` debe terminar en .jpg, .jpeg, .png o .webp
- `categories` puede tener máximo 3 elementos
- Todos los campos son requeridos excepto `isFeaturedPost`

### PATCH - Actualizar Datos

**Ejemplo: Actualizar un post existente**

```
PATCH /api/posts/{id}
```

1. Ingresa el ID del post a actualizar
2. Modifica solo los campos que quieres cambiar:
   ```json
   {
     "title": "Nuevo título actualizado",
     "isFeaturedPost": true
   }
   ```
3. Los campos no incluidos permanecerán sin cambios

### DELETE - Eliminar Datos

**Ejemplo: Eliminar un post**

```
DELETE /api/posts/{id}
```

1. Ingresa el ID del post a eliminar
2. Clic en "Execute"
3. El post será eliminado permanentemente

---

## 🔍 Características Útiles de Swagger UI

### 1. Schemas (Esquemas de Datos)

En la parte inferior de la página, encontrarás la sección **"Schemas"** que muestra:

- **Post:** Estructura completa de un post con todos sus campos
- **User:** Estructura de un usuario
- **Error:** Formato de respuesta de errores

### 2. Autorización (Próximamente)

Si la API requiere autenticación:
- Busca el botón "Authorize" 🔓 en la parte superior
- Ingresa tu token o credenciales
- Todos los endpoints usarán automáticamente esas credenciales

### 3. Curl Command

Cada petición genera un comando curl que puedes copiar y usar en tu terminal:

```bash
curl -X 'POST' \
  'http://api.127.0.0.1.nip.io/api/posts' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "title": "Mi viaje a París",
  "authorName": "Juan Pérez",
  ...
}'
```

### 4. Códigos de Respuesta

Cada endpoint muestra los posibles códigos de respuesta:

- **200:** Operación exitosa
- **400:** Datos inválidos (error de validación)
- **404:** Recurso no encontrado
- **500:** Error interno del servidor

---

## 📖 Ejemplos Prácticos

### Flujo Completo: Gestión de Posts

#### 1. Crear un post
```http
POST /api/posts
```
```json
{
  "title": "Aventura en Tokio",
  "authorName": "María García",
  "imageLink": "https://example.com/tokyo.jpg",
  "categories": ["Travel", "Food"],
  "description": "Descubriendo la gastronomía japonesa...",
  "isFeaturedPost": false
}
```

**Respuesta:** Guarda el `_id` del post creado

#### 2. Obtener todos los posts destacados
```http
GET /api/posts/featured
```

#### 3. Filtrar posts por categoría
```http
GET /api/posts/categories/Travel
```

#### 4. Actualizar el post
```http
PATCH /api/posts/{id}
```
```json
{
  "isFeaturedPost": true
}
```

#### 5. Obtener el post actualizado
```http
GET /api/posts/{id}
```

#### 6. Eliminar el post
```http
DELETE /api/posts/{id}
```

---

## 🎨 Filtrado por Categorías

### Categorías Disponibles

Consulta el código fuente o el backend para ver las categorías válidas. Ejemplos comunes:
- Travel
- Adventure
- Food
- Nature
- Culture

### Ejemplo de Uso
```http
GET /api/posts/categories/Adventure
```

---

## ⚡ Caché con Redis

Algunos endpoints utilizan caché de Redis para mejorar el rendimiento:

- ✅ `GET /api/posts` - Todos los posts
- ✅ `GET /api/posts/featured` - Posts destacados
- ✅ `GET /api/posts/latest` - Posts recientes

El caché se invalida automáticamente cuando:
- Se crea un nuevo post
- Se actualiza un post existente
- Se elimina un post

---

## 🔧 Solución de Problemas

### Error: "Failed to fetch"

**Causa:** Servidor incorrecto seleccionado

**Solución:**
1. Verifica el dropdown de "Servers"
2. Selecciona el servidor correcto según tu entorno
3. Intenta nuevamente

### Error: "CORS"

**Causa:** La URL del servidor no coincide con la URL de acceso

**Solución:**
1. Asegúrate de usar la URL correcta para acceder a Swagger
2. Selecciona el servidor correspondiente en el dropdown

### Error: 400 - Bad Request

**Causa:** Datos inválidos en el request

**Solución:**
1. Revisa el Response Body para ver el mensaje de error específico
2. Verifica que todos los campos requeridos estén presentes
3. Confirma que los datos cumplan con las validaciones:
   - `imageLink` con extensión correcta
   - Máximo 3 categorías
   - Formatos correctos

### Error: 404 - Not Found

**Causa:** El ID del post no existe

**Solución:**
1. Verifica que el ID sea correcto
2. Usa `GET /api/posts` para obtener IDs válidos

### Error: 500 - Internal Server Error

**Causa:** Error en el servidor (MongoDB, Redis, etc.)

**Solución:**
1. Verifica que los servicios estén corriendo: `docker-compose ps`
2. Revisa los logs: `docker-compose logs backend`
3. Reinicia los servicios si es necesario: `docker-compose restart`

---

## 💡 Tips y Mejores Prácticas

### 1. Usa Ejemplos Realistas
- Utiliza URLs de imágenes reales para probar
- Usa descripciones completas
- Prueba con diferentes combinaciones de categorías

### 2. Guarda los IDs
- Copia los IDs de los posts que creas para usarlos en otras peticiones
- Usa un editor de texto para mantener una lista de IDs de prueba

### 3. Prueba Casos de Error
- Intenta crear un post sin campos requeridos
- Usa una URL de imagen inválida
- Agrega más de 3 categorías
- Esto te ayudará a entender las validaciones

### 4. Experimenta con Filtros
- Prueba diferentes categorías
- Combina múltiples peticiones para entender el flujo
- Observa cómo funciona el caché

### 5. Exporta los Requests
- Usa los comandos curl generados
- Crea colecciones en Postman a partir de la especificación OpenAPI
- Automatiza pruebas con scripts

---

## 📥 Exportar la Especificación OpenAPI

Swagger UI se basa en la especificación OpenAPI (antes Swagger Spec). Puedes obtenerla en:

```
http://api.127.0.0.1.nip.io/api-docs/swagger.json
```

Esta especificación JSON puede ser:
- Importada en Postman
- Usada para generar clientes de API
- Compartida con otros desarrolladores
- Versionada en el repositorio

---

## 🚀 Próximos Pasos

Una vez que te familiarices con Swagger UI:

1. **Integra con tu frontend:** Usa los endpoints documentados
2. **Automatiza pruebas:** Crea scripts de testing
3. **Genera clientes:** Usa herramientas como Swagger Codegen
4. **Documenta cambios:** Actualiza las anotaciones JSDoc cuando modifiques la API

---

## 🌐 Configurar Swagger con tu Propio Dominio

### ¿Cuándo necesitas personalizar el servidor?

Cuando despliegas tu API en:
- **Producción** con tu propio dominio (ej: `api.miempresa.com`)
- **Staging** con un subdominio (ej: `api-staging.miempresa.com`)
- **Kubernetes** con Ingress (ej: `api.wanderlust.127.0.0.1.nip.io`)
- **Cloud providers** (AWS, Azure, GCP) con URLs específicas

### Paso 1: Editar la configuración de Swagger

Abre el archivo de configuración:
```bash
backend/config/swagger.js
```

### Paso 2: Agregar tu servidor

Localiza la sección `servers` y agrega tu dominio:

```javascript
servers: [
  {
    url: 'http://api.wanderlust.127.0.0.1.nip.io',
    description: 'Kubernetes Ingress server',
  },
  {
    url: 'http://api.127.0.0.1.nip.io',
    description: 'Docker Compose proxy server',
  },
  {
    url: 'http://localhost:8080',
    description: 'Local development server',
  },
  {
    url: 'https://api.wanderlust.com',      // ← Tu dominio de producción
    description: 'Production server',
  },
  // Agregar más servidores aquí:
  {
    url: 'https://api-staging.tuempresa.com',
    description: 'Staging server',
  },
  {
    url: 'https://api.tuempresa.com',
    description: 'Production API',
  },
],
```

### Paso 3: Consideraciones por Entorno

#### 🐳 Docker Compose

**URL recomendada:** `http://api.127.0.0.1.nip.io`

```javascript
{
  url: 'http://api.127.0.0.1.nip.io',
  description: 'Docker Compose con nginx-proxy',
}
```

**Requisitos:**
- nginx-proxy configurado en docker-compose.yml
- Variable de entorno `VIRTUAL_HOST=api.127.0.0.1.nip.io`

#### ☸️ Kubernetes

**URL recomendada:** `http://api.wanderlust.127.0.0.1.nip.io`

```javascript
{
  url: 'http://api.wanderlust.127.0.0.1.nip.io',
  description: 'Kubernetes Ingress - Desarrollo local',
}
```

**Requisitos:**
- NGINX Ingress Controller instalado
- Ingress configurado con el host correspondiente
- Servicio backend expuesto correctamente

Para producción en Kubernetes:
```javascript
{
  url: 'https://api.tuempresa.com',
  description: 'Kubernetes Production',
}
```

#### ☁️ Cloud Providers

**AWS (con Load Balancer):**
```javascript
{
  url: 'https://api.tuempresa.com',
  description: 'AWS Production (ALB)',
}
```

**Azure (con Application Gateway):**
```javascript
{
  url: 'https://api-wanderlust.azurewebsites.net',
  description: 'Azure App Service',
}
```

**GCP (con Cloud Run):**
```javascript
{
  url: 'https://wanderlust-api-abc123.run.app',
  description: 'Google Cloud Run',
}
```

### Paso 4: Variables de Entorno Dinámicas

Para entornos que cambian frecuentemente, usa variables de entorno:

```javascript
// swagger.js
const API_URL = process.env.API_URL || 'http://localhost:8080';
const ENVIRONMENT = process.env.NODE_ENV || 'development';

servers: [
  {
    url: API_URL,
    description: `${ENVIRONMENT} server`,
  },
  // ... otros servidores estáticos
],
```

Luego configura en tu entorno:
```bash
# .env (Desarrollo)
API_URL=http://localhost:8080
NODE_ENV=development

# .env.docker (Docker)
API_URL=http://api.127.0.0.1.nip.io
NODE_ENV=Development

# .env.production (Producción)
API_URL=https://api.tuempresa.com
NODE_ENV=production
```

### Paso 5: CORS para tu Dominio

**IMPORTANTE:** Cuando uses tu propio dominio, debes configurar CORS.

Edita `backend/server.js` o tu middleware de CORS:

```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:5173',                      // Desarrollo local
    'http://127.0.0.1.nip.io',                    // Frontend Docker
    'http://wanderlust.127.0.0.1.nip.io',         // Frontend Kubernetes
    'https://www.tuempresa.com',                  // Frontend producción
    'https://tuempresa.com',                      // Sin www
  ],
  credentials: true,
}));
```

**Para Kubernetes Ingress**, actualiza las anotaciones:

```yaml
# kubernetes/ingress.yaml
annotations:
  nginx.ingress.kubernetes.io/enable-cors: "true"
  nginx.ingress.kubernetes.io/cors-allow-origin: "https://www.tuempresa.com"
  nginx.ingress.kubernetes.io/cors-allow-credentials: "true"
```

### Paso 6: SSL/HTTPS en Producción

#### Con Certificado SSL

```javascript
{
  url: 'https://api.tuempresa.com',  // ← Nota el https://
  description: 'Production server (SSL)',
}
```

#### Con Let's Encrypt (Kubernetes)

```yaml
# kubernetes/ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  tls:
  - hosts:
    - api.tuempresa.com
    secretName: api-tls-cert
  rules:
  - host: api.tuempresa.com
    # ...
```

#### Con AWS Certificate Manager

```javascript
{
  url: 'https://api.tuempresa.com',
  description: 'AWS Production (ACM Certificate)',
}
```

### Paso 7: Reconstruir y Desplegar

#### Docker Compose
```bash
docker-compose build backend
docker-compose up -d backend
```

#### Docker con Multi-arquitectura
```bash
docker buildx bake backend --push
```

#### Kubernetes
```bash
# Reconstruir imagen
docker build -t turegistro/wanderlust-backend:v1.0.1 ./backend

# Push al registry
docker push turegistro/wanderlust-backend:v1.0.1

# Actualizar deployment
kubectl set image deployment/backend-deployment \
  backend=turegistro/wanderlust-backend:v1.0.1 \
  -n wanderlust

# O reiniciar
kubectl rollout restart deployment/backend-deployment -n wanderlust
```

### Paso 8: Verificar en Swagger UI

1. Accede a Swagger UI en tu dominio:
   ```
   https://api.tuempresa.com/api-docs
   ```

2. Verifica el dropdown de "Servers"
   - Deberías ver todos los servidores que configuraste

3. Selecciona tu servidor de producción

4. Prueba un endpoint (ej: `GET /api/posts`)

5. Verifica que la respuesta sea exitosa

### 🔍 Troubleshooting

#### Problema: No veo mi servidor en el dropdown

**Solución:**
- Verifica que reconstruiste la imagen después de editar swagger.js
- Limpia la caché del navegador (Ctrl+Shift+R)
- Verifica los logs del backend para errores de sintaxis

```bash
docker-compose logs backend
# o
kubectl logs -l app=backend -n wanderlust
```

#### Problema: Error de CORS al usar mi dominio

**Solución:**
- Agrega tu dominio a la configuración de CORS
- En Kubernetes, actualiza las anotaciones del Ingress
- Verifica que el frontend use el mismo protocolo (http/https)

#### Problema: "Failed to fetch" en Swagger

**Soluciones:**
1. Verifica que el backend esté accesible desde el navegador
2. Abre las DevTools (F12) → Network para ver el error exacto
3. Verifica certificados SSL (si usas HTTPS)
4. Revisa que el puerto esté abierto en el firewall

#### Problema: Certificado SSL no válido

**Solución para desarrollo:**
```javascript
{
  url: 'http://api.tuempresa.local',  // Usa http en lugar de https
  description: 'Development server (no SSL)',
}
```

**Solución para producción:**
- Usa Let's Encrypt con cert-manager (Kubernetes)
- Usa certificados de AWS ACM, Azure Key Vault, etc.
- Configura el certificado correctamente en tu Load Balancer

### 📝 Ejemplo Completo: Múltiples Entornos

```javascript
// backend/config/swagger.js
const servers = [];

// Desarrollo local
if (process.env.NODE_ENV === 'development') {
  servers.push({
    url: 'http://localhost:8080',
    description: 'Local development',
  });
}

// Docker Compose
if (process.env.DOCKER_ENV === 'true') {
  servers.push({
    url: 'http://api.127.0.0.1.nip.io',
    description: 'Docker Compose',
  });
}

// Kubernetes local
servers.push({
  url: 'http://api.wanderlust.127.0.0.1.nip.io',
  description: 'Kubernetes - Minikube',
});

// Staging
if (process.env.NODE_ENV !== 'production') {
  servers.push({
    url: 'https://api-staging.tuempresa.com',
    description: 'Staging environment',
  });
}

// Producción
servers.push({
  url: 'https://api.tuempresa.com',
  description: 'Production',
});

export default {
  definition: {
    openapi: '3.0.0',
    info: { /* ... */ },
    servers: servers,
    // ...
  },
  // ...
};
```

### 🎯 Mejores Prácticas

1. **Usa HTTPS en producción** - Siempre
2. **Mantén los servidores ordenados** - Del más usado al menos usado
3. **Descripción clara** - Indica el propósito de cada servidor
4. **Variables de entorno** - Para URLs dinámicas
5. **CORS configurado** - Lista blanca de dominios permitidos
6. **Certificados válidos** - No uses self-signed en producción
7. **Documentación actualizada** - Indica qué servidor usar en cada entorno

### ✅ Checklist de Configuración

- [ ] Servidor agregado en swagger.js
- [ ] CORS configurado para el nuevo dominio
- [ ] DNS apunta al servidor correcto
- [ ] Certificado SSL configurado (si es HTTPS)
- [ ] Backend reconstruido y desplegado
- [ ] Swagger UI accesible en el nuevo dominio
- [ ] Endpoints funcionan correctamente
- [ ] Frontend puede comunicarse con el backend

---

## 📞 Recursos Adicionales

- **Documentación de OpenAPI:** https://swagger.io/specification/
- **Swagger UI Docs:** https://swagger.io/tools/swagger-ui/
- **Tutorial de Swagger:** https://swagger.io/docs/specification/basic-structure/
- **OpenAPI Server Object:** https://swagger.io/specification/#server-object

---

## ✅ Checklist de Verificación

Antes de reportar un problema, verifica:

- [ ] ¿Seleccionaste el servidor correcto?
- [ ] ¿Los servicios de Docker están corriendo?
- [ ] ¿El backend muestra "Server is running" en los logs?
- [ ] ¿MongoDB y Redis están conectados?
- [ ] ¿Estás usando datos válidos según las validaciones?
- [ ] ¿El endpoint que intentas usar existe en la documentación?

---

**¡Happy Testing! 🎉**

Swagger UI hace que probar y documentar APIs sea fácil e interactivo. Experimenta, prueba diferentes escenarios y familiarízate con todos los endpoints disponibles.
