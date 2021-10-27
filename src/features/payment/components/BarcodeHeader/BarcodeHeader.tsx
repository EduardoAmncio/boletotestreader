import { Box, Link } from "@material-ui/core";
import React from "react";
import { useStyles } from "./BarcodeHeader.style";
import { Close } from "@material-ui/icons";
import cameraIcon from "_assets/icons/CameraIconRotated.svg";
import { AccountRoutes } from "features/account/constants/routes";
import { useHistory } from "react-router-dom";

export const BarcodeHeader: React.FC = () => {

  const styles = useStyles();
  const history = useHistory();

  const onCancelButtonClick = () => {
    history.replace(AccountRoutes.home);
  };

  return (
    <Box className={styles.container}>
      <p className={styles.text}>
        Aproxime a camera e alinhe o codigo de barras a linha amarela
      </p>
      <Box className={styles.optionBar}>
        <Box className={styles.menuName}>
          <img src={cameraIcon} alt="camera icon"></img>
          <p>Leitor de codigo de barras</p>
        </Box>
        <Link className={styles.buttonClose} onClick={onCancelButtonClick} >
          <Close />
          Cancelar
        </Link>
      </Box>

    </Box>
  );
};