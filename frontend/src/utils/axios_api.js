import axios from "axios";
import { endpoints } from "./api_endpoints";

const API_URL = "http://localhost:4000/api/v1";

export const API = axios.create({
  baseURL: API_URL,
  responseType: "json",
});



export const apiRequest = async ({ url, token, data, method }) => {

  try {
    const response = await API(url, {
      method: method,
      data: data,
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      }
    })

    return response?.data; 
  } catch (error) {
    const err = error.response.data;
    console.log(error)
    return {
      status: err.success, message: err.message
    }
  }
}


export const updateURL = ({
  pageNum, 
  query,
  cmpLoc,
  sort,
  navigate, 
  jType,
  exp,
}) => {
  const params = new URLSearchParams();

  if (pageNum && pageNum > 1) {
    params.set("page", pageNum);
  }
  if (query) {
    params.set("search", query);
  }
  if (cmpLoc) {
    params.set("location", cmpLoc);
  }
  if (sort) {
    params.set("sort", sort);
  }
  if (jType) {
    params.set("jType", jType);
  }
  if (exp) {
    params.set("exp", exp);
  }

  const newURL = `${location.pathname}?${params.toString()}`;
  navigate(newURL, { replace: true });

  return newURL;
}



export const handleFileUpload = async (uploadFile) => {
  
}
