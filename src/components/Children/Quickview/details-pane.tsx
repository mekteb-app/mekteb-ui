import Nivo from "@/components/common/Nivo";
import useChildren from "@/hooks/useChildren";
import { formatDate } from "@/utils/date";

const DetailsPane: React.FC = () => {
  const { child } = useChildren();
  return (
    <table className="quickview-content text-sm">
      <thead>
        <tr>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Name</td>
          <td>{`${child?.first_name} ${child?.last_name}`}</td>
        </tr>
        <tr>
          <td>Nivo</td>
          <td>
            <Nivo nivo={child?.nivo} />
          </td>
        </tr>
        <tr>
          <td>Birthdate</td>
          <td>{formatDate(child?.birthdate, "dd/MM/yyyy")}</td>
        </tr>
        <tr>
          <td>Community</td>
          <td>{`${child?.community?.name || "N/A"}`}</td>
        </tr>
        <tr>
          <td>Created at</td>
          <td>{`${formatDate(child?.created_at)}`}</td>
        </tr>
        <tr>
          <td>Updated at</td>
          <td>{`${formatDate(child?.updated_at)}`}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default DetailsPane;
