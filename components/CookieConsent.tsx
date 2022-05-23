import { Box, Typography, Link } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import React, { useContext, useEffect, useState } from "react";
import { FC } from "react";
import CookieConsent, { Cookies } from "react-cookie-consent";
import { CurrentLanguageContext } from "../contexts/TranslationContext";
import { colors } from "../styles/colors";
import { fonts } from "../styles/fonts";
import { TranslationKey } from "../translations/TranslationKey";

const CookiesConsent: FC<CookieProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { translations } = useContext(CurrentLanguageContext);

  useEffect(() => {
    const getData = async () => {
      if (!Cookies.get("CookieConsent")) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    };

    getData();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Backdrop sx={{ color: "#fff", zIndex: 10 }} open={open}></Backdrop>
      <Box>
        <CookieConsent
          location="bottom"
          buttonText="Accept"
          // cookieName="myAwesomeCookieName2"
          style={{
            zIndex: 10,
            background: colors.white,
            display: "flex",
            alignItems: "center",
          }}
          buttonStyle={{
            background: colors.actionButtonHoverColor,
            color: colors.white,
            fontSize: "20px",
          }}
          expires={150}
          onAccept={() => {
            handleClose();
          }}
        >
          <Box style={{ display: "flex", marginLeft: "5%" }}>
            <Box style={{ color: colors.black }}>
              <Box
                style={{
                  width: "60%",
                  fontSize: fonts[".813em"],
                  color: colors.black,
                }}
              >
                <Typography variant="h6" sx={{ color: colors.black }}>
                  {translations[TranslationKey.We_Care_About_Your_Data]}
                </Typography>
                <Typography sx={{ color: colors.black }}>
                  {translations[TranslationKey.We_And_Our_Partners]}
                </Typography>
              </Box>
              <Typography style={{ marginTop: "2%" }}>
                <Link href={"/cookies"} style={{ color: colors.blue }}>
                  {translations[TranslationKey.More_Informations]}
                </Link>
              </Typography>
            </Box>
          </Box>
        </CookieConsent>
        {children}
      </Box>
    </>
  );
};
interface CookieProps {
  children?: React.ReactNode;
}
export default CookiesConsent;
