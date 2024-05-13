import React, { ReactNode, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import "@/css/popover.css";

interface IPopoverProps {
  children: ReactNode;
  onConfirm: () => void;
}

const Popover: React.FC<IPopoverProps> = ({ children, onConfirm }) => {
  const [showPopover, setShowPopover] = useState(false);

  const togglePopover = () => {
    setShowPopover(!showPopover);
  };

  const onConfirmClick = () => {
    onConfirm();
    togglePopover();
  };

  return (
    <div className="popover-container">
      <div className="popover-trigger" onClick={togglePopover}>
        {children}
      </div>
      {showPopover && (
        <OutsideClickHandler onOutsideClick={togglePopover}>
          <div className="popover-content absolute right-full top-0 z-20 mr-3 w-max max-w-[311px] rounded bg-white drop-shadow-5 block">
            <span className="absolute -right-1.5 top-4 -z-10 h-4 w-4 rotate-45 rounded-sm bg-white"></span>
            <div className="px-5 py-4.5 text-center">
              <div className="mb-1">Are you sure?</div>
              <div className="flex justify-between">
                <div>
                  <button
                    className="bg-meta-3 text-white inline-flex items-center justify-center rounded-md border border-meta-3 px-2 py-1 text-center text-sm hover:bg-opacity-90"
                    onClick={onConfirmClick}
                  >
                    Yes
                  </button>
                </div>
                <div>
                  <button
                    className="bg-meta-1 text-white inline-flex items-center justify-center rounded-md border border-meta-1 px-2 py-1 text-center text-sm hover:bg-opacity-90"
                    onClick={togglePopover}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </OutsideClickHandler>
      )}
    </div>
  );
};

export default Popover;
