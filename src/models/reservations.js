import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class reservations extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        reservation_id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "users",
            key: "user_id",
          },
        },
        table_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "tables",
            key: "table_id",
          },
        },
        fullname: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        whatsapp: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        people: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        booked_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        booked_time: {
          type: DataTypes.TIME,
          allowNull: true,
        },
        reservation_status_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "reservation_status",
            key: "reservation_status_id",
          },
        },
      },
      {
        sequelize,
        tableName: "reservations",
        timestamps: true,
        underscored: true,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "reservation_id" }],
          },
          {
            name: "user_id",
            using: "BTREE",
            fields: [{ name: "user_id" }],
          },
          {
            name: "table_id",
            using: "BTREE",
            fields: [{ name: "table_id" }],
          },
          {
            name: "reservation_status_id",
            using: "BTREE",
            fields: [{ name: "reservation_status_id" }],
          },
        ],
      }
    );
  }
}
