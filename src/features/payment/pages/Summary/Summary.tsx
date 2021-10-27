import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "redux/state";
import { Box, Grid } from "@material-ui/core";
import { Close, KeyboardArrowRight } from "@material-ui/icons";
import { useStyles } from "./Summary.style";
import { AppBar } from "components/AppBar";
import { Button } from "components/Button";
// import { TagsExtract } from "components/TagsExtract";
// import { AttachmentCard } from "components/AttachmentCard/intex";
// import iconAttachmentButton from "_assets/icons/iconAttachmentButton.svg";
import { DetailPaymentDescription } from "features/payment/components/DetailPaymentDescription";
import { PaymentsRoutes } from "features/payment/constants/routes";
import { AccountRoutes } from "features/account/constants/routes";
//import { tags } from "./storeTag";
import { ProcessDescriptionHeader } from "components/ProcessDescriptionHeader";
import { ProcessPageLayout } from "components/ProcessPageLayout";
import { ProcessPageFooter } from "components/ProcessPageFooter";
import { PageContainer } from "components/PageContainer";
import { cancelLabel, concludeLabel } from "constants/buttons/labels";
import { AuthorizationSheet } from "components/AuthorizationSheet";
import { createPayment } from "features/payment/redux/actions";
import { SuccessPaymentState } from "features/payment/redux/state";

export const SummaryPayment: React.FC = () => {
  const history = useHistory();
  const styles = useStyles();
  const dispatch = useDispatch();

  const [openAuthorizationSheet, setOpenAuthorizationSheet] = React.useState(false);

  const toggleDrawer = (open: boolean) => (event: React.MouseEvent) => {
    setOpenAuthorizationSheet(open);
  };

  const payment = useSelector((store: StoreState) => store.payment);

  React.useEffect(() => {
    if (payment instanceof SuccessPaymentState) {
      history.push(PaymentsRoutes.completedPayment);
    }
  });

  const onCancelButtonClick = () => {
    history.replace(AccountRoutes.home);
  };

  const onAuthorizationClose = (tokenIsValid: boolean) => {
    if (tokenIsValid) {
      dispatch(createPayment());
    }
    setOpenAuthorizationSheet(false);
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
          <ProcessDescriptionHeader
            title="Pagamentos"
            subtitle="Hora de conferir"
            description="Confira, cuidadosamente, os dados do pagamento."
          />
        }
        main={
          <Box className={styles.scrollSummary}>
            <Grid
              container
              direction="column"
              justify="space-between"
              className={styles.contentValue}
            >
              <Grid item>
                <DetailPaymentDescription
                  paymentValue={payment.paymentData?.paymentValue!}
                  receiverName={payment.paymentData?.receiverName?.toString()!}
                  paymentDate={payment.paymentData?.paymentDate!}
                  description={payment.paymentData?.description!}
                  barcode={payment.barcode!}
                //  company={"payment.company!"}
                />
                {/* <Grid className={styles.buttonDetailsPayment}>
                  <AttachmentCard
                    image={iconAttachmentButton}
                    title={"Video"}
                    info={"25s"}
                  />
                  <AttachmentCard
                    image={iconAttachmentButton}
                    title={"Documento"}
                    info={"136Kb"}
                  />
                </Grid> */}
                {/* <Grid className={styles.detailInfoTagsSummary}>
                  <Box className={styles.contentValue}>
                    {tags.map((i) => (
                      <TagsExtract tag={i.tag} />
                    ))}
                  </Box>
                </Grid> */}
              </Grid>
            </Grid>
          </Box>
        }
        footer={
          <Grid>
            <ProcessPageFooter
              primaryButton={
                <Button
                  palette="primary"
                  endIcon={<KeyboardArrowRight color="secondary" />}
                  onClick={toggleDrawer(true)}
                >
                  {concludeLabel}
                </Button>
              }
            />
            <AuthorizationSheet
              //nextRoute={PaymentsRoutes.completedPayment}
              open={openAuthorizationSheet}
              onClose={onAuthorizationClose}
            />
          </Grid>
        }
        footerPosition="fixed"
      />
    </PageContainer>
  );
};
