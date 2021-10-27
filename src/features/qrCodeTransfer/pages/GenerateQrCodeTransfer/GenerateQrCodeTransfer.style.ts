import { makeStyles } from "@material-ui/core";
import { colors, textColors } from "_config/theme";

export const useStyles = makeStyles({
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "85%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "-70px",
  },
  subtitle: {
    fontSize: 12,
    fontWeight: 700,
    color: textColors.gray,
  },
  input: {
    width: "100%",
    border: "none",
    fontWeight: 700,
    fontSize: 24,
    textAlign: "center",
    color: textColors.gray,
    backgroundColor: "#f9f9f9",

    "&:focus": {
      outline: "none",
      backgroundColor: "#fff",
    },
  },
  content: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "5%",
  },
  error: {
    color: colors.red,
    fontWeight: 700,
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Roboto",
  },
});
