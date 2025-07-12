import { useEffect, useState } from "react";

const GoogleTranslate = () => {
  const [currentLang, setCurrentLang] = useState("EN");

  useEffect(() => {
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,fr,rw",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    // Load script
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);
    }

    // Restore saved language
    const savedLang = localStorage.getItem("selected_language");
    if (savedLang) {
      setTimeout(() => {
        const select = document.querySelector(".goog-te-combo");
        if (select) {
          select.value = savedLang;
          select.dispatchEvent(new Event("change"));
        }
        updateLangLabel(savedLang);
      }, 1000);
    }
  }, []);

  useEffect(() => {
    const updateLangFromSelect = () => {
      const select = document.querySelector(".goog-te-combo");
      if (select) {
        const code = select.value;
        localStorage.setItem("selected_language", code);
        updateLangLabel(code);
      }
    };

    const observer = new MutationObserver(() => {
      const select = document.querySelector(".goog-te-combo");
      if (select) {
        select.addEventListener("change", updateLangFromSelect);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  const updateLangLabel = (code) => {
    const map = { en: "EN", fr: "FR", rw: "RW" };
    setCurrentLang(map[code] || "EN");
  };

  return (
    <div className="z-50 flex items-center gap-2">
      {/* Your own label for the selected language */}
      <span className="text-sm font-medium">{currentLang}</span>

      {/* Google Translate dropdown - hidden */}
      <div id="google_translate_element" style={{ display: "none" }}></div>
    </div>
  );
};

export default GoogleTranslate;

