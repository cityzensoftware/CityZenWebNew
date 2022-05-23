import React, { FunctionComponent, useState } from "react";
import { useRunningInBrowser } from "../hooks/useRunningInBrowserResult";
import { ro } from "../translations/ro";
import { TranslationKey } from "../translations/TranslationKey";

export const CurrentLanguageContext =
  React.createContext<CurrentLanguageContextModel>({
    currentLanguage: "ro",
    translations: ro,
    setCurrentLanguage: () => {},
  });

type Props = {
  initialCurrentLanguage: string;
  children: React.ReactNode;
  translations: Record<TranslationKey, string>;
};
export const LanguageContextProvider: FunctionComponent<Props> = ({
  children,
  initialCurrentLanguage,
  translations,
}) => {
  const { runningInBrowser } = useRunningInBrowser();
  const [currentLanguage, setCurrentLanguage] = useState<string>(
    initialCurrentLanguage
  );
  if (runningInBrowser) {
    localStorage.setItem("language", initialCurrentLanguage);
  }
  const value: CurrentLanguageContextModel = {
    currentLanguage,
    setCurrentLanguage,
    translations,
  };

  return (
    <CurrentLanguageContext.Provider value={value}>
      {children}
    </CurrentLanguageContext.Provider>
  );
};
// const getLanguageWithGuard = (currentLanguage: string) => {
//   if(!currentLanguage){
//     throw new Error('Language is not defined');
//   }
//   return currentLanguage;
// }

type CurrentLanguageContextModel = {
  currentLanguage: string | undefined;
  translations: Record<TranslationKey, string>;
  setCurrentLanguage: React.Dispatch<React.SetStateAction<string>>;
};
