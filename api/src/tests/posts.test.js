const request = require("supertest");
const app = require("../api");

let token;

beforeAll(async () => {
  const res = await request(app).post("/usuarios/login").send({
    email: "usuario@teste.com",
    senha: "senha123",
  });
  token = res.body.token;
});

it("Deve criar um novo post", async () => {
  const res = await request(app)
    .post("/posts")
    .set("Authorization", `Bearer ${token}`)
    .send({
      titulo: "Novo Post",
      conteudo: "Conteúdo do novo post",
      user_id: 1,
    });
  expect(res.statusCode).toEqual(201);
  expect(res.body).toHaveProperty("post");
});

it("Deve listar todos os posts", async () => {
  const res = await request(app)
    .get("/posts")
    .set("Authorization", `Bearer ${token}`);
  expect(res.statusCode).toEqual(200);
  expect(res.body).toBeInstanceOf(Array);
});

it("Deve obter um post por ID", async () => {
  const res = await request(app)
    .get("/posts/1")
    .set("Authorization", `Bearer ${token}`);
  expect(res.statusCode).toEqual(200);
  expect(res.body).toHaveProperty("id");
});

it("Deve atualizar um post", async () => {
  const res = await request(app)
    .put("/posts/1")
    .set("Authorization", `Bearer ${token}`)
    .send({
      titulo: "Post Atualizado",
      conteudo: "Conteúdo atualizado do post",
    });
  expect(res.statusCode).toEqual(200);
  expect(res.body).toHaveProperty("message", "Post atualizado com sucesso.");
});

it("Deve deletar um post", async () => {
  const res = await request(app)
    .delete("/posts/1")
    .set("Authorization", `Bearer ${token}`);
  expect(res.statusCode).toEqual(200);
  expect(res.body).toHaveProperty("message", "Post deletado com sucesso.");
});

it("Deve curtir um post", async () => {
  const res = await request(app)
    .put("/posts/1/curtir")
    .set("Authorization", `Bearer ${token}`)
    .send({
      userId: 1,
    });
  expect(res.statusCode).toEqual(200);
  expect(res.body).toHaveProperty("message", "Post curtido com sucesso.");
  expect(res.body.post).toHaveProperty("qtd_curtidas");
});
