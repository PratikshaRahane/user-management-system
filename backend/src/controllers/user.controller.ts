import { FastifyRequest, FastifyReply } from "fastify";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  changePassword,
} from "../services/user.service";

export const createUserController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const userData = request.body as {
      role_id?: string;
      first_name?: string;
      middle_name?: string;
      last_name?: string;
      email?: string;
      phone?: string;
      password?: string;
    };

    // Required fields validation
    if (
      !userData.first_name ||
      !userData.last_name ||
      !userData.email ||
      !userData.phone ||
      !userData.password ||
      !userData.role_id
    ) {
      return reply.code(400).send({
        message: "Required fields are missing",
      });
    }

    // Email validation
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(userData.email)) {
      return reply.code(400).send({
        message: "Invalid email format",
      });
    }

    // Phone validation
    const phonePattern = /^[0-9]{10}$/;

    if (!phonePattern.test(userData.phone)) {
      return reply.code(400).send({
        message: "Invalid phone number",
      });
    }

    // Password validation
    if (userData.password.length < 6) {
      return reply.code(400).send({
        message: "Password must be at least 6 characters",
      });
    }

    // Create user
    const user = await createUser(userData);

    // Role not found check
    if (user === "ROLE_NOT_FOUND") {
      return reply.code(404).send({
        message: "Role not found",
      });
    }

    // Duplicate email check
    if (!user) {
      return reply.code(409).send({
        message: "Email already exists",
      });
    }

    const userResponse = user.toJSON();

    delete userResponse.password;

    return reply.code(201).send({
      message: "User created successfully",
      data: userResponse,
    });
  } catch (error) {
    console.error(error);

    return reply.code(500).send({
      message: "Failed to create user",
    });
  }
};

export const getUsersController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { search, page, limit, sortBy, sortOrder, is_active } =
      request.query as {
        search?: string;
        page?: string;
        limit?: string;
        sortBy?: string;
        sortOrder?: string;
        is_active?: string;
      };

    const currentPage = Number(page) || 1;
    const pageLimit = Number(limit) || 10;

    const allowedSortFields = [
      "first_name",
      "last_name",
      "email",
      "created_at",
    ];

    const finalSortBy = allowedSortFields.includes(sortBy || "")
      ? sortBy!
      : "created_at";

    const finalSortOrder = sortOrder?.toUpperCase() === "ASC" ? "ASC" : "DESC";

    const users = await getUsers(
      search,
      currentPage,
      pageLimit,
      finalSortBy,
      finalSortOrder,
      is_active,
    );
    return reply.code(200).send({
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.error(error);

    return reply.code(500).send({
      message: "Failed to fetch users",
    });
  }
};

export const getUserByIdController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { id } = request.params as {
      id: string;
    };

    const user = await getUserById(id);

    if (!user) {
      return reply.code(404).send({
        message: "User not found",
      });
    }

    return reply.code(200).send({
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);

    return reply.code(500).send({
      message: "Failed to fetch user",
    });
  }
};

export const updateUserController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { id } = request.params as {
      id: string;
    };

    const userData = request.body as {
      first_name?: string;
      middle_name?: string;
      last_name?: string;
      email?: string;
      phone?: string;
      password?: string;
      is_active?: boolean;
      role_id?: string;
    };

    // Email validation
    if (userData.email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(userData.email)) {
        return reply.code(400).send({
          message: "Invalid email format",
        });
      }
    }

    // Phone validation
    if (userData.phone) {
      const phonePattern = /^[0-9]{10}$/;

      if (!phonePattern.test(userData.phone)) {
        return reply.code(400).send({
          message: "Invalid phone number",
        });
      }
    }

    // Password validation
    if (userData.password && userData.password.length < 6) {
      return reply.code(400).send({
        message: "Password must be at least 6 characters",
      });
    }

    if (
      userData.is_active !== undefined &&
      typeof userData.is_active !== "boolean"
    ) {
      return reply.code(400).send({
        message: "is_active must be true or false",
      });
    }

    const user = await updateUser(id, userData);

    if (user === "EMAIL_EXISTS") {
      return reply.code(409).send({
        message: "Email already exists",
      });
    }

    if (user === "ROLE_NOT_FOUND") {
      return reply.code(404).send({
        message: "Role not found",
      });
    }

    if (!user) {
      return reply.code(404).send({
        message: "User not found",
      });
    }

    const userResponse = user.toJSON();

    delete userResponse.password;

    return reply.code(200).send({
      message: "User updated successfully",
      data: userResponse,
    });
  } catch (error) {
    console.error(error);

    return reply.code(500).send({
      message: "Failed to update user",
    });
  }
};

export const deleteUserController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { id } = request.params as {
      id: string;
    };

    const user = await deleteUser(id);

    if (!user) {
      return reply.code(404).send({
        message: "User not found",
      });
    }

    const userResponse = user.toJSON();

    delete userResponse.password;

    return reply.code(200).send({
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);

    return reply.code(500).send({
      message: "Failed to delete user",
    });
  }
};

export const loginUserController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };

    if (!email || !password) {
      return reply.code(400).send({
        message: "Email and password are required",
      });
    }

    const user = await loginUser(email, password);

    if (!user) {
      return reply.code(401).send({
        message: "Invalid email or password",
      });
    }

    const token = await reply.jwtSign({
      id: user.id,
      email: user.email,
      role: user.role?.role_name,
    });

    return reply.code(200).send({
      message: "Login successful",
      token: token,
      data: user,
    });
  } catch (error) {
    console.error(error);

    return reply.code(500).send({
      message: "Internal server error",
    });
  }
};

export const changePasswordController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { id } = request.user;

    const { currentPassword, newPassword, confirmPassword } = request.body as {
      currentPassword: string;
      newPassword: string;
      confirmPassword: string;
    };

    if (!currentPassword || !newPassword || !confirmPassword) {
      return reply.code(400).send({
        message: "All password fields are required",
      });
    }

    if (newPassword !== confirmPassword) {
      return reply.code(400).send({
        message: "New password and confirm password do not match",
      });
    }

    if (newPassword.length < 6) {
      return reply.code(400).send({
        message: "New password must be at least 6 characters",
      });
    }

    const user = await changePassword(id, currentPassword, newPassword);

    if (!user) {
      return reply.code(404).send({
        message: "User not found",
      });
    }

    if (user === "CURRENT_PASSWORD_INVALID") {
      return reply.code(401).send({
        message: "Current password is incorrect",
      });
    }

    return reply.code(200).send({
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error(error);

    return reply.code(500).send({
      message: "Internal server error",
    });
  }
};
