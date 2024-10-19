import axios from "axios";
import { saveData } from "./storageFunctions";
const  serverUrl = import.meta.env.VITE_BASE_URL;
const serverKey = import.meta.env.VITE_SERVER_KEY;

export const fetchData = async (url, params) => {
     try {
          const res = params ?  await axios.post(url, params, {
            headers: {
              'x-api-key': serverKey
            }
          }) : await axios.get(url, {
            headers: {
              'x-api-key': serverKey
            }
          });
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
    const res = await axios.post(url, params, {
      headers: {
        'x-api-key': serverKey
      }
    });
    const info = await res.data;
    const {data} = info;
    return data;
  } catch (error) {
    return [];
  }
}

export const registerUser = async (url, params) => {
  try {
    const res = await axios.post(url, params, {
      headers: {
        'x-api-key': serverKey
      }
    });
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
        'Authorization': loginToken,
        'x-api-key': serverKey
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
      'Authorization': loginToken,
      'x-api-key': serverKey
    }});
    const info = await res.data;
    return info;
  } catch (error) {
    return false
  }
}

export const loginUser = async (url, params) => {
  try {
    const res = await axios.post(url, params, {
      withCredentials: true, credentials: true,
      headers: {
        'x-api-key': serverKey
      }
    });
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
      'Authorization': loginToken,
      'x-api-key': serverKey
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
      'Authorization': loginToken || agentToken,
      'x-api-key': serverKey
    }});
    const info = await res.data;
    return info;
  } catch (error) {
    return false;
  }
}

export const searchAdvert = async(url, params ) => {
  try {
    const res = await axios.post(url, params, {
      headers: {
        'x-api-key': serverKey
      }
    });
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
      'Authorization': loginToken,
      'x-api-key': serverKey
    }});
    return res.data;
  } catch (error) {
    return null;
  }
}

export const searchAds = async(url, params) => {
  try {
    const res = await axios.post(url, params, {
      headers: {
        'x-api-key': serverKey
      }
    });
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
  const res = await axios.post(url, params, {
    headers: {
      'x-api-key': serverKey
    }
  });
  return res.data;
}

export const resetPassword = async (url, params) => {
  const res = await axios.post(url, params, {
    headers: {
      'x-api-key':serverKey
    }
  });
  return res.data;
}

export const postData = async (url, params) => {
  try {
    const res = await axios.post(url, params, {
      headers: {
        'x-api-key': serverKey
      }
    });
    const info = await res.data;
    return info;
  } catch (error) {
    return [];
  }
}





