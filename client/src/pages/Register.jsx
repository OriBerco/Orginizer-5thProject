import { useRef } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../service/manageUsers";

export default function Register() {
  const Navigate = useNavigate();
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const password = useRef();
  function addUser(event) {
    event.preventDefault();
    const firstNameValue = firstName.current.value;
    const lastNameValue = lastName.current.value;
    const emailValue = email.current.value;
    const passwordValue = password.current.value;

    const newUser = {
      name: {
        firstName:
          firstNameValue.charAt(0).toUpperCase() + firstNameValue.slice(1),
        lastName:
          lastNameValue.charAt(0).toUpperCase() + lastNameValue.slice(1),
      },
      email: emailValue,
      password: passwordValue,
      isAdmin: false,
    };
    registerUser(newUser, Navigate);
  }
  return (
    <div className="centerContent">
      <form onSubmit={(event) => addUser(event)} id="registerArea">
        <h2>Register</h2>
        <label htmlFor="firstName">First Name:</label>
        <br />

        <input type="text" id="firstName" name="firstName" ref={firstName} />
        <br />
        <label htmlFor="lastName">Last Name:</label>
        <br />

        <input type="text" id="lastName" name="lastName" ref={lastName} />
        <br />
        <label htmlFor="email">Email:</label>
        <br />
        <input type="email" name="email" id="email" ref={email} />
        <br />
        <label htmlFor="password">Password:</label>
        <br />
        <input type="password" name="password" id="password" ref={password} />
        <br />
        <br />
        <div>
          <Button type="submit">Register</Button>
        </div>
      </form>
    </div>
  );
}
