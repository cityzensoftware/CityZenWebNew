import { Box, Button } from "@mui/material";
import Image from "next/image";
import logo from "../../public/logo.png";
import HeaderContentStyles from "./HeaderContentStyles";

const HeaderContent = () => {
  const classes = HeaderContentStyles();
  return (
    <>
      <Box className={classes.containerBox}>
        <Box>
          <Image
            id="img1"
            // loader={dummyLoader}
            src={logo}
            alt="Static page"
            width="150"
            height="50"
          />
        </Box>
        <Box>
          <Button variant="outlined" className={classes.button}>
            Test
          </Button>
          <Button variant="outlined" className={classes.button}>
            Test
          </Button>
          <Button variant="outlined" className={classes.button}>
            Test
          </Button>
          <Button variant="outlined" className={classes.button}>
            Test
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default HeaderContent;
