import React from "react";
import { PageContainer } from "components/PageContainer";
import { Box } from "@material-ui/core";
import { useStyles } from "./PaymentReceipt.style";
import { AppBar } from "components/AppBar";
import { ProcessPageLayout } from "components/ProcessPageLayout";
import { ProcessDescriptionHeader } from "components/ProcessDescriptionHeader";
import { ButtonWithFloatingIcon } from "components/ButtonWithFloatingIcon";
import IconBgButton from "_assets/icons/buttonBg.png";
import { Authentication } from "features/payment/components/Authentication";
import { ReceiptDescription } from "features/payment/components/ReceiptDescription";
import { PaymentsRoutes } from "features/payment/constants/routes";
import { Button } from "components/Button";
import { closeLabel } from "constants/buttons/labels";
import { useHistory } from "react-router-dom";
import { Close } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { StoreState } from "redux/state";

export const PaymentReceipt: React.FC = () => {
  const payment = useSelector((store: StoreState) => store.payment);

  const styles = useStyles();
  const history = useHistory();
  const onCloseButtonClick = () => {
    history.replace(PaymentsRoutes.completedPayment);
  };
  return (
    <>
      <PageContainer>
        <ProcessPageLayout
          appBar={
            <AppBar
              homeRoute={""}
              action={
                <Button
                  palette="secondary"
                  size="small"
                  startIcon={<Close color="primary" />}
                  onClick={onCloseButtonClick}
                >
                  {closeLabel}
                </Button>
              }
            />
          }
          header={<ProcessDescriptionHeader title="Comprovante" />}
          main={
            <div>
              <Box className={styles.contentWrapper}>
                <ReceiptDescription
                  paymentValue={payment.paymentData?.paymentValue!}
                  account={payment.paymentData?.receiverName!}
                  bank=""
                  paymentDate={payment?.paymentData?.paymentDate!}
                  barcode={payment.barcode!}
                />
              </Box>
              <Box className={styles.bottom}>
                <div>
                  <Authentication
                    controlProtocol="44B8-4B9324C-2398721"
                    internalProtocol="44B8-4B9324C-2398721320AB"
                  />
                </div>
                <div className={styles.footer}>
                  <div>
                    <ButtonWithFloatingIcon icon={IconBgButton} size="large">
                      Salvar
                    </ButtonWithFloatingIcon>
                  </div>
                  <div>
                    <ButtonWithFloatingIcon icon={IconBgButton} size="large">
                      Compartilhar
                    </ButtonWithFloatingIcon>
                  </div>
                </div>
              </Box>
            </div>
          }
        />
      </PageContainer>
    </>
  );
};
