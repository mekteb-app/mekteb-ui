import { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@/css/datepicker.css";

interface IDatePickerProps {
  children?: React.ReactNode;
  onChange?: (date: string) => void;
  name: string;
  maxDate?: Date;
  minDate?: Date;
}

const AppDatePicker = forwardRef((props: IDatePickerProps, _ref) => {
  const [startDate, setStartDate] = useState<Date>();
  return (
    <DatePicker
      selected={startDate}
      placeholderText="Select a date"
      onChange={(date: Date) => {
        if (props.onChange) props.onChange(date ? date.toISOString() : "");
        setStartDate(date);
      }}
      customInput={
        <input className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary" />
      }
      renderDayContents={(day) => {
        return <span className="datepicker-day p-2">{day}</span>;
      }}
      maxDate={props.maxDate}
      minDate={props.minDate}
      showYearDropdown
      showIcon
      fixedHeight
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 48 48"
        >
          <mask id="ipSApplication0">
            <g fill="none" stroke="#fff" strokeLinejoin="round" strokeWidth="4">
              <path strokeLinecap="round" d="M40.04 22v20h-32V22"></path>
              <path
                fill="#fff"
                d="M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z"
              ></path>
            </g>
          </mask>
          <path
            fill="currentColor"
            d="M0 0h48v48H0z"
            mask="url(#ipSApplication0)"
          ></path>
        </svg>
      }
    />
  );
});

AppDatePicker.displayName = "AppDatePicker";

export default AppDatePicker;
