import { FastifyRequest, FastifyReply } from "fastify";
import {
  createRole,
  getRoles,
  updateRole,
  deleteRole,
} from "../services/role.service";
export const createRoleController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { role_name } = request.body as {
      role_name: string;
    };

    if (!role_name) {
      return reply.code(400).send({
        message: "Role name is required",
      });
    }

    const role = await createRole({
      role_name,
    });

    return reply.code(201).send({
      message: "Role created successfully",
      data: role,
    });
  } catch (error) {
    console.error(error);

    return reply.code(500).send({
      message: "Internal server error",
    });
  }
};


export const getRolesController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const roles = await getRoles();

    return reply.code(200).send({
      message: "Roles fetched successfully",
      data: roles,
    });
  } catch (error) {
    console.error(error);

    return reply.code(500).send({
      message: "Internal server error",
    });
  }
};



// Update Role
export const updateRoleController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params as { id: string };

    const { role_name } = request.body as {
      role_name: string;
    };

    if (!role_name) {
      return reply.code(400).send({
        message: "Role name is required",
      });
    }

    const role = await updateRole(id, {
      role_name,
    });

    if (!role) {
      return reply.code(404).send({
        message: "Role not found",
      });
    }

    return reply.code(200).send({
      message: "Role updated successfully",
      data: role,
    });
  } catch (error) {
    console.error(error);

    return reply.code(500).send({
      message: "Internal server error",
    });
  }
};

// Delete Role
export const deleteRoleController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params as { id: string };

    const role = await deleteRole(id);

    if (!role) {
      return reply.code(404).send({
        message: "Role not found",
      });
    }

    return reply.code(200).send({
      message: "Role deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return reply.code(500).send({
      message: "Internal server error",
    });
  }
};