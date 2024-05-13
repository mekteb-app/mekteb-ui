import { Role } from "@/enums/role";

export const roleLabel = (role?: number): string => {
  if (!role) return "";
  switch (role) {
    case Role.SuperAdmin:
      return "Super admin";
    case Role.Admin:
      return "Admin";
    default:
      return "User";
  }
};
