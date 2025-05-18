import Booking from "./Booking";
import { FlightDeals } from "./FlightDeals";
import FlightTab from "./FlightTab/FlightTab";
import StartPlanning from "./StartPlanning";
import SuggestionHome from "./SuggestionHome";

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
      <FlightDeals />
      <SuggestionHome />
    </>
  )
}

export default Home;