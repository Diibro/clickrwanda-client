import axios from "axios";
const  serverUrl = import.meta.env.VITE_BASE_URL;

export const fetchData = async (url) => {
     try {
          const res = await axios.get(url)
          const info = await res.data;
          const data = info.data;
          return data;
          
        } catch (error) {
          console.log(error);
          return([]);
        }
}

export const searchData = async (url, params) => {
  try {
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
        'Content-Type': 'multipart/form-data',
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
    const loginToken = sessionStorage.getItem('loginToken') || null;
    const res = await axios.post(url, params, {headers: {
      'Authorization': loginToken
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
    console.log(res);
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
export const getUrl = (endpoint) => {
      var url = `${serverUrl}/${endpoint}`;
      return url;
}



