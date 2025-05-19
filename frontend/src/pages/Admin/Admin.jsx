import Layout from "./Layout";
import { Routes, Route } from "react-router-dom";
import PostInfo from "./PostManagement";
import AddAirplanes from "./AddAirplanes";

function Admin() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="post-information" element={<PostInfo />} />
          <Route path="add-airplanes" element={<AddAirplanes />} />
        </Routes>
      </Layout>
    </>
  )
}

export default Admin;