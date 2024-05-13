import { Nivo } from "@/enums/nivo";
import { Role } from "@/enums/role";

export const SESSION_TOKEN = "session_token";

export const roleOptions = [
  { value: Role.SuperAdmin, label: "Super admin" },
  { value: Role.Admin, label: "Admin" },
  { value: Role.User, label: "User" },
];

export const nivoOptions = [
  { value: Nivo.First, label: "First" },
  { value: Nivo.Second, label: "Second" },
  { value: Nivo.Third, label: "Third" },
  { value: Nivo.Fourth, label: "Fourth" },
  { value: Nivo.Fifth, label: "Fifth" },
];
