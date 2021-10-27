import { makeStyles } from "@material-ui/core";
import { colors } from "_config/theme";

export const useStyles = makeStyles({
  pageContainer: {
    backgroundColor: colors.background,
  },
  buttonsRow: {
    display: "flex",
    backgroundColor: "white",
    padding: "41px 16px 16px 16px",
    marginTop: -25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  invisibleButton: {
    width: 96,
    "& > *": {
      display: "none",
    },
  },
});
