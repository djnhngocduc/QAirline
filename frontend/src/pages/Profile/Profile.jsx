import HeaderProfile from "./HeaderProfile";
import SidebarProfile from "./SidebarProfile";

function Profile() {
  return (
    <div className="h-full min-h-px overflow-x-hidden">
      <HeaderProfile />
      <div className="md: flex flex-col justify-center overflow-hidden pt-9 md:flex-row">
        <SidebarProfile />
      </div>
    </div>
  )
}

export default Profile;