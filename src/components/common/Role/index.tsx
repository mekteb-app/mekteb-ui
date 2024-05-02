import { Role as RoleEnum } from "@/enums/role";

interface Props {
  role: RoleEnum;
}

const Role = ({ role }: Props) => {
  const roleClass =
    role === RoleEnum.SuperAdmin
      ? "border-[#212B36] text-[#212B36]"
      : role === RoleEnum.Admin
        ? "border-[#637381] text-[#637381]"
        : "border-[#3BA2B8] text-[#3BA2B8]";
  const roleLabel =
    role === RoleEnum.SuperAdmin
      ? "Super admin"
      : role === RoleEnum.Admin
        ? "Admin"
        : "User";
  return (
    <p
      className={`inline-flex border rounded bg-opacity-10 px-3 py-1 text-sm font-medium ${roleClass}`}
    >
      {roleLabel}
    </p>
  );
};

export default Role;
