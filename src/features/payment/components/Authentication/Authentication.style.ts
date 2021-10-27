import { makeStyles } from "@material-ui/core";
import { textColors } from "_config/theme";

export const useStyle = makeStyles({
  autenticationContent: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",

    "& .MuiTypography-root": {
      color: textColors.gray,
      fontSize: 10,
      fontWeight: 300,
    },
    "& .MuiTypography-body2": {
      fontWeight: 300,
    },
  },
  wordBreak: {
    wordBreak: "break-word",
  },
  customText: {
    fontWeight: 500
  },
  customTextPaymentType: {
    fontWeight: 700
  }
});
