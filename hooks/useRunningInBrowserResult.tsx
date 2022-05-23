import { useEffect, useState } from "react";

type UseRunningInBrowserResult = {
  runningInBrowser: boolean;
};

export const useRunningInBrowser = (): UseRunningInBrowserResult => {
  const [runningInBrowser, setIsRunningBrowser] = useState(false);

  useEffect(() => {
    setIsRunningBrowser(typeof window !== "undefined");
  }, []);

  return { runningInBrowser };
};
