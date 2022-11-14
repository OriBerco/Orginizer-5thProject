const url = "http://localhost:3000/";
import axios from "axios";
import Cookies from "js-cookie";

export async function getUsers() {
  return await axios
    .get(url)
    .then((res) => {
      return res;
    })
    .catch((error) => console.log(error.message));
}

export async function registerUser(newUser, navigate) {
  if (newUser && newUser.email && newUser.password) {
    const users = await getUsers();
    let existingUser = users.data.find((u) => u.email == newUser.email);
    if (existingUser) throw alert("email already registered");
    else {
      axios
        .post(url + "users/register", newUser)
        .then((res) => {
          console.log(res);
          navigate("/login");
        })
        .catch((error) => {
          error.response.data ? alert(error.response.data) : alert(res.data);
        });
    }
  } else throw alert("invalid user data");
}

export async function loginAuthUser(userDetails, navigate) {
  if (userDetails && userDetails.email && userDetails.password) {
    return await axios.post(url + "users/signin", userDetails).then((res) => {
      Cookies.set("jid", res.data, { expires: 0.05 });
      alert("Login Successful");
      navigate(-1);
    });
  } else throw alert("invalid user data");
}

export async function getUserDetails() {
  const token = Cookies.get("jid");

  if (token)
    return await axios
      .get(url + "users/getmydetails", { headers: { Authorization: token } })
      .then((res) => {
        return res.data;
      })
      .catch((error) => console.log(error.message));
  else {
    return axios.get("");
  }
}
export async function updateUserDetails(user) {
  axios
    .put(url + "users/update", user, {
      headers: { Authorization: Cookies.get("jid") },
    })
    .catch((error) => console.log(error.data));
}
export function logout() {
  Cookies.remove("jid");
}
