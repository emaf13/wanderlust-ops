variable "REGISTRY" {
  default = "roxsross12"
}

variable "TAG" {
  default = "v1.0.3"
}

group "default" {
  targets = ["backend", "frontend"]
}

target "backend" {
  context = "./backend"
  dockerfile = "Dockerfile"
  tags = [
    "${REGISTRY}/wanderlust-backend:${TAG}"
  ]
  platforms = ["linux/amd64", "linux/arm64"]
}

target "frontend" {
  context = "./frontend"
  dockerfile = "Dockerfile"
  tags = [
    "${REGISTRY}/wanderlust-frontend:${TAG}"
  ]
  platforms = ["linux/amd64", "linux/arm64"]
}

group "local" {
  targets = ["backend-local", "frontend-local"]
}

target "backend-local" {
  inherits = ["backend"]
  output = ["type=docker"]
  platforms = []
}

target "frontend-local" {
  inherits = ["frontend"]
  output = ["type=docker"]
  platforms = []
}

group "dev" {
  targets = ["backend-dev", "frontend-dev"]
}

target "backend-dev" {
  inherits = ["backend"]
  tags = ["${REGISTRY}/wanderlust-backend:dev"]
  cache-from = ["type=registry,ref=${REGISTRY}/wanderlust-backend:buildcache"]
  cache-to = ["type=registry,ref=${REGISTRY}/wanderlust-backend:buildcache,mode=max"]
}

target "frontend-dev" {
  inherits = ["frontend"]
  tags = ["${REGISTRY}/wanderlust-frontend:dev"]
  cache-from = ["type=registry,ref=${REGISTRY}/wanderlust-frontend:buildcache"]
  cache-to = ["type=registry,ref=${REGISTRY}/wanderlust-frontend:buildcache,mode=max"]
}
