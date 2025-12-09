import React, { useEffect } from "react";
import Button from "../../ui/Button/Button";
import { useFormContext } from "@/context/FormContext";
import { useTourContext } from "@/context/TourContext";
import { Controller, useForm } from "react-hook-form";
import { Checkbox, DatePicker, Input, InputGroup, Radio, Select } from "@/components/ui/form";

const SexCdList = [
  { value: "M", label: "MALE" },
  { value: "F", label: "FEMALE" },
];

export default function Traveller({ nextStep, backStep }) {
  const { globalData, toyyibConfig, tourDepDetail, countryList, stateList, titleList, ecRelationshipList, bookingSummaryData } = useTourContext();
  const { formData, setFormData } = useFormContext();

  console.log(bookingSummaryData);
  const { afterDiscount } = bookingSummaryData;

  console.log(globalData);

  const countryListOptionsConverted = countryList.map((c) => ({
    label: c.name,
    value: c.id.toString(),
  }));
  console.log(countryListOptionsConverted);

  const stateListOptionsConverted = stateList.map((c) => ({
    label: c.name,
    value: c.name,
  }));
  const titleListOptionsConverted = titleList.map((c) => ({
    label: c.code,
    value: c.code,
  }));
  const ecRelationshipListOptionsConverted = ecRelationshipList.map((c) => ({
    label: c.description,
    value: c.code,
  }));

  // console.log(toyyibConfig);

  const getPreviousData = () => {
    if (formData.step2) return formData.step2.storePrevious;

    return { passengerList: [] };
  };

  const previousData = getPreviousData();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...previousData,
      // passengerList: [], // 初始空陣列，不然 RHF 不知道結構
    },
  });

  const rooms = formData.step1.rooms;
  // console.log(rooms);
  // passengerList initial
  useEffect(() => {
    if (previousData.passengerList.length > 0) return;

    const list = [];
    rooms.forEach((room) => {
      for (let i = 0; i < room.totalPeople; i++) {
        list.push({
          roomNo: room.room_index,
          givenName: "",
          surname: "",
          nickName: "",
          sexCd: "",
          salutationCd: "",
          icNo: "",
          dob: "",
          passportNo: "",
          dtExpiry: "",
          idCountry: "",
          remarks: "",
          isBillingPerson: false, // ⭐ 初始為 false
          tourCd: tourDepDetail.code,
        });
      }
    });

    setValue("passengerList", list);
    // console.log(list);
    console.log(watch("passengerList"));
  }, [rooms, setValue]);

  const passengers = watch("passengerList") || [];
  console.log(passengers);

  const formValues = getValues();
  console.log(formValues);

  const next = (data) => {
    // Convert data to match backend required
    const splitDOB = data.dob.split("-");

    const convertedDOB = splitDOB[0].substring(1, 3) + splitDOB[1] + splitDOB[2];

    const storeBody = {
      idBooking: globalData.bookingData.idBooking,
      ...data,
      dob: convertedDOB,
      paymentInfo: {
        idIpayConfig: toyyibConfig.toyyibpayConfigList[0].id,
        email: data.email,
        paymentAmt: afterDiscount,
        adminChargesPercentage: toyyibConfig.toyyibpayConfigList[0].adminChargesPercentage,
        adminCharges: toyyibConfig.toyyibpayConfigList[0].adminChargesPercentage,
        totalPaymentAmt: afterDiscount,
      },
    };

    console.log(storeBody);

    const formData = { f_name: "Traveller", data: storeBody, storePrevious: data };

    // add idBooking to data

    setFormData((prev) => ({ ...prev, step2: formData }));
    nextStep();
  };

  console.log(toyyibConfig);

  // for demo use
  function generatePassengerList(rooms) {
    let index = 0;
    const list = [];

    rooms.forEach((room) => {
      for (let i = 0; i < room.totalPeople; i++) {
        const randometitleList = titleListOptionsConverted[Math.floor(Math.random() * titleListOptionsConverted.length)];
        const titleValue = randometitleList.value;
        const randomecountryList = countryListOptionsConverted[Math.floor(Math.random() * countryListOptionsConverted.length)];
        const countryValue = randomecountryList.value;

        list.push({
          roomNo: room.room_index,
          salutationCd: titleValue,
          surname: `SURNAME_${index}`,
          givenName: `NAME_${index}`,
          nickName: `NICKNAME_${index}`,
          sexCd: i % 2 === 0 ? "M" : "F",
          icNo: `900101-01-${String(1000 + index)}`,
          dob: "1990-01-01",
          passportNo: `A${100000 + index}`,
          dtExpiry: "2030-01-01",
          idCountry: countryValue,
          remarks: "",
          // 第一位當 billingPerson，其餘 false
          isBillingPerson: room.room_index == 1 && i === 0,
          tourCd: tourDepDetail.code,
        });
        index++;
      }
    });

    return list;
  }

  // for demo use
  const fillUpForms = () => {
    const passengers = generatePassengerList(rooms);

    const randomestateList = stateListOptionsConverted[Math.floor(Math.random() * stateListOptionsConverted.length)];
    const stateValue = randomestateList.value;
    const randomecRelationship = ecRelationshipListOptionsConverted[Math.floor(Math.random() * ecRelationshipListOptionsConverted.length)];
    const ecRelationshipValue = randomecRelationship.value;

    const autoFillData = {
      givenName: "CHAI KIM FEI",
      surname: "CHAI",
      nickName: "MC",
      salutationCd: "MR",
      sexCd: "M",
      nric: "990919-01-1234",
      dob: "1999-09-19",
      contactNo: "0123456789",
      email: "mc@gmail.com",
      addressLine1: "123 Jalan ABC",
      addressLine2: "Taman DEF",
      postcode: "43000",
      city: "Cheras",
      state: stateValue,
      idCountry: "32",

      ecSurname: "LEE",
      ecGivenName: "KAI",
      ecContacts: "0124578913",
      ecEmail: "lee.kai@gmail.com",
      ecRelationship: ecRelationshipValue,

      passengerList: passengers,
    };

    reset(autoFillData);
  };

  const handleBillingPersonChange = (index) => {
    const passengers = getValues("passengerList") || [];
    const updated = passengers.map((p, i) => ({
      ...p,
      isBillingPerson: i === index, // ⭐ 只有這個 index 是 true
    }));

    console.log(updated);

    setValue("passengerList", updated, { shouldValidate: true });
  };

  return (
    <div>
      {process.env.NEXT_PUBLIC_NODE_ENV == "development" && (
        <button className="bg-primary text-on-primary px-4 py-2" onClick={fillUpForms}>
          Fill up Forms
        </button>
      )}
      {/* BILLING INFORMATION */}

      <form className="traveller-booking-forms" onSubmit={handleSubmit(next)}>
        <div>
          <h3>BILLING INFORMATION</h3>
          <hr />
          <InputGroup cols={{ md: 4 }}>
            <Select
              name="salutationCd"
              label="Salutation"
              control={control}
              rules={{ required: "Please select billing person salutation." }}
              options={titleListOptionsConverted}
              isSearchable={false}
            />
            <Input
              label="Given Name"
              placeholder=""
              error={errors.givenName?.message}
              {...register("givenName", { required: "Given Name is Required" })}
              required
            />
            <Input label="Surname" placeholder="" error={errors.surname?.message} {...register("surname", { required: "Surname is Required" })} required />
            <Input label="Nickname" placeholder="" {...register("nickName")} />
          </InputGroup>

          <InputGroup cols={{ md: 3 }}>
            <Select
              name="sexCd"
              label="Gender"
              control={control}
              rules={{ required: "Please select billing person gender." }}
              options={SexCdList}
              isSearchable={false}
            />

            <Input
              label="IC No."
              placeholder="000000-00-0000"
              error={errors.nric?.message}
              {...register("nric", { required: "IC No. is Required" })}
              required
            />
            <DatePicker label="Date of Birth" error={errors.dob?.message} {...register("dob", { required: "Date of Birth is Required" })} required />
          </InputGroup>

          <InputGroup cols={{ md: 2 }}>
            <Input
              label="Contact No.(Mobile)"
              error={errors.contactNo?.message}
              {...register("contactNo", { required: "Contact No.(Mobile) is Required" })}
              required
            />
            <Input
              label="Email Address"
              placeholder="test@email"
              error={errors.email?.message}
              {...register("email", { required: "Email Address is Required" })}
              required
            />
          </InputGroup>
          <InputGroup cols={{ md: 3 }}>
            <Input
              label="Address Line 1"
              error={errors.addressLine1?.message}
              {...register("addressLine1", { required: "Address Line 1 is Required" })}
              required
            />
            <Input label="Address Line 2" {...register("addressLine2")} />
            <Input label="Postcode" error={errors.postcode?.message} {...register("postcode", { required: "Postcode is Required" })} required />
          </InputGroup>

          <InputGroup cols={{ md: 3 }}>
            <Select
              name="state"
              label="State"
              control={control}
              rules={{ required: "Please select a state." }}
              options={stateListOptionsConverted}
              isSearchable={false}
            />
            <Input label="City" error={errors.city?.message} {...register("city", { required: "City is Required" })} required />
            <Select
              name="idCountry"
              label="Country/Region"
              control={control}
              rules={{ required: "Please select a Country/Region." }}
              options={countryListOptionsConverted}
            />
          </InputGroup>
        </div>

        <div>
          <h3>EMERGENCY CONTACT</h3>
          <hr />
          <InputGroup cols={{ md: 2 }}>
            <Input label="Surname" error={errors.ecSurname?.message} {...register("ecSurname", { required: "ecSurname is Required" })} required />
            <Input label="Given Name" error={errors.ecGivenName?.message} {...register("ecGivenName", { required: "ecGivenName is Required" })} required />
          </InputGroup>
          <InputGroup cols={{ md: 3 }}>
            <Input label="Email Address" error={errors.ecEmail?.message} {...register("ecEmail", { required: "ecEmail is Required" })} required />
            <Input
              label="Contact No.(Mobile)"
              error={errors.ecContacts?.message}
              {...register("ecContacts", { required: "ecContacts is Required" })}
              required
            />
            <Select
              name="ecRelationship"
              label="Relationship"
              control={control}
              rules={{ required: "Please select a Relationship" }}
              options={ecRelationshipListOptionsConverted}
            />
          </InputGroup>
        </div>

        <div>
          <h3>PASSENGER DETAILS</h3>
          <hr />
          {passengers.map((p, index) => (
            <div key={index} className="p-2 border-b border-gray-300">
              <span className="text-primary font-bold text-lg my-5 inline-block">
                Room {p.roomNo} - Traveller {index + 1}
              </span>
              <InputGroup cols={{ md: 4 }}>
                <Select
                  name={`passengerList[${index}].salutationCd`}
                  label="Salutation"
                  control={control}
                  rules={{ required: `Please select traveller ${index + 1}'s salutation.` }}
                  options={titleListOptionsConverted}
                  isSearchable={false}
                />
                <Input
                  label="Given Name"
                  error={errors.passengerList?.[index]?.givenName?.message}
                  {...register(`passengerList[${index}].givenName`, { required: "Given Name is Required" })}
                  required
                />
                <Input
                  label="Surname"
                  error={errors.passengerList?.[index]?.surname?.message}
                  {...register(`passengerList[${index}].surname`, { required: "Surname is Required" })}
                  required
                />
                <Input
                  label="Nickname"
                  error={errors.passengerList?.[index]?.nickName?.message}
                  {...register(`passengerList[${index}].nickName`, { required: "Nickname is Required" })}
                />
              </InputGroup>
              <InputGroup cols={{ md: 3 }}>
                <Select
                  name={`passengerList[${index}].sexCd`}
                  label="Gender"
                  control={control}
                  rules={{ required: `Please select traveller ${index + 1} gender.` }}
                  options={SexCdList}
                  isSearchable={false}
                />
                <Input
                  label="IC No."
                  error={errors.passengerList?.[index]?.icNo?.message}
                  {...register(`passengerList[${index}].icNo`, { required: "IC No. is Required" })}
                  required
                />
                <DatePicker
                  label="Date of Birth"
                  error={errors.passengerList?.[index]?.dob?.message}
                  {...register(`passengerList[${index}].dob`, { required: "Date of Birth is Required" })}
                  required
                />
              </InputGroup>
              <InputGroup cols={{ md: 3 }}>
                <Input
                  label="Passport No."
                  error={errors.passengerList?.[index]?.passportNo?.message}
                  {...register(`passengerList[${index}].passportNo`, { required: "Passport No. is Required" })}
                  required
                />
                <Input
                  label="Passport Date Expiry"
                  error={errors.passengerList?.[index]?.dtExpiry?.message}
                  {...register(`passengerList[${index}].dtExpiry`, { required: "Passport Date Expiry is Required" })}
                  required
                />
                <Select
                  name={`passengerList[${index}].idCountry`}
                  label="Country/Region"
                  control={control}
                  rules={{ required: "Please select a Country/Region." }}
                  options={countryListOptionsConverted}
                />
              </InputGroup>
              <Input label="Remarks" {...register(`passengerList[${index}].remarks`)} />
              <label>
                <input type="checkbox" checked={watch(`passengerList.${index}.isBillingPerson`)} onChange={() => handleBillingPersonChange(index)} />
                Billing Person
              </label>
            </div>
          ))}
        </div>

        <div className="mt-4 w-full flex justify-end">
          {/* {(process.env.NEXT_PUBLIC_NODE_ENV = "development" && <Button onClick={backStep}>Back</Button>)} */}
          <Button type="submit">Next</Button>
        </div>
      </form>
    </div>
  );
}
