import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateUserProfile } from "./userSlice";
export const EditUserProfile = () => {
  const token = useSelector((state) => state.auth.token);
  const profile = useSelector((state) => state.user.userProfile);
  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [bio, setBio] = useState(profile.bio);
  const [location, setLocation] = useState(profile.location);
  const [websiteLink, setWebsiteLink] = useState(profile.websiteLink);
  const dispatch = useDispatch();
  const saveDetails = () => {
    dispatch(
      updateUserProfile({
        details: { firstName, lastName, bio, location, websiteLink },
        token,
      })
    );
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveDetails();
        }}
        className="center-align-ver-hor padding-all"
        style={{ width: "100%" }}
      >
        <div className="font-size-3 margin-bottom text-center">
          Edit Profile
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
            // className="text-input"
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
        <div>
          <button
            type="submit"
            className="btn btn-primary-contained font-size-5"
          >
            SAVE
          </button>
        </div>
      </form>
    </div>
  );
};
