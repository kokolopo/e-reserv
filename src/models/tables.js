import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class tables extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    table_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    table_status_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'table_status',
        key: 'table_status_id'
      }
    }
  }, {
    sequelize,
    tableName: 'tables',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "table_id" },
        ]
      },
      {
        name: "table_status_id",
        using: "BTREE",
        fields: [
          { name: "table_status_id" },
        ]
      },
    ]
  });
  }
}
