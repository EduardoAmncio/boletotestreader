import { makeStyles } from "@material-ui/core";
import { textColors } from "_config/theme";

export const useStyles = makeStyles({
  value: {
    fontSize: 24,
    fontWeight: 700,
    color: textColors.gray,
  },
  box: {
    "& .MuiTypography-root": {
      textAlign: "center",
      color: textColors.gray,
    },
  },
  valueSection: {
    marginTop: 24,
  },
});
