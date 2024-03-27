import { ReactNode } from "react";

interface Props {
  readonly children: ReactNode;
}

const FormItemError = ({ children }: Props) => {
  return (
    <div className="w-full">
      <ul>
        <li className="leading-relaxed text-[#CD5D5D]">{children}</li>
      </ul>
    </div>
  );
};

export default FormItemError;
