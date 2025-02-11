const postService = require("../services/postService");

const postController = {
  criarPost: async (req, res) => {
    const { titulo, conteudo, user_id } = req.body;
    try {
      const post = await postService.criarPost(titulo, conteudo, user_id);
      if (post.erro) return res.status(400).json(post);

      return res.status(201).json(post);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },
  listarPosts: async (req, res) => {
    const { filtro, searchTerm = "" } = req.query;
    try {
      const posts = await postService.listarPosts(filtro, searchTerm);
      if (posts.erro) return res.status(400).json(posts);

      return res.status(200).json(posts);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },
  atualizarPost: async (req, res) => {
    const { id } = req.params;
    const { titulo, conteudo } = req.body;

    try {
      const post = await postService.atualizarPost(id, titulo, conteudo);
      if (post.erro) return res.status(400).json(post);

      res.status(200).json(post);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },
  listarUmPost: async (req, res) => {
    const { id } = req.params;
    try {
      const post = await postService.listarUmPost(id);
      if (post.erro) return res.status(400).json(post);
      res.status(200).json(post);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },
  deletarPost: async (req, res) => {
    const { id } = req.params;

    try {
      const postDeletado = await postService.deletarPost(id);
      if (postDeletado.erro) return res.status(400).json(postDeletado);

      res.status(200).json({
        message: "Post deletado com sucesso.",
      });
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },
  curtirPost: async (req, res) => {
    const { id } = req.params;
    const { user_id } = req.body;

    try {
      const post = await postService.curtirPost(id, user_id);
      if (post.erro) return res.status(400).json(post);
      res.status(200).json(post);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },
  removerCurtida: async (req, res) => {
    const { id } = req.params;
    const { user_id } = req.body;

    try {
      const post = await postService.removerCurtida(id, user_id);
      if (post.erro) return res.status(400).json(post);
      res.status(200).json(post);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },
};

module.exports = postController;
