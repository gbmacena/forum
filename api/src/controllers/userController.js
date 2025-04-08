const userService = require("../services/userService");

const userController = {
  cadastrarUser: async (req, res) => {
    const { nome, email, senha, apelido } = req.body;
    try {
      const user = await userService.cadastrarUser(nome, email, senha, apelido);
      if (user.erro) return res.status(400).json(user);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },
  logarUser: async (req, res) => {
    const { email, senha } = req.body;
    try {
      const user = await userService.logarUser(email, senha);
      if (user.erro) return res.status(400).json(user);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },
  atualizarUser: async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha, apelido, profissao } = req.body;
    try {
      const user = await userService.atualizarUser(
        id,
        nome,
        email,
        senha,
        apelido,
        profissao
      );
      if (user.erro) return res.status(400).json(user);

      res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },
  listarUserPosts: async (req, res) => {
    const { id } = req.params;
    try {
      const userPosts = await userService.listarUserPosts(id);
      if (userPosts.erro) return res.status(400).json(userPosts);
      return res.status(200).json(userPosts);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },
  uploadAvatar: async (req, res) => {
    const { id } = req.params;

    try {
      const user = await userService.uploadAvatar(req.params.id, req.file);
      if (!user)
        return res.status(404).json({ message: "Usúario não encontrado" });

      res.status(200).json({ message: "Avatar adicionado com sucesso!" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to upload avatar", error: error.message });
    }
  },
};

module.exports = userController;
