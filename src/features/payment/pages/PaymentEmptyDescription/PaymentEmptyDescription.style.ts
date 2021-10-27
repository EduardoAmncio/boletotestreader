import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  contentWrapper: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center"
  },  
  customTagButtonsFilter: {
    display: "flex",
    justifyContent: "space-between", 
    width: 40,
    marginBottom: 8  
  },
  customTagButton:{
    marginLeft: 10,
    marginTop: -4
  },
  customInput:{
    marginTop: "25px",
    marginBottom: "40px", 
  },
  customBody:{
    marginTop: "500",
  }
});
