import React from "react";
import { AppBar } from "components/AppBar";
import { PageContainer } from "components/PageContainer";
import { AccountRoutes } from "features/account/constants/routes";
import { ProcessDescriptionHeader } from "components/ProcessDescriptionHeader";
import { ProcessPageLayout } from "components/ProcessPageLayout";
import { TextField } from "components/TextField";
import { ProcessPageFooter } from "components/ProcessPageFooter";
import { Button } from "components/Button";
import { cancelLabel, nextLabel } from "constants/buttons/labels";
import { useHistory } from "react-router-dom";
import { TransferenceRoutes } from "features/transference/constants/routes";
import { Close, KeyboardArrowRight } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { updateTransferenceData } from "features/transference/redux/actions";
import { Box } from "@material-ui/core";

export const FavoredName: React.FC = () => {
  const [toName, setToName] = React.useState("");
  const [disableNextButton, setDisableNextButton] = React.useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (toName.length === 0) setDisableNextButton(true);
    else setDisableNextButton(false);
  }, [toName.length]);

  const onToNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToName(event.target.value);
  };

  const onCancelButtonClick = () => {
    dispatch(updateTransferenceData());
    history.go(-3);
  };

  const onSubmit = () => {
    dispatch(updateTransferenceData({ toName }));
    history.push(TransferenceRoutes.selectBank);
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
            title="Transferência"
            subtitle="Qual o nome de quem receberá sua transferência"
            description="Não encontramos em seus contatos o CPF informado, precisamos de mais informações."
          />
        }
        main={
          <Box component="form" onSubmit={onSubmit}>
            <TextField
              label="Nome completo"
              value={toName}
              onChange={onToNameChange}
            />
          </Box>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                palette="primary"
                disabled={disableNextButton}
                endIcon={<KeyboardArrowRight color="secondary" />}
                onClick={onSubmit}
              >
                {nextLabel}
              </Button>
            }
          />
        }
      />
    </PageContainer>
  );
};
