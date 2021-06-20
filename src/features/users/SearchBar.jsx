import { useDispatch } from "react-redux";
import { fetchUserListOnSearch } from "./userSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { UsersListDropDown } from "./UsersListDropDown";

const APIStatus = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

export const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState([]);
  const [status, setStatus] = useState(APIStatus.IDLE);
  const [searchValue, setSearchValue] = useState("");
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
      setStatus(APIStatus.LOADING);
      const { data, status } = await axios.get(
        `https://dhrutham-connect-backend.janaki23.repl.co/users/search/query?name=${searchQuery}`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      //   console.log(response);
      if (status === 200) {
        setStatus(APIStatus.ERROR);
        setSearchResults(data.result);
      }
    } catch (error) {
      setStatus(APIStatus.ERROR);
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
        <div className="icon-btn">
          <span
            className={
              "material-icons-outlined icon-color-gray icon-size-24 cursor-pointer"
            }
          >
            search
          </span>
        </div>
        <div>
          <input
            type="text"
            className="search-input font-size-4"
            // value={searchValue}
            placeholder="Search users"
            onKeyDown={betterFunction}
          />
        </div>

        <div className="icon-btn">
          {isDropDownOpen && (
            <span
              className={
                "material-icons-outlined icon-color-gray icon-size-24 cursor-pointer"
              }
              onClick={() => {
                setDropDownOpen(false);
                setSearchValue("");
              }}
            >
              close
            </span>
          )}
        </div>
      </div>
      {isDropDownOpen && (
        <UsersListDropDown searchResults={searchResults} status={status} />
      )}
    </div>
  );
};
