import { Model, DataTypes, Sequelize } from "sequelize";
import { User } from "./user.model";

export class Role extends Model {
  declare id: string;
  declare role_name: string;
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

        role_name: {
          type: DataTypes.STRING,
          allowNull: false,
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
        tableName: "roles",
        timestamps: false,
      },
    );
  }

  static associate() {
    this.hasMany(User, {
      foreignKey: "role_id",
      as: "users",
    });
  }
}
