import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <Head>
      <link rel="shortcut icon" href={"/favicon.ico"} />
      <link rel="alternate" href="https://cityzen.ro/" hrefLang="ro" />{" "}
      <link rel="alternate" href="https://cityzen.com/" hrefLang="en" />{" "}
      <link rel="alternate" href="https://cityzen.ro/" hrefLang="x-default" />{" "}
    </Head>
  );
};

export default Layout;
