import { useDispatch } from "react-redux";
import { fetchUserListOnSearch } from "./userSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { UsersListDropDown } from "./UsersListDropDown";

export const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState([]);
  const [isDropDownOpen, setDropDownOpen] = useState(false);

  useEffect(() => {});
  function debounce(func, delay) {
    let timer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(context, args), delay);
    };
  }

  async function fetchUserListOnSearch({ searchQuery, token }) {
    try {
      const response = await axios.get(
        `https://dhrutham-connect-backend.janaki23.repl.co/users/search/query?name=${searchQuery}`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      //   console.log(response);
      setSearchResults(response.data.result);
    } catch (error) {
      console.log(error);
    }
  }
  const token = useSelector((state) => state.auth.token);

  const handleSearch = (e) => {
    setDropDownOpen(true);
    fetchUserListOnSearch({ searchQuery: e.target.value, token });
  };
  let betterFunction = debounce(handleSearch, 300);

  return (
    <div className="relative-position">
      <div className="gray-color input-wrapper">
        <div>
          <input
            type="text"
            className="search-input font-size-4"
            placeholder="Search users"
            onKeyDown={betterFunction}
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
      {isDropDownOpen && <UsersListDropDown searchResults={searchResults} />}
    </div>
  );
};
