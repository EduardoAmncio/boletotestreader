import {
  AccountState,
  InitialAccountState,
} from "features/account/redux/state";
import {
  InitialQrCodeTransferState,
  QrCodeTransferState,
} from "features/qrCodeTransfer/redux/state";
import {
  AuthState,
  UnauthenticatedState,
} from "../features/authentication/redux/state";

import {
  PaymentState,
  StartPaymentState,
} from "../features/payment/redux/state";

import {
  TransferenceState,
  InitialTransferenceState,
} from "../features/transference/redux/state";

export interface StoreState {
  auth: AuthState;
  account: AccountState;
  payment: PaymentState;
  qrCodeTransfer: QrCodeTransferState;
  transference: TransferenceState;
}

export const initialStoreState: StoreState = {
  auth: new UnauthenticatedState(),
  account: new InitialAccountState(),
  payment: new StartPaymentState(),
  qrCodeTransfer: new InitialQrCodeTransferState(),
  transference: new InitialTransferenceState(),
};

export type GetState = () => StoreState;
