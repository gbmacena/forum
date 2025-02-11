require("dotenv").config();
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SECRET_KEY = process.env.SECRET_KEY;

const userService = {
  cadastrarUser: async (nome, email, senha, apelido) => {
    if ((!nome || !email || !senha, !apelido))
      return { erro: "Envie todos os campos obrigatórios." };

    if (nome.length < 3)
      return { erro: "O nome deve ter no mínimo 3 caracteres." };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return { erro: "Email inválido." };

    if (apelido.length < 2)
      return { erro: "O apelido deve ter no mínimo 2 caracteres." };

    if (senha.length < 6)
      return { erro: "A senha deve ter no mínimo 6 caracteres." };

    try {
      const apelidoExiste = await User.findOne({ where: { apelido } });
      if (apelidoExiste) return { erro: "Apelido já cadastrado." };
      const usuarioExiste = await User.findOne({ where: { email } });
      if (usuarioExiste) return { erro: "Email já cadastrado" };

      const hashedSenha = await bcrypt.hash(senha, 10);
      const user = await User.create({
        nome,
        email,
        senha: hashedSenha,
        apelido,
      });

      return user;
    } catch (error) {
      return { erro: error.message };
    }
  },
  logarUser: async (email, senha) => {
    if (!email || !senha)
      return { erro: "Envie todos os campos obrigatórios." };

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) return { erro: "Email ou senha incorretos." };

      const senhaValida = await bcrypt.compare(senha, user.senha);
      if (!senhaValida) return { erro: "Email ou senha incorretos." };

      const token = jwt.sign({ id: user.id }, SECRET_KEY, {
        expiresIn: "2h",
      });

      return { user, token };
    } catch (error) {
      return { erro: error.message };
    }
  },
  atualizarUser: async (id, nome, email, senha, apelido, profissao) => {
    if (!id) return { erro: "Envie o id do usuário." };
    if (!nome && !email && !senha && !apelido && !profissao)
      return { erro: "Envie ao menos um campo para atualizar." };

    if (nome && nome.length < 3)
      return { erro: "O nome deve ter no mínimo 3 caracteres." };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) return { erro: "Email inválido." };

    if (apelido.length < 2)
      return { erro: "O apelido deve ter no mínimo 2 caracteres." };
    if (senha && senha.length < 6)
      return { erro: "A senha deve ter no mínimo 6 caracteres." };

    try {
      const user = await User.findByPk(id);
      if (!user) return { erro: "Usuário não encontrado." };

      if (
        nome === user.nome &&
        email === user.email &&
        apelido === user.apelido &&
        profissao === user.profissao
      )
        return { erro: "Nenhum dado foi alterado." };

      const emailExits = await User.findOne({ where: { email } });
      if (emailExits && email != user.email)
        return { erro: "Email já cadastrado." };

      const apelidoExiste = await User.findOne({ where: { apelido } });
      if (apelidoExiste && apelido != user.apelido)
        return { erro: "Apelido já cadastrado." };

      const updateData = { nome, email, apelido, profissao };

      updateData.senha = await bcrypt.hash(senha, 10);

      await User.update(updateData, { where: { id } });
      return { message: "Usuário atualizado com sucesso." };
    } catch (error) {
      return { erro: error.message };
    }
  },
  listarUserPosts: async (id) => {
    if (!id) return { erro: "Envie o id do usuário." };
    try {
      const user = await User.findByPk(id, {
        include: {
          association: "Posts",
          attributes: [
            "id",
            "titulo",
            "conteudo",
            "createdAt",
            "updatedAt",
            "qtd_curtidas",
          ],
          separate: true,
          order: [["createdAt", "DESC"]],
        },
      });
      if (!user) return { erro: "Usuário não encontrado." };
      return user;
    } catch (error) {
      return { erro: error.message };
    }
  },
  uploadAvatar: async (id, file) => {
    const user = await User.findByPk(id);
    if (user) {
      const avatar = file ? file.buffer : user.avatar;
      await user.update({ avatar });
    }
    return user;
  },
};

module.exports = userService;
