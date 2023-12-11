export default function authHeader() {
  let header_obj = {
    "Content-Type": "application/x-www-form-urlencoded",
  };
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user?.access_token) {
    header_obj["Authorization"] = "Bearer " + user?.access_token;
    return header_obj;
  } else {
    return header_obj;
  }
}
