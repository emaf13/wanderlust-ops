# 🤝 Guía de Contribución - Wanderlust

¡Gracias por tu interés en contribuir a Wanderlust! Esta guía te ayudará a realizar contribuciones de calidad al proyecto.

## 📋 Tabla de Contenidos

- [Código de Conducta](#-código-de-conducta)
- [¿Cómo Puedo Contribuir?](#-cómo-puedo-contribuir)
- [Proceso de Desarrollo](#-proceso-de-desarrollo)
- [Estándares de Código](#-estándares-de-código)
- [Pull Requests](#-pull-requests)
- [Reportar Bugs](#-reportar-bugs)
- [Sugerir Mejoras](#-sugerir-mejoras)

---

## 📜 Código de Conducta

### Nuestro Compromiso

En el interés de fomentar un ambiente abierto y acogedor, como contribuidores y mantenedores nos comprometemos a hacer de la participación en nuestro proyecto una experiencia libre de acoso para todos.

### Comportamiento Esperado

✅ **Sí:**
- Usar lenguaje acogedor e inclusivo
- Ser respetuoso con diferentes puntos de vista
- Aceptar críticas constructivas con gracia
- Enfocarse en lo que es mejor para la comunidad
- Mostrar empatía hacia otros miembros

❌ **No:**
- Usar lenguaje o imágenes sexualizadas
- Trolling, insultos o comentarios despectivos
- Acoso público o privado
- Publicar información privada de otros sin permiso
- Conducta que sea inapropiada en un entorno profesional

---

## 🎯 ¿Cómo Puedo Contribuir?

### Tipos de Contribuciones

1. **🐛 Reportar Bugs**
   - Encontraste un error? Ábrenos un issue
   - Asegúrate de incluir pasos para reproducirlo

2. **✨ Sugerir Features**
   - Tienes una idea para mejorar el proyecto?
   - Abre un issue con la etiqueta `enhancement`

3. **📝 Mejorar Documentación**
   - Encontraste algo confuso en los docs?
   - Los PRs de documentación son siempre bienvenidos

4. **💻 Contribuir Código**
   - Arreglar bugs existentes
   - Implementar nuevas features
   - Mejorar el rendimiento
   - Agregar tests

5. **🎨 Mejorar UI/UX**
   - Mejorar el diseño
   - Agregar animaciones
   - Optimizar la experiencia de usuario

### Primeras Contribuciones

Si es tu primera vez contribuyendo, busca issues con la etiqueta:
- `good first issue` - Problemas ideales para principiantes
- `help wanted` - Issues donde necesitamos ayuda
- `documentation` - Mejoras de documentación

---

## 🔄 Proceso de Desarrollo

### 1. Fork y Clone

```bash
# Fork el repositorio en GitHub
# Luego clona tu fork

git clone https://github.com/TU_USUARIO/roxs-wanderlust-ops.git
cd roxs-wanderlust-ops

# Agrega el repo original como upstream
git remote add upstream https://github.com/REPO_ORIGINAL/roxs-wanderlust-ops.git
```

### 2. Crear una Rama

```bash
# Actualiza tu main
git checkout main
git pull upstream main

# Crea una rama descriptiva
git checkout -b feature/nueva-funcionalidad
# o
git checkout -b fix/corregir-bug
# o
git checkout -b docs/mejorar-readme
```

**Convención de Nombres de Ramas:**
- `feature/` - Nuevas características
- `fix/` - Corrección de bugs
- `docs/` - Cambios en documentación
- `refactor/` - Refactorización de código
- `test/` - Agregar o modificar tests
- `chore/` - Tareas de mantenimiento

### 3. Configurar el Entorno

```bash
# Instalar dependencias
npm run installer

# Configurar variables de entorno
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Iniciar servicios
npm start
```

### 4. Hacer Cambios

```bash
# Hacer tus cambios
# ...

# Verificar que funcione todo
npm test

# Verificar el formato
cd backend && npm run format
cd frontend && npm run format

# Verificar linting
cd backend && npm run lint
cd frontend && npm run lint
```

### 5. Commit

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Agregar cambios
git add .

# Commit con mensaje descriptivo
git commit -m "feat: agregar filtro de búsqueda en posts"
git commit -m "fix: corregir error en autenticación"
git commit -m "docs: actualizar guía de instalación"
git commit -m "test: agregar tests para auth controller"
```

**Formato de Commits:**

```
<tipo>(<scope>): <descripción>

[cuerpo opcional]

[footer opcional]
```

**Tipos:**
- `feat`: Nueva característica
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Formato, puntos y comas, etc (no afecta código)
- `refactor`: Refactorización de código
- `test`: Agregar tests
- `chore`: Actualizar dependencias, configuración, etc

**Ejemplos:**

```bash
# Feature simple
git commit -m "feat: agregar paginación a posts"

# Fix con detalles
git commit -m "fix: corregir leak de memoria en caché

El cliente Redis no se estaba cerrando correctamente
al hacer shutdown del servidor.

Closes #123"

# Breaking change
git commit -m "feat!: cambiar estructura de respuesta del API

BREAKING CHANGE: El campo 'user' ahora se llama 'author'
en todas las respuestas de posts."
```

### 6. Push y Pull Request

```bash
# Push a tu fork
git push origin feature/nueva-funcionalidad

# Ir a GitHub y crear Pull Request
```

---

## 📐 Estándares de Código

### JavaScript/TypeScript

**Formato:**
- Usar Prettier (configuración incluida)
- Indentación: 2 espacios
- Punto y coma: Sí
- Comillas: Simples preferidas

**Naming:**
```javascript
// Variables y funciones: camelCase
const userName = 'John';
function getUserPosts() {}

// Clases y componentes: PascalCase
class PostController {}
const PostCard = () => {};

// Constantes: UPPER_SNAKE_CASE
const MAX_FILE_SIZE = 5000000;
const API_BASE_URL = 'http://api.example.com';

// Archivos: kebab-case
// auth-controller.js
// post-card.tsx
// user-type.ts
```

**Imports:**
```javascript
// Orden de imports:
// 1. Node modules
import express from 'express';
import jwt from 'jsonwebtoken';

// 2. Archivos locales
import Post from '../models/post.js';
import { verifyToken } from '../utils/middleware.js';

// 3. Tipos (TypeScript)
import type { PostType } from '../types/post-type';
```

### React/TypeScript

**Componentes Funcionales:**
```typescript
// Usar tipos explícitos
interface PostCardProps {
  post: Post;
  onDelete?: (id: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onDelete }) => {
  // Hooks al inicio
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // Handlers
  const handleClick = () => {
    navigate(`/post/${post._id}`);
  };
  
  // Render
  return (
    <div onClick={handleClick}>
      {/* ... */}
    </div>
  );
};
```

**Custom Hooks:**
```typescript
// Prefijo 'use'
export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch logic
  }, []);
  
  return { posts, loading };
};
```

### CSS/Tailwind

```typescript
// Usar Tailwind siempre que sea posible
<div className="flex items-center justify-between p-4 rounded-lg shadow-md">
  <h2 className="text-xl font-bold text-gray-800 dark:text-white">
    {title}
  </h2>
</div>

// Para estilos complejos, usar CSS modules
import styles from './post-card.module.css';

<div className={styles.container}>
  {/* ... */}
</div>
```

### Tests

**Naming:**
```javascript
// Describir el componente/función
describe('PostController', () => {
  // Describir el método/escenario
  describe('getPosts', () => {
    // Describir el comportamiento esperado
    it('should return all posts when no filters applied', async () => {
      // Test implementation
    });
    
    it('should filter posts by category', async () => {
      // Test implementation
    });
    
    it('should return 404 when post not found', async () => {
      // Test implementation
    });
  });
});
```

**Estructura:**
```javascript
// AAA Pattern: Arrange, Act, Assert

it('should create a new post', async () => {
  // Arrange - Preparar datos y mocks
  const mockPost = { title: 'Test', description: 'Description' };
  const mockUser = { _id: '123', name: 'John' };
  
  // Act - Ejecutar la acción
  const result = await createPost(mockPost, mockUser);
  
  // Assert - Verificar el resultado
  expect(result).toBeDefined();
  expect(result.title).toBe('Test');
  expect(result.authorId).toBe('123');
});
```

### Comentarios

```javascript
// ✅ Buenos comentarios - Explican el "por qué"
// Using exponential backoff to avoid overwhelming the API
await retryWithBackoff(() => fetchData());

// Workaround for Safari bug with Date.toISOString()
const dateStr = new Date().toISOString().split('T')[0];

/**
 * Generates a unique slug from a post title.
 * Handles special characters and ensures uniqueness
 * by appending a timestamp if needed.
 * 
 * @param title - The post title
 * @returns A URL-safe slug
 */
export const generateSlug = (title: string): string => {
  // Implementation
};

// ❌ Malos comentarios - Explican el "qué" (obvio del código)
// Increment counter by 1
counter++;

// Loop through posts
posts.forEach(post => {
  // ...
});
```

---

## 🔍 Pull Requests

### Checklist Antes de Enviar

- [ ] El código sigue los estándares del proyecto
- [ ] Agregaste/actualizaste tests si es necesario
- [ ] Todos los tests pasan (`npm test`)
- [ ] El código está formateado (`npm run format`)
- [ ] No hay errores de linting (`npm run lint`)
- [ ] Actualizaste la documentación si es necesario
- [ ] El commit message sigue Conventional Commits
- [ ] Tu rama está actualizada con `main`

### Título del PR

```
feat: agregar filtro de búsqueda en posts
fix: corregir error en login con email
docs: mejorar guía de instalación
```

### Descripción del PR

Usa este template:

```markdown
## Descripción
Breve descripción de los cambios realizados.

## Tipo de Cambio
- [ ] Bug fix (cambio que arregla un issue)
- [ ] Nueva feature (cambio que agrega funcionalidad)
- [ ] Breaking change (fix o feature que causa que funcionalidad existente no funcione como se esperaba)
- [ ] Documentación

## ¿Cómo se probó?
Describe las pruebas que ejecutaste para verificar tus cambios.

## Screenshots (si aplica)
Agrega screenshots para mostrar cambios visuales.

## Checklist
- [ ] Mi código sigue los estándares del proyecto
- [ ] He realizado una revisión de mi propio código
- [ ] He comentado mi código donde es necesario
- [ ] He actualizado la documentación
- [ ] Mis cambios no generan nuevas advertencias
- [ ] He agregado tests que prueban que mi fix funciona
- [ ] Todos los tests nuevos y existentes pasan
```

### Proceso de Revisión

1. **Envías el PR** → Mantenedores reciben notificación
2. **Revisión Automática** → CI/CD ejecuta tests y linting
3. **Code Review** → Mantenedores revisan el código
4. **Cambios Solicitados** → Si es necesario, haces ajustes
5. **Aprobación** → PR es aprobado
6. **Merge** → Tu código es integrado al proyecto

### Responder a Comentarios

```bash
# Hacer cambios solicitados
# ...

# Commit los cambios
git add .
git commit -m "fix: aplicar sugerencias del code review"

# Push a la misma rama
git push origin feature/tu-rama
# El PR se actualiza automáticamente
```

---

## 🐛 Reportar Bugs

### Antes de Reportar

1. **Busca en issues existentes** - Quizás ya fue reportado
2. **Intenta reproducir** - Asegúrate de que sea consistente
3. **Recopila información** - Logs, screenshots, etc.

### Template de Bug Report

```markdown
## Descripción del Bug
Una descripción clara y concisa del bug.

## Pasos para Reproducir
1. Ve a '...'
2. Haz click en '...'
3. Scroll hasta '...'
4. Ver error

## Comportamiento Esperado
Descripción de lo que esperabas que sucediera.

## Comportamiento Actual
Descripción de lo que realmente sucede.

## Screenshots
Si es posible, agrega screenshots.

## Entorno
- OS: [ej. macOS 13.0]
- Navegador: [ej. Chrome 120]
- Versión de Node: [ej. 21.0.0]
- Versión del proyecto: [ej. 1.0.0]

## Logs
```
Pegar logs relevantes aquí
```

## Información Adicional
Cualquier otro contexto sobre el problema.
```

---

## 💡 Sugerir Mejoras

### Template de Feature Request

```markdown
## ¿Está relacionado con un problema?
Una descripción clara de cuál es el problema. Ej: "Siempre me frustra cuando..."

## Solución Propuesta
Una descripción clara de lo que quieres que suceda.

## Alternativas Consideradas
Describe alternativas que hayas considerado.

## Contexto Adicional
Agrega cualquier otro contexto o screenshots sobre el feature request.

## Beneficios
¿Por qué esta feature sería útil para el proyecto?

## Complejidad Estimada
- [ ] Baja - Cambios menores
- [ ] Media - Requiere cierto trabajo
- [ ] Alta - Cambio significativo
```

---

## 🎓 Recursos Útiles

### Documentación del Proyecto

- [Getting Started](GETTING-STARTED.md) - Setup inicial
- [Development Guide](DEVELOPMENT.md) - Guía de desarrollo
- [Docker Compose Guide](DOCKER-COMPOSE-GUIDE.md) - Docker
- [Kubernetes Guide](KUBERNETES-GUIDE.md) - K8s
- [Swagger Guide](SWAGGER-GUIDE.md) - API docs

### Tecnologías

- [Node.js](https://nodejs.org/docs/)
- [Express.js](https://expressjs.com/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [MongoDB](https://www.mongodb.com/docs/)
- [Redis](https://redis.io/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite](https://vitejs.dev/guide/)

### Herramientas

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/)

---

## 📞 Contacto

¿Preguntas? ¿Necesitas ayuda?

- 🐛 [Abrir un Issue](../../issues/new)
- 💬 Únete a nuestro [Discord/Slack] (si aplica)
- 📧 Email: [email del proyecto]

---

## 🙏 Reconocimientos

Gracias a todos los [contribuidores](../../graphs/contributors) que han ayudado a hacer este proyecto mejor!

---

## 📄 Licencia

Al contribuir a este proyecto, aceptas que tus contribuciones serán licenciadas bajo la misma licencia que el proyecto.

---

**¡Gracias por contribuir a Wanderlust! 🎉**

Tu tiempo y esfuerzo son muy apreciados. Cada contribución, sin importar cuán pequeña sea, hace una diferencia.
