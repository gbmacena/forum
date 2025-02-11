const Comentario = require("../model/Comentario");
const Usuario = require("../model/User");
const ComentarioCurtidas = require("../model/ComentarioCurtidas");

const comentarioService = {
  criarComentario: async (post_id, conteudo, user_id) => {
    if (!post_id || !conteudo || !user_id) {
      return { erro: "Envie todos os campos obrigatorios." };
    }

    try {
      const comentario = await Comentario.create({
        post_id,
        conteudo,
        user_id,
      });
      return comentario;
    } catch (err) {
      return { err: err.message };
    }
  },

  curtirComentario: async (comentario_id, user_id) => {
    if (!comentario_id || !user_id)
      return { erro: "Envie o id do comentário e do usuário." };

    try {
      const user = await Usuario.findByPk(user_id);
      if (!user) return { erro: "Usuário não encontrado." };
      const comentario = await Comentario.findByPk(comentario_id);
      const userJaCurtiu = await ComentarioCurtidas.findOne({
        where: { comentario_id, user_id },
      });
      if (userJaCurtiu) return { erro: "Comentário já curtido." };

      await ComentarioCurtidas.create({ comentario_id, user_id });

      comentario.qtd_curtidas += 1;
      await comentario.save();

      return comentario;
    } catch (error) {
      return { erro: error.message };
    }
  },
  removerCurtida: async (comentario_id, user_id) => {
    if (!comentario_id || !user_id)
      return { erro: "Envie o id do comentario e do usuário." };

    try {
      const comentario = await Comentario.findByPk(comentario_id);
      const user = await Usuario.findByPk(user_id);
      if (!user) return { erro: "Usuário não encontrado." };

      const curtida = await ComentarioCurtidas.findOne({
        where: { comentario_id, user_id },
      });
      if (!curtida) return { erro: "Curtida não encontrada." };

      await curtida.destroy();

      comentario.qtd_curtidas -= 1;
      await comentario.save();

      return comentario;
    } catch (error) {
      return { erro: error.message };
    }
  },
};

module.exports = comentarioService;
