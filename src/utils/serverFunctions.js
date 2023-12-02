import axios from "axios";
const  serverUrl = import.meta.env.VITE_BASE_URL;

export const fetchData = async (url) => {
     try {
          const res = await axios.get(url)
          const info = await res.data;
          const data = info.data;
          return data;
        } catch (error) {
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
export const getUrl = (endpoint) => {
      var url = `${serverUrl}/${endpoint}`;
      return url;
}

