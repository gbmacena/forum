const { Model, DataTypes } = require("sequelize");

class Post extends Model {
  static init(sequelize) {
    super.init(
      {
        titulo: DataTypes.STRING,
        conteudo: DataTypes.TEXT,
        user_id: DataTypes.INTEGER,
        qtd_curtidas: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        modelName: "Post",
        tableName: "Posts",
        timestamps: true,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "Usuario",
      onDelete: "CASCADE",
    });
    this.hasMany(models.Comentario, {
      foreignKey: "post_id",
      as: "Comentarios",
      onDelete: "CASCADE",
    });
    this.hasMany(models.PostCurtidas, {
      foreignKey: "post_id",
      as: "Curtidas",
      onDelete: "CASCADE",
    });
  }
}

module.exports = Post;
