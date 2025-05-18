import Booking from "./Booking";
import FlightTab from "./FlightTab/FlightTab";
import StartPlanning from "./StartPlanning";

function Home() {
  return (
    <>
      <div className="relative">
        <Booking />

        <div className="relative z-20 -mt-24">
          <FlightTab />
        </div>
      </div>

      <StartPlanning />
    </>
  )
}

export default Home;