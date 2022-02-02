import Header from "./Header";
import VehicleRegCheck from "./vehicleRegCheck/VehicleRegCheck";

const App: React.FC = () => (
  <>
    <Header />

    <div className="container mx-auto px-4">
      <VehicleRegCheck></VehicleRegCheck>
    </div>
  </>
);

export default App;
