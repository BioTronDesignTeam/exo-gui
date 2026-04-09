import { BatteryStatus, Header, MotorStatus, MCUStatus, MotorInputs} from "./components";

export default function Home() {
  return (
    <div className="bg-sky-200 min-h-screen p-4 items-center gap-6">
      {/* Header */}
      <Header />

      {/* Main Layout */}
      <main className="bg-sky-200 h-screen p-8 flex flex-wrap gap-2">
          <BatteryStatus/>
          <MCUStatus/>
          <MotorStatus
            title="Left Hip Motor Status"
          />
          <MotorStatus
            title="Right Hip Motor Status"
          />
          <MotorInputs title="Left Hip Motor Inputs" />
          <MotorInputs title="Right Hip Motor Inputs" />
      </main>
    </div>
  );
}