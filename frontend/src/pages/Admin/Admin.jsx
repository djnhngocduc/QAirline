import Layout from "./Layout";
import { Routes, Route } from "react-router-dom";
import PostInfo from "./PostManagement";

function Admin() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="post-information" element={<PostInfo />} />
        </Routes>
      </Layout>
    </>
  )
}

export default Admin;