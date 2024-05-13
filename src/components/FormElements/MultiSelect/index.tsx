"use client";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import Select, { GroupBase, MultiValue } from "react-select";
import "@/css/select.css";

interface Option {
  value: string | number | GroupBase<string | number>;
  label: string | number | GroupBase<string | number>;
}

interface IAppMultiSelectProps {
  onChange: (value: MultiValue<any>) => void;
  options: Option[];
  placeholder?: string;
  value?: Option[];
}

const AppMultiSelect: React.FC<IAppMultiSelectProps> = forwardRef(
  (
    { onChange, options = [], placeholder = "Select options", value = [] },
    _ref
  ) => {
    const [selectedOptions, setSelectedOptions] =
      useState<MultiValue<any>>(value);

    useEffect(() => {
      setSelectedOptions(value); // Update selectedOption when value prop changes
    }, [value]);

    return (
      <div className="relative w-full bg-transparent">
        <Select
          value={selectedOptions}
          onChange={(selected) => {
            onChange((selected || []).map((option) => option.value));
          }}
          options={options}
          isMulti
          placeholder={placeholder}
          classNames={{
            input: () => "app-select-input text-sm font-medium text-black",
            control: (state) =>
              `app-select border-stroke p-1 pl-3 focus:border-primary active:border-primary hover:border-primary shadow-none ${state.menuIsOpen ? "app-select-menu-open" : ""}`,
          }}
          closeMenuOnSelect={false}
        />
      </div>
    );
  }
);

AppMultiSelect.displayName = "AppMultiSelect";

export default AppMultiSelect;
