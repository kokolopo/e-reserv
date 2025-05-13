import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _reservation_status from  "./reservation_status.js";
import _reservations from  "./reservations.js";
import _roles from  "./roles.js";
import _table_status from  "./table_status.js";
import _tables from  "./tables.js";
import _users from  "./users.js";

export default function initModels(sequelize) {
  const reservation_status = _reservation_status.init(sequelize, DataTypes);
  const reservations = _reservations.init(sequelize, DataTypes);
  const roles = _roles.init(sequelize, DataTypes);
  const table_status = _table_status.init(sequelize, DataTypes);
  const tables = _tables.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);

  reservations.belongsTo(reservation_status, { as: "reservation_status", foreignKey: "reservation_status_id"});
  reservation_status.hasMany(reservations, { as: "reservations", foreignKey: "reservation_status_id"});
  users.belongsTo(roles, { as: "role", foreignKey: "role_id"});
  roles.hasMany(users, { as: "users", foreignKey: "role_id"});
  tables.belongsTo(table_status, { as: "table_status", foreignKey: "table_status_id"});
  table_status.hasMany(tables, { as: "tables", foreignKey: "table_status_id"});
  reservations.belongsTo(tables, { as: "table", foreignKey: "table_id"});
  tables.hasMany(reservations, { as: "reservations", foreignKey: "table_id"});
  reservations.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(reservations, { as: "reservations", foreignKey: "user_id"});

  return {
    reservation_status,
    reservations,
    roles,
    table_status,
    tables,
    users,
  };
}
