import { textColors } from '_config/theme';
import { makeStyles } from "@material-ui/core";

export const useStyle = makeStyles({
  allAccountCard: {
    backgroundColor: "#ffffff",
    border: "none",
    padding: "10px",
    display: "grid",
    gridTemplateColumns: "0.25fr 1fr 0.25fr",
    alignItems: "center",
    cursor: "pointer",
  },
  infoAllAccounts: {
    lineHeight: "5px",
    color: textColors.gray,
    paddingLeft: "18px",
  }
});
