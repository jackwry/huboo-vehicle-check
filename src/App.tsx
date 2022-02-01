import Header from "./Header";
import RegInput from "./vehicleRegCheck/RegInput";

const App: React.FC = () => (
  <>
    <Header />

    <div className="container mx-auto px-4">
      <RegInput></RegInput>
    </div>
  </>
);

export default App;
