import { makeStyles } from "@material-ui/core";
import { textColors } from "_config/theme";

export const useStyles = makeStyles({
    contentTitleDescriptionAttach: {
        paddingTop: "5px",
        display: "flex",
        flexDirection: "column",
        marginBottom: "13px",
    },
    propsTitleAttach: {
        fontWeight: "bolder",
        fontSize: "12px", 
        margin: 0,
    },
    prosDescriptionAttach: {
        color: textColors.gray,
        fontSize: "10px",
        opacity: 0.4,
    } 
});