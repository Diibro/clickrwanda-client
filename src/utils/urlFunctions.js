import { charAdder, charRemover, dashRemover, dashReplacer } from "./otherFunctions";

export const getItemUrl = (name, id) => {
     const newName = dashReplacer(name.split("/").join(' '));
     if(id && id.length) return charAdder([newName, id], '?=');
     else return newName
}

export const getSearchUrl = (searched) => {
     var name = searched.search || null;
     var preurl = "";
     if(name) preurl = charAdder([searched.category, searched.location, dashReplacer(name)],'=?');
     else preurl = charAdder([searched.category, searched.location],'=?');
     return preurl;
}

export const getSearchParams = (url) =>{
     const preurl = charRemover(url, "?=")[1];
     const arr = charRemover(preurl, '=?');
     const obj = {
          category: arr[0],
          location: arr[1],
          search: arr[2] ? dashRemover(arr[2]) : null
     }
     return obj;
}
export const getItemUrlId = (url) => {
     const names = charRemover(url, '?=');
     return names[1];
}

export const getItemUrlName = (url) => {
     const names = charRemover(url, '?=');
     const name = names[1];
     return dashRemover(name);
}

export const getItemUrlToken = (url) => {
     const names = charRemover(url, '?=');
     const name = names[1];
     return name;
}

export const fetchIds = (location) => {
     const searchId = location.search;
     const idArr = searchId.split("?=");
     let v_id = idArr[1];
     let r_id = idArr[2];
     if(v_id && r_id){
          return {v_id, r_id};
     }else if(v_id){
          if(v_id.startsWith('agent_')){
               return {v_id: null, r_id: v_id};
          }else{
               return {v_id, r_id: null};
          }
     }else{
          return {v_id: null, r_id: null};
     }
}