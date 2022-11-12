import { LogOutButton } from "../components/LogOutButton";
import { useContext } from "react";
import { UserContext } from "../components/userContext";

export default function UserZone() {
  const { user, setUser } = useContext(UserContext);

  return (
    <>
      <h1>Hello {user.name.firstName}</h1>
      <LogOutButton />
    </>
  );
}
