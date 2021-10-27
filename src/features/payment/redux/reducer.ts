import { PaymentAction, PaymentActions } from "./actionTypes";
import { BarcodeCIPPaymentData } from "./models/BarcodeCIPPaymentData";
import { BarcodePaymentData } from "./models/BarcodePaymentData";

import {
  PaymentState,
  ErrorPaymentState,
  StartPaymentState,
  LoadingPaymentState,
  SuccessPaymentState,
  UpdatePaymentState,
  // PaymentBoletoState,
  // ErrorPaymentBoletoState,
  // StartPaymentBoletoState,
  // LoadingPaymentBoletotState,
  // SuccessPaymentBoletoState,
} from "./state";

const initialState: PaymentState = new StartPaymentState();

export const paymentReducer = (state = initialState, action: PaymentActions) => {

  switch (action.type) {

    case PaymentAction.PAYMENT_INIT:
      return new StartPaymentState();

    case PaymentAction.PAYMENT_START || PaymentAction.PAYMENT_IDENTIFY_START || PaymentAction.CREATE_PAYMENT_START:
      return new LoadingPaymentState(state.barcode, state.paymentData);

    case PaymentAction.PAYMENT_SUCCESS:
      const barcodePaymentData: BarcodeCIPPaymentData = {
        ...action.payload.barcodePaymentData,
        canBePaid: state.paymentData?.canBePaid,
        type: state.paymentData?.type,
      }
      return new UpdatePaymentState(action.payload.barcode, barcodePaymentData);

    case PaymentAction.CREATE_PAYMENT_SUCESS:
      return new SuccessPaymentState(
        state.barcode!,
        state.paymentData!,
      );

    case PaymentAction.PAYMENT_IDENTIFY_SUCCESS:
      const updatedPaymentIdentifier: BarcodeCIPPaymentData = {
        ...state.paymentData,
        type: action.payload.type,
        canBePaid: action.payload.canBePaid,
      }

      return new UpdatePaymentState(state.barcode!, updatedPaymentIdentifier);

    case PaymentAction.PAYMENT_UPDATE:
      const updatedPaymentData: BarcodeCIPPaymentData = {
        ...state.paymentData,
        ...action.payload
      }

      return new UpdatePaymentState(state.barcode!, updatedPaymentData);

    case PaymentAction.PAYMENT_FAIL || PaymentAction.PAYMENT_IDENTIFY_FAIL || PaymentAction.CREATE_PAYMENT_FAIL:
      return new ErrorPaymentState(action.payload, state.barcode, state.paymentData);

    default:
      return state;
  }
};
