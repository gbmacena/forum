import axios from "axios";

const API_URL = "http://localhost:3001";
const token = JSON.parse(localStorage.getItem("token"));

const comentarioService = {
  criarComentario: async (post_id, conteudo, user_id) => {
    try {
      const response = await axios.post(
        `${API_URL}/posts/${post_id}/comentarios`,
        { conteudo, user_id, post_id },
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
      throw new Error(error.response.data.erro || "Erro ao criar comentário");
    }
  },

  buscarComentarios: async (postId) => {
    try {
      const response = await axios.get(
        `${API_URL}/posts/${postId}/comentarios/`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.erro || "Erro ao buscar comentários");
    }
  },

  curtirComentario: async (comentarioId, user_id) => {
    try {
      const response = await axios.put(
        `${API_URL}/posts/comentarios/${comentarioId}/curtir`,
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
      throw new Error(error.response.data.erro || "Erro ao curtir comentário");
    }
  },

  descurtirComentario: async (comentarioId, user_id) => {
    try {
      const response = await axios.put(
        `${API_URL}/posts/comentarios/${comentarioId}/removerCurtida`,
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
      throw new Error(
        error.response.data.erro || "Erro ao descurtir comentário"
      );
    }
  },
};

export default comentarioService;
