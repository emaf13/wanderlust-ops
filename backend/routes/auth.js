import { Router } from 'express';
const router = Router();
import {
  signUpWithEmail,
  signInWithEmail,
  openGoogleAuthWindow,
  signUpWithGoogle,
  signInWithGoogle,
  openGithubAuthWindow,
  signUpWithGithub,
  signInWithGithub,
  signOutUser,
} from '../controllers/auth-controller.js';

/**
 * @swagger
 * /api/auth/google:
 *   get:
 *     summary: Iniciar autenticación con Google
 *     tags: [Authentication]
 *     description: Redirige al usuario a la página de autenticación de Google
 *     responses:
 *       302:
 *         description: Redirección a Google OAuth
 */
//GOOGLE STRATEGY
router.get('/google', openGoogleAuthWindow);

/**
 * @swagger
 * /api/auth/google/signup/callback:
 *   get:
 *     summary: Callback de registro con Google
 *     tags: [Authentication]
 *     description: Endpoint de callback después del registro con Google OAuth
 *     responses:
 *       200:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Error en el proceso de registro
 */
router.get('/google/signup/callback', signUpWithGoogle);

/**
 * @swagger
 * /api/auth/google/signin/callback:
 *   get:
 *     summary: Callback de inicio de sesión con Google
 *     tags: [Authentication]
 *     description: Endpoint de callback después del inicio de sesión con Google OAuth
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       400:
 *         description: Error en el proceso de inicio de sesión
 */
router.get('/google/signin/callback', signInWithGoogle);

/**
 * @swagger
 * /api/auth/github:
 *   get:
 *     summary: Iniciar autenticación con GitHub
 *     tags: [Authentication]
 *     description: Redirige al usuario a la página de autenticación de GitHub
 *     responses:
 *       302:
 *         description: Redirección a GitHub OAuth
 */
//GITHUB STRATEGY
router.get('/github', openGithubAuthWindow);

/**
 * @swagger
 * /api/auth/github/signup/callback:
 *   get:
 *     summary: Callback de registro con GitHub
 *     tags: [Authentication]
 *     description: Endpoint de callback después del registro con GitHub OAuth
 *     responses:
 *       200:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Error en el proceso de registro
 */
router.get('/github/signup/callback', signUpWithGithub);

/**
 * @swagger
 * /api/auth/github/signin/callback:
 *   get:
 *     summary: Callback de inicio de sesión con GitHub
 *     tags: [Authentication]
 *     description: Endpoint de callback después del inicio de sesión con GitHub OAuth
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       400:
 *         description: Error en el proceso de inicio de sesión
 */
router.get('/github/signin/callback', signInWithGithub);

/**
 * @swagger
 * /api/auth/email-password/signup:
 *   post:
 *     summary: Registro con email y contraseña
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Juan Pérez
 *               email:
 *                 type: string
 *                 format: email
 *                 example: juan@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: MiPassword123!
 *     responses:
 *       200:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Datos inválidos o usuario ya existe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
//REGULAR EMAIL PASSWORD STRATEGY
router.post('/email-password/signup', signUpWithEmail);

/**
 * @swagger
 * /api/auth/email-password/signin:
 *   post:
 *     summary: Inicio de sesión con email y contraseña
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: juan@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: MiPassword123!
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Credenciales inválidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/email-password/signin', signInWithEmail);

/**
 * @swagger
 * /api/auth/signout:
 *   post:
 *     summary: Cerrar sesión
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Sesión cerrada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sesión cerrada exitosamente
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
//SIGN OUT
router.post('/signout', signOutUser);

export default router;
