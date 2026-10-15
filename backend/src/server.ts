import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import sequelize from "./config/database";
import { User } from "./models/user.model";
import { userRoutes } from "./routes/user.route";
import { Role } from "./models/role.model";
import { roleRoutes } from "./routes/role.route";
import jwt from "@fastify/jwt";

dotenv.config();

const fastify = Fastify({
  logger: true,
});

fastify.register(jwt, {
  secret: process.env.JWT_SECRET as string,
  sign: {
    expiresIn: "1h",
  },
});
fastify.register(cors, {
  origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});

fastify.register(userRoutes, {
  prefix: "/api/v1",
});

fastify.register(roleRoutes, {
  prefix: "/api/v1",
});

const startServer = async () => {
  try {
    await sequelize.authenticate();

    console.log("MySQL connected successfully");

    User.initModel(sequelize);
    Role.initModel(sequelize);

    User.associate();
Role.associate();

    await sequelize.sync();

    console.log("Users table created successfully");

    await fastify.listen({
      port: Number(process.env.PORT) || 8000,
    });

    console.log("Server running on port 8000");
  } catch (error) {
    console.error("Server error:", error);
    process.exit(1);
  }
};

startServer();
