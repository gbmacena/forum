const { Model, DataTypes } = require("sequelize");

class ComentarioCurtidas extends Model {
  static init(sequelize) {
    super.init(
      {
        comentario_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "Comentarios",
            key: "id",
          },
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "Users",
            key: "id",
          },
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        updatedAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        modelName: "ComentarioCurtidas",
        tableName: "Comentarios_Curtidas",
        timestamps: false,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Comentario, {
      foreignKey: "comentario_id",
      as: "Comentario",
      onDelete: "CASCADE",
    });
    this.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "Usuario",
      onDelete: "CASCADE",
    });
  }
}

module.exports = ComentarioCurtidas;
