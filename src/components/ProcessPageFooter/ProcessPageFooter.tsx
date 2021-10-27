import React from "react";
import { useHistory } from "react-router";
import { Box } from "@material-ui/core";
import { KeyboardArrowLeft } from "@material-ui/icons";
import { Button } from "components/Button";
import { returnLabel } from "constants/buttons/labels";
import { useStyles } from "./ProcessPageFooter.style";

interface ProcessPageFooterProps {
  primaryButton?: React.ReactNode;
  onBackButtonClick?: VoidFunction;
}

export const ProcessPageFooter: React.FC<ProcessPageFooterProps> = ({
  primaryButton,
  onBackButtonClick: onBackButtonClickCallback,
}) => {
  const styles = useStyles();
  const history = useHistory();

  const onBackButtonClick = () => {
    onBackButtonClickCallback?.call(this);
    history.goBack();
  };

  return (
    <Box className={styles.buttonsWrapper}>
      <Button
        palette="secondary"
        startIcon={<KeyboardArrowLeft color="secondary" />}
        onClick={onBackButtonClick}
      >
        {returnLabel}
      </Button>
      {primaryButton}
    </Box>
  );
};
