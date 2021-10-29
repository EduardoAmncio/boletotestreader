import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  container: {
    overflow: "hidden",
    width: "100vw",
    height: "100vh",
    position: "fixed",
  },
  scanner: {
    overflow: "hidden",
    width: "100vw",
    height: "100vh",
    position: "fixed",
  },
  videoContainer: {
    height: "100vh",
    width: "100vw",
    margin: "auto",
    padding: 0,
    overflow: "hidden",
    position: "relative",

    "& #interactive.viewport canvas.drawingBuffer, video.drawingBuffer": {
      width: "100vh",
      height: "100vh",
    },
    "& video": {
      //   position: "absolute",
      top: 0,
      left: 0,
      // transform: "scaleX(-1)",
    },
  },
});
