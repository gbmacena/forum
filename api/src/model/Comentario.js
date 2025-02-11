const { Model, DataTypes } = require("sequelize");

class Comentario extends Model {
  static init(sequelize) {
    super.init(
      {
        conteudo: DataTypes.TEXT,
        qtd_curtidas: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
        post_id: DataTypes.INTEGER,
        user_id: DataTypes.INTEGER,
      },
      {
        sequelize,
        modelName: "Comentario",
        tableName: "Comentarios",
        timestamps: true,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Post, {
      foreignKey: "post_id",
      as: "Post",
      onDelete: "CASCADE",
    });
    this.belongsTo(models.User, { foreignKey: "user_id", as: "Usuario" });
    this.hasMany(models.ComentarioCurtidas, {
      foreignKey: "comentario_id",
      as: "Curtidas",
      onDelete: "CASCADE",
    });
  }
}

module.exports = Comentario;
