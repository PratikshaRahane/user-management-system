import { Model, DataTypes, Sequelize } from "sequelize";
import { Role } from "./role.model";

export class User extends Model {
  declare id: string;
  declare role_id: string;
  declare first_name: string;
  declare middle_name?: string;
  declare last_name: string;
  declare email: string;
  declare phone: string;
  declare password: string;
  declare is_active: boolean;
  declare is_deleted: boolean;
  declare created_at: Date;
  declare updated_at: Date;

  static initModel(sequelize: Sequelize) {
    return this.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },

        role_id: {
          type: DataTypes.UUID,
          allowNull: true,
        },

        first_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },

        middle_name: {
          type: DataTypes.STRING,
          allowNull: true,
        },

        last_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },

        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },

        phone: {
          type: DataTypes.STRING,
          allowNull: false,
        },

        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },

        is_active: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },

        is_deleted: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },

        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },

        updated_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        tableName: "users",
        timestamps: false,
      },
    );
  }

  static associate() {
    this.belongsTo(Role, {
      foreignKey: "role_id",
      as: "role",
    });
  }
}
