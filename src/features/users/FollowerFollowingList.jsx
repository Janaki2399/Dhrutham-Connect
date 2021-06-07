import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
export const FollowerFollowingList = () => {
  const location = useLocation();
  const token = useSelector((state) => state.auth.token);
  const [list, setList] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const { data, status } = await axios.get(
          `https://dhrutham-connect-backend.janaki23.repl.co${location.pathname}`,
          {
            headers: {
              authorization: token,
            },
          }
        );
        console.log(data);
        if (status === 200) {
          setList(data.list);
        }
      } catch (error) {
        alert(error);
      }
    })();
  }, [location.pathname]);

  return (
    <div className="margin-top">
      {list.map((item) => {
        return <div>{item.userName}</div>;
      })}
    </div>
  );
};
