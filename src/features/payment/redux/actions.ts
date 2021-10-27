import { Dispatch } from "redux";
import {
  PaymentAction,
  PaymentStartAction,
  PaymentSuccessAction,
  PaymentFailAction,
  PaymentIdentifyStartAction,
  PaymentIdentifySuccessAction,
  PaymentIdentifyFailAction,
  PaymentUpdateAction,
  CreatePaymentStartAction,
  CreatePaymentSucessAction,
  CreatePaymentFailAction,
  PaymentInitAction,
} from "./actionTypes";
import { InforsPaymentRequest } from "./models/request/inforsPayment";
import { InforsPaymentBarcodeRequest } from "./models/request/inforsPaymentBarcode";
import { HttpClient } from "_config/http";
import { ApiResponse } from "_config/api";
import { getBaseRequestData } from "_utils/http";
import { BarcodePaymentData } from "./models/BarcodePaymentData";
import { BarcodeCIPPaymentData } from "./models/BarcodeCIPPaymentData";
import { ValidatorBoletoData } from "./models/ValidatorBoletoData";
import { TypeBoleto } from "./models/Enum/TypeBoleto";
import { GetState } from "redux/state";
import { CreatePaymentRequest } from "./models/request/createPaymentRequest";
import { CreatePaymentResponse } from "./models/response/CreatePaymentResponse";

interface PaymentData {
  tags?: string[];
  paymentDate?: Date;
  description?: string;
}

export const updatePaymentState = (paymentData: PaymentData) => {
  return async (dispatch: Dispatch) => {

    try {
      dispatch<PaymentUpdateAction>({
        type: PaymentAction.PAYMENT_UPDATE,
        payload: paymentData
      });

    } catch (error) {
      dispatch<PaymentFailAction>({
        type: PaymentAction.PAYMENT_FAIL,
        payload: "Os campos informados estão inválidos",
      });
    }
  }
};

export const findInforsPaymentByBarCode = (
  _barcode: string,
) => {
  return async (dispatch: Dispatch, getState: GetState) => {
    try {
      dispatch<PaymentStartAction>({
        type: PaymentAction.PAYMENT_START,
      });

      let { url, defaultHeaders, accountId, token, accountTaxId } = getBaseRequestData(
        "/BoletoPayment/FindInfosPaymentByBarcode",
        getState(),
      );
      let data: InforsPaymentRequest = {
        accountId: accountId!,
        taxId: accountTaxId,
        barcode: _barcode,
      };

      const response = await HttpClient.post<any>(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      });

      const barcodePaymentData: BarcodePaymentData = response.data.data;

      data.barcode = barcodePaymentData.barcode;
      url = getBaseRequestData(
        "/BoletoPayment/FindInfosPaymentCIPByBarcode",
      ).url;

      const responseCIP = await HttpClient.post<any>(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      });

      const barcodePaymentCIPData: BarcodeCIPPaymentData = responseCIP.data.data;
      barcodePaymentCIPData.dueDate = new Date(barcodePaymentCIPData?.dueDate?.toString()!);
      barcodePaymentCIPData.paymentDate = new Date(barcodePaymentCIPData?.paymentDate?.toString()!);

      dispatch<PaymentSuccessAction>({
        type: PaymentAction.PAYMENT_SUCCESS,
        payload: {
          barcode: barcodePaymentData.barcode,
          barcodePaymentData: barcodePaymentCIPData,
        },
      });

    } catch (error: any) {
      let response: ApiResponse | undefined;
      if (error.response) response = error.response?.data;

      dispatch<PaymentFailAction>({
        type: PaymentAction.PAYMENT_FAIL,
        payload: response?.message ?? error.message,
      });
    }
  };
};

export const verifyIfBoletoCanBePayd = (_barcode: string) => {
  return async (dispatch: Dispatch, getState: GetState) => {
    try {

      dispatch<PaymentInitAction>({
        type: PaymentAction.PAYMENT_INIT,
      });

      dispatch<PaymentIdentifyStartAction>({
        type: PaymentAction.PAYMENT_IDENTIFY_START,
      });

      const { url, defaultHeaders, accountId, accountTaxId, token } = getBaseRequestData(
        "/BoletoPayment/VerifiyBoletoCanBePaid",
        getState()
      );

      const data: InforsPaymentBarcodeRequest = {
        accountId: accountId!,
        userId: accountTaxId!,
        barcode: _barcode,
      };

      const response = await HttpClient.post(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      });

      const boletoCanBePaid = response.data.success;

      let statusBoleto: ValidatorBoletoData = {
        canBePaid: false,
        typeBoleto: TypeBoleto.NOT_IDENTIFIED,
      };

      const digitTypeIdentifier = parseInt(_barcode[0]);

      if (boletoCanBePaid) {
        statusBoleto.canBePaid = true;

        if (digitTypeIdentifier === 8)
          statusBoleto.typeBoleto = TypeBoleto.DEALERSHIP;
        else if (digitTypeIdentifier >= 0 && digitTypeIdentifier <= 9)
          statusBoleto.typeBoleto = TypeBoleto.DEALERSHIP;
        else
          statusBoleto.typeBoleto = TypeBoleto.NOT_IDENTIFIED;
      }

      dispatch<PaymentIdentifySuccessAction>({
        type: PaymentAction.PAYMENT_IDENTIFY_SUCCESS,
        payload: {
          canBePaid: statusBoleto.canBePaid,
          type: statusBoleto.typeBoleto,
        },
      });
    } catch (error: any) {
      let response: ApiResponse | undefined;
      if (error.response) response = error.response?.data;

      dispatch<PaymentIdentifyFailAction>({
        type: PaymentAction.PAYMENT_IDENTIFY_FAIL,
        payload: response?.message ?? error.message,
      });
    }
  };
};

export const createPayment =
  () => async (dispatch: Dispatch, getState: GetState) => {
    try {
      dispatch<CreatePaymentStartAction>({
        type: PaymentAction.CREATE_PAYMENT_START,
      });

      const state = getState();

      const { url, defaultHeaders, token, accountId, userId } = getBaseRequestData(
        "/BoletoPayment",
        state
      );

      const paymentState = state.payment;
      const paymentData = paymentState.paymentData;

      const data: CreatePaymentRequest =
      {
        userId: userId,
        accountId: accountId,
        name: state.account.account?.name,
        taxId: paymentData?.receiverTaxId,
        receiverName: paymentData?.receiverName,
        receiverTaxId: paymentData?.receiverTaxId,
        payerName: paymentData?.payerName,
        payerTaxId: paymentData?.payerTaxId,
        barcode: paymentState.barcode,
        paymentValue: paymentData?.paymentValue,
        paymentDate: paymentData?.paymentDate,
        dueDate: paymentData?.dueDate,
        discountValue: paymentData?.discountValue,
        description: paymentData?.description,
      }

      await HttpClient.post<CreatePaymentResponse>(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch<CreatePaymentSucessAction>({
        type: PaymentAction.CREATE_PAYMENT_SUCESS,
      });

    } catch (error: any) {
      let response: ApiResponse | undefined;
      if (error.response) response = error.response?.data;

      dispatch<CreatePaymentFailAction>({
        type: PaymentAction.CREATE_PAYMENT_FAIL,
        payload: response?.message ?? error.message,
      });
    }
  };
