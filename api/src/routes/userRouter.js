const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const multer = require("multer");
const router = express.Router();

const upload = multer();

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Gerenciamento de usuários
 */

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cadastrar um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *               - apelido
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               apelido:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro na requisição
 */
router.post("/", userController.cadastrarUser);

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Logar um usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário logado com sucesso
 *       400:
 *         description: Erro na requisição
 */
router.post("/login", userController.logarUser);

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Atualizar um usuário
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               apelido:
 *                 type: string
 *               profissao:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Erro na requisição
 *       403:
 *         description: Acesso negado
 */
router.put("/:id", authMiddleware, userController.atualizarUser);

/**
 * @swagger
 * /usuarios/posts/{id}:
 *   get:
 *     summary: Listar posts de um usuário
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Lista de posts do usuário
 *       400:
 *         description: Erro na requisição
 *       403:
 *         description: Acesso negado
 */

router.get("/posts/:id", authMiddleware, userController.listarUserPosts);

/**
 * @swagger
 * /usuarios/{id}/avatar:
 *   put:
 *     summary: Upload de avatar do usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Avatar adicionado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao fazer upload do avatar
 */

router.put("/:id/avatar", upload.single("avatar"), userController.uploadAvatar);

module.exports = router;
