"use client";
import React, { forwardRef, useEffect, useRef, useState } from "react";

interface IAppMultiSelectProps {
  onChange: (value: string[]) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const AppMultiSelect: React.FC<IAppMultiSelectProps> = forwardRef(
  ({ onChange, options, placeholder = "Select an option" }, _ref) => {
    const [selected, setSelected] = useState<number[]>([]);
    const [show, setShow] = useState(false);
    const dropdownRef = useRef<any>(null);
    const trigger = useRef<any>(null);

    const open = () => {
      setShow(true);
    };

    const isOpen = () => {
      return show === true;
    };

    const select = (index: number) => {
      const selectedIndexes = selected.includes(index)
        ? selected.filter((i) => i !== index)
        : [...selected, index];
      setSelected(selectedIndexes);
    };

    const remove = (index: number) => {
      const selectedIndex = selected.indexOf(index);

      if (selectedIndex !== -1) {
        setSelected(selected.filter((i) => i !== index));
      }
    };

    const selectedValues = () => {
      return selected.map((option) => options[option].value);
    };

    const isValueSelected = (value: string): boolean =>
      selectedValues().includes(value);

    useEffect(() => {
      const clickHandler = ({ target }: MouseEvent) => {
        if (!dropdownRef.current) return;
        if (
          !show ||
          dropdownRef.current.contains(target) ||
          trigger.current.contains(target)
        )
          return;
        setShow(false);
      };
      document.addEventListener("click", clickHandler);
      return () => document.removeEventListener("click", clickHandler);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    useEffect(() => {
      onChange(selectedValues());
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected]);

    return (
      <>
        <div className="flex flex-col items-center">
          <input name="values" type="hidden" defaultValue={selectedValues()} />
          <div className="relative inline-block w-full">
            <div className="relative flex flex-col items-center">
              <div ref={trigger} onClick={open} className="w-full">
                <div className="flex rounded border border-stroke px-3 outline-none transition focus:border-primary active:border-primary">
                  <div className="flex flex-auto flex-wrap gap-1">
                    {selected.map((index) => (
                      <div
                        key={index}
                        className="my-1 flex items-center justify-center rounded border-[.5px] border-stroke bg-gray px-2.5 py-1.5 text-sm font-medium"
                      >
                        <div className="max-w-full flex-initial">
                          {options[index].label}
                        </div>
                        <div className="flex flex-auto flex-row-reverse">
                          <div
                            onClick={() => remove(index)}
                            className="cursor-pointer pl-2 hover:text-danger"
                          >
                            <svg
                              className="fill-current"
                              role="button"
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M9.35355 3.35355C9.54882 3.15829 9.54882 2.84171 9.35355 2.64645C9.15829 2.45118 8.84171 2.45118 8.64645 2.64645L6 5.29289L3.35355 2.64645C3.15829 2.45118 2.84171 2.45118 2.64645 2.64645C2.45118 2.84171 2.45118 3.15829 2.64645 3.35355L5.29289 6L2.64645 8.64645C2.45118 8.84171 2.45118 9.15829 2.64645 9.35355C2.84171 9.54882 3.15829 9.54882 3.35355 9.35355L6 6.70711L8.64645 9.35355C8.84171 9.54882 9.15829 9.54882 9.35355 9.35355C9.54882 9.15829 9.54882 8.84171 9.35355 8.64645L6.70711 6L9.35355 3.35355Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    ))}
                    {selected.length === 0 && (
                      <div className="flex-1">
                        <input
                          placeholder={placeholder}
                          className="h-full w-full appearance-none bg-transparent p-1 px-2 outline-none px-3 py-3"
                          defaultValue={selectedValues()}
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex w-6 items-center py-1 pl-1 pr-1">
                    <button
                      type="button"
                      onClick={open}
                      className="h-6 w-6 cursor-pointer outline-none focus:outline-none"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill="#637381"
                          ></path>
                        </g>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full px-4">
                <div
                  className={`max-h-select absolute left-0 z-50 w-full overflow-y-auto rounded bg-white shadow ${
                    isOpen() ? "" : "hidden"
                  }`}
                  ref={dropdownRef}
                  onFocus={() => setShow(true)}
                  onBlur={() => setShow(false)}
                >
                  <div className="flex w-full flex-col">
                    {options.map((option, index) => (
                      <div key={index}>
                        <div
                          className="w-full cursor-pointer rounded-t border-b border-stroke hover:bg-primary/5"
                          onClick={() => select(index)}
                        >
                          <div
                            className={`relative flex w-full items-center border-l-2 p-2 pl-2 ${
                              isValueSelected(option.value)
                                ? "border-primary"
                                : "border-transparent"
                            }`}
                          >
                            <div className="flex w-full items-center">
                              <div className="mx-2 leading-6">
                                {option.label}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
);

AppMultiSelect.displayName = "AppMultiSelect";

export default AppMultiSelect;
