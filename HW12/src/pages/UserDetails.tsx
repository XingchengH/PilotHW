import { useParams } from "react-router-dom";

export default function UserDetails() {
  const { userId } = useParams();

  return (
    <>
      <h1>User Details</h1>
    </>
  );
}
