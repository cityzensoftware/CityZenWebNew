import { Box } from "@mui/material";
import Head from "next/head";
import HeaderContent from "./Header/HeaderContent";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href={"/favicon.ico"} />
        <link rel="alternate" href="https://cityzen.ro/" hrefLang="ro" />{" "}
        <link rel="alternate" href="https://cityzen.com/" hrefLang="en" />{" "}
        <link rel="alternate" href="https://cityzen.ro/" hrefLang="x-default" />{" "}
      </Head>
      <HeaderContent />
      <Box>{children}</Box>
    </>
  );
};

export default Layout;
