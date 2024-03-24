import axios from "axios";

function getAvatar(username:string) {
  try {
    axios
      .get("http://localhost:10000/user?username=" + username)
      .then((res) => {
        return res.data[0].avatar;
      })
      .catch((e) => {
        console.log(e);
        return e;
      })
      
  } catch (e) {
    console.log(e);
    return e;
  }
}
export default getAvatar;
