# Stage 1: Build
FROM node:21-alpine AS frontend-builder

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

# Variable de entorno para Vite
ARG VITE_API_PATH=http://localhost:3001
ENV VITE_API_PATH=$VITE_API_PATH

# Build para producción
RUN npm run build

# Stage 2: Serve con nginx (imagen ligera)
FROM nginx:alpine

# Copiar build estático
COPY --from=frontend-builder /app/dist /usr/share/nginx/html

# Copiar configuración nginx personalizada
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
