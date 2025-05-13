import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class table_status extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    table_status_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'table_status',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "table_status_id" },
        ]
      },
    ]
  });
  }
}
