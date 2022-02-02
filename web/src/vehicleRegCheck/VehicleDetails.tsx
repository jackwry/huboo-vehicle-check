import { DvlaVehicleInfo } from "./DvlaResponse";

const DisplayField: React.FC<{ name: string; value: string | number }> = (
  props
) => (
  <div className="flex flex-row">
    <div className="basis-1/2 px-2 text-right font-bold">{props.name}</div>
    <div className="basis-1/2 px-2">{props.value}</div>
  </div>
);

const VehicleDetails: React.FC<{ vehicleInfo: DvlaVehicleInfo }> = ({
  vehicleInfo,
}) => {
  const motExpiryDate = vehicleInfo.motTests
    .map((motTest) => motTest.expiryDate)
    .filter((expiryDate) => expiryDate)
    .sort()
    .reverse()[0];

  const failedMotsCount = vehicleInfo.motTests.filter(
    (motTest) => motTest.testResult === "FAILED"
  ).length;

  return (
    <div className="pt-4 space-y-4">
      <DisplayField name="Make" value={vehicleInfo.make} />
      <DisplayField name="Model" value={vehicleInfo.model} />
      <DisplayField name="Colour" value={vehicleInfo.primaryColour} />
      <DisplayField name="MOT expiry date" value={motExpiryDate} />
      <DisplayField name="Failed MOTs" value={failedMotsCount} />
    </div>
  );
};

export default VehicleDetails;
