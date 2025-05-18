import Booking from "./Booking";
import FlightTab from "./FlightTab/FlightTab";
function Home() {
  return (
    <>
      <div className="relative">
        <Booking />

        <div className="relative z-20 -mt-24">
          <FlightTab />
        </div>
      </div>
    </>
  )
}

export default Home;