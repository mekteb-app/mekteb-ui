import AppDatePicker from "@/components/FormElements/DatePicker/DatePicker";
import FormItemError from "@/components/FormElements/FormItemError";
import CreateUserIcon from "@/components/Icons/create-user";
import AppModal from "@/components/Modal";
import { IUserPayload } from "@/interfaces/IUserPayload";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useEffect, useMemo, useState } from "react";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { IChildPayload } from "../../../interfaces/IChildPayload";
import { Nivo } from "@/enums/nivo";
import TrashCanIcon from "@/components/Icons/trash-can.icon";
import AppSelect from "@/components/FormElements/Select";
import { subYears } from "date-fns";
import { createUserAsync, selectStatus } from "@/lib/features/users/usersSlice";
import useChildren from "@/hooks/useChildren";
import AppMultiSelect from "@/components/FormElements/MultiSelect/index";
import { selectCurrentUser } from "@/lib/features/currentUser/currentUserSlice";
import useCommunity from "@/hooks/useCommunity";
import { Role } from "@/enums/role";

const initialChild: IChildPayload = {
  first_name: "",
  last_name: "",
  birthdate: "",
  nivo: Nivo.First,
};

const UserForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);

  const { childrenOptions, getChildrenOptions } = useChildren();
  const currentUser = useAppSelector(selectCurrentUser);
  const { options: communityOptions, getCommunityOptions } = useCommunity();

  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm<IUserPayload>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      birthdate: "",
      newChildren: [],
    },
    mode: "onTouched",
  });

  const { fields, append, remove } = useFieldArray({
    name: "newChildren",
    control,
  });

  const childrenOptionValues = useMemo(
    () =>
      childrenOptions.map(({ id, first_name, last_name }) => ({
        value: id,
        label: `${first_name} ${last_name}`,
      })),
    [childrenOptions]
  );

  const communityOptionValues = useMemo(
    () =>
      communityOptions.map(({ id, name }) => ({
        value: id,
        label: name,
      })),
    [communityOptions]
  );

  const onSubmit = (data: IUserPayload) => {
    dispatch(createUserAsync(data));
  };

  useEffect(() => {
    if (open) {
      reset({});

      if (!childrenOptions.length) {
        getChildrenOptions();
      }

      if (!communityOptions.length) {
        getCommunityOptions();
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
        <div className="ml-1 hidden lg:block">Create user</div>
      </button>
      <AppModal
        title="Create user"
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
              <div className="mb-4.5 flex flex-col gap-6 lg:flex-row">
                <div className="w-full lg:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black ">
                    First name
                  </label>
                  <input
                    {...register("first_name", { required: true })}
                    placeholder="Enter parent first name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input  dark:focus:border-primary"
                  />
                  {errors.first_name && (
                    <FormItemError>First name is required.</FormItemError>
                  )}
                </div>
                <div className="w-full lg:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black ">
                    Last name
                  </label>
                  <input
                    {...register("last_name", { required: true })}
                    placeholder="Enter parent last name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input  dark:focus:border-primary"
                  />
                  {errors.last_name && (
                    <FormItemError>Last name is required.</FormItemError>
                  )}
                </div>
              </div>
              <div className="flex mb-4.5 flex-col gap-6 lg:flex-row">
                <div className="w-full lg:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black ">
                    Email
                  </label>
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    placeholder="Enter parent email address"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input  dark:focus:border-primary"
                  />
                  {errors.email && (
                    <FormItemError>Email is required.</FormItemError>
                  )}
                </div>

                <div className="w-full lg:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black ">
                    Phone
                  </label>
                  <input
                    {...register("phone", { required: true })}
                    placeholder="Enter parent phone number"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input  dark:focus:border-primary"
                  />
                  {errors.phone && (
                    <FormItemError>Phone is required.</FormItemError>
                  )}
                </div>
              </div>

              <div className="flex mb-4.5 flex-col gap-6 lg:flex-row">
                <div className="w-full lg:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black ">
                    Birthdate
                  </label>
                  <Controller
                    name="birthdate"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <AppDatePicker
                        {...field}
                        maxDate={subYears(new Date(), 18)}
                      />
                    )}
                  />
                  {errors.birthdate && (
                    <FormItemError>Birthdate is required.</FormItemError>
                  )}
                </div>

                <div className="w-full lg:w-1/2">
                  {currentUser?.role === Role.SuperAdmin && (
                    <>
                      <label className="mb-3 block text-sm font-medium text-black ">
                        Community
                      </label>
                      {/* Community */}
                      <Controller
                        name="communityId"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <AppSelect
                            placeholder="Select community"
                            options={communityOptionValues}
                            {...field}
                          />
                        )}
                      />
                      {errors.communityId && (
                        <FormItemError>Community is required.</FormItemError>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="flex mb-4.5 flex-col gap-6 lg:flex-row">
                <div className="w-full lg:w-1/2">
                  {currentUser?.role === Role.SuperAdmin && (
                    <>
                      <label className="mb-3 block text-sm font-medium text-black ">
                        Role
                      </label>
                      {/* Community */}
                      <Controller
                        name="role"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <AppSelect
                            placeholder="Select role"
                            options={[
                              { value: Role.SuperAdmin, label: "Super admin" },
                              { value: Role.Admin, label: "Admin" },
                              { value: Role.User, label: "User" },
                            ]}
                            formatValue={(val) => +val}
                            {...field}
                          />
                        )}
                      />
                      {errors.communityId && (
                        <FormItemError>Community is required.</FormItemError>
                      )}
                    </>
                  )}
                </div>

                <div className="w-full lg:w-1/2" />
              </div>

              <div className="flex mb-4.5 flex-col gap-6 lg:flex-row">
                <div className="w-full">
                  <label className="mb-3 block text-sm font-medium text-black ">
                    Assign children
                  </label>
                  <Controller
                    name="childrenIds"
                    control={control}
                    render={({ field }) => (
                      <AppMultiSelect
                        {...field}
                        placeholder="Select existing children"
                        options={childrenOptionValues}
                      />
                    )}
                  />
                </div>
              </div>

              {/* New children */}
              <section className="mb-4.5">
                <label className="mb-4.5 block text-sm font-medium text-black ">
                  New children
                </label>

                <div className="border border-stroke border-primary p-3">
                  {fields.length ? (
                    fields.map((field, index) => (
                      <div
                        key={field.id}
                        className={`${index > 0 ? "border-t border-stroke pt-4" : ""}`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3>Child {index + 1} </h3>
                          <button
                            className="rounded-md border border-black px-3 py-1 text-center font-medium text-black hover:bg-opacity-90 lg:px-3 xl:px-4"
                            type="button"
                            onClick={() => remove(index)}
                          >
                            <TrashCanIcon />
                          </button>
                        </div>
                        <div className="px-2">
                          <div className="mb-4.5 flex flex-col gap-6 lg:flex-row">
                            <div className="w-full lg:w-1/2">
                              <label className="mb-3 block text-sm font-medium text-black ">
                                First name
                              </label>
                              <input
                                {...register(
                                  `newChildren.${index}.first_name` as const,
                                  { required: true }
                                )}
                                placeholder="Enter child first name"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input  dark:focus:border-primary"
                              />
                              {errors?.newChildren?.[index]?.first_name && (
                                <FormItemError>
                                  First name is required.
                                </FormItemError>
                              )}
                            </div>
                            <div className="w-full lg:w-1/2">
                              <label className="mb-3 block text-sm font-medium text-black ">
                                Last name
                              </label>
                              <input
                                {...register(
                                  `newChildren.${index}.last_name` as const,
                                  {
                                    required: true,
                                  }
                                )}
                                placeholder="Enter child last name"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input  dark:focus:border-primary"
                              />
                              {errors?.newChildren?.[index]?.last_name && (
                                <FormItemError>
                                  Last name is required.
                                </FormItemError>
                              )}
                            </div>
                          </div>

                          <div className="flex mb-4.5 flex-col gap-6 lg:flex-row">
                            <div className="w-full lg:w-1/2">
                              <label className="mb-3 block text-sm font-medium text-black ">
                                Birthdate
                              </label>
                              <Controller
                                name={`newChildren.${index}.birthdate`}
                                control={control}
                                render={({ field }) => (
                                  <AppDatePicker {...field} />
                                )}
                                rules={{ required: true }}
                              />
                              {errors.newChildren?.[index]?.birthdate && (
                                <FormItemError>
                                  Birthdate is required.
                                </FormItemError>
                              )}
                            </div>
                            <div className="w-full lg:w-1/2">
                              <label className="mb-3 block text-sm font-medium text-black ">
                                Nivo
                              </label>
                              <Controller
                                name={`newChildren.${index}.nivo`}
                                control={control}
                                render={({ field }) => (
                                  <AppSelect
                                    options={[
                                      { value: Nivo.First, label: "First" },
                                      { value: Nivo.Second, label: "Second" },
                                      { value: Nivo.Third, label: "Third" },
                                      { value: Nivo.Fourth, label: "Fourth" },
                                      { value: Nivo.Fifth, label: "Fifth" },
                                    ]}
                                    {...field}
                                  />
                                )}
                                rules={{ required: true }}
                              />
                              {errors.newChildren?.[index]?.nivo && (
                                <FormItemError>Nivo is required.</FormItemError>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No children added.</p>
                  )}

                  <div
                    className={`text-center mt-4 ${fields.length ? "border-t border-stroke" : ""}`}
                  >
                    <button
                      type="button"
                      className={`rounded-md border border-black px-3 py-1 text-center font-medium text-black hover:bg-opacity-90 lg:px-3 xl:px-4 ${fields.length ? "mt-4" : ""}`}
                      onClick={() =>
                        trigger("newChildren").then(
                          (valid) => valid && append(initialChild)
                        )
                      }
                    >
                      Add new child
                    </button>
                  </div>
                </div>
              </section>

              <button
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                type="submit"
              >
                Create user
              </button>
            </div>
          </form>
        </div>
      </AppModal>
    </>
  );
};

export default UserForm;
