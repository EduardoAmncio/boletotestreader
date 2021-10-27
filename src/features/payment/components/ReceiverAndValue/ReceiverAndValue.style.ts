import { makeStyles } from "@material-ui/core";
import { textColors } from "_config/theme";

export const useStyles = makeStyles({
  receiverAndValue: {
    textAlign: "center",
  },
  receiver: {
    fontWeight: 700,
    fontSize: "12px",
    color: textColors.gray,

    "& + #pd-value": {
      marginTop: "-2px",
    },
  },
  value: {
    fontWeight: 700,
    fontSize: "24px",
    color: textColors.gray,
  },
});
