export const ProfileImage = () => {
  return (
    <div className="d-flex flex-column align-items-center profImage">
      <div className="profileImageContainer shadow-lg border rounded-circle">
        <img id="userProfileImage" className="h-100 w-100" src={"/me.jpg"} />
        <div className="uploadImage hover-icon shadow-lg d-flex align-items-center justify-content-center">
          <img className="h-75 w-75" src={"/upload-image-icon.png"} />
        </div>
      </div>
    </div>
  );
};
