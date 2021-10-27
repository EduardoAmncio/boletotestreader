import React from "react";
import { useHistory } from "react-router-dom";
import { Container } from "@material-ui/core";
import { Close, KeyboardArrowRight } from "@material-ui/icons";
import { PageTitle } from "features/onboarding/components/texts/PageTitle";
import { ProcessDescriptionHeader } from "components/ProcessDescriptionHeader";
import { ProcessPageFooter } from "components/ProcessPageFooter";
import { AppBar } from "components/AppBar";
import { Button } from "components/Button";
import { PasswordInput } from "features/onboarding/components/inputs/PasswordInput";
import { cancelLabel, nextLabel } from "constants/buttons/labels";
import { OnboardingRoutes } from "features/onboarding/constants/routes";

import { useStyle } from "_assets/makeStyles/container/container.style";
import "_assets/css/forms/mainform.scss";

export const CreatePassword: React.FC = () => {
  const history = useHistory();
  const style = useStyle();

  const [passwordInput, setPasswordInput] = React.useState("");

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPasswordInput(event.target.value);

  const onCancelButtonClick = () => {
    history.replace(OnboardingRoutes.activateAccount);
  };

  const onNextButtonClick = () => {
    history.push(OnboardingRoutes.createPasswordForCard);
  };

  return (
    <Container maxWidth="xs" className={style.container}>
      <div className="main-form">
        <AppBar
          homeRoute={OnboardingRoutes.welcome}
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
        <div className="form-body">
          <div className="top">
            <PageTitle text="Ative sua Conta" />
            <ProcessDescriptionHeader
              title="Criar uma senha para sua conta"
              description="Essa senha deve ter 6 dígitos e deve ter ao menos uma letra"
            />
          </div>
          <div className="content">
            <div className="align-top">
              <PasswordInput
                label="Senha"
                onChange={onPasswordChange}
                value={passwordInput}
              />
            </div>
          </div>
        </div>
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
      </div>
    </Container>
  );
};
