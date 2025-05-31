import axios from "axios";

//file or methods import
import { base_url, endpoints } from "./api_endpoints.js";


//user auth//

//signup//
export const _userSignup = async function (user) {
  const api_endpoint = `${base_url}${endpoints.userSignup}`;
  try {
    const response = await axios.post(api_endpoint, user);
      return response.data; // return a json with user
  } catch (err) {
    // console.log(err.response.data.message);
    console.log(err.message)
  }
};
// test signup
// const newUser ={username: "uniquename12", firstName: "Faysel", lastName: "Rajo", email:"unique12@gmail.com", password: "122345"}
// _userSignup(newUser).then(data => console.log(data))

//signup//
export const _userLogin = async function (credential) {
  const api_endpoint = `${base_url}${endpoints.userLogin}`;
  try {
    const response = await axios.post(api_endpoint, credential);
      return response.data; 
  } catch (err) {
    // console.log(err.response.data.message);
    console.log(err.message)
  }
};
// const credential ={email:"anika@gmail.com", password: "anika1234"}
// _userLogin(credential).then(data => console.log(data))
