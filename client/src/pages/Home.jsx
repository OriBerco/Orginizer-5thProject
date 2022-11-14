import { useContext } from "react";
import { UserContext } from "../components/userContext";

export default function Home() {
  const { user } = useContext(UserContext);

  function greet() {
    return user ? (
      <>
        <h1>
          Welcome{" "}
          {user.name.firstName.charAt(0).toUpperCase() +
            user.name.firstName.slice(1)}
        </h1>
        <p>Thank you for staying orginized!</p>
      </>
    ) : (
      <>
        <h1>Welcome to Orginizer</h1>

        <p>Your day to day helper to staying orginized!</p>
        <p>Just register or log in and start orginizing! </p>
      </>
    );
  }

  return <>{greet()}</>;
}
