import axios from "axios";
import { saveData } from "./storageFunctions";
const  serverUrl = import.meta.env.VITE_BASE_URL;

export const fetchData = async (url, params) => {
     try {
          const res = params ?  await axios.post(url, params) : await axios.get(url);
          const info = await res.data;
          if (info.totalAds) {
            saveData('totalAds', info.totalAds, 180000);
          }
          const data = info.data;
          return data;
          
        } catch (error) {
          console.log(error);
          return([]);
        }
}

export const searchData = async (url, params) => {
  try {
    console.log("checking");
    const res = await axios.post(url, params);
    const info = await res.data;
    const {data} = info;
    return data;
  } catch (error) {
    return [];
  }
}

export const registerUser = async (url, params) => {
  try {
    const res = await axios.post(url, params);
    const info = await res.data;
    return info;
  } catch (error) {
    return false;
  }
}

export const updateUser = async(url, params) => {
  try {
     const loginToken = sessionStorage.getItem('loginToken') || null;
    const res = await axios.post(url, params,{
      headers: {
        // 'Content-Type': 'multipart/form-data',
        'Authorization': loginToken
      }
    });
    const info = await res.data;
    return info;
  } catch (error) {
    return false
  }
}

export const searchUser = async (url) => {
  try {
    const loginToken = sessionStorage.getItem('loginToken') || null;
    const res = await axios.get(url, {headers: {
      'Authorization': loginToken
    }});
    const info = await res.data;
    return info;
  } catch (error) {
    return false
  }
}

export const loginUser = async (url, params) => {
  try {
    const res = await axios.post(url, params, {withCredentials: true, credentials: true});
    const info = await res.data;
    return info;
  } catch (error) {
    return false;
  }
}

export const getUserAds = async (url) => {
  try {
    const loginToken = sessionStorage.getItem('loginToken') || null;
    const res = await axios.get(url, {headers: {
      'Authorization': loginToken
    }});
    const info = await res.data;
    return info;
  } catch (error) {
    return false
  }
}

export const addAdvert = async (url, params) => {
  try {
    console.log(params);
    const loginToken = sessionStorage.getItem('loginToken') || null;
    const agentToken = sessionStorage.getItem('agentToken');
    console.log(agentToken);
    const res = await axios.post(url, params, {headers: {
      'Authorization': loginToken || agentToken
    }});
    const info = await res.data;
    return info;
  } catch (error) {
    return false;
  }
}

export const searchAdvert = async(url, params ) => {
  try {
    const res = await axios.post(url, params);
    const info = await res.data;
    return info;
  } catch (error) {
    return false
  }
}
export const logoutUser = async () => {
  try {
    sessionStorage.removeItem('userData');
    sessionStorage.removeItem('loginToken');
    return {status: "success"};
  } catch (error) {
    return false;
  }
}

export const deleteAdvert =async (url,params) => {
  try {
    const loginToken = sessionStorage.getItem('loginToken') || null;
    const res = await axios.post(url, params,{headers: {
      'Authorization': loginToken
    }});
    return res.data;
  } catch (error) {
    return null;
  }
}

export const searchAds = async(url, params) => {
  try {
    const res = await axios.post(url, params);
    const info = res.data;
    if(info.status === "pass"){
      return info.data;
    }else{
      return null;
    }
  } catch (error) {
    return null
  }
}
export const getUrl = (endpoint) => {
      var url = `${serverUrl}/${endpoint}`;
      return url;
}

export const manipulateReview = async (url, params) => {
  const res = await axios.post(url, params);
  return res.data;
}

export const resetPassword = async (url, params) => {
  const res = await axios.post(url, params);
  return res.data;
}

export const postData = async (url, params) => {
  try {
    const res = await axios.post(url, params);
    const info = await res.data;
    return info;
  } catch (error) {
    return [];
  }
}





