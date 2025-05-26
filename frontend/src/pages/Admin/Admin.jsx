import Layout from "./Layout";
import { Routes, Route } from "react-router-dom";
import PostInfo from "./PostManagement";
import AddAirplanes from "./AirplaneManagement";
import AddFlights from "./FlightManagement";
import Statistics from "./Statistics";

function Admin() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="manage-posts" element={<PostInfo />} />
          <Route path="manage-airplanes" element={<AddAirplanes />} />
          <Route path="manage-flights" element={<AddFlights />} />
          <Route path="statistics" element={<Statistics />} />
        </Routes>
      </Layout>
    </>
  )
}

export default Admin;