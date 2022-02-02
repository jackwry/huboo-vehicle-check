import { useState } from "react";
import { DvlaVehicleInfo } from "./DvlaResponse";
import RegInput from "./RegInput";
import VehicleDetails from "./VehicleDetails";

const VehicleRegCheck: React.FC = () => {
  const [vehicleInfo, setVehicleInfo] = useState<DvlaVehicleInfo | undefined>();

  return (
    <div className="space-y-4">
      <RegInput setVehicleInfo={setVehicleInfo} />

      {vehicleInfo && <VehicleDetails vehicleInfo={vehicleInfo} />}
    </div>
  );
};

export default VehicleRegCheck;
