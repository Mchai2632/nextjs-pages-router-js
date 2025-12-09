import React, { useState } from "react";
import Button from "../../ui/Button/Button";
import { useFormContext } from "@/context/FormContext";
import useLoading from "@/hooks/useLoading";
import { useTourContext } from "@/context/TourContext";

export default function Summary({ nextStep, backStep }) {
  const { formData } = useFormContext();
  const { countryList } = useTourContext();
  const { show, hide } = useLoading();
  const [checkboxIsTick, setCheckboxIsTick] = useState(false);
  console.log(formData);
  console.log(formData.step2);
  console.log(checkboxIsTick);

  const booking = formData.step2.data;

  const convertCountryLabel = (c) => {
    return countryList.find((item) => c == item.id).name;
  };

  // 分組 passengers by roomNo
  const roomGroups = booking.passengerList.reduce((acc, p) => {
    acc[p.roomNo] = acc[p.roomNo] || [];
    acc[p.roomNo].push(p);
    return acc;
  }, {});

  const next = async () => {
    // send customer detail to backend

    try {
      const res = await fetch("/api/sendcustomerdetails", {
        method: "POST",
        body: JSON.stringify(booking),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const rJson = await res.json();

      hide();
      console.log(rJson);
      if (rJson.error) alert(rJson.error);
      if (rJson.successful) nextStep();
    } catch (error) {
      console.error(error);
      hide();
    }
  };
  return (
    <div className="space-y-6 p-6">
      {/* Booking Info */}
      <Section title="Booking Information">
        <Grid>
          <Field label="Full Name" value={`${booking.salutationCd} ${booking.givenName} ${booking.surname}`} />
          <Field label="Nickname" value={booking.nickName} />
          <Field label="Gender" value={booking.sexCd} />
          <Field label="NRIC" value={booking.nric} />
          <Field label="Date of Birth" value={booking.dob} />
          <Field label="Contact No" value={booking.contactNo} />
          <Field label="Email" value={booking.email} />
          <Field label="Address" value={`${booking.addressLine1}, ${booking.addressLine2}, ${booking.postcode} ${booking.city}, ${booking.state}`} />
        </Grid>
      </Section>

      {/* Emergency Contact */}
      <Section title="Emergency Contact">
        <Grid>
          <Field label="Name" value={`${booking.ecGivenName} ${booking.ecSurname}`} />
          <Field label="Relationship" value={booking.ecRelationship} />
          <Field label="Contact No" value={booking.ecContacts} />
          <Field label="Email" value={booking.ecEmail} />
        </Grid>
      </Section>

      {/* Passengers */}
      <Section title="Passenger Details">
        <div className="space-y-6">
          {Object.entries(roomGroups).map(([roomNo, passengers]) => (
            <div key={roomNo} className="border rounded-xl p-4 bg-gray-50">
              <h5 className="font-semibold text-lg mb-3">Room {roomNo}</h5>

              <div className="grid md:grid-cols-2 gap-4">
                {passengers.map((p, i) => (
                  <div key={i} className="border rounded-lg p-4 bg-white shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <h6 className="font-semibold">
                        {p.salutationCd} {p.givenName} {p.surname}
                      </h6>

                      {p.isBillingPerson && <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">Billing Person</span>}
                    </div>

                    <Grid>
                      <Field label="Nickname" value={p.nickName} />
                      <Field label="Gender" value={p.sexCd} />
                      <Field label="NRIC" value={p.icNo} />
                      <Field label="Date of Birth" value={p.dob} />
                      <Field label="Passport No" value={p.passportNo} />
                      <Field label="Expiry" value={p.dtExpiry} />
                      <Field label="Country" value={convertCountryLabel(p.idCountry)} />
                      <Field label="Remarks" value={p.remarks || "-"} />
                    </Grid>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <label htmlFor="checkbox-summary-1">
        <input id="checkbox-summary-1" type="checkbox" value={checkboxIsTick} onChange={(e) => setCheckboxIsTick((prev) => !prev)} />
        Kindly check to ensure all details are accurate before continuing, click the <strong>{`'BACK'`}</strong> button below to amend.
      </label>
      <div className="flex justify-end">
        <Button onClick={backStep}>Back</Button>
        <Button disabled={!checkboxIsTick} onClick={next}>
          Next
        </Button>
      </div>
    </div>
  );
}

// ------- Reusable Components -------
function Section({ title, children }) {
  return (
    <div className="bg-white shadow-md rounded-xl ">
      <h4 className=" font-bold  border-b py-2 px-5 bg-gray-200 rounded-t-xl">{title}</h4>

      <div className="p-4">{children}</div>
    </div>
  );
}

function Grid({ children }) {
  return <div className="grid md:grid-cols-2 gap-4">{children}</div>;
}

function Field({ label, value }) {
  return (
    <div>
      <div className="text-sm text-gray-500">{label}</div>
      <div className="font-medium">{value || "-"}</div>
    </div>
  );
}
