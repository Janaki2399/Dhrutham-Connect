import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateUserProfile } from "./userSlice";
import {
  API_STATUS,
  CLOUDINARY_VIDEO_TRANSFORMATION_URL,
} from "../../constants";

export const EditUserProfile = ({ setModal }) => {
  const token = useSelector((state) => state.auth.token);
  const profile = useSelector((state) => state.user.currentUser);
  const updateStatus = useSelector((state) => state.user.profileUpdateStatus);
  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [photoUrl, setPhotoUrl] = useState(profile.photoUrl);
  const [bio, setBio] = useState(profile.bio);
  const [location, setLocation] = useState(profile.location);
  const [websiteLink, setWebsiteLink] = useState(profile.websiteLink);
  const dispatch = useDispatch();

  const saveDetails = () => {
    dispatch(
      updateUserProfile({
        details: { firstName, lastName, photoUrl, bio, location, websiteLink },
        token,
      })
    );
  };

  const uploadImage = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: process.env.REACT_APP_CLOUD_NAME,
        uploadPreset: process.env.REACT_APP_UPLOAD_PRESET,
        cropping: true,
        multiple: false,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          const url = `${CLOUDINARY_VIDEO_TRANSFORMATION_URL}/${result.info.path}`;

          setPhotoUrl(url);
        }
      }
    );
  };

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await saveDetails();
          setModal((prevState) => !prevState);
        }}
        className="center-align-ver-hor padding-all full-width"
      >
        <div className="font-size-3 margin-bottom text-center">
          Edit Profile
        </div>

        <div className="img-margin margin-auto img-size-large relative-position">
          <img
            className="round-img img-size-large "
            src={photoUrl}
            alt="profile-pic"
          ></img>
          <button
            type="button"
            className="absolute-position icon-btn edit-profile-icon cursor-pointer"
            onClick={uploadImage}
          >
            <span class="material-icons-outlined icon-gray">add_a_photo</span>
          </button>
        </div>
        <div class="flex-column">
          <label htmlFor="First Name" className="font-size-6 font-bold-1">
            First Name
          </label>
          <input
            type="text"
            className="text-input"
            value={firstName}
            autoFocus={true}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div class="flex-column">
          <label htmlFor="password" className="font-size-6 font-bold-1">
            Last Name
          </label>
          <input
            type="text"
            className="text-input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div class="flex-column">
          <label htmlFor="password" className="font-size-6 font-bold-1">
            Bio
          </label>
          <textarea
            type="text"
            autoCapitalize="sentences"
            autoComplete="on"
            autoCorrect="on"
            maxLength="160"
            spellCheck="true"
            className="text-area"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <div class="flex-column">
          <label htmlFor="password" className="font-size-6 font-bold-1">
            Location
          </label>
          <input
            type="text"
            className="text-input"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div class="flex-column">
          <label htmlFor="password" className="font-size-6 font-bold-1">
            Website Link
          </label>
          <input
            type="text"
            className="text-input"
            value={websiteLink}
            onChange={(e) => setWebsiteLink(e.target.value)}
          />
        </div>
        {updateStatus === API_STATUS.LOADING ? (
          <div className="loader" />
        ) : (
          <div>
            <button
              type="submit"
              className="btn btn-primary-contained font-size-5 margin-top"
            >
              SAVE
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
