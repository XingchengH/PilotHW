import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

export default function Error() {
  const error = useRouteError();

  let errorMessage = "Something went wrong.";
  if (isRouteErrorResponse(error)) {
    errorMessage = `${error.status} - ${error.statusText}`;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <>
    <MainNavigation />
    <div className="container mt-5 text-center">
      <div className="alert alert-danger" role="alert">
        <h1 className="alert-heading">Oops! An error occurred.</h1>
        <p>{errorMessage}</p>
      </div>
    </div>
    </>
  );
}
