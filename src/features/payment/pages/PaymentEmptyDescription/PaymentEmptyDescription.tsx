import React from "react";
import { useSelector } from "react-redux";
import { StoreState } from "redux/state";
import { useHistory } from "react-router-dom";
import { ProcessPageLayout } from "components/ProcessPageLayout";
import { AppBar } from "components/AppBar";
import { Button } from "components/Button";
import { cancelLabel, nextLabel, skipLabel } from "constants/buttons/labels";
import { ProcessDescriptionHeader } from "components/ProcessDescriptionHeader";
import { Close, KeyboardArrowRight } from "@material-ui/icons";
import { Box } from "@material-ui/core";
import { ProcessPageFooter } from "components/ProcessPageFooter";
import { TextField } from "components/TextField";
import { FilterSectionTitleAndDescription } from "features/account/components/FilterSectionTitleAndDescription";
import { TagButton } from "components/TagButton";
import { useStyles } from "./PaymentEmptyDescription.style";
import { findInforsPaymentByBarCode, updatePaymentState } from "features/payment/redux/actions";
import { useDispatch } from "react-redux";
import { PaymentsRoutes } from "features/payment/constants/routes";
import { AccountRoutes } from "features/account/constants/routes";

export const PaymentEmptyDescription: React.FC = () => {
  const history = useHistory();
  const { loading, errorMessage } = useSelector((state: StoreState) => state.payment);
  const dispatch = useDispatch();

  const [inputText, setInputText] = React.useState("");

  const onCancelButtonClick = () => {
    history.replace(AccountRoutes.home);
  };

  const onSkipLabelButtonClick = async (description: string) => {
    dispatch(updatePaymentState({ description: description }));
    history.push(PaymentsRoutes.summary);
  };

  const handleChange = (event: any) => {
    setInputText(event.target.value);
  };

  const styles = useStyles();

  return (
    <ProcessPageLayout
      appBar={
        <AppBar
          homeRoute={"/"}
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
          subtitle="Deseja identificar seu pagamento no extrato?"
          description="Adicione uma descrição, arquivo, foto ou mesmo um vídeo para identificar melhor essa transação em seu histórico."
        />
      }
      main={
        <Box className={styles.customBody}>
          <Box className={styles.customInput}>
            <TextField
              label="Descreva em uma frase"
              placeholder="Escreva sua frase"
              value={inputText}
              onChange={handleChange}
            />
          </Box>
          {/* <section>
            <FilterSectionTitleAndDescription
              title="Tags"
              description="Insira marcações para identificar seus gastos. Use nossa sugestão ou personalize as tags."
            />
          </section> */}
        </Box>
      }

      footer={
        <ProcessPageFooter
          primaryButton={
            <Button
              endIcon={<KeyboardArrowRight color="secondary" />}
              onClick={() => onSkipLabelButtonClick(inputText)}
            >
              {!inputText ? skipLabel : nextLabel}
            </Button>
          }
        />
      }
    />
  );
};
