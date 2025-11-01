
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  "UHSoftwareDatabase",
  "group30@softwaredb",
  "Admin123",
  {
    host: "softwaredb.database.windows.net",
    dialect: "mssql",
    port: 1433,
    logging: false,
    dialectOptions: {
      options: {
        encrypt: true,
        trustServerCertificate: false
      }
    }
  }
);

const User = sequelize.define(
  "UserCredentials",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    password_hash: { type: DataTypes.STRING(255), allowNull: false },
    role: { type: DataTypes.STRING(50), allowNull: false, defaultValue: "volunteer" },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn("SYSUTCDATETIME") },
    updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn("SYSUTCDATETIME") }
  },
  { tableName: "UserCredentials", timestamps: false }
);

module.exports = { sequelize, User };
