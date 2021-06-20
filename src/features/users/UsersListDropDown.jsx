import { Navigate, useNavigate } from "react-router";

export const UsersListDropDown = ({ searchResults, status }) => {
  const navigate = useNavigate();

  if (status === "loading" || status === "idle") {
    return (
      <div className="autocomplete">
        <div className="loader" />
      </div>
    );
  }
  if (searchResults.length === 0 || status === "success") {
    return <div className="autocomplete">No users found</div>;
  }
  return (
    <div className="autocomplete">
      {searchResults.length > 0 &&
        searchResults.map((item) => {
          return (
            <div
              className="border-bottom gray-border autocomplete-item cursor-pointer"
              onClick={() => navigate(`/users/${item.userName}`)}
            >
              <div className="flex-horizontal margint-top padding-all">
                <div>
                  <img
                    className="round-img img-size-xs img-margin"
                    src={item.photoUrl}
                    alt="profile-pic"
                  />
                </div>

                <div>
                  <div className="font-bold-1">
                    {item.firstName} {item.lastName}
                  </div>
                  <div className="font-size-5 ">@{item.userName}</div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
