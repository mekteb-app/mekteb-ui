import React, { SyntheticEvent } from "react";

interface IAppSwitchProps {
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  rows?: number;
  onChange: (value: string) => void;
}

const AppTextarea: React.FC<IAppSwitchProps> = ({
  placeholder = "",
  disabled = false,
  value = "",
  rows = 2,
  onChange,
}) => {
  return (
    <textarea
      disabled={disabled}
      rows={rows}
      placeholder={placeholder}
      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      value={value}
      onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (!disabled) {
          onChange(evt.target.value);
        }
      }}
    ></textarea>
  );
};

export default AppTextarea;
