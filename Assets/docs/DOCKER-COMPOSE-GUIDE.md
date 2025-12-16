# Guía de Docker Compose - Wanderlust

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Docker Desktop** (incluye Docker Compose)
  - macOS: [Descargar Docker Desktop](https://docs.docker.com/desktop/install/mac-install/)
  - Windows: [Descargar Docker Desktop](https://docs.docker.com/desktop/install/windows-install/)
  - Linux: [Descargar Docker Desktop](https://docs.docker.com/desktop/install/linux-install/)

### Verificar instalación:
```bash
docker --version
docker-compose --version
```

---

## 🚀 Inicio Rápido

### 1. Clonar el repositorio (si no lo has hecho)
```bash
git clone <url-del-repo>
cd roxs-wanderlust-ops
```

### 2. Configurar variables de entorno

Asegúrate de que existan los archivos de configuración:
- `backend/.env.docker`
- `frontend/.env.docker`

### 3. Levantar todos los servicios
```bash
docker-compose up -d
```

**Flags:**
- `-d` = Modo detached (en segundo plano)

### 4. Verificar que los contenedores estén corriendo
```bash
docker-compose ps
```

Deberías ver 5 contenedores activos:
- ✅ `backend`
- ✅ `frontend`
- ✅ `mongo-service`
- ✅ `redis-service`
- ✅ `nginx-proxy`

### 5. Acceder a la aplicación

**Frontend:**
```
http://127.0.0.1.nip.io
```

**Backend API:**
```
http://api.127.0.0.1.nip.io
```

**Swagger UI:**
```
http://api.127.0.0.1.nip.io/api-docs
```

---

## 📦 Comandos Principales

### Iniciar los servicios

```bash
# Iniciar todos los servicios en segundo plano
docker-compose up -d

# Iniciar y ver los logs en tiempo real
docker-compose up

# Iniciar servicios específicos
docker-compose up -d backend frontend
```

### Detener los servicios

```bash
# Detener todos los servicios (mantiene contenedores)
docker-compose stop

# Detener servicios específicos
docker-compose stop backend

# Detener y eliminar contenedores
docker-compose down

# Detener y eliminar contenedores + volúmenes
docker-compose down -v
```

### Reconstruir imágenes

```bash
# Reconstruir todas las imágenes
docker-compose build

# Reconstruir sin usar caché
docker-compose build --no-cache

# Reconstruir y levantar
docker-compose up -d --build

# Reconstruir solo un servicio
docker-compose build backend
```

### Ver logs

```bash
# Ver logs de todos los servicios
docker-compose logs

# Ver logs en tiempo real (follow)
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs backend

# Ver últimas 50 líneas
docker-compose logs --tail 50 backend

# Ver logs con timestamps
docker-compose logs -t backend
```

### Reiniciar servicios

```bash
# Reiniciar todos los servicios
docker-compose restart

# Reiniciar un servicio específico
docker-compose restart backend
```

### Ejecutar comandos dentro de contenedores

```bash
# Abrir shell en el contenedor backend
docker-compose exec backend sh

# Ejecutar un comando específico
docker-compose exec backend npm install

# Ejecutar como root
docker-compose exec -u root backend sh
```

### Estado de los servicios

```bash
# Ver estado de todos los contenedores
docker-compose ps

# Ver recursos utilizados
docker stats

# Ver configuración final de docker-compose
docker-compose config
```

---

## 🔧 Configuración de Arquitecturas

El proyecto soporta **múltiples arquitecturas**:
- `linux/amd64` (Intel/AMD)
- `linux/arm64` (Apple Silicon/ARM)

### Construir para múltiples arquitecturas

Si necesitas construir las imágenes para ambas arquitecturas y subirlas al registry:

```bash
# Usando Docker Bake
docker buildx bake --push
```

---

## 📁 Estructura de Servicios

### Backend
- **Puerto interno:** 8080
- **Acceso:** `http://api.127.0.0.1.nip.io`
- **Imagen:** `roxsross12/wanderlust-backend:latest`
- **Depende de:** MongoDB, Redis

### Frontend
- **Puerto interno:** 5173
- **Acceso:** `http://127.0.0.1.nip.io`
- **Imagen:** `roxsross12/wanderlust-frontend:latest`
- **Depende de:** Backend

### MongoDB
- **Puerto interno:** 27017
- **Host interno:** `mongo-service`
- **Volumen:** `./backend/data:/data`

### Redis
- **Puerto interno:** 6379
- **Host interno:** `redis-service`
- **Imagen:** `redis:7.0.5-alpine`

### Nginx Proxy
- **Puertos:** 80, 443
- **Función:** Enrutamiento basado en VIRTUAL_HOST

---

## 🛠️ Workflows Comunes

### Desarrollo Local

```bash
# 1. Levantar servicios
docker-compose up -d

# 2. Ver logs en tiempo real
docker-compose logs -f backend frontend

# 3. Hacer cambios en el código

# 4. Reconstruir y reiniciar
docker-compose up -d --build backend

# 5. Ver logs para debugging
docker-compose logs --tail 100 backend
```

### Actualizar Dependencias

```bash
# Backend (Node.js)
docker-compose exec backend npm install nueva-dependencia
docker-compose restart backend

# Frontend
docker-compose exec frontend npm install nueva-dependencia
docker-compose restart frontend
```

### Limpiar Todo

```bash
# Detener y eliminar contenedores
docker-compose down

# Eliminar también volúmenes
docker-compose down -v

# Eliminar imágenes locales
docker rmi roxsross12/wanderlust-backend:latest
docker rmi roxsross12/wanderlust-frontend:latest

# Limpiar sistema completo de Docker
docker system prune -a --volumes
```

### Backup de Base de Datos

```bash
# Exportar base de datos MongoDB
docker-compose exec mongodb mongodump --out /data/backup

# Copiar backup al host
docker cp mongo-service:/data/backup ./backup-$(date +%Y%m%d)
```

### Restaurar Base de Datos

```bash
# Copiar backup al contenedor
docker cp ./backup mongo-service:/data/restore

# Restaurar
docker-compose exec mongodb mongorestore /data/restore
```

---

## 🐛 Solución de Problemas

### Problema: Los contenedores no inician

```bash
# Ver el estado
docker-compose ps

# Ver logs de error
docker-compose logs

# Eliminar y recrear
docker-compose down
docker-compose up -d
```

### Problema: Error "port is already allocated"

```bash
# Ver qué proceso usa el puerto 80
sudo lsof -i :80

# Detener nginx local u otro servicio
sudo systemctl stop nginx

# O cambiar el puerto en docker-compose.yml
ports:
  - "8080:80"  # Usar puerto 8080 en lugar de 80
```

### Problema: Backend no se conecta a MongoDB

```bash
# Verificar que MongoDB esté corriendo
docker-compose ps mongodb

# Ver logs de MongoDB
docker-compose logs mongodb

# Verificar la red
docker network inspect roxs-wanderlust-ops_wanderlust-network

# Reiniciar servicios en orden
docker-compose restart mongodb redis backend
```

### Problema: Cambios en el código no se reflejan

```bash
# Reconstruir sin caché
docker-compose build --no-cache backend

# Reiniciar el servicio
docker-compose up -d --force-recreate backend
```

### Problema: Error 502 Bad Gateway

```bash
# Verificar que el backend esté corriendo
docker-compose logs backend

# Verificar que MongoDB y Redis estén conectados
docker-compose logs backend | grep -i "connected\|error"

# Reiniciar nginx-proxy
docker-compose restart nginx-proxy
```

### Problema: Espacio en disco

```bash
# Ver uso de espacio
docker system df

# Limpiar recursos no usados
docker system prune

# Limpiar todo (cuidado: elimina todo lo no usado)
docker system prune -a --volumes
```

---

## 📊 Monitoreo

### Ver uso de recursos en tiempo real

```bash
docker stats
```

### Ver logs de todos los servicios

```bash
docker-compose logs -f --tail 100
```

### Inspeccionar un contenedor

```bash
docker-compose exec backend env
docker-compose exec backend ps aux
```

---

## 🔄 Actualización de Imágenes

### Actualizar desde Docker Hub

```bash
# Descargar últimas imágenes
docker-compose pull

# Recrear contenedores con nuevas imágenes
docker-compose up -d
```

### Construir y subir al registry

```bash
# Construir localmente
docker-compose build

# Etiquetar (si es necesario)
docker tag roxsross12/wanderlust-backend:latest roxsross12/wanderlust-backend:v1.0.0

# Subir al registry
docker push roxsross12/wanderlust-backend:latest
docker push roxsross12/wanderlust-frontend:latest
```

---

## ⚙️ Variables de Entorno

### Backend (.env.docker)

```env
MONGODB_URI="mongodb://mongo-service/wanderlust"
REDIS_URL="redis://redis-service:6379"
PORT=8080
FRONTEND_URL="http://127.0.0.1.nip.io"
JWT_SECRET=tu_secret_aqui
NODE_ENV=Development
```

### Frontend (.env.docker)

```env
VITE_API_URL="http://api.127.0.0.1.nip.io"
```

---

## 🚦 Health Checks

### Verificar salud de servicios

```bash
# Verificar backend
curl http://api.127.0.0.1.nip.io

# Verificar MongoDB
docker-compose exec mongodb mongosh --eval "db.adminCommand('ping')"

# Verificar Redis
docker-compose exec redis redis-cli ping
```

---

## 📈 Escalado

### Escalar servicios

```bash
# Crear múltiples instancias del backend
docker-compose up -d --scale backend=3

# Ver instancias
docker-compose ps backend
```

**Nota:** Para escalado, asegúrate de:
- No usar `container_name` (o elimínalo)
- Configurar nginx-proxy para balanceo de carga

---

## 🔐 Seguridad

### Mejores prácticas:

1. **No versionar archivos .env con secretos**
   ```bash
   # Asegúrate de que estén en .gitignore
   echo "*.env" >> .gitignore
   echo "*.env.docker" >> .gitignore
   ```

2. **Usar secrets de Docker (producción)**
   ```yaml
   secrets:
     jwt_secret:
       file: ./secrets/jwt_secret.txt
   ```

3. **Limitar recursos**
   ```yaml
   deploy:
     resources:
       limits:
         cpus: '0.5'
         memory: 512M
   ```

---

## 📝 Checklist Pre-Deployment

Antes de desplegar a producción:

- [ ] Variables de entorno configuradas correctamente
- [ ] Secrets no están hardcodeados
- [ ] Volúmenes de persistencia configurados
- [ ] Health checks habilitados
- [ ] Límites de recursos establecidos
- [ ] Logs configurados correctamente
- [ ] Backups automatizados
- [ ] Monitoreo configurado
- [ ] Certificados SSL configurados
- [ ] Network policies definidas

---

## 🆘 Comandos de Emergencia

```bash
# Detener todo inmediatamente
docker-compose down

# Ver qué está consumiendo recursos
docker stats

# Eliminar contenedor problemático
docker-compose rm -f -s -v backend

# Reiniciar Docker Desktop
# macOS: Docker Desktop -> Restart
# Linux: sudo systemctl restart docker

# Ver todos los contenedores (incluso detenidos)
docker ps -a

# Eliminar contenedores huérfanos
docker-compose down --remove-orphans
```

---

## 📚 Recursos Adicionales

- [Documentación Docker Compose](https://docs.docker.com/compose/)
- [Documentación Docker](https://docs.docker.com/)
- [Docker Hub - roxsross12](https://hub.docker.com/u/roxsross12)

---

## ✅ Verificación Final

Después de levantar los servicios, verifica:

```bash
# 1. Todos los contenedores están UP
docker-compose ps

# 2. Backend responde
curl http://api.127.0.0.1.nip.io

# 3. Swagger está disponible
curl http://api.127.0.0.1.nip.io/api-docs

# 4. Frontend carga
curl http://127.0.0.1.nip.io

# 5. No hay errores en los logs
docker-compose logs --tail 50
```

Si todos estos checks pasan: **¡Éxito! 🎉**

---

## 💡 Tips Finales

1. **Usa aliases para comandos frecuentes:**
   ```bash
   alias dc='docker-compose'
   alias dcup='docker-compose up -d'
   alias dcdn='docker-compose down'
   alias dclogs='docker-compose logs -f'
   ```

2. **Crea un Makefile:**
   ```makefile
   up:
       docker-compose up -d
   
   down:
       docker-compose down
   
   logs:
       docker-compose logs -f
   
   rebuild:
       docker-compose up -d --build
   ```

3. **Usa watch mode en desarrollo:**
   ```bash
   # Reconstruir automáticamente en cambios
   docker-compose watch
   ```

4. **Mantén tus imágenes actualizadas:**
   ```bash
   docker-compose pull
   docker-compose up -d
   ```

---

**¡Happy Dockerizing! 🐳**
