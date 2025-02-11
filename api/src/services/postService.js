const Post = require("../model/Post");
const Comentario = require("../model/Comentario");
const PostCurtidas = require("../model/PostCurtidas");
const ComentarioCurtidas = require("../model/ComentarioCurtidas");
const User = require("../model/User");
const { Op } = require("sequelize");

const postService = {
  criarPost: async (titulo, conteudo, user_id) => {
    if (!titulo || !conteudo || !user_id)
      return { erro: "Envie todos os campos obrigatórios." };

    if (titulo.length < 3)
      return { erro: "O título deve ter pelo menos 3 caracteres." };

    if (titulo.length > 100)
      return { erro: "O título deve ter no máximo 100 caracteres." };

    if (conteudo.length < 3)
      return { erro: "O conteúdo deve ter pelo menos 3 caracteres." };

    try {
      const post = await Post.create({ titulo, conteudo, user_id });
      return post;
    } catch (error) {
      return { erro: error.message };
    }
  },
  listarPosts: async (filtro, searchTerm = "") => {
    let order;
    let limit;

    switch (filtro) {
      case "mais-curtidos":
        order = [["qtd_curtidas", "DESC"]];
        limit = 5;
        break;
      case "asc":
        order = [["createdAt", "ASC"]];
        break;
      default:
        order = [["createdAt", "DESC"]];
    }
    try {
      const posts = await Post.findAll({
        where: {
          titulo: { [Op.like]: `%${searchTerm}%` },
        },

        include: [
          {
            model: User,
            as: "Usuario",
            attributes: ["id", "apelido"],
          },

          {
            model: PostCurtidas,
            as: "Curtidas",
            attributes: ["user_id"],
          },
        ],
        order,
        limit,
      });
      return posts;
    } catch (error) {
      return { erro: error.message };
    }
  },
  atualizarPost: async (id, titulo, conteudo) => {
    if (!id) return { erro: "Envie o id do post." };
    if (!titulo && !conteudo)
      return { erro: "Envie pelo menos um campo para atualizar." };

    if (titulo.length < 3)
      return { erro: "O título deve ter pelo menos 3 caracteres." };

    if (titulo.length > 100)
      return { erro: "O título deve ter no máximo 100 caracteres." };

    if (conteudo.length < 3)
      return { erro: "O conteúdo deve ter pelo menos 3 caracteres." };

    try {
      const post = await Post.findByPk(id);
      if (!post) return { erro: "Post não encontrado." };

      if (titulo) post.titulo = titulo;
      if (conteudo) post.conteudo = conteudo;

      await post.save();
      return post;
    } catch (error) {
      return { erro: error.message };
    }
  },
  listarUmPost: async (id) => {
    try {
      const post = await Post.findOne({
        where: { id },
        include: [
          {
            model: User,
            as: "Usuario",
            attributes: ["apelido", "avatar"],
          },
          {
            model: Comentario,
            as: "Comentarios",
            attributes: ["conteudo", "qtd_curtidas", "id", "createdAt"],
            include: [
              {
                model: User,
                as: "Usuario",
                attributes: ["apelido", "avatar"],
              },
              {
                model: ComentarioCurtidas,
                as: "Curtidas",
                attributes: ["user_id"],
              },
            ],
            order: [["createdAt", "DESC"]],
          },

          {
            model: PostCurtidas,
            as: "Curtidas",
            attributes: ["user_id"],
          },
        ],
        order: [
          [{ model: Comentario, as: "Comentarios" }, "createdAt", "DESC"],
        ],
      });

      if (!post) return { erro: "Post não encontrado." };
      return post;
    } catch (error) {
      return { erro: error.message };
    }
  },
  deletarPost: async (id) => {
    try {
      const post = await Post.findByPk(id);
      if (!post) return { erro: "Post não encontrado." };
      await post.destroy();
      return { message: "Post deletado com sucesso." };
    } catch (error) {
      return { erro: error.message };
    }
  },

  curtirPost: async (post_id, user_id) => {
    if (!post_id || !user_id) {
      return { erro: "Envie o id do post e o id do usuário." };
    }
    try {
      const post = await Post.findByPk(post_id);
      if (!post) return { erro: "Post não encontrado." };

      const user = await User.findByPk(user_id);
      if (!user) return { erro: "Usuário não encontrado." };
      const userJaCurtiu = await PostCurtidas.findOne({
        where: { post_id, user_id },
      });

      if (userJaCurtiu) return { erro: "Post já curtido" };

      await PostCurtidas.create({ post_id, user_id });

      post.qtd_curtidas += 1;
      await post.save();

      return post;
    } catch (error) {
      return { erro: error.message };
    }
  },
  removerCurtida: async (id, userId) => {
    if (!id || !userId) {
      return { erro: "Envie o id do post e o id do usuário." };
    }
    try {
      const post = await Post.findByPk(id);
      if (!post) return { erro: "Post não encontrado." };
      const user = await User.findByPk(userId);
      if (!user) return { erro: "Usuário não encontrado." };

      const curtida = await PostCurtidas.findOne({
        where: { post_id: id, user_id: userId },
      });
      if (!curtida) return { erro: "Curtida não encontrada." };

      await curtida.destroy();

      post.qtd_curtidas -= 1;
      await post.save();

      return post;
    } catch (error) {
      return { erro: error.message };
    }
  },
};

module.exports = postService;
