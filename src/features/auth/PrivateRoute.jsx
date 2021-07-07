import { useSelector } from "react-redux";
import { Route } from "react-router";
import { Navigate } from "react-router-dom";

export function PrivateRoute({ path, element }) {
  const token = useSelector((state) => state.auth.token);

  return token ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate state={{ from: path }} to="/login" />
  );
}
