import { FastifyInstance } from "fastify";
import { authenticate } from "../middleware/auth.middleware";
import { authorizeRole } from "../middleware/role.middleware";

import {
  createUserController,
  getUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
  loginUserController,
  changePasswordController,
} from "../controllers/user.controller";

export const userRoutes = async (fastify: FastifyInstance) => {
  fastify.post(
    "/users",
    {
      preHandler: [authenticate, authorizeRole(["Admin"])],
    },
    createUserController,
  );
  fastify.get("/users", { preHandler: authenticate }, getUsersController);

  fastify.get(
    "/users/:id",
    { preHandler: authenticate },
    getUserByIdController,
  );

  fastify.put(
    "/users/:id",
    {
      preHandler: [authenticate, authorizeRole(["Admin"])],
    },
    updateUserController,
  );
  fastify.delete(
    "/users/:id",
    {
      preHandler: [authenticate, authorizeRole(["Admin"])],
    },
    deleteUserController,
  );
  fastify.post("/login", loginUserController);

  fastify.put(
    "/users/:id/change-password",
    { preHandler: authenticate },
    changePasswordController,
  );
};
