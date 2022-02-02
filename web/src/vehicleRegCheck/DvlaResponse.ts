interface Comment {
  text: string;
  type: string;
  dangerous: boolean;
}

interface MotInfo {
  completedData: string;
  testResult: "PASSED" | "FAILED";
  expiryDate: string;
  odometerValue: string;
  odometerUnit: string;
  motTestNumber: string;
  odometerResultType: string;
  rfrAndComments: Comment[];
}

export interface DvlaVehicleInfo {
  registration: string;
  make: string;
  model: string;
  firstUsedDate: string;
  fuelType: string;
  primaryColour: string;
  vehicleId: string;
  registrationDate: string;
  manufactureDate: string;
  engineSize: string;
  motTests: MotInfo[];
}
