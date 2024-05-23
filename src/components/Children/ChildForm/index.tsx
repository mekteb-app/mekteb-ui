import AppDatePicker from "@/components/FormElements/DatePicker/DatePicker";
import FormItemError from "@/components/FormElements/FormItemError";
import AppModal from "@/components/Modal";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { IChildPayload } from "../../../interfaces/IChildPayload";
import AppSelect from "@/components/FormElements/Select";
import { subYears } from "date-fns";
import {
  createChildAsync,
  selectChildrenStatus,
  updateChildAsync,
} from "@/lib/features/children/childrenSlice";
import useCommunity from "@/hooks/useCommunity";
import AppMultiSelect from "@/components/FormElements/MultiSelect/index";
import useUsers from "@/hooks/useUsers";
import { selectCurrentUser } from "@/lib/features/currentUser/currentUserSlice";
import { Role } from "@/enums/role";
import { IChild } from "@/interfaces/IChild";
import { nivoOptions } from "@/constants";

const initialChild: IChildPayload = {
  first_name: "",
  last_name: "",
  birthdate: "",
  nivo: undefined,
  parentIds: [],
  communityId: undefined,
  social_security_number: "",
};
interface ChildFormProps {
  open: boolean;
  onClose: () => void;
  child?: IChild;
}

const ChildForm: React.FC<ChildFormProps> = ({ open, onClose, child }) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectChildrenStatus);
  const currentUser = useAppSelector(selectCurrentUser);
  const { options: communityOptions, getCommunityOptions } = useCommunity();
  const { userOptions, getUserOptions } = useUsers();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
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
    if (child?.id) {
      dispatch(updateChildAsync({ id: child.id, data }));
    } else {
      dispatch(createChildAsync(data));
    }
  };

  useEffect(() => {
    if (open) {
      reset({});

      if (!communityOptions.length) {
        getCommunityOptions();
      }

      if (!userOptions?.length) {
        getUserOptions();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, reset]);

  useEffect(() => {
    if (status === "created" || status === "updated") {
      onClose();
    }
  }, [onClose, status]);

  useEffect(() => {
    if (child && child?.id) {
      setValue("first_name", child.first_name);
      setValue("last_name", child.last_name);
      setValue("birthdate", child.birthdate);
      setValue("social_security_number", child.social_security_number);
      setValue("nivo", child.nivo);
      setValue("communityId", child.community?.id);
      setValue("parentIds", (child?.parents || []).map((p) => p.id) || []);
    }
  }, [setValue, child, child?.id]);

  return (
    <>
      <AppModal
        title={child?.id ? "Update child" : "Create child"}
        open={open}
        onClose={() => {
          reset();
          onClose();
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
                    rules={{ required: true }}
                    render={({ field }) => (
                      <AppDatePicker
                        {...field}
                        maxDate={subYears(new Date(), 5)}
                        minDate={subYears(new Date(), 18)}
                        value={
                          getValues()?.birthdate
                            ? new Date(getValues()?.birthdate)
                            : undefined
                        }
                      />
                    )}
                  />
                  {errors.birthdate && (
                    <FormItemError>Birthdate is required.</FormItemError>
                  )}
                </div>

                <div className="w-full lg:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black ">
                    Social security number
                  </label>
                  <input
                    {...register("social_security_number", {
                      required: true,
                      pattern: {
                        value: /^[0-9]{8}-[0-9]{4}$/, // Regular expression for a valid social security number format
                        message:
                          "Enter a valid social security number (e.g., 12345678-1234)", // Error message if validation fails
                      },
                    })}
                    placeholder="Enter social security number"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input  dark:focus:border-primary"
                  />
                  {errors?.social_security_number && (
                    <FormItemError>
                      {errors?.social_security_number?.message ||
                        "Social security is required"}
                    </FormItemError>
                  )}
                </div>
              </div>
              <div className="flex mb-4.5 flex-col gap-6 lg:flex-row">
                <div className="w-full lg:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Nivo
                  </label>
                  <Controller
                    name="nivo"
                    control={control}
                    render={({ field }) => (
                      <AppSelect
                        {...field}
                        placeholder="Select nivo"
                        options={nivoOptions}
                        formatValue={(val) => +val}
                        value={nivoOptions.find(
                          (nivo) => nivo.value === getValues()?.nivo
                        )}
                      />
                    )}
                    rules={{ required: true }}
                  />
                  {errors?.nivo && (
                    <FormItemError>Nivo is required.</FormItemError>
                  )}
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
                      rules={{ required: true }}
                      render={({ field }) => (
                        <AppSelect
                          {...field}
                          placeholder="Select community"
                          options={communityOptionValues}
                          value={communityOptionValues.find(
                            ({ value }) => getValues()?.communityId === value
                          )}
                        />
                      )}
                    />
                    {errors?.communityId && (
                      <FormItemError>Community is required.</FormItemError>
                    )}
                  </div>
                )}
              </div>

              <div className="flex mb-4.5 flex-col gap-6 lg:flex-row">
                <div className="w-full">
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
                        value={userOptionValues.filter((option) =>
                          (getValues()?.parentIds ?? []).includes(option.value)
                        )}
                      />
                    )}
                  />
                </div>
              </div>

              <button
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                type="submit"
              >
                {child?.id ? "Update child" : "Create child"}
              </button>
            </div>
          </form>
        </div>
      </AppModal>
    </>
  );
};

export default ChildForm;
