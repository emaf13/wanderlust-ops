

# 🚀 Wanderlust Ops - Guía de Setup

Esta guía te permite reproducir el proyecto desde cero.

**Proyecto Final Bootcamp DevOps: Contenedores y Orquestación** - Por [@emaf13](https://github.com/emaf13)

---

## 📋 Prerrequisitos

Antes de comenzar, aseguráte de tener instalado:

| **Herramienta** | **Versión Mínima** | **Versión Usada en Proyecto** |
|---|---|---|
| **Docker** | 20.x | 29.2.1 |
| **kubectl** | 1.30.x | v1.35.0 |
| **Helm** | 3.x | v4.1.1 |
| **Kind** | 0.20.x | v0.31.0 |
| **Git** | 2.x | Cualquier versión reciente |

> **⚠️ Nota sobre Docker:** No es necesario Docker Desktop. Solo se requiere Docker Engine instalado y corriendo. En Linux, Docker Engine es suficiente. En Windows/Mac, Docker Desktop es la forma más común de tener Docker, pero WSL2 con Docker Engine también funciona.

**Verificar instalaciones:**

```bash
docker --version
kubectl version --client
helm version
kind version
git --version
```

---

## 🔧 PASO 1: Clonar el Repositorio

```bash
# Clonar el repositorio
git clone git@github.com:emaf13/wanderlust-ops.git

# Ingresar al directorio del proyecto
cd wanderlust-ops/
```

**Verificar estructura del proyecto:**

```bash
ls -la
```

**Deberías ver:**

```
README.md
SETUP.md
kubernetes/
helm/
argocd/
scripts/
.github/
backend/
frontend/
```

---

## 🔧 PASO 2: Crear Cluster Kind

```bash
# Crear cluster local
kind create cluster --name wanderlust-final

# Verificar que el cluster está creado
kubectl cluster-info

# Verificar nodos
kubectl get nodes
```

**Output esperado:**

```
Kubernetes control plane is running at https://127.0.0.1:xxxxx
CoreDNS is running at https://127.0.0.1:xxxxx/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

NAME                           STATUS   ROLES           AGE   VERSION
wanderlust-final-control-plane Ready    control-plane   1m    v1.35.0
```

---

## 🔐 PASO 3: Crear Secrets

### Backend Secret (JWT)

```bash
# Crear namespace primero (si no existe)
kubectl create namespace wanderlust --dry-run=client -o yaml | kubectl apply -f -

# Crear secret de backend
kubectl create secret generic backend-secret -n wanderlust \
  --from-literal=JWT_SECRET="$(openssl rand -hex 32)"
```

### Grafana Secret (Password)

```bash
# Crear namespace de monitoreo (si no existe)
kubectl create namespace monitoring --dry-run=client -o yaml | kubectl apply -f -

# Crear secret de Grafana
kubectl create secret generic grafana-admin-secret -n monitoring \
  --from-literal=admin-user="admin" \
  --from-literal=admin-password="$(openssl rand -hex 16)"
```

> **⚠️ IMPORTANTE:** Guardá la password de Grafana que se genera. La vas a necesitar para login. Podés verla con:
>
> ```bash
> kubectl get secret grafana-admin-secret -n monitoring -o jsonpath="{.data.admin-password}" | base64 -d
> ```

---

## 📦 PASO 4: Aplicar Manifiestos de Kubernetes

```bash
# Aplicar todos los manifiestos (el orden lo maneja Kubernetes)
kubectl apply -f kubernetes/
```

**O aplicar en orden específico (más control):**

```bash
kubectl apply -f kubernetes/namespace.yaml
kubectl apply -f kubernetes/configmap.yaml
kubectl apply -f kubernetes/mongodb.yaml
kubectl apply -f kubernetes/redis.yaml
kubectl apply -f kubernetes/backend.yaml
kubectl apply -f kubernetes/frontend.yaml
kubectl apply -f kubernetes/ingress.yaml
```

**Verificar que los pods están creando:**

```bash
kubectl get pods -n wanderlust -w
```

**Output esperado (esperar hasta que todos digan `Running`):**

```
NAME                                  READY   STATUS    RESTARTS   AGE
backend-deployment-xxxxx-xxxxx        1/1     Running   0          2m
frontend-deployment-xxxxx-xxxxx       1/1     Running   0          2m
mongo-statefulset-0                   1/1     Running   0          2m
redis-deployment-xxxxx-xxxxx          1/1     Running   0          2m
```

---

## 🌱 PASO 5: Seed de Base de Datos (MongoDB)

```bash
# 1. Obtener el nombre del pod de MongoDB
MONGO_POD=$(kubectl get pods -n wanderlust -l app=mongo -o jsonpath='{.items[0].metadata.name}')

# 2. Conectarse a MongoDB
kubectl exec -it -n wanderlust $MONGO_POD -- mongosh
```

**Una vez dentro de mongosh:**

```javascript
// 3. Switch a la base de datos
use wanderlust

// 4. Cargar el script de seed
// Opción A: Si copiaste el contenido del script
load('/scripts/seed-db.js')

// Opción B: Copiar y pegar el contenido de scripts/seed-db.js directamente
// (abrir el archivo en otra terminal y copiar el contenido)
```

**Verificar que los datos se cargaron:**

```javascript
// Contar posts
db.posts.countDocuments({})

// Ver los posts
db.posts.find().pretty()
```

**Output esperado:**

```
Total posts: 3 (o 4 si agregaste uno manual)
Featured posts: 2
```

**Salir de mongosh:**

```javascript
exit
```

---

## 📊 PASO 6: Instalar Observabilidad (Prometheus + Grafana)

```bash
# 1. Crear namespace (si no se creó antes)
kubectl create namespace monitoring

# 2. Agregar repo de Prometheus
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

# 3. Instalar el stack completo
helm install monitoring prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  -f helm/prometheus-stack-values.yaml

# 4. Verificar que los pods están creando
kubectl get pods -n monitoring -w
```

**Output esperado (esperar hasta que todos digan `Running`):**

```
monitoring-grafana-xxxxx                          1/1   Running
monitoring-kube-state-metrics-xxxxx               1/1   Running
monitoring-prometheus-node-exporter-xxxxx         1/1   Running
monitoring-prometheus-server-xxxxx                1/1   Running
monitoring-alertmanager-xxxxx                     1/1   Running
```

---

## 🔄 PASO 7: Instalar ArgoCD (GitOps - Opcional pero Recomendado)

```bash
# 1. Crear namespace
kubectl create namespace argocd

# 2. Instalar ArgoCD
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# 3. Esperar que los pods estén ready
kubectl get pods -n argocd -w

# 4. Aplicar la Application de ArgoCD (sync automático)
kubectl apply -f argocd/application.yaml

# 5. Verificar el estado de la aplicación
kubectl get applications -n argocd
```

**Output esperado:**

```
NAME         SYNC STATUS   HEALTH STATUS
wanderlust   Synced        Healthy
```

---

## ✅ PASO 8: Verificar que Todo Funciona

```bash
# Verificar pods de la app
kubectl get pods -n wanderlust

# Verificar pods de monitoreo
kubectl get pods -n monitoring

# Verificar ArgoCD (si instalaste)
kubectl get applications -n argocd

# Verificar deployments
kubectl get deployments -n wanderlust

# Verificar servicios
kubectl get svc -n wanderlust
kubectl get svc -n monitoring
```

**Todos los pods deberían estar en estado `Running` y `READY` 1/1.**

---

## 🔌 PASO 9: Acceder a la Aplicación y Herramientas

### Frontend (App Principal)

```bash
kubectl port-forward -n wanderlust svc/frontend-service 8000:80 &
```

**En tu navegador:**

```
URL: http://localhost:8000
```

---

### Backend API

```bash
kubectl port-forward -n wanderlust svc/backend-service 3001:8080 &
```

**En tu navegador o Postman:**

```
URL: http://localhost:3001
API: http://localhost:3001/api/posts
```

---

### Grafana (Dashboards)

```bash
kubectl port-forward -n monitoring svc/monitoring-grafana 3000:80 &
```

**En tu navegador:**

```
URL: http://localhost:3000
Usuario: admin
Password: <la que generaste en el PASO 3>
```

**Si olvidaste la password:**

```bash
kubectl get secret grafana-admin-secret -n monitoring -o jsonpath="{.data.admin-password}" | base64 -d
```

---

### Prometheus (Métricas)

```bash
kubectl port-forward -n monitoring svc/monitoring-prometheus 9090:9090 &
```

**En tu navegador:**

```
URL: http://localhost:9090
```

**Queries de ejemplo:**

```
kube_pod_status_phase{namespace="wanderlust"}
container_cpu_usage_seconds_total{namespace="wanderlust"}
container_memory_usage_bytes{namespace="wanderlust"}
```

---

### ArgoCD (GitOps UI)

```bash
kubectl port-forward svc/argocd-server -n argocd 8080:443 &
```

**En tu navegador:**

```
URL: https://localhost:8080
(aceptar advertencia de certificado self-signed)
Usuario: admin
Password: kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
```

---

## 🧪 PASO 10: Testear la Aplicación

1. **Abrir http://localhost:8000** en tu navegador

2. **Verificar en la página principal:**
   - ✅ Se ven las 4 publicaciones con imágenes
   - ✅ "Publicaciones Destacadas" muestra 2 posts
   - ✅ "Últimas Publicaciones" muestra 4 posts

3. **Click en una publicación:**
   - ✅ Página de detalle carga correctamente
   - ✅ Imagen se ve
   - ✅ Descripción se ve

4. **Verificar en Grafana:**
   - ✅ Login funciona
   - ✅ Dashboards de Kubernetes están disponibles
   - ✅ Métricas de CPU/memoria se ven

5. **Verificar en ArgoCD (si instalaste):**
   - ✅ Application muestra "Synced" y "Healthy"
   - ✅ Todos los recursos en verde

---

## 📚 Archivos Importantes del Proyecto

| **Archivo/Carpeta**                       | **Propósito**                                           |
| ----------------------------------------- | ------------------------------------------------------- |
| `kubernetes/*.yaml`                       | Manifiestos de Kubernetes (deployments, services, etc.) |
| `helm/prometheus-stack-values.yaml`       | Configuración de Prometheus + Grafana                   |
| `argocd/application.yaml`                 | Configuración de ArgoCD GitOps                          |
| `scripts/seed-db.js`                      | Script para cargar datos en MongoDB                     |
| `.github/workflows/*.yml`                 | CI/CD pipelines (GitHub Actions)                        |
| `kubernetes/grafana-secret.yaml.template` | Template para secret de Grafana                         |
| `kubernetes/secret.yaml.template`         | Template para secret de Backend                         |
| `README.md`                               | Documentación principal del proyecto                    |
| `SETUP.md`                                | Esta guía de setup paso a paso                          |

---

## ⚠️ Limitaciones Conocidas

| **Limitación**        | **Descripción**                               | **Workaround**                          |
| --------------------- | --------------------------------------------- | --------------------------------------- |
| **CD GitHub Actions** | Requiere cluster K8s accesible desde internet | Usar ArgoCD para GitOps local           |
| **Kind local**        | No tiene LoadBalancer real                    | Usar `kubectl port-forward`             |
| **Imágenes Unsplash** | URLs externas pueden expirar                  | Actualizar URLs en `scripts/seed-db.js` |
| **Persistencia**      | Kind no persiste datos después de reinicio    | Re-ejecutar `scripts/seed-db.js`        |
| **Logs (Loki)**       | No instalado                                  | Usar `kubectl logs` para ver logs       |
| **Traces (Tempo)**    | No instalado                                  | No requerido por proyecto               |

---

## 🧹 Limpieza (Opcional)

### Borrar Todo el Cluster

```bash
kind delete cluster --name wanderlust-final
```

### Borrar Solo Namespaces

```bash
kubectl delete namespace wanderlust
kubectl delete namespace monitoring
kubectl delete namespace argocd
```

### Borrar Todo y Empezar de Cero

```bash
# Borrar cluster
kind delete cluster --name wanderlust-final

# Borrar imágenes locales (opcional)
docker rmi $(docker images | grep emaf13 | awk '{print $3}')

# Empezar desde PASO 1
```

---

## 🆘 Troubleshooting

### Pods en Estado `Pending`

```bash
# Ver detalles del pod
kubectl describe pod <pod-name> -n <namespace>

# Ver eventos del cluster
kubectl get events -n <namespace> --sort-by='.lastTimestamp'
```

**Causas comunes:**
- Recursos insuficientes (CPU/memoria)
- PV/PVC no disponibles
- Node selector no coincide

---

### Pods en Estado `CrashLoopBackOff`

```bash
# Ver logs del pod
kubectl logs <pod-name> -n <namespace>

# Ver logs del pod anterior (si se reinició)
kubectl logs <pod-name> -n <namespace> --previous
```

**Causas comunes:**
- Error de conexión a MongoDB/Redis
- Secret no encontrado
- Puerto ya en uso

---

### No Puedo Acceder a Grafana

```bash
# Verificar password
kubectl get secret grafana-admin-secret -n monitoring -o jsonpath="{.data.admin-password}" | base64 -d

# Resetear password
GRAFANA_POD=$(kubectl get pods -n monitoring -l app.kubernetes.io/name=grafana -o jsonpath='{.items[0].metadata.name}')
kubectl exec -n monitoring $GRAFANA_POD -- grafana-cli admin reset-admin-password <nueva-password>
```

---

### MongoDB Vacío (Sin Posts)

```bash
# Conectarse a MongoDB
MONGO_POD=$(kubectl get pods -n wanderlust -l app=mongo -o jsonpath='{.items[0].metadata.name}')
kubectl exec -it -n wanderlust $MONGO_POD -- mongosh

# Dentro de mongosh:
use wanderlust
db.posts.countDocuments({})

# Si es 0, ejecutar seed script
load('/scripts/seed-db.js')
```

---

### Error de Conexión a MongoDB desde Backend

```bash
# Verificar que MongoDB está running
kubectl get pods -n wanderlust -l app=mongo

# Verificar servicio
kubectl get svc -n wanderlust mongo-service

# Ver logs del backend
kubectl logs -n wanderlust -l app=backend --tail=100
```

---

### CI/CD Pipeline Falla en GitHub

```bash
# Verificar secrets en GitHub
# Settings → Secrets and variables → Actions

# Verificar que existen:
# - DOCKERHUB_USERNAME
# - DOCKERHUB_TOKEN
# - KUBE_CONFIG (solo para CD)
# - KUBE_NAMESPACE
```

---

## 📞 Soporte y Recursos

### Documentación del Proyecto

- **[README.md](README.md):** Documentación principal, arquitectura, decisiones de diseño, estado del proyecto
- **[SETUP.md](SETUP.md):** Esta guía de setup paso a paso

### Recursos Externos

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Helm Documentation](https://helm.sh/docs/)
- [Kind Documentation](https://kind.sigs.k8s.io/)
- [ArgoCD Documentation](https://argo-cd.readthedocs.io/)
- [Prometheus Documentation](https://prometheus.io/docs/)
- [Grafana Documentation](https://grafana.com/docs/)

### Issues y Preguntas

Para issues o preguntas sobre este proyecto:

- **GitHub Issues:** https://github.com/emaf13/wanderlust-ops/issues
- **Autor:** [@emaf13](https://github.com/emaf13)


---

**Última actualización:** Marzo 2026
**Autor:** Ema - [@emaf13](https://github.com/emaf13)
**Proyecto Final Bootcamp DevOps: Contenedores y Orquestación**

---

