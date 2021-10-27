import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { StoreState } from "redux/state";
import { Alert } from "components/Alert";
import { Loader } from "components/Loader";
import { PageContainer } from "components/PageContainer";
import { HomePageHeader } from "features/account/components/HomePageHeader";
import { SquareButtonWithIcon } from "components/SquareButtonWithIcon";
import { InitialAccountState } from "features/account/redux/state";
import {
  closeAlert,
  getAccountDashboard,
} from "features/account/redux/actions";
import { QrCodeTransferRoutes } from "features/qrCodeTransfer/constants/routes";
import { TransferenceRoutes } from "features/transference/constants/routes";
import { PaymentsRoutes } from "features/payment/constants/routes";
import { useStyles } from "./Home.style";
import QRCode from "_assets/icons/QrCode.svg";
import LegoBlocks from "_assets/img/icon-lego-home.svg";
import Transfer from "_assets/icons/Transfer.svg";
import PaymentIcon from "_assets/icons/Payment.svg";

const legoBlocksImageSize = 256;

interface HomeProps {
  showBalance: boolean;
}

export const Home: React.FC<HomeProps> = () => {
  const history = useHistory();
  const { authState, accountState } = useSelector((state: StoreState) => ({
    authState: state.auth,
    accountState: state.account,
  }));
  const { loading, errorMessage } = accountState;
  const dispatch = useDispatch();
  const styles = useStyles();

  React.useEffect(() => {
    dispatch(getAccountDashboard());
  }, []);

  const onTransferButtonClick = () => {
    history.push(TransferenceRoutes.transference);
  };

  const onPaymentButtonClick = () => {
    history.push(PaymentsRoutes.barCodeScanner);
  };

  const onQrCodeTransferClick = () => {
    history.push(QrCodeTransferRoutes.qrCodeTransfer);
  };

  const onAlertClose = () => {
    dispatch(closeAlert());
  };

  return (
    <PageContainer className={styles.pageContainer}>
      <HomePageHeader />
      <Box component="main">
        <Grid
          container
          className={styles.buttonsRow}
          justify="space-around"
          spacing={1}
        >
          <Grid item>
            <SquareButtonWithIcon
              label="Transferência"
              icon={Transfer}
              onClick={onTransferButtonClick}
            />
          </Grid>
          <Grid item>
            <SquareButtonWithIcon
              label="Pagamento"
              icon={PaymentIcon}
              onClick={onPaymentButtonClick}
            />
          </Grid>
          <Grid item>
            <SquareButtonWithIcon
              label={"QRCode"}
              icon={QRCode}
              onClick={onQrCodeTransferClick}
            />
          </Grid>
        </Grid>
        <Grid container direction="column" alignItems="center" justify="center">
          <Grid item>
            <img
              src={LegoBlocks}
              alt="Construção"
              height={legoBlocksImageSize}
              width={legoBlocksImageSize}
            />
          </Grid>
          <Grid item>
            <Typography variant="body1" align="center">
              <strong>Em breve</strong>
              <br />
              Novas funcionalidades serão implementadas
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {errorMessage && (
        <Alert
          title="Erro"
          message={errorMessage}
          severity={"error"}
          onClose={onAlertClose}
        />
      )}
      <Loader open={loading} />
    </PageContainer>
  );
};
