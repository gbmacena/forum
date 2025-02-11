const express = require("express");
const postController = require("../controllers/postController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Gerenciamento de posts
 */

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Criar um novo post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - conteudo
 *               - user_id
 *             properties:
 *               titulo:
 *                 type: string
 *               conteudo:
 *                 type: string
 *               user_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Post criado com sucesso
 *       400:
 *         description: Erro na requisição
 */
router.post("/", authMiddleware, postController.criarPost);

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Listar todos os posts
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: filtro
 *         schema:
 *           type: string
 *           enum: [mais-curtidos, asc, desc]
 *         description: Filtro para ordenar os posts
 *     responses:
 *       200:
 *         description: Lista de posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   titulo:
 *                     type: string
 *                   conteudo:
 *                     type: string
 *                   user_id:
 *                     type: integer
 *                   qtd_curtidas:
 *                     type: integer
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       400:
 *         description: Erro na requisição
 */
router.get("/", postController.listarPosts);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Atualizar um post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               conteudo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post atualizado com sucesso
 *       400:
 *         description: Erro na requisição
 *       403:
 *         description: Acesso negado
 */

router.put("/:id", authMiddleware, postController.atualizarPost);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Obter um post por ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Detalhes do post
 *       400:
 *         description: Erro na requisição
 *       404:
 *         description: Post não encontrado
 */
router.get("/:id", postController.listarUmPost);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Deletar um post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Post deletado com sucesso
 *       400:
 *         description: Erro na requisição
 *       403:
 *         description: Acesso negado
 */
router.delete("/:id", authMiddleware, postController.deletarPost);

/**
 * @swagger
 * /posts/{id}/curtir:
 *   put:
 *     summary: Curtir um post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Post curtido com sucesso
 *       400:
 *         description: Erro na requisição
 */
router.put("/:id/curtir", authMiddleware, postController.curtirPost);

router.put(
  "/:id/removerCurtida",
  authMiddleware,
  postController.removerCurtida
);

module.exports = router;
