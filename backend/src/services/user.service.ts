import { Op } from "sequelize";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import { Role } from "../models/role.model";

export const createUser = async (userData: any) => {
  // Check duplicate email
  const existingUser = await User.findOne({
    where: {
      email: userData.email,
      is_deleted: false,
    },
  });

  if (existingUser) {
    return null;
  }

  const role = await Role.findOne({
    where: {
      id: userData.role_id,
    },
  });

  if (!role) {
    return "ROLE_NOT_FOUND";
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  userData.password = hashedPassword;

  // Create user
  const user = await User.create(userData);

  return user;
};

export const getUsers = async (
  search?: string,
  page: number = 1,
  limit: number = 10,
  sortBy: string = "created_at",
  sortOrder: string = "DESC",
  is_active?: string,
) => {
  const offset = (page - 1) * limit;

  const { rows, count } = await User.findAndCountAll({
    where: {
      is_deleted: false,

      ...(search && {
        [Op.or]: [
          {
            first_name: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            last_name: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            email: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      }),

      ...(is_active !== undefined && {
        is_active: is_active === "true",
      }),
    },

    include: [
      {
        model: Role,
        as: "role",
        attributes: ["id", "role_name"],
      },
    ],

    limit,
    offset,
    order: [[sortBy, sortOrder]],
  });

  const userResponse = rows.map((user) => {
    const data = user.toJSON();

    return {
      id: data.id,
      first_name: data.first_name,
      middle_name: data.middle_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone,
      is_active: data.is_active,
      role: data.role,
      created_at: data.created_at,
      updated_at: data.updated_at,
    };
  });

  return {
    users: userResponse,
    total: count,
    page,
    limit,
    totalPages: Math.ceil(count / limit),
  };
};

export const getUserById = async (id: string) => {
  const user = await User.findOne({
    where: {
      id,
      is_deleted: false,
    },

    include: [
      {
        model: Role,
        as: "role",
        attributes: ["id", "role_name"],
      },
    ],
  });

  if (!user) {
    return null;
  }

  const userResponse = user.toJSON();

  delete userResponse.password;

  return userResponse;
};
export const updateUser = async (id: string, userData: any) => {
  const user = await User.findOne({
    where: {
      id,
      is_deleted: false,
    },
  });

  if (!user) {
    return null;
  }

  // Check duplicate email
  if (userData.email) {
    const existingUser = await User.findOne({
      where: {
        email: userData.email,
        is_deleted: false,
        id: {
          [Op.ne]: id,
        },
      },
    });

    if (existingUser) {
      return "EMAIL_EXISTS";
    }
  }

  if (userData.role_id) {
    const role = await Role.findOne({
      where: {
        id: userData.role_id,
      },
    });

    if (!role) {
      return "ROLE_NOT_FOUND";
    }
  }

  // Password hashing
  if (userData.password) {
    userData.password = await bcrypt.hash(userData.password, 10);
  }

  await user.update(userData);

  const updatedUser = await User.findOne({
    where: {
      id,
      is_deleted: false,
    },
    include: [
      {
        model: Role,
        as: "role",
        attributes: ["id", "role_name"],
      },
    ],
  });

  return updatedUser;
};

export const deleteUser = async (id: string) => {
  const user = await User.findOne({
    where: {
      id,
      is_deleted: false,
    },
  });

  if (!user) {
    return null;
  }

  await user.update({
    is_deleted: true,
  });

  const userResponse = user.toJSON();

  delete userResponse.password;

  return userResponse;
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({
    where: {
      email,
      is_deleted: false,
    },
    include: [
      {
        model: Role,
        as: "role",
        attributes: ["id", "role_name"],
      },
    ],
  });

  if (!user) {
    return null;
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return null;
  }

  const userData = user.toJSON();

  delete userData.password;

  return userData;
};
export const changePassword = async (
  id: string,
  currentPassword: string,
  newPassword: string,
) => {
  const user = await User.findByPk(id);

  if (!user) {
    return null;
  }

  const passwordMatch = await bcrypt.compare(currentPassword, user.password);

  if (!passwordMatch) {
    return "CURRENT_PASSWORD_INVALID";
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;

  await user.save();

  return user;
};
