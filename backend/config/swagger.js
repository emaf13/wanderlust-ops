import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Wanderlust API',
      version: '1.0.0',
      description: 'API documentation for Wanderlust - A travel blogging platform',
      contact: {
        name: 'API Support',
        email: 'support@wanderlust.com',
      },
    },
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
        url: 'https://api.wanderlust.com',
        description: 'Production server',
      },
    ],
    tags: [
      {
        name: 'Posts',
        description: 'Endpoints para gestionar publicaciones de viajes',
      },
      {
        name: 'Authentication',
        description: 'Endpoints para autenticación y manejo de usuarios',
      },
    ],
    components: {
      schemas: {
        Post: {
          type: 'object',
          required: ['title', 'authorName', 'imageLink', 'description', 'categories'],
          properties: {
            _id: {
              type: 'string',
              description: 'ID único del post',
              example: '507f1f77bcf86cd799439011',
            },
            title: {
              type: 'string',
              description: 'Título del post',
              example: 'Mi viaje a París',
            },
            authorName: {
              type: 'string',
              description: 'Nombre del autor',
              example: 'Juan Pérez',
            },
            imageLink: {
              type: 'string',
              description: 'URL de la imagen (debe terminar en .jpg, .jpeg, .png o .webp)',
              example: 'https://example.com/image.jpg',
            },
            categories: {
              type: 'array',
              description: 'Categorías del post (máximo 3)',
              items: {
                type: 'string',
              },
              example: ['Travel', 'Adventure'],
            },
            description: {
              type: 'string',
              description: 'Descripción del post',
              example: 'Una increíble aventura por las calles de París...',
            },
            isFeaturedPost: {
              type: 'boolean',
              description: 'Indica si el post es destacado',
              default: false,
              example: false,
            },
            timeOfPost: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación del post',
              example: '2025-12-16T10:30:00.000Z',
            },
          },
        },
        User: {
          type: 'object',
          required: ['name', 'email'],
          properties: {
            _id: {
              type: 'string',
              description: 'ID único del usuario',
              example: '507f1f77bcf86cd799439011',
            },
            name: {
              type: 'string',
              description: 'Nombre del usuario',
              example: 'Juan Pérez',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email del usuario',
              example: 'juan@example.com',
            },
            password: {
              type: 'string',
              description: 'Contraseña hasheada del usuario',
              example: '$2a$10$...',
            },
            avatar: {
              type: 'string',
              description: 'URL del avatar del usuario',
              example: 'https://example.com/avatar.jpg',
            },
            role: {
              type: 'string',
              description: 'Rol del usuario',
              default: 'user',
              example: 'user',
            },
            createdPosts: {
              type: 'array',
              description: 'IDs de posts creados por el usuario',
              items: {
                type: 'string',
              },
              example: ['507f1f77bcf86cd799439011'],
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Mensaje de error',
              example: 'Ha ocurrido un error',
            },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js', './controllers/*.js'],
};

export const swaggerSpec = swaggerJsdoc(options);
