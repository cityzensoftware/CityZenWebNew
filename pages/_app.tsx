import "../styles/globals.css";
import type { AppProps } from "next/app";
import { LanguageContextProvider } from "../contexts/TranslationContext";
import domainsDictionary from "../utils/domainsDictionary";
import { EmotionCache } from "@emotion/react";
import { FC, useEffect, useState } from "react";
import createEmotionCache from "../utils/createEmotionCache";
import { useRunningInBrowser } from "../hooks/useRunningInBrowserResult";
import { TranslationKey } from "../translations/TranslationKey";

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp: FC<MyAppProps> = (props) => {
  const clientSideEmotionCache = createEmotionCache();
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const { runningInBrowser } = useRunningInBrowser();
  const [translations, setTranslations] = useState<
    Record<TranslationKey, string>
  >({} as Record<TranslationKey, string>);

  const { user, host } = pageProps;
  const language = domainsDictionary[host] ? domainsDictionary[host] : "ro";
  if (runningInBrowser) {
    localStorage.removeItem("language");
  }

  useEffect(() => {
    const getAndSetTranslations = async () => {
      const languageTranslations: Record<TranslationKey, string> = (
        await import("/translations/" + language)
      )[language];
      setTranslations(languageTranslations);
    };
    getAndSetTranslations();
  }, [language]);

  return (
    <LanguageContextProvider
      initialCurrentLanguage={language}
      translations={translations}
    >
      <Component {...pageProps} />
    </LanguageContextProvider>
  );
};

export default MyApp;
