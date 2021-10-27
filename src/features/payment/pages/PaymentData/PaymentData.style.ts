import { makeStyles } from "@material-ui/core";
import { textColors } from "_config/theme";

export const useStyles = makeStyles({
  marginHeader: {
    marginTop: "20px",
    marginBottom: "-15px",
  },
  customTexts: {
    textAlign: "center",
    color: textColors.gray,
    marginLeft: "4%",
    marginRight: "4%",
    lineHeight: "9px",
  },
  customInput: {
    marginTop: "25px",
    marginBottom: "8px",
  },
  dueDate: {
    fontSize: "12px",
    fontWeight: 500,
  },
  infoText: {
    marginTop: "20px",
    fontSize: "10px",
    fontWeight: 400,
  },
  buttonDate: {
    display: "flex",
    justifyContent: "center",
    marginTop: "40px",

    "& .MuiInputBase-root": {
      display: "none",
    },
  },
});
