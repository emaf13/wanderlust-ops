# Stage 1
FROM node:21-alpine AS backend-builder

# setup the working dir
WORKDIR /app

# code
COPY . .

# packages install
RUN npm install

# Stage 2
FROM node:21-alpine

# setup the working dir
WORKDIR /app

# copy the above stage as compressed
COPY --from=backend-builder /app .

COPY .env.docker .env

# Port
EXPOSE 8080

# App
CMD ["npm", "start"]
