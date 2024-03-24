import { BACKEND_URL } from "@/contants";
import axios from "axios";

function getAvatar(username:string) {
  try {
    axios
      .get(`${BACKEND_URL}/user?username=casper`)
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
