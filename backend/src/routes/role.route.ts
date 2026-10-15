import { FastifyInstance } from "fastify";
import { authenticate } from "../middleware/auth.middleware";
import { authorizeRole } from "../middleware/role.middleware";

import {
  createRoleController,
  getRolesController,
  updateRoleController,
  deleteRoleController,
} from "../controllers/role.controller";

export const roleRoutes = async (fastify: FastifyInstance) => {

  // Admin only
  fastify.post(
    "/roles",
    {
      preHandler: [
        authenticate,
        authorizeRole(["Admin"]),
      ],
    },
    createRoleController
  );

  // Any logged-in user
  fastify.get(
    "/roles",
    {
      preHandler: authenticate,
    },
    getRolesController
  );

  // Admin only
  fastify.put(
    "/roles/:id",
    {
      preHandler: [
        authenticate,
        authorizeRole(["Admin"]),
      ],
    },
    updateRoleController
  );

  // Admin only
  fastify.delete(
    "/roles/:id",
    {
      preHandler: [
        authenticate,
        authorizeRole(["Admin"]),
      ],
    },
    deleteRoleController
  );
};