const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        email: DataTypes.STRING,
        senha: DataTypes.STRING,
        apelido: DataTypes.STRING,
        profissao: DataTypes.STRING,
        avatar: DataTypes.BLOB("long"),
      },
      {
        sequelize,
        modelName: "User",
        tableName: "Users",
        timestamps: true,
      }
    );
  }
  static associate(models) {
    this.hasMany(models.Post, {
      foreignKey: "user_id",
      as: "Posts",
      onDelete: "CASCADE",
    });
    this.hasMany(models.Comentario, {
      foreignKey: "user_id",
      as: "Comentarios",
      onDelete: "CASCADE",
    });
    this.hasMany(models.ComentarioCurtidas, {
      foreignKey: "user_id",
      as: "Curtidas",
      onDelete: "CASCADE",
    });
    this.hasMany(models.PostCurtidas, {
      foreignKey: "user_id",
      as: "PostCurtidas",
      onDelete: "CASCADE",
    });
  }
}

module.exports = User;
