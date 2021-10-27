import { makeStyles } from "@material-ui/core";
import { textColors } from "_config/theme";

export const useStyle = makeStyles({
  button: {
    display: "flex",
    justifyContent: "center",
    padding: "8px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
    marginLeft: "12px",

  },
  icon: {
    height: "40px",
  },
  label: {
    fontSize: "10px",
    color: textColors.primary,
    textTransform: "none",
  },
});
