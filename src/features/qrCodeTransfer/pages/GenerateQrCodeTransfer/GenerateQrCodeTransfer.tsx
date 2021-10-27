import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import { Close, KeyboardArrowRight } from "@material-ui/icons";
import { useStyles } from "./GenerateQrCodeTransfer.style";
import Details from "_assets/icons/Details.svg";
import { AppBar } from "components/AppBar";
import { ProcessDescriptionHeader } from "components/ProcessDescriptionHeader";
import { Button } from "components/Button";
import { ProcessPageFooter } from "components/ProcessPageFooter";
import { AccountRoutes } from "features/account/constants/routes";
import { QrCodeTransferRoutes } from "features/qrCodeTransfer/constants/routes";
import { useMask } from "hooks/useMask";
import { maskMoney } from "_utils/masks/money";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  closeAlert,
  generateQrCode,
} from "features/qrCodeTransfer/redux/actions";
import { PageContainer } from "components/PageContainer";
import { ProcessPageLayout } from "components/ProcessPageLayout";
import { cancelLabel } from "constants/buttons/labels";
import { StoreState } from "redux/state";
import { SuccessQrCodeTransferState } from "features/qrCodeTransfer/redux/state";
import { CurrencyFormatter, parseCurrency } from "_translate";
import { Loader } from "components/Loader";
import { Alert } from "components/Alert";

export const GenerateQrCodeTransfer: React.FC = () => {
  const [nextButtonClicked, setNextButtonClicked] = React.useState(false);
  const [disableNextButton, setDisableNextButton] = React.useState(true);
  const [value, setTransferValue] = useMask(maskMoney);
  const qrCodeState = useSelector((state: StoreState) => {
    return state.qrCodeTransfer;
  });
  const { loading, errorMessage } = qrCodeState;
  const history = useHistory();
  const dispatch = useDispatch();
  const styles = useStyles();

  React.useEffect(() => {
    const parsedValue = parseCurrency(value);
    setDisableNextButton(Number.isNaN(parsedValue) || parsedValue <= 0);
  }, [value]);

  React.useEffect(() => {
    if (
      nextButtonClicked &&
      qrCodeState instanceof SuccessQrCodeTransferState
    ) {
      history.push(QrCodeTransferRoutes.viewQrCodeTransfer);
    }
  }, [history, nextButtonClicked, qrCodeState]);

  const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTransferValue(event.target.value);

  const onCancelButtonClick = () => {
    history.replace(AccountRoutes.home);
  };

  const onNextButtonClick = () => {
    setNextButtonClicked(true);
    dispatch(generateQrCode(parseCurrency(value)));
  };

  const onAlertClose = () => {
    dispatch(closeAlert());
  };

  return (
    <PageContainer>
      <ProcessPageLayout
        appBar={
          <AppBar
            homeRoute={AccountRoutes.home}
            action={
              <Button
                palette="secondary"
                size="small"
                startIcon={<Close color="primary" />}
                onClick={onCancelButtonClick}
              >
                {cancelLabel}
              </Button>
            }
          />
        }
        header={
          <React.Fragment>
            <ProcessDescriptionHeader title="Receber transferência via QR Code" />
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Typography className={styles.subtitle} align="center">
                  Quanto você precisa receber?
                </Typography>
              </Grid>
              <Grid item>
                <input
                  className={styles.input}
                  placeholder={CurrencyFormatter.format(0)}
                  inputMode="numeric"
                  value={value}
                  onChange={onValueChange}
                />
              </Grid>
            </Grid>
          </React.Fragment>
        }
        main={<React.Fragment />}
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                disabled={disableNextButton}
                onClick={onNextButtonClick}
                size="medium"
                endIcon={<KeyboardArrowRight />}
              >
                Gerar QR
              </Button>
            }
          />
        }
      />
      <Loader open={loading} />
      {errorMessage && (
        <Alert
          title="Erro"
          message={errorMessage}
          severity={"error"}
          onClose={onAlertClose}
        />
      )}
    </PageContainer>
  );
};
