const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const User = require("../model/User");
const Post = require("../model/Post");
const Comentario = require("../model/Comentario");
const PostCurtidas = require("../model/PostCurtidas");
const ComentarioCurtidas = require("../model/ComentarioCurtidas");

const connection = new Sequelize(dbConfig);

try {
  connection.authenticate();
  console.log("Connection has been established successfully.");
} catch (err) {
  console.error("Unable to connect to the database:", err);
}

User.init(connection);
Post.init(connection);
Comentario.init(connection);
PostCurtidas.init(connection);
ComentarioCurtidas.init(connection);

User.associate(connection.models);
Post.associate(connection.models);
Comentario.associate(connection.models);
PostCurtidas.associate(connection.models);
ComentarioCurtidas.associate(connection.models);

module.exports = connection;
