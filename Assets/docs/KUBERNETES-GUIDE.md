# Guía de Kubernetes - Wanderlust

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Kubernetes** (una de estas opciones):
  - [Minikube](https://minikube.sigs.k8s.io/docs/start/) - Clúster local
  - [Docker Desktop](https://docs.docker.com/desktop/kubernetes/) - Con Kubernetes habilitado
  - [Kind](https://kind.sigs.k8s.io/) - Kubernetes en Docker
  - [K3s](https://k3s.io/) - Kubernetes ligero

- **kubectl** - CLI de Kubernetes
  ```bash
  # Verificar instalación
  kubectl version --client
  ```

- **NGINX Ingress Controller**
  ```bash
  # Para Minikube
  minikube addons enable ingress
  
  # Para otros clústeres
  kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.2/deploy/static/provider/cloud/deploy.yaml
  ```

---

## 🚀 Inicio Rápido

### 1. Verificar que el clúster esté corriendo

```bash
# Ver nodos del clúster
kubectl get nodes

# Ver información del clúster
kubectl cluster-info
```

### 2. Crear el namespace

```bash
kubectl apply -f kubernetes/namespace.yaml
```

### 3. Aplicar ConfigMaps y Secrets

```bash
# ConfigMap con variables de entorno
kubectl apply -f kubernetes/configmap.yaml

# Secret con datos sensibles
kubectl apply -f kubernetes/secret.yaml
```

### 4. Desplegar servicios de datos

```bash
# MongoDB
kubectl apply -f kubernetes/mongodb.yaml

# Redis
kubectl apply -f kubernetes/redis.yaml
```

### 5. Desplegar aplicaciones

```bash
# Backend
kubectl apply -f kubernetes/backend.yaml

# Frontend
kubectl apply -f kubernetes/frontend.yaml
```

### 6. Configurar Ingress

```bash
kubectl apply -f kubernetes/ingress.yaml
```

### 7. Verificar que todo esté corriendo

```bash
# Ver todos los recursos
kubectl get all -n wanderlust

# Ver pods
kubectl get pods -n wanderlust

# Ver servicios
kubectl get svc -n wanderlust

# Ver ingress
kubectl get ingress -n wanderlust
```

### 8. Acceder a la aplicación

**Frontend:**
```
http://wanderlust.127.0.0.1.nip.io
```

**Backend API:**
```
http://api.wanderlust.127.0.0.1.nip.io
```

**Swagger UI:**
```
http://api.wanderlust.127.0.0.1.nip.io/api-docs
```

---

## 📦 Comandos Básicos de kubectl

### Namespace

```bash
# Listar namespaces
kubectl get namespaces

# Crear namespace
kubectl create namespace wanderlust

# Eliminar namespace (¡CUIDADO! Elimina todo dentro)
kubectl delete namespace wanderlust
```

### Pods

```bash
# Listar pods
kubectl get pods -n wanderlust

# Ver detalles de un pod
kubectl describe pod <pod-name> -n wanderlust

# Ver logs de un pod
kubectl logs <pod-name> -n wanderlust

# Ver logs en tiempo real
kubectl logs -f <pod-name> -n wanderlust

# Ver logs de un contenedor específico
kubectl logs <pod-name> -c <container-name> -n wanderlust

# Ejecutar comando en un pod
kubectl exec -it <pod-name> -n wanderlust -- sh

# Eliminar un pod
kubectl delete pod <pod-name> -n wanderlust
```

### Deployments

```bash
# Listar deployments
kubectl get deployments -n wanderlust

# Ver detalles de un deployment
kubectl describe deployment backend-deployment -n wanderlust

# Escalar un deployment
kubectl scale deployment backend-deployment --replicas=3 -n wanderlust

# Reiniciar un deployment
kubectl rollout restart deployment/backend-deployment -n wanderlust

# Ver estado del rollout
kubectl rollout status deployment/backend-deployment -n wanderlust

# Ver historial de rollouts
kubectl rollout history deployment/backend-deployment -n wanderlust

# Hacer rollback
kubectl rollout undo deployment/backend-deployment -n wanderlust
```

### Services

```bash
# Listar servicios
kubectl get svc -n wanderlust

# Ver detalles de un servicio
kubectl describe svc backend-service -n wanderlust

# Eliminar servicio
kubectl delete svc <service-name> -n wanderlust
```

### Ingress

```bash
# Listar ingress
kubectl get ingress -n wanderlust

# Ver detalles del ingress
kubectl describe ingress wanderlust-backend-ingress -n wanderlust

# Eliminar ingress
kubectl delete ingress <ingress-name> -n wanderlust
```

### ConfigMaps y Secrets

```bash
# Ver ConfigMaps
kubectl get configmap -n wanderlust

# Ver contenido de un ConfigMap
kubectl describe configmap backend-config -n wanderlust

# Ver Secrets
kubectl get secrets -n wanderlust

# Ver contenido de un Secret (codificado)
kubectl get secret backend-secret -n wanderlust -o yaml

# Eliminar ConfigMap/Secret
kubectl delete configmap <name> -n wanderlust
kubectl delete secret <name> -n wanderlust
```

---

## 🔄 Workflows Comunes

### Desplegar todo desde cero

```bash
# Orden correcto de aplicación
kubectl apply -f kubernetes/namespace.yaml
kubectl apply -f kubernetes/configmap.yaml
kubectl apply -f kubernetes/secret.yaml
kubectl apply -f kubernetes/mongodb.yaml
kubectl apply -f kubernetes/redis.yaml
kubectl apply -f kubernetes/backend.yaml
kubectl apply -f kubernetes/frontend.yaml
kubectl apply -f kubernetes/ingress.yaml

# O aplicar todo el directorio (¡cuidado con el orden!)
kubectl apply -f kubernetes/
```

### Actualizar la aplicación

```bash
# Cambiar la imagen en el YAML o usar kubectl set
kubectl set image deployment/backend-deployment backend=roxsross12/wanderlust-backend:v2.0.0 -n wanderlust

# Ver el progreso
kubectl rollout status deployment/backend-deployment -n wanderlust

# Verificar
kubectl get pods -n wanderlust
```

### Ver logs de toda la aplicación

```bash
# Logs de todos los pods con label app=backend
kubectl logs -l app=backend -n wanderlust --tail=50

# Logs de múltiples pods en tiempo real
kubectl logs -f -l app=backend -n wanderlust

# Logs de todos los pods del namespace
kubectl logs -l app --all-containers=true -n wanderlust
```

### Debugging de un pod

```bash
# Entrar al pod
kubectl exec -it <pod-name> -n wanderlust -- sh

# Ver variables de entorno
kubectl exec <pod-name> -n wanderlust -- env

# Ver procesos corriendo
kubectl exec <pod-name> -n wanderlust -- ps aux

# Copiar archivo desde/hacia pod
kubectl cp <pod-name>:/path/to/file ./local-file -n wanderlust
kubectl cp ./local-file <pod-name>:/path/to/file -n wanderlust
```

### Limpiar todo

```bash
# Eliminar todos los recursos del namespace
kubectl delete -f kubernetes/

# O eliminar el namespace completo
kubectl delete namespace wanderlust
```

---

## 🛠️ Solución de Problemas

### Problema: Pods no inician (Pending o CrashLoopBackOff)

```bash
# Ver estado de los pods
kubectl get pods -n wanderlust

# Ver eventos y errores
kubectl describe pod <pod-name> -n wanderlust

# Ver logs del pod
kubectl logs <pod-name> -n wanderlust

# Si el pod se reinicia constantemente
kubectl logs <pod-name> -n wanderlust --previous
```

**Causas comunes:**
- **Pending**: Falta de recursos (CPU/memoria) o ImagePullBackOff
- **CrashLoopBackOff**: Aplicación falla al iniciar
- **ImagePullBackOff**: No puede descargar la imagen

```bash
# Ver eventos del namespace
kubectl get events -n wanderlust --sort-by='.lastTimestamp'
```

### Problema: No puedo acceder a través del Ingress

```bash
# Verificar que el Ingress esté configurado
kubectl get ingress -n wanderlust

# Ver detalles del Ingress
kubectl describe ingress wanderlust-backend-ingress -n wanderlust

# Verificar que el NGINX Ingress Controller esté corriendo
kubectl get pods -n ingress-nginx

# Ver logs del Ingress Controller
kubectl logs -n ingress-nginx -l app.kubernetes.io/component=controller
```

**Soluciones:**
- Asegúrate de que el Ingress Controller esté instalado
- Verifica que los hosts estén correctos
- Revisa que los servicios existan y tengan endpoints

```bash
# Ver endpoints del servicio
kubectl get endpoints -n wanderlust
```

### Problema: ConfigMap o Secret no se aplican

```bash
# Verificar que existan
kubectl get configmap,secret -n wanderlust

# Ver contenido
kubectl describe configmap backend-config -n wanderlust

# Después de cambiar ConfigMap/Secret, reiniciar pods
kubectl rollout restart deployment/backend-deployment -n wanderlust
```

### Problema: MongoDB o Redis no conectan

```bash
# Verificar que los pods estén corriendo
kubectl get pods -n wanderlust | grep -E 'mongo|redis'

# Ver logs
kubectl logs -l app=mongo -n wanderlust
kubectl logs -l app=redis -n wanderlust

# Verificar servicios DNS internos
kubectl exec -it <backend-pod> -n wanderlust -- nslookup mongo-service
kubectl exec -it <backend-pod> -n wanderlust -- nslookup redis-service
```

### Problema: 404 Not Found en Ingress

```bash
# Verificar rutas del Ingress
kubectl get ingress -n wanderlust -o yaml

# Verificar que el backend esté respondiendo
kubectl port-forward svc/backend-service 8080:8080 -n wanderlust
# Luego probar: curl http://localhost:8080/api/posts
```

---

## 📊 Monitoreo y Observabilidad

### Ver uso de recursos

```bash
# Uso de recursos de los nodos
kubectl top nodes

# Uso de recursos de pods
kubectl top pods -n wanderlust

# Uso de un pod específico
kubectl top pod <pod-name> -n wanderlust
```

### Ver estado del clúster

```bash
# Información del clúster
kubectl cluster-info

# Ver todos los recursos
kubectl get all --all-namespaces

# Ver recursos del namespace
kubectl get all -n wanderlust
```

### Eventos del clúster

```bash
# Ver eventos recientes
kubectl get events -n wanderlust --sort-by='.lastTimestamp'

# Ver eventos en tiempo real
kubectl get events -n wanderlust -w
```

---

## 🔐 Seguridad y Secrets

### Crear Secret desde archivo

```bash
# Crear secret desde archivo
kubectl create secret generic backend-secret \
  --from-file=JWT_SECRET=./secret.txt \
  -n wanderlust

# Crear secret desde literal
kubectl create secret generic backend-secret \
  --from-literal=JWT_SECRET='tu-secret-aqui' \
  -n wanderlust
```

### Ver Secret decodificado

```bash
# Ver Secret en base64
kubectl get secret backend-secret -n wanderlust -o jsonpath='{.data.JWT_SECRET}'

# Decodificar Secret
kubectl get secret backend-secret -n wanderlust -o jsonpath='{.data.JWT_SECRET}' | base64 --decode
```

### Actualizar Secret sin recrear

```bash
# Editar Secret
kubectl edit secret backend-secret -n wanderlust

# Después de editar, reiniciar pods
kubectl rollout restart deployment/backend-deployment -n wanderlust
```

---

## 📈 Escalado

### Escalado manual

```bash
# Escalar deployment
kubectl scale deployment backend-deployment --replicas=3 -n wanderlust

# Verificar
kubectl get pods -n wanderlust -l app=backend
```

### Auto-escalado (HPA)

```bash
# Crear HorizontalPodAutoscaler
kubectl autoscale deployment backend-deployment \
  --cpu-percent=70 \
  --min=2 \
  --max=10 \
  -n wanderlust

# Ver HPA
kubectl get hpa -n wanderlust

# Ver detalles
kubectl describe hpa backend-deployment -n wanderlust
```

---

## 🔄 Port Forwarding

Útil para debugging o acceso temporal sin Ingress:

```bash
# Forward puerto del backend
kubectl port-forward svc/backend-service 8080:8080 -n wanderlust
# Acceder en: http://localhost:8080

# Forward puerto del frontend
kubectl port-forward svc/frontend-service 5173:5173 -n wanderlust
# Acceder en: http://localhost:5173

# Forward puerto de MongoDB
kubectl port-forward svc/mongo-service 27017:27017 -n wanderlust
# Conectar con: mongodb://localhost:27017/wanderlust

# Forward puerto de un pod específico
kubectl port-forward <pod-name> 8080:8080 -n wanderlust
```

---

## 📝 Comandos Útiles de Verificación

### Checklist de verificación

```bash
# 1. ¿Namespace existe?
kubectl get namespace wanderlust

# 2. ¿ConfigMaps y Secrets existen?
kubectl get configmap,secret -n wanderlust

# 3. ¿Todos los pods están Running?
kubectl get pods -n wanderlust

# 4. ¿Servicios tienen endpoints?
kubectl get endpoints -n wanderlust

# 5. ¿Ingress está configurado?
kubectl get ingress -n wanderlust

# 6. ¿Hay errores en los eventos?
kubectl get events -n wanderlust --field-selector type=Warning

# 7. ¿Backend responde?
kubectl exec -it <backend-pod> -n wanderlust -- wget -qO- http://localhost:8080/api/posts

# 8. ¿MongoDB conecta?
kubectl exec -it <mongo-pod> -n wanderlust -- mongosh --eval "db.adminCommand('ping')"
```

---

## 🔧 Configuración Avanzada

### Persistent Volumes para MongoDB

Si quieres persistencia de datos:

```yaml
# mongodb-pv.yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mongo-pvc
  namespace: wanderlust
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 5Gi
```

```bash
kubectl apply -f mongodb-pv.yaml
```

Luego actualizar [mongodb.yaml](kubernetes/mongodb.yaml) para usar el PVC:

```yaml
volumes:
  - name: mongo-storage
    persistentVolumeClaim:
      claimName: mongo-pvc
```

### Health Checks

Agregar health checks a los deployments:

```yaml
livenessProbe:
  httpGet:
    path: /api/posts
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /api/posts
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 5
```

---

## 🌐 Contextos de kubectl

Si trabajas con múltiples clústeres:

```bash
# Ver contextos disponibles
kubectl config get-contexts

# Ver contexto actual
kubectl config current-context

# Cambiar de contexto
kubectl config use-context <context-name>

# Crear un alias para el namespace
kubectl config set-context --current --namespace=wanderlust

# Ahora no necesitas -n wanderlust en cada comando
kubectl get pods
```

---

## 🎯 Mejores Prácticas

### 1. Usar namespaces
✅ Aisla recursos por proyecto o entorno
```bash
kubectl apply -f kubernetes/ -n wanderlust
```

### 2. Etiquetar recursos
✅ Facilita filtrado y selección
```yaml
labels:
  app: backend
  environment: production
  version: v1.0.0
```

### 3. Definir límites de recursos
✅ Evita que un pod consuma todos los recursos
```yaml
resources:
  requests:
    memory: "256Mi"
    cpu: "250m"
  limits:
    memory: "512Mi"
    cpu: "500m"
```

### 4. No versionar Secrets
✅ Usar gestores de secretos externos
```bash
echo "kubernetes/secret.yaml" >> .gitignore
```

### 5. Usar readiness y liveness probes
✅ Kubernetes sabe cuándo el pod está listo
```yaml
readinessProbe:
  httpGet:
    path: /health
    port: 8080
```

### 6. Documentar tus manifests
✅ Comentarios claros en YAML
```yaml
# Deployment del backend - Procesa peticiones del API
```

---

## 📚 Aliases Útiles

Agrega estos a tu `~/.zshrc` o `~/.bashrc`:

```bash
# Alias de kubectl
alias k='kubectl'
alias kgp='kubectl get pods'
alias kgs='kubectl get svc'
alias kgi='kubectl get ingress'
alias kgn='kubectl get nodes'
alias kdp='kubectl describe pod'
alias kds='kubectl describe svc'
alias klf='kubectl logs -f'
alias kex='kubectl exec -it'
alias kaf='kubectl apply -f'
alias kdf='kubectl delete -f'

# Con namespace wanderlust
alias kwgp='kubectl get pods -n wanderlust'
alias kwgs='kubectl get svc -n wanderlust'
alias kwlf='kubectl logs -f -n wanderlust'
```

Recargar:
```bash
source ~/.zshrc
```

---

## 🚨 Comandos de Emergencia

```bash
# Ver qué está fallando
kubectl get events -n wanderlust --sort-by='.lastTimestamp' | tail -20

# Forzar eliminación de un pod stuck
kubectl delete pod <pod-name> -n wanderlust --grace-period=0 --force

# Ver todos los recursos que están fallando
kubectl get all -n wanderlust | grep -v "Running\|Completed"

# Reiniciar todos los deployments
kubectl rollout restart deployment -n wanderlust

# Eliminar pods con errores
kubectl delete pods --field-selector=status.phase=Failed -n wanderlust

# Ver uso de recursos del clúster
kubectl top nodes
kubectl top pods -n wanderlust --sort-by=memory
```

---

## 🔍 Debugging Avanzado

### Crear un pod temporal para debugging

```bash
# Pod con herramientas de red
kubectl run debug-pod --rm -i --tty \
  --image=nicolaka/netshoot \
  --namespace=wanderlust \
  -- /bin/bash

# Dentro del pod puedes hacer:
# curl http://backend-service:8080/api/posts
# nslookup mongo-service
# ping redis-service
```

### Ver configuración final de un recurso

```bash
# Ver YAML completo de un deployment
kubectl get deployment backend-deployment -n wanderlust -o yaml

# Ver solo la imagen que está usando
kubectl get deployment backend-deployment -n wanderlust -o jsonpath='{.spec.template.spec.containers[0].image}'

# Ver variables de entorno de un pod
kubectl exec <pod-name> -n wanderlust -- env | sort
```

---

## 📖 Orden de Aplicación Recomendado

```bash
# 1. Infraestructura base
kubectl apply -f kubernetes/namespace.yaml

# 2. Configuración
kubectl apply -f kubernetes/configmap.yaml
kubectl apply -f kubernetes/secret.yaml

# 3. Almacenamiento (si usas PVC)
kubectl apply -f kubernetes/mongodb-pv.yaml

# 4. Bases de datos
kubectl apply -f kubernetes/mongodb.yaml
kubectl apply -f kubernetes/redis.yaml

# Esperar a que estén Ready
kubectl wait --for=condition=ready pod -l app=mongo -n wanderlust --timeout=60s
kubectl wait --for=condition=ready pod -l app=redis -n wanderlust --timeout=60s

# 5. Backend
kubectl apply -f kubernetes/backend.yaml
kubectl wait --for=condition=ready pod -l app=backend -n wanderlust --timeout=120s

# 6. Frontend
kubectl apply -f kubernetes/frontend.yaml

# 7. Ingress (último)
kubectl apply -f kubernetes/ingress.yaml

# 8. Verificación final
kubectl get all -n wanderlust
```

---

## 🎓 Recursos de Aprendizaje

- [Documentación oficial de Kubernetes](https://kubernetes.io/docs/)
- [kubectl Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)
- [Kubernetes Patterns](https://k8spatterns.io/)
- [12 Factor App](https://12factor.net/)

---

## ✅ Verificación Final

Después de desplegar, verifica:

```bash
# 1. Todos los pods Running
kubectl get pods -n wanderlust

# 2. Todos los servicios con endpoints
kubectl get endpoints -n wanderlust

# 3. Ingress configurado
kubectl get ingress -n wanderlust

# 4. No hay eventos de error
kubectl get events -n wanderlust --field-selector type=Warning

# 5. Backend responde
curl http://api.wanderlust.127.0.0.1.nip.io/api/posts

# 6. Frontend carga
curl http://wanderlust.127.0.0.1.nip.io

# 7. Swagger disponible
curl http://api.wanderlust.127.0.0.1.nip.io/api-docs
```

Si todos estos checks pasan: **¡Éxito! 🎉**

---

## 💡 Tips Finales

1. **Usa `--dry-run` para validar antes de aplicar:**
   ```bash
   kubectl apply -f kubernetes/backend.yaml --dry-run=client
   ```

2. **Guarda respaldos antes de cambios importantes:**
   ```bash
   kubectl get all -n wanderlust -o yaml > backup.yaml
   ```

3. **Usa `watch` para monitorear en tiempo real:**
   ```bash
   watch kubectl get pods -n wanderlust
   ```

4. **Explora con `kubectl explain`:**
   ```bash
   kubectl explain deployment.spec.template.spec.containers
   ```

5. **Usa JSON Path para extraer datos específicos:**
   ```bash
   kubectl get pods -n wanderlust -o jsonpath='{.items[*].metadata.name}'
   ```

---

**¡Happy Kubernetes! ☸️**
