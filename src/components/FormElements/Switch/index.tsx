import React from "react";

interface IAppSwitchProps {
  id?: string | undefined;
  label?: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (value: boolean) => void;
}

const AppSwitch: React.FC<IAppSwitchProps> = ({
  id = "app-switch",
  label = "",
  checked = false,
  disabled = false,
  onChange,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className={`flex ${!disabled ? "cursor-pointer" : "cursor-default"} select-none items-center`}
      >
        <div className="relative mr-1">
          <input
            type="checkbox"
            id={id}
            className="sr-only"
            onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
              if (!disabled) {
                onChange(evt.target.checked);
              }
            }}
          />
          <div className="block h-6 w-10 rounded-full bg-meta-9"></div>
          <div
            className={`dot absolute left-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white transition ${
              checked && "!right-1 !translate-x-full !bg-primary"
            }`}
          >
            <span className={`hidden ${checked && "!block"}`}>
              <svg
                className="fill-white dark:fill-black"
                width="11"
                height="8"
                viewBox="0 0 11 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                  fill=""
                  stroke=""
                  strokeWidth="0.4"
                ></path>
              </svg>
            </span>
            <span className={`${checked && "hidden"}`}>
              <svg
                className="h-2 w-2 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </span>
          </div>
        </div>
        {label}
      </label>
    </div>
  );
};

export default AppSwitch;
