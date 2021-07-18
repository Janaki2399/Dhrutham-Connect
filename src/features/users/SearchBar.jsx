import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useCallback, useState } from "react";
import axios from "axios";
import { UsersListDropDown } from "./UsersListDropDown";
import { API_URL } from "../../constants";
import { API_STATUS } from "../../constants";

const APIStatus = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

export const SearchBar = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [status, setStatus] = useState(APIStatus.IDLE);
  const [searchValue, setSearchValue] = useState("");

  const [isDropDownOpen, setDropDownOpen] = useState(false);
  const token = useSelector((state) => state.auth.token);

  const debounce = useCallback(function (func, delay) {
    let timer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(context, args), delay);
      // timer = setTimeout(() => func(e), delay);
    };
  }, []);

  async function fetchUserListOnSearch({ searchQuery, token }) {
    try {
      setStatus(APIStatus.LOADING);
      const { data, status } = await axios.get(
        `${API_URL}/users/search/query?name=${searchQuery}`,
        {
          headers: {
            authorization: token,
          },
        }
      );

      if (status === 200) {
        setStatus(APIStatus.ERROR);
        setSearchResults(data.result);
      }
    } catch (error) {
      setStatus(APIStatus.ERROR);
      console.log(error);
    }
  }

  const handleSearch = (e) => {
    fetchUserListOnSearch({ searchQuery: e.target.value, token });
  };

  const openDropDown = () => {
    setDropDownOpen(true);
  };

  const closeDropDown = () => {
    setDropDownOpen(false);
    setSearchValue("");
    setStatus(API_STATUS.IDLE);
  };
  const debouncedFunction = useCallback(debounce(handleSearch, 300), []);

  return (
    <div className="relative-position">
      <div className="gray-color input-wrapper">
        <div className="icon-btn">
          <span
            className={
              "material-icons-outlined icon-color-gray icon-size-18 cursor-pointer"
            }
          >
            search
          </span>
        </div>
        <div>
          <input
            type="text"
            className="search-input font-size-4 "
            value={searchValue}
            onFocus={openDropDown}
            placeholder="Search users"
            onChange={(e) => {
              setSearchValue(e.target.value);
              debouncedFunction(e);
            }}
          />
        </div>

        <div className="icon-btn">
          {isDropDownOpen && (
            <span
              className={
                "material-icons-outlined icon-color-gray icon-size-24 cursor-pointer"
              }
              onClick={closeDropDown}
            >
              close
            </span>
          )}
        </div>
      </div>
      {isDropDownOpen && (
        <UsersListDropDown
          searchResults={searchResults}
          status={status}
          closeDropDown={closeDropDown}
        />
      )}
    </div>
  );
};
