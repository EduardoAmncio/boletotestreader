import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  contentWrapper: {
    height: "50vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },

  footer: {
    backgroundColor: "#fff",
    marginTop: "15px",
    marginLeft: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "95%",
    padding: 16,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    "& .MuiContainer-root": {
      padding: 0,
    },
  },

  bottom: {
    borderTop: "1px solid #F2F2F2",
    paddingTop: "8px", 
  }
});
