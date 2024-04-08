import AppDatePicker from "@/components/FormElements/DatePicker/DatePicker";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import FormItemError from "@/components/FormElements/FormItemError";
import CreateUserIcon from "@/components/Icons/create-user";
import AppModal from "@/components/Modal";
import { IUser } from "@/interfaces/IUser";
import { IUserPayload } from "@/interfaces/IUserPayload";
import { useAppDispatch } from "@/lib/hooks";
import React, { useEffect, useState } from "react";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { IChildPayload } from "../../../interfaces/IChildPayload";
import { Nivo } from "@/enums/nivo";
import TrashCanIcon from "@/components/Icons/trash-can.icon";
import AppSelect from "@/components/FormElements/Select";
import { subYears } from "date-fns";
import { createUserAsync } from "@/lib/features/users/usersSlice";

const initialChild: IChildPayload = {
  first_name: "",
  last_name: "",
  birthdate: "",
  nivo: Nivo.First,
};

const UserForm: React.FC = () => {
  const dispatch = useAppDispatch();

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

  const onSubmit = (data: IUserPayload) => {
    console.log("SUBMIT USER DATA =>", data);
    dispatch(createUserAsync(data));
  };

  useEffect(() => {
    if (open) {
      reset({});
    }
  }, [open, reset]);

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
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
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
                    Email
                  </label>
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    placeholder="Enter parent email address"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.email && (
                    <FormItemError>Email is required.</FormItemError>
                  )}
                </div>

                <div className="w-full lg:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Phone
                  </label>
                  <input
                    {...register("phone", { required: true })}
                    placeholder="Enter parent phone number"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.phone && (
                    <FormItemError>Phone is required.</FormItemError>
                  )}
                </div>
              </div>

              <div className="mb-4.5 w-full lg:w-1/2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Birthdate
                </label>
                <Controller
                  name="birthdate"
                  control={control}
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

              <section className="mb-4.5">
                <h1 className="mb-4.5">New children</h1>

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
                              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                First name
                              </label>
                              <input
                                {...register(
                                  `newChildren.${index}.first_name` as const,
                                  { required: true }
                                )}
                                placeholder="Enter child first name"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              />
                              {errors?.newChildren?.[index]?.first_name && (
                                <FormItemError>
                                  First name is required.
                                </FormItemError>
                              )}
                            </div>
                            <div className="w-full lg:w-1/2">
                              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
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
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
                              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
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
                              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
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
