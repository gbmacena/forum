const comentarioService = require("../services/comentarioService");

const comentarioController = {
  criarComentario: async (req, res) => {
    const { conteudo, user_id } = req.body;
    const { id } = req.params;

    try {
      const comentario = await comentarioService.criarComentario(
        id,
        conteudo,
        user_id
      );
      if (comentario.erro) return res.status(400).json(comentario);
      return res.status(201).json(comentario);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },
  curtirComentario: async (req, res) => {
    const { id } = req.params;
    const { user_id } = req.body;

    try {
      const comentario = await comentarioService.curtirComentario(id, user_id);
      if (comentario.erro) return res.status(400).json(comentario);
      res.status(200).json(comentario);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },
  removerCurtida: async (req, res) => {
    const { id } = req.params;
    const { user_id } = req.body;
    try {
      const comentario = await comentarioService.removerCurtida(id, user_id);
      if (comentario.erro) return res.status(400).json(comentario);
      res.status(200).json(comentario);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },
};

module.exports = comentarioController;
