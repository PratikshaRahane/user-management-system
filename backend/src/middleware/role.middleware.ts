import { FastifyReply, FastifyRequest } from "fastify";

export const authorizeRole = (allowedRoles: string[]) => {
  return async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const userRole = request.user.role;

    if (!userRole || !allowedRoles.includes(userRole)) {
      return reply.code(403).send({
        message: "Forbidden",
      });
    }
  };
};