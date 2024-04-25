import AppDatePicker from "@/components/FormElements/DatePicker/DatePicker";
import FormItemError from "@/components/FormElements/FormItemError";
import CreateUserIcon from "@/components/Icons/create-user";
import AppModal from "@/components/Modal";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IChildPayload } from "../../../interfaces/IChildPayload";
import { Nivo } from "@/enums/nivo";
import AppSelect from "@/components/FormElements/Select";
import { subYears } from "date-fns";
import {
  createChildAsync,
  selectChildrenStatus,
} from "@/lib/features/children/childrenSlice";
import useCommunity from "@/hooks/useCommunity";
import AppMultiSelect from "@/components/FormElements/MultiSelect/index";
import useUsers from "@/hooks/useUsers";
import { selectCurrentUser } from "@/lib/features/currentUser/currentUserSlice";
import { Role } from "@/enums/role";

const initialChild: IChildPayload = {
  first_name: "",
  last_name: "",
  birthdate: "",
  nivo: undefined,
  parentIds: [],
  communityId: undefined,
};

const ChildForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectChildrenStatus);
  const currentUser = useAppSelector(selectCurrentUser);
  const { options: communityOptions, getCommunityOptions } = useCommunity();
  const [userOptions, getUserOptions] = useUsers();

  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IChildPayload>({
    defaultValues: initialChild,
    mode: "onTouched",
  });

  const communityOptionValues = useMemo(
    () =>
      communityOptions.map(({ id, name }) => ({
        value: id,
        label: name,
      })),
    [communityOptions]
  );

  const userOptionValues = useMemo(
    () =>
      userOptions.map(({ id, first_name, last_name }) => ({
        value: id,
        label: `${first_name} ${last_name}`,
      })),
    [userOptions]
  );

  const onSubmit = (data: IChildPayload) => {
    dispatch(createChildAsync(data));
  };

  useEffect(() => {
    if (open) {
      reset({});

      if (status !== "loading" && !communityOptions.length) {
        getCommunityOptions();
      }

      if (!userOptions?.length) {
        getUserOptions();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, reset]);

  useEffect(() => {
    if (status === "created") {
      onCloseModal();
    }
  }, [status]);

  return (
    <>
      <button
        className="flex bg-primary px-3 py-2 text-center text-white hover:bg-opacity-90 lg:px-3 xl:px-4 text-sm rounded align-middle items-center"
        onClick={onOpenModal}
      >
        <CreateUserIcon />
        <div className="ml-1 hidden lg:block">Create child</div>
      </button>
      <AppModal
        title="Create child"
        open={open}
        onClose={() => {
          reset();
          onCloseModal();
        }}
        closeOnOverlayClick={false}
      >
        <div className="text-sm w-full lg:block">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-3">
              {/* First name */}
              <div className="flex mb-4.5 flex-col gap-6 lg:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    First name
                  </label>
                  <input
                    {...register("first_name", { required: true })}
                    placeholder="Enter parent first name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.first_name && (
                    <FormItemError>First name is required.</FormItemError>
                  )}
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Last name
                  </label>
                  <input
                    {...register("last_name", { required: true })}
                    placeholder="Enter parent last name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.last_name && (
                    <FormItemError>Last name is required.</FormItemError>
                  )}
                </div>
              </div>
              <div className="flex mb-4.5 flex-col gap-6 lg:flex-row">
                <div className="w-full lg:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Birthdate
                  </label>
                  <Controller
                    name="birthdate"
                    control={control}
                    render={({ field }) => (
                      <AppDatePicker
                        {...field}
                        maxDate={subYears(new Date(), 5)}
                        minDate={subYears(new Date(), 18)}
                      />
                    )}
                  />
                  {errors.birthdate && (
                    <FormItemError>Birthdate is required.</FormItemError>
                  )}
                </div>

                <div className="w-full lg:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Nivo
                  </label>
                  <Controller
                    name="nivo"
                    control={control}
                    render={({ field }) => (
                      <AppSelect
                        placeholder="Select nivo"
                        options={[
                          { value: Nivo.First, label: "First" },
                          { value: Nivo.Second, label: "Second" },
                          { value: Nivo.Third, label: "Third" },
                          { value: Nivo.Fourth, label: "Fourth" },
                          { value: Nivo.Fifth, label: "Fifth" },
                        ]}
                        formatValue={(val) => +val}
                        {...field}
                      />
                    )}
                    rules={{ required: true }}
                  />
                  {errors?.nivo && (
                    <FormItemError>Nivo is required.</FormItemError>
                  )}
                </div>
              </div>

              <div className="flex mb-4.5 flex-col gap-6 lg:flex-row">
                <div
                  className={`w-full ${currentUser?.role !== Role.SuperAdmin ? "" : "lg:w-1/2"}`}
                >
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Parents
                  </label>
                  <Controller
                    name="parentIds"
                    control={control}
                    render={({ field }) => (
                      <AppMultiSelect
                        {...field}
                        placeholder="Select parents"
                        options={userOptionValues}
                      />
                    )}
                  />
                </div>

                {currentUser?.role === Role.SuperAdmin && (
                  <div className="w-full lg:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Community
                    </label>
                    {/* Community */}
                    <Controller
                      name="communityId"
                      control={control}
                      render={({ field }) => (
                        <AppSelect
                          placeholder="Select community"
                          options={communityOptionValues}
                          {...field}
                        />
                      )}
                    />
                  </div>
                )}
              </div>

              <button
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                type="submit"
              >
                Create child
              </button>
            </div>
          </form>
        </div>
      </AppModal>
    </>
  );
};

export default ChildForm;
