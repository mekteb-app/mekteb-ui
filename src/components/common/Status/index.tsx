import { Status as StatusEnum } from "@/enums/status";

interface Props {
  status: StatusEnum;
}

const Status = ({ status }: Props) => {
  const statusClass =
    status === StatusEnum.ACTIVE
      ? "bg-success text-success"
      : status === StatusEnum.INACTIVE
        ? "bg-danger text-danger"
        : "bg-warning text-warning";
  const statusLabel =
    status === StatusEnum.ACTIVE
      ? "Active"
      : status === StatusEnum.INACTIVE
        ? "Inactive"
        : "Pending";
  return (
    <p
      className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${statusClass}`}
    >
      {statusLabel}
    </p>
  );
};

export default Status;
