import React from "react";
import { useSelector } from "react-redux";
import { PageContainer } from "components/PageContainer";
import { useHistory } from "react-router-dom";
import { Grid, Typography, Box } from "@material-ui/core";
import { TextField } from "components/TextField";
import { AppBar } from "components/AppBar";
import { ProcessPageLayout } from "components/ProcessPageLayout";
import { ProcessDescriptionHeader } from "components/ProcessDescriptionHeader";
import { cancelLabel, nextLabel } from "constants/buttons/labels";
import { Close, KeyboardArrowRight } from "@material-ui/icons";
import { Button } from "components/Button";
import { ProcessPageFooter } from "components/ProcessPageFooter";
import { ReceiverAndValue } from "features/payment/components/ReceiverAndValue";
import { ShortDateFormatter } from "_translate";
import { useStyles } from "./PaymentData.style";
import { PaymentsRoutes } from "features/payment/constants/routes";
import { SchedulingButton } from "components/SchedulingButton";
import { StoreState } from "redux/state";
import { AccountRoutes } from "features/account/constants/routes";
import { Loader } from "components/Loader";
import { Alert } from "components/Alert";

export const PaymentData: React.FC = () => {
  const history = useHistory();
  const { paymentData, loading, errorMessage } = useSelector((state: StoreState) => state.payment);
  const [paymentDate, setPaymentDate] = React.useState<Date | null>(null);
  const [minDate] = React.useState<Date>(new Date());
  const [openDatePicker, setOpenDatePicker] = React.useState(false);

  const onCancelButtonClick = () => {
    history.replace(AccountRoutes.home);
  };

  const onNextButtonClick = () => {
    history.push(PaymentsRoutes.paymentEmptyDescription);
  };

  const onSchedulingButtonClick = () => {
    setOpenDatePicker(true);
  };

  const onDatePickerClose = () => {
    setOpenDatePicker(false);
  };

  const onStartDateChange = (date: Date | null) => {
    setPaymentDate(date);
  };

  var infoText =
    "Pagamentos realizados em fins de semana, feriados ou após ás 22h serão agendados para o próximo dia útil";
  const style = useStyles();

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
            <ProcessDescriptionHeader
              title="Pagamentos"
              subtitle="Data do pagamento"
            />
            <Box className={style.marginHeader}>
              <ReceiverAndValue
                receiver={paymentData?.receiverName}
                value={paymentData?.paymentValue}
              />
            </Box>
          </React.Fragment>
        }
        main={
          <React.Fragment>
            <Box className={style.customTexts}>
              <Typography variant="body2" className={style.dueDate}>
                Vencimento {ShortDateFormatter.format(paymentData?.dueDate)}
              </Typography>
            </Box>
            <Grid>
              <Box className={style.customInput}>
                <TextField
                  disabled={true}
                  label="Quando?"
                  placeholder="Hoje"
                  value={
                    paymentDate
                      ? ShortDateFormatter.format(paymentDate)
                      : "Hoje"
                  }
                  onChange={() => { }}
                />
              </Box>
              <Box className={style.customTexts}>
                <Typography variant="caption" className={style.infoText}>
                  {infoText}
                </Typography>
              </Box>
              <Box className={style.buttonDate}>
                <SchedulingButton
                  open={openDatePicker}
                  onClose={onDatePickerClose}
                  value={paymentDate}
                  onDateSelection={onStartDateChange}
                  onClick={onSchedulingButtonClick}
                  minDate={minDate}
                />
              </Box>
            </Grid>
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
          title="Erro"
          message={errorMessage}
          severity={"error"}
        // onClose={onAlertClose}
        />
      )}
    </PageContainer>
  );
};
