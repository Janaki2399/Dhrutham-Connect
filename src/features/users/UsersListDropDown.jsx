import { useNavigate } from "react-router";

export const UsersListDropDown = ({ searchResults, status, closeDropDown }) => {
  const navigate = useNavigate();

  if (status === "loading") {
    return (
      <div className="autocomplete flex-column">
        <div className="loader margin-auto" />
      </div>
    );
  }
  if (status === "idle") {
    return (
      <div className="autocomplete flex-column">
        <div className="margin-auto font-size-4 text-gray">
          Search results will come here
        </div>
      </div>
    );
  }

  if (searchResults.length === 0 || status === "success") {
    return (
      <div className="autocomplete flex-column">
        <div className="margin-auto font-size-4 text-gray">No users found</div>
      </div>
    );
  }
  return (
    <div className="autocomplete">
      {searchResults.length > 0 &&
        searchResults.map((item) => {
          return (
            <div
              className="border-bottom gray-border autocomplete-item cursor-pointer"
              onClick={() => {
                closeDropDown();
                navigate(`/users/${item.userName}`);
              }}
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
