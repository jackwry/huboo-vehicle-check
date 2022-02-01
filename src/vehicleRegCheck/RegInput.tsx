import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import axios from "axios";

interface VehicleCheckFormValues {
  vehicleReg: string;
}

const RegInput: React.FC = () => {
  const [vehicleDetails, setVehicleDetails] = useState<any | undefined>(
    undefined
  );

  const onSubmit = async (values: VehicleCheckFormValues): Promise<void> => {
    const sanitisedVehicleReg = values.vehicleReg.replace(" ", "");

    const response = await axios.get(
      `https://beta.check-mot.service.gov.uk/trade/vehicles/mot-tests?registration=${sanitisedVehicleReg}`,
      {
        headers: {
          "x-api-key": "HybH0yr4Hj3eEgybT9pkn6B7PA769YDa8kt4wKdp",
          Accept: "application/json+v6",
        },
      }
    );

    if (response.status !== 200) {
      console.error("Error making request");
      //return;
    }

    console.log(response.data);
    setVehicleDetails(response);
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
                validate={(value?: string): string | undefined => {
                  console.log("validating reg");
                  if (!value || value === "")
                    return "Please enter a vehicle registration";
                }}
                className="border-2 rounded w-full p-1"
              />
              <ErrorMessage
                name="vehicleReg"
                component="div"
                className="text-sm text-red"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`float-right border-2 rounded p-2 w-1/3 md:w-1/6 ${
                  !isValid && "border-red"
                }`}
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <div>{vehicleDetails}</div>
    </div>
  );
};

export default RegInput;
