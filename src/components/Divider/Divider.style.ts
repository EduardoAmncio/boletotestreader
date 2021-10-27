import { makeStyles } from "@material-ui/core";
import { theme } from "_config/theme";

export interface DividerStylesProps {
  spacing?: 0 | 1 | 2 | 3;
}

export const useStyles = makeStyles({
  divider: {
    margin: ({ spacing }: DividerStylesProps) => {
      const verticalMargin = theme.spacing(spacing ?? 1);
      return `${verticalMargin}px 0`;
    },
    height: 1.5,
    backgroundColor: "#F2F2F2",
  },
});