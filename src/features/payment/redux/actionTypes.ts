import { BarcodeCIPPaymentData } from './models/BarcodeCIPPaymentData';
import { BarcodePaymentData } from './models/BarcodePaymentData';
import { TypeBoleto } from './models/Enum/TypeBoleto';

export enum PaymentAction {

    PAYMENT_INIT = "PAYMENT_INIT",

    PAYMENT_START = "PAYMENT_START",
    PAYMENT_SUCCESS = "PAYMENT_SUCCESS",
    PAYMENT_UPDATE = "PAYMENT_UPDATE",
    PAYMENT_FAIL = "PAYMENT_FAIL",
    PAYMENT_LOADING = "PAYMENT_LOADING",

    PAYMENT_IDENTIFY_START = "PAYMENT_IDENTIFY_START",
    PAYMENT_IDENTIFY_SUCCESS = "PAYMENT_IDENTIFY_SUCCESS",
    PAYMENT_IDENTIFY_FAIL = "PAYMENT_IDENTIFY_FAIL",
    PAYMENT_IDENTIFY_LOADING = "PAYMENT_IDENTIFY_LOADING",

    CREATE_PAYMENT_START = "CREATE_PAYMENT_START",
    CREATE_PAYMENT_SUCESS = "CREATE_PAYMENT_SUCESS",
    CREATE_PAYMENT_FAIL = "CREATE_PAYMENT_FAIL",
}

export interface PaymentInitAction {
    type: PaymentAction.PAYMENT_INIT;
}

export interface PaymentStartAction {
    type: PaymentAction.PAYMENT_START;
}

export interface PaymentLoadingAction {
    type: PaymentAction.PAYMENT_LOADING;
}

export interface PaymentSuccessAction {
    type: PaymentAction.PAYMENT_SUCCESS;
    payload: {
        barcode: string,
        barcodePaymentData: BarcodeCIPPaymentData
    }
}

export interface PaymentUpdateAction {
    type: PaymentAction.PAYMENT_UPDATE;
    payload: BarcodeCIPPaymentData;
}

export interface PaymentFailAction {
    type: PaymentAction.PAYMENT_FAIL;
    payload: string;
}

export interface PaymentIdentifyStartAction {
    type: PaymentAction.PAYMENT_IDENTIFY_START;
}

export interface PaymentIdentifyLoadingAction {
    type: PaymentAction.PAYMENT_IDENTIFY_LOADING;
}

export interface PaymentIdentifySuccessAction {
    type: PaymentAction.PAYMENT_IDENTIFY_SUCCESS;
    payload: {
        canBePaid: Boolean,
        type: TypeBoleto,
    }
}

export interface PaymentIdentifyFailAction {
    type: PaymentAction.PAYMENT_IDENTIFY_FAIL;
    payload: string;
}

export interface CreatePaymentStartAction {
    type: PaymentAction.CREATE_PAYMENT_START;
}

export interface CreatePaymentSucessAction {
    type: PaymentAction.CREATE_PAYMENT_SUCESS;
}

export interface CreatePaymentFailAction {
    type: PaymentAction.CREATE_PAYMENT_FAIL;
    payload: string;
}

export type PaymentActions =
    | PaymentStartAction
    | PaymentLoadingAction
    | PaymentSuccessAction
    | PaymentUpdateAction
    | PaymentFailAction
    | PaymentIdentifyStartAction
    | PaymentIdentifyLoadingAction
    | PaymentIdentifySuccessAction
    | PaymentIdentifyFailAction
    | CreatePaymentStartAction
    | CreatePaymentSucessAction
    | CreatePaymentFailAction
    | PaymentInitAction;
