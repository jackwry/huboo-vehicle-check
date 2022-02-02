import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { DvlaVehicleInfo } from "./DvlaResponse";

interface VehicleCheckFormValues {
  vehicleReg: string;
}

const ukRegistrationRegex =
  /^(?=.{1,7})(([a-zA-Z]?){1,3}(\d){1,3}([a-zA-Z]?){1,3})$/;

const sanitiseRegistration = (registration: string): string =>
  registration.trim().replace(" ", "");

const validateRegistration = (value?: string): string | undefined => {
  if (!value || value === "") return "Please enter a vehicle registration";

  const sanitisedValue = sanitiseRegistration(value);
  if (!sanitisedValue.match(ukRegistrationRegex))
    return "Please enter a valid UK registration";
};

const RegInput: React.FC<{
  setVehicleInfo: (vehicleInfo: DvlaVehicleInfo | undefined) => void;
}> = (props) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");

  const onSubmit = async (values: VehicleCheckFormValues): Promise<void> => {
    props.setVehicleInfo(undefined);
    const sanitisedVehicleReg = values.vehicleReg.replace(" ", "");

    let response: AxiosResponse<DvlaVehicleInfo[]>;
    try {
      response = await axios.get<DvlaVehicleInfo[]>(
        `http://localhost:9000/vehicle-check?registration=${sanitisedVehicleReg}`
      );
    } catch (err) {
      const error = err as AxiosError<DvlaVehicleInfo[]>;
      if (!error.response) {
        setErrorMessage("Unknown error: No response returned from server.");
        return;
      }
      response = error.response;
    }

    if (response.status === 200) {
      setErrorMessage(undefined);

      props.setVehicleInfo(response.data[0]);
    } else if (response.status === 404) {
      setErrorMessage(
        "Registration not found. Please enter a valid registration."
      );
    } else {
      setErrorMessage(
        "An error occurred. Please try again or contact the Huboo support team."
      );
    }
  };

  const initialValues: VehicleCheckFormValues = {
    vehicleReg: "",
  };

  return (
    <div className="space-y-4">
      <div className="text-lg text-center">
        Enter vehicle registration to search DVLA database for vehicle details.
      </div>

      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting, isValid }) => (
          <Form className="space-y-2 ">
            <div>
              <Field
                type="string"
                name="vehicleReg"
                placeholder="eg. ZZ99 ABC"
                validate={validateRegistration}
                className="border-2 rounded w-full p-1 text-center"
              />
              <ErrorMessage
                name="vehicleReg"
                component="div"
                className="text-sm text-red-500 text-center"
              />
            </div>

            {errorMessage && (
              <div className="text-lg text-red-500 font-bold text-center">
                {errorMessage}
              </div>
            )}

            <div className="flex flex-row-reverse">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`border-2 rounded p-2 w-1/3 md:w-1/6 bg-emerald-300 text-white ${
                  !isValid && "border-red"
                }`}
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegInput;
