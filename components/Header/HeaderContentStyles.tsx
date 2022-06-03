import { makeStyles } from "@mui/styles";

const { NEXT_CLIENT_BASE_URL } = process.env;
const HeaderContentStyles = makeStyles({
  containerBox: {
    padding: "1rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    padding: "0.5rem",
    margin: "0.5rem",
  },
});

export default HeaderContentStyles;
