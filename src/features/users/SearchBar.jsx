import { useDispatch } from "react-redux";
import { fetchUserListOnSearch } from "./userSlice";
import { useSelector } from "react-redux";
export const SearchBar = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const handleSearch = (e) => {
    console.log(e.target.value);
    dispatch(fetchUserListOnSearch({ searchQuery: e.target.value, token }));
  };
  return (
    <div className="gray-color input-wrapper">
      <div>
        <input
          type="text"
          className="search-input font-size-4"
          placeholder="Search users"
          onKeyDown={handleSearch}
        />
      </div>

      <div className="icon-btn">
        <span
          className={"material-icons-outlined icon-color-gray icon-size-24"}
        >
          search
        </span>
      </div>
    </div>
  );
};
