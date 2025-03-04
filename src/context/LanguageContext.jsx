import { createContext, useState, useContext, useEffect } from "react";
import homeEn from "../languages/en/home.json";
import navbarEn from "../languages/en/navbar.json";
import homeDe from "../languages/de/home.json";
import navbarDe from "../languages/de/navbar.json";
import homeTr from "../languages/tr/home.json";
import navbarTr from "../languages/tr/navbar.json";

const translations = {
    en: { home: homeEn, navbar: navbarEn },
    de: { home: homeDe, navbar: navbarDe },
    tr: { home: homeTr, navbar: navbarTr }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) =>
{
    const [language, setLanguage] = useState(localStorage.getItem("language") || "en");

    useEffect(() =>
    {
        localStorage.setItem("language", language);
    }, [language]);

    const t = (category, key) => translations[language][category]?.[key] || key;

    return (
        <LanguageContext.Provider value={{ t, language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () =>
{
    const context = useContext(LanguageContext);
    if (!context)
    {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};
