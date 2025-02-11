import axios from "axios";

const API_URL = "http://localhost:3001/posts";
const token = JSON.parse(localStorage.getItem("token"));

const postService = {
  criarPost: async (titulo, conteudo, user_id) => {
    try {
      const response = await axios.post(
        API_URL,
        { titulo, conteudo, user_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.href = "http://localhost:3000/login";
      }
      throw new Error(error.response.data.erro || "Erro ao criar post");
    }
  },

  listarPosts: async (searchTerm = "", filtro) => {
    try {
      const response = await axios.get(API_URL, {
        params: { filtro, searchTerm },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.href = "http://localhost:3000/login";
      }
      throw new Error(error.response.data.erro || "Erro ao listar posts");
    }
  },
  editarPost: async (id, titulo, conteudo) => {
    try {
      const response = await axios.put(
        `${API_URL}/${id}`,
        { titulo, conteudo },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.href = "http://localhost:3000/login";
      }
      throw new Error(error.response.data.erro || "Erro ao atualizar post");
    }
  },

  listarUmPost: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`, {});
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.href = "http://localhost:3000/login";
      }
      throw new Error(error.response.data.erro || "Erro ao obter post");
    }
  },

  deletarPost: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.href = "http://localhost:3000/login";
      }
      throw new Error(error.response.data.erro || "Erro ao deletar post");
    }
  },

  curtirPost: async (id, user_id) => {
    try {
      const response = await axios.put(
        `${API_URL}/${id}/curtir`,
        { user_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.href = "http://localhost:3000/login";
      }
      throw new Error(error.response.data.erro || "Erro ao curtir post");
    }
  },

  removerCurtida: async (id, userId) => {
    try {
      const response = await axios.put(
        `${API_URL}/${id}/removerCurtida`,
        { user_id: userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.href = "http://localhost:3000/login";
      }
      throw new Error(error.response?.data?.erro || "Erro ao descurtir post");
    }
  },
};

export default postService;
