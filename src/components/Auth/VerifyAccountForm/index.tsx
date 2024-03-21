"use client";
import React from "react";

const VerifyAccountForm: React.FC = () => {
  const onSubmit = (event: any) => {
    event.preventDefault();
  };
  return (
    <>
      {/* <!-- Verify Account Form --> */}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div>
          <h4 className="text-center p-3 text-lg font-bold text-black">
            Verify Account
          </h4>
        </div>
        <form onSubmit={onSubmit}>
          <div className="p-6.5">
            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="mb-5.5 mt-5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Re-type Password
              </label>
              <input
                type="password"
                placeholder="Re-type password"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <button
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              type="submit"
            >
              Verify Account
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default VerifyAccountForm;
