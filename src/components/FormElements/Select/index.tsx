"use client";
import React, { forwardRef, useEffect, useState } from "react";
import Select, { GroupBase, SingleValue } from "react-select";
import "@/css/select.css";

interface Option {
  value: string | number | GroupBase<string | number>;
  label: string | number | GroupBase<string | number>;
}

interface IAppSelectProps {
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  formatValue?: (val: string) => any;
  value?: Option | undefined;
}

const AppSelect: React.FC<IAppSelectProps> = forwardRef(
  (
    { onChange, options = [], placeholder, formatValue, value = undefined },
    _ref
  ) => {
    const [selectedOption, setSelectedOption] =
      useState<SingleValue<Option | undefined>>(value);

    useEffect(() => {
      setSelectedOption(value); // Update selectedOption when value prop changes
    }, [value]);

    return (
      <div className="relative w-full bg-transparent">
        <Select
          value={selectedOption}
          onChange={(selected) => {
            setSelectedOption(selected);
            onChange(
              formatValue ? formatValue(`${selected?.value}`) : selected?.value
            );
          }}
          options={options}
          placeholder={placeholder}
          classNames={{
            input: () => "app-select-input text-sm font-medium text-black",
            control: (state) =>
              `app-select border-stroke p-1 pl-3 focus:border-primary active:border-primary hover:border-primary shadow-none ${state.menuIsOpen ? "app-select-menu-open" : ""}`,
          }}
        />
      </div>
    );
  }
);

AppSelect.displayName = "AppSelect";

export default AppSelect;
