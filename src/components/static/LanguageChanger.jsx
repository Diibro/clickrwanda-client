import { useEffect, useState } from "react";
import Flag_en from "../../assets/flags/britain-f.png";
import Flag_kn from "../../assets/flags/rwanda-f.png";
// import Flag_fr from "../../assets/flags/france-f.png";

import { useTranslation } from "react-i18next";


const LanguageChanger = () => {
     const [activeImage, setActiveImage] = useState(Flag_en);
     const [,i18n] = useTranslation('global');

     const handleLanguageChange = (lang, image) => {
          localStorage.setItem("lang", lang);
          i18n.changeLanguage(lang);
          setActiveImage(image);
          toggleLanguages();
     }

     const toggleLanguages = () => {
          const languagesSelector = document.getElementById("languages-selector");
          if(languagesSelector !== null){
               if(languagesSelector.style.display === "none"){
                    languagesSelector.style.display = "flex"
               }else{
                    languagesSelector.style.display = "none";
               }
          }else{
               toggleLanguages();
          }
     }

     useEffect(() => {
          const lang = localStorage.getItem("lang");
          if(lang) {
               switch(lang){
                    case "en":
                         setActiveImage(Flag_en);
                         break;
                    // case "fr":
                    //      setActiveImage(Flag_fr);
                    //      break;
                    case "kn": 
                         setActiveImage(Flag_kn);
                         break;
                    default:
                         setActiveImage(Flag_en);
               }
               try{
                    i18n.changeLanguage(lang);
               }catch(e){
                    console.log(e);
               }
          }
     }, [])
     return (
     <div className="languageContainer">
          <div className="active">
               <img width={30} src={activeImage} alt="Active language" onClick={toggleLanguages} />
          </div>
          <div className="languages-selector" id="languages-selector">
               <img width={30} src={Flag_en} alt="Britain flag" onClick={() => handleLanguageChange("en", Flag_en)} />
               <img width={30} src={Flag_kn} alt="Rwanda flag" onClick={() => handleLanguageChange("kn", Flag_kn)} />
               {/* <img width={30} src={Flag_fr} alt="France Flag" onClick={() => handleLanguageChange("fr", Flag_fr)} /> */}
          </div>
     </div>
     )
}

export default LanguageChanger