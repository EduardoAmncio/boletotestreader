import React, { useRef } from "react";
import { PageContainer } from "components/PageContainer";
//import BarcodeScannerComponent from "react-webcam-barcode-scanner";
//import BarcodeScannerComponent from 'react-barcode-reader';

import { LandscapeContainner } from "features/payment/components/LandscapeContainer";
import { BarcodeInfors } from "features/payment/components/BarcodeInfors";
import { Box } from "@material-ui/core";
import { useStyles } from "./BarCodeScanner.style";
import "./BarCodeScanner.scss";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  findInforsPaymentByBarCode,
  verifyIfBoletoCanBePayd,
} from "features/payment/redux/actions";
import { PaymentsRoutes } from "features/payment/constants/routes";
import { StoreState } from "redux/state";
import { TypeBoleto } from "features/payment/redux/models/Enum/TypeBoleto";
import { Loader } from "components/Loader";
import { Alert } from "components/Alert";
import Scanner from "../../components/Scanner/Scanner";


export const BarCodeScanner: React.FC = () => {
  // const scannerRef = useRef(null);

  const dispatch = useDispatch();
  const history = useHistory();
  const styles = useStyles();
  const [inputBarCode] = React.useState("Not Found");
  const [sendToNextPage, setSendToNextPage] = React.useState(false);

  const paymentState = useSelector((state: StoreState) => state.payment);

  const { loading, errorMessage, paymentData, barcode } = paymentState;

  React.useEffect(() => {
    if (paymentData?.canBePaid && !barcode) {
      dispatch(findInforsPaymentByBarCode(inputBarCode.replace(/\s/g, "")));
    }
  }, [dispatch, paymentData?.canBePaid, inputBarCode, barcode]);

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
  }, [
    dispatch,
    paymentData?.canBePaid,
    barcode,
    history,
    paymentData?.type,
    sendToNextPage,
  ]);

  const onDetected = (result: any) => {
    if (result.length > 43) {
      console.log("-----------------------")
      console.log('test pass, you can read the code.');
      console.log(result);
      console.log("-----------------------")
      alert(result);
    }
  };

  return (
    <PageContainer>
      <LandscapeContainner>
        <BarcodeInfors />
        <Box className={styles.videoContainer}>
          <Scanner onDetected={onDetected} />
        </Box>
      </LandscapeContainner>

      <Loader open={loading} />
      {!!errorMessage && (
        <Alert
          title="Erro"
          message={errorMessage}
          severity={"error"}
        // onClose={onAlertClose}
        />
      )}
    </PageContainer>
  );
};
