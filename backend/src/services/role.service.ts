import { Role } from "../models/role.model";

export const createRole = async (roleData: {
  role_name: string;
}) => {
  const role = await Role.create(roleData);

  return role;
};

export const getRoles = async () => {
  const roles = await Role.findAll({
    order: [["created_at", "DESC"]],
  });

  return roles;
};

// Update Role
export const updateRole = async (
  id: string,
  roleData: { role_name: string }
) => {
  const role = await Role.findByPk(id);

  if (!role) {
    return null;
  }

  role.role_name = roleData.role_name;

  await role.save();

  return role;
};

// Delete Role
export const deleteRole = async (id: string) => {
  const role = await Role.findByPk(id);

  if (!role) {
    return null;
  }

  await role.destroy();

  return role;
};