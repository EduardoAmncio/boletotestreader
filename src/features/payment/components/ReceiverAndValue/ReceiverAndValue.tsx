import React from "react";
import { Box, Typography } from "@material-ui/core";
import { useStyles } from "./ReceiverAndValue.style";

interface ReceiverAndValueProps {
  receiver: string | undefined;
  value: number | undefined;
}

export const ReceiverAndValue = ({ receiver, value }: ReceiverAndValueProps) => {
  const styles = useStyles();
  return (
    <Box className={styles.receiverAndValue}>
      <Typography variant="h6" className={styles.receiver}>
        {receiver}
      </Typography>
      <Typography id="pd-value" variant="h6" className={styles.value}>
        R${value}
      </Typography>
    </Box>
  );
};
