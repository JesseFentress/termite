import { useAuth } from "../../auth/AuthContext";
import { Overlay } from "../../components/Overlay";
import { ProfileImage } from "./components/ProfileImage";
import { ProfileInformationPanel } from "./components/ProfileInformationPanel";
import { ProfileName } from "./components/ProfileName";
import "./profilepage.css";

export const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <Overlay title={"Profile"}>
      <div className="d-flex flex-column align-items-center h-50">
        <ProfileImage />
        <ProfileName name={user.firstName + " " + user.lastName} />
        <ProfileInformationPanel labelText={"Email"} text={user.email || ""} />
        <ProfileInformationPanel
          labelText={"Password"}
          text={"password123"}
          isPassword={true}
        />
        <ProfileInformationPanel
          labelText={"Role"}
          text={user.role || ""}
          isRole={true}
        />
      </div>
    </Overlay>
  );
};
