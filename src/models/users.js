import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class users extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        user_id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING(255),
          allowNull: true,
          unique: "email",
        },
        whatsapp: {
          type: DataTypes.STRING(255),
          allowNull: true,
          unique: "whatsapp",
        },
        password: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        role_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "roles",
            key: "role_id",
          },
        },
      },
      {
        sequelize,
        tableName: "users",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "user_id" }],
          },
          {
            name: "email",
            unique: true,
            using: "BTREE",
            fields: [{ name: "email" }],
          },
          {
            name: "whatsapp",
            unique: true,
            using: "BTREE",
            fields: [{ name: "whatsapp" }],
          },
          {
            name: "role_id",
            using: "BTREE",
            fields: [{ name: "role_id" }],
          },
        ],
      }
    );
  }
}
