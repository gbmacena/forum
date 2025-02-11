const express = require("express");
const comentarioController = require("../controllers/comentarioController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comentários
 *   description: Gerenciamento de comentários
 */

/**
 * @swagger
 * /posts/{postId}/comentarios:
 *   post:
 *     summary: Criar um novo comentário
 *     tags: [Comentários]
 *     parameters:
 *       - in: path
 *         name: postId
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
 *             required:
 *               - conteudo
 *               - user_id
 *             properties:
 *               conteudo:
 *                 type: string
 *               user_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Comentário criado com sucesso
 *       400:
 *         description: Erro na requisição
 */
router.post(
  "/posts/:id/comentarios/",
  authMiddleware,

  comentarioController.criarComentario
);

/**
 * @swagger
 * /posts/{postId}/comentarios:
 *   get:
 *     summary: Listar todos os comentários de um post
 *     tags: [Comentários]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do post
 *     responses:
 *       200:
 *         description: Lista de comentários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   conteudo:
 *                     type: string
 *                   qtd_curtidas:
 *                     type: integer
 *                   post_id:
 *                     type: integer
 *                   user_id:
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

router.put(
  "/posts/comentarios/:id/curtir",
  authMiddleware,
  comentarioController.curtirComentario
);

router.put(
  "/posts/comentarios/:id/removerCurtida",
  authMiddleware,
  comentarioController.removerCurtida
);

module.exports = router;
