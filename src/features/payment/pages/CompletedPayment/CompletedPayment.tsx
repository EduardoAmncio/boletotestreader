import React from "react";
import { PageContainer } from "components/PageContainer";
import { AppBar } from "components/AppBar";
import { ProcessPageLayout } from "components/ProcessPageLayout";
import IconBgVoucherButton from "_assets/icons/Receipt.svg";
import IconBgHomeButton from "_assets/icons/Home.svg";
import { ButtonWithFloatingIcon } from "components/ButtonWithFloatingIcon";
import { useStyles } from "./CompletedPayment.style";
import image from "_assets/img/completedTransfer.svg";
import { PageTitle } from "features/payment/components/PageTitle";
import { useHistory } from "react-router-dom";
import { PaymentsRoutes } from "features/payment/constants/routes";
import { AccountRoutes } from "features/account/constants/routes";
import { Loader } from "components/Loader";
import { Alert } from "components/Alert";
import { useSelector } from "react-redux";
import { StoreState } from "redux/state";

export const CompletedPayment: React.FC = () => {

  const styles = useStyles();
  const history = useHistory();

  const paymentState = useSelector(
    (state: StoreState) => state.payment
  );
  const { loading, errorMessage } = paymentState;

  const onHomeButtonClick = () => {
    history.replace(AccountRoutes.home);
  };
  const onProofButtonClick = () => {
    history.push(PaymentsRoutes.paymentReceipt);
  };
  return (
    <PageContainer>
      <ProcessPageLayout
        header={
          <>
            <div className={styles.mainWrapper}>
              {<AppBar homeRoute={""} />}
            </div>
          </>
        }
        main={
          <div className={styles.mainWrapper}>
            <div className={styles.completeTitle}>
              <PageTitle text="Pagamento Concluído" />
            </div>
            <img className={styles.completedImagem} src={image} />
          </div>
        }
        footer={
          <div className={styles.formFooterPayments}>
            <ButtonWithFloatingIcon icon={IconBgVoucherButton} size="large"
              onClick={onProofButtonClick} >
              Comprovante
            </ButtonWithFloatingIcon>
            <ButtonWithFloatingIcon icon={IconBgHomeButton} size="large"
              onClick={onHomeButtonClick}>
              Início
            </ButtonWithFloatingIcon>
          </div>
        }
      />
      <Loader open={loading} />
      {errorMessage && (
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
