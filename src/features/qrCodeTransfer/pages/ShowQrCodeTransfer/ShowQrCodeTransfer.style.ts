import { makeStyles } from "@material-ui/core";
import { textColors } from "_config/theme";

export const useStyles = makeStyles({
  subheader: {
    marginTop: 8,
    fontWeight: 700,
    color: textColors.gray,
    "& .MuiTypography-root": {
      fontWeight: "inherit",
    },
  },
  title: {
    fontSize: 12,
  },
  value: {
    fontSize: 24,
  },
  subtitle: {
    fontSize: 10,
    fontWeight: 400,
    color: textColors.gray,
  },
  qrCodeWrapper: {
    padding: "0 64px",
  },
  qrCode: {
    width: "100%",
    flexGrow: 1,
    marginBottom: 24,
  },
});
