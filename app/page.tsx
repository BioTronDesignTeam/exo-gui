import { BatteryStatus, Header, EmergencyStop, ParameterTuning, MotorControl} from "./components";

export default function Home() {
  return (
    <div>
      <Header />
      <main className="bg-blue-950 h-screen p-8">
        <BatteryStatus />
        <EmergencyStop />
        <ParameterTuning />
        <MotorControl />
      </main>
    </div>
  );
}
