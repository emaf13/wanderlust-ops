# Stage 1: Build
FROM node:21-alpine AS backend-builder

WORKDIR /app

# Copiar solo package files primero (mejor caching de capas)
COPY package*.json ./

# Instalar dependencias (ci para producción)
RUN npm install --omit=dev

# Copiar el resto del código
COPY . .

# Stage 2: Production
FROM node:21-alpine

WORKDIR /app

# Crear usuario no-root por seguridad
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copiar desde builder
COPY --from=backend-builder /app/node_modules ./node_modules
COPY --from=backend-builder /app ./

# Cambiar propietario al usuario no-root
RUN chown -R nodejs:nodejs /app

# Cambiar a usuario no-root
USER nodejs

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD node -e "require('http').get('http://localhost:8080/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1))" || exit 1

EXPOSE 8080

CMD ["npm", "start"]
