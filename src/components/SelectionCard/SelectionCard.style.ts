import { makeStyles } from "@material-ui/core";
import { textColors } from "_config/theme";

export const useStyles = makeStyles({
  card: {
    display: "flex",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 0,
    boxShadow:
      "0px 2px 2px 0px rgba(0, 0, 0, 0.24), 0px 0px 2px 0px rgba(0, 0, 0, 0.12)",
    cursor: "pointer",
  },
  text: {
    color: textColors.gray,
    paddingRight: 8,
  },
  title: {
    fontSize: 13,
    fontWeight: 500,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: 400,
    marginTop: 4,

    "& > *": {
      fontSize: 12,
      fontWeight: 400,
    },
  },
});
