import { Route, Redirect, useLocation } from "react-router-dom";

function PublicRoute(props) {
  const location = useLocation();
  const isLogedIn = !!localStorage.getItem("token");

  console.log("Public route", location);

  if (!isLogedIn) {
    return <Route {...props} />;
  }

  return (
    <Redirect
      to={{
        pathname: "/movies",
        state: { initialRoute: location }
      }}
    />
  );
}

export default PublicRoute;