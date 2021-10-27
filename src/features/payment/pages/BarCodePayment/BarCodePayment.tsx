import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import { PageContainer } from "components/PageContainer";
import { ProcessPageLayout } from "components/ProcessPageLayout";
import { ProcessPageFooter } from "components/ProcessPageFooter";
import { Button } from "components/Button";
import { Divider } from "components/Divider";
import { TextField } from "components/TextField";
import { useMask } from "hooks/useMask";
import { MaskbarCode } from "_utils/masks/barCode";
import { AppBar } from "components/AppBar";
import { ProcessDescriptionHeader } from "components/ProcessDescriptionHeader";
import { AccountBalance } from "features/payment/components/AccountBalance";
import { ShowBalanceButton } from "features/payment/components/ShowBalanceButton"; //mudar a cor do icone
import { nextLabel } from "constants/buttons/labels";
import { PaymentsRoutes } from "features/payment/constants/routes";
import { KeyboardArrowRight } from "@material-ui/icons";
import {
  findInforsPaymentByBarCode,

  verifyIfBoletoCanBePayd,
} from "features/payment/redux/actions";

import { useStyles } from "./BarCodePayment.style";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "redux/state";

import { TypeBoleto } from "../../redux/models/Enum/TypeBoleto";
import { Loader } from "components/Loader";
import { Alert } from "components/Alert";

export const BarCodePayment: React.FC = () => {

  const paymentState = useSelector(
    (state: StoreState) => state.payment
  );

  const { loading, errorMessage, paymentData, barcode } = paymentState;

  const dispatch = useDispatch();
  const styles = useStyles();
  const history = useHistory();
  const [sendToNextPage, setSendToNextPage] = React.useState(false);
  const [showBalance, setShowBalance] = React.useState(true);
  const [inputBarCode, setInputBarCode] = useMask(MaskbarCode);

  const onShowBalanceButtonClick = () => setShowBalance(!showBalance);
  const onScanBarCodeClick = () => {
    history.push(PaymentsRoutes.barCodeScanner);
  };

  const onNextButtonClick = async () => {
    setSendToNextPage(true);
    dispatch(verifyIfBoletoCanBePayd(inputBarCode.replace(/\s/g, "")));
  };

  const onBarCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputBarCode(event.target.value);
  };

  React.useEffect(() => {
    if (paymentData?.canBePaid && !barcode) {
      dispatch(findInforsPaymentByBarCode(inputBarCode.replace(/\s/g, "")));
    }
  }, [dispatch, paymentData?.canBePaid, barcode]);

  React.useEffect(() => {
    if (sendToNextPage && !!barcode) {
      if (paymentData?.type === TypeBoleto.DEALERSHIP) {
        history.push(PaymentsRoutes.paymentData);
      } else if (paymentData?.type === TypeBoleto.BANK) {
        history.push(PaymentsRoutes.barCodePayment);
      } else {
        history.push(PaymentsRoutes.barCodePayment);
      }
      setSendToNextPage(false);
    }

  }, [dispatch, paymentData?.canBePaid, barcode, history, paymentData?.type, sendToNextPage]);

  return (
    <PageContainer>
      <ProcessPageLayout
        appBar={<AppBar homeRoute="/" />}
        header={
          <React.Fragment>
            <ProcessDescriptionHeader
              title="Pagamentos"
              subtitle="Boletos e contas de consumo"
              description="Para pagamentos de boletos e contas de consumo como agua, luz, cartao de crédito, etc."
            />
            <Divider />
            <Grid container className={styles.optionsSubheader}>
              <Grid container justify="space-between" alignItems="center">
                <Grid item>
                  <Grid container>
                    <Typography>Seu saldo:&nbsp;</Typography>
                    <AccountBalance variant="body1" show={showBalance} />
                  </Grid>
                </Grid>
                <Grid item>
                  <ShowBalanceButton
                    showBalance={showBalance}
                    onClick={onShowBalanceButtonClick}
                  />
                </Grid>
              </Grid>
            </Grid>
          </React.Fragment>
        }
        main={
          <React.Fragment>
            <Box className="barCodeSubheader">
              {/* comentar esse campo em baixo */}
              <Grid>
                <TextField
                  multiline={true}
                  rows="2"
                  placeholder=""
                  label="Codigo de Barras"
                  value={inputBarCode}
                  onChange={onBarCodeChange}
                ></TextField>
              </Grid>
            </Box>
            <Box marginTop="20px">
              {/* <Typography variant="caption">Use a câmera</Typography> */}
            </Box>
            <Box display="flex" className={styles.optionsSubheader}>
              {/* <Box className={styles.btn}>
                <Button
                  size="large"
                  palette="secondary"
                  startIcon={<CameraAltOutlined className={styles.img} />}
                  onClick={onScanBarCodeClick}
                >
                  <p>Ler codigo de barras</p>
                </Button>
              </Box> */}
            </Box>
          </React.Fragment>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                endIcon={<KeyboardArrowRight color="secondary" />}
                onClick={onNextButtonClick}
              >
                {nextLabel}
              </Button>
            }
          />

        }
      />
      <Loader open={loading} />
      {errorMessage && (
        <Alert
          autoHideDuration={5000}
          title="Erro"
          message={errorMessage}
          severity={"error"}
        />
      )}
    </PageContainer>
  );
};
