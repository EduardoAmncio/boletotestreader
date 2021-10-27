import { BarcodeCIPPaymentData } from "./models/BarcodeCIPPaymentData";

export interface PaymentState {
  barcode?: string;
  paymentData?: BarcodeCIPPaymentData;
  loading: boolean;
  errorMessage?: string;
}

export class LoadingPaymentState implements PaymentState {
  loading: boolean = true;
  errorMessage?: string;
  constructor(public barcode?: string, public paymentData?: BarcodeCIPPaymentData) { }
}
export class StartPaymentState implements PaymentState {
  barcode?: string;
  paymentData?: BarcodeCIPPaymentData;
  loading: boolean = false;
  errorMessage?: string;
}

export class SuccessPaymentState implements PaymentState {
  loading: boolean = false;
  errorMessage?: string;

  constructor(public barcode: string, public paymentData: BarcodeCIPPaymentData) { }
}

export class UpdatePaymentState implements PaymentState {

  loading: boolean = false;
  errorMessage?: string;

  constructor(
    public barcode: string,
    public paymentData: BarcodeCIPPaymentData,
  ) { }
}

export class ErrorPaymentState implements PaymentState {
  loading: boolean = false;

  constructor(
    public errorMessage: string,
    public barcode?: string,
    public paymentData?: BarcodeCIPPaymentData,
  ) { }
}

// export interface PaymentBoletoState {
//   barcode?: string;
//   boletoData?: ValidatorBoletoData;
//   loading: boolean;
//   errorMessage?: string;
// }

// export class LoadingPaymentBoletotState implements PaymentBoletoState {
//   barcode?: string;
//   boletoData?: ValidatorBoletoData;
//   loading: boolean = true;
//   errorMessage?: string;
// }
// export class StartPaymentBoletoState implements PaymentBoletoState {
//   barcode?: string;
//   boletoData?: ValidatorBoletoData;
//   loading: boolean = false;
//   errorMessage?: string;
// }

// export class SuccessPaymentBoletoState implements PaymentBoletoState {
//   loading: boolean = false;
//   errorMessage?: string;
//   constructor(public barcode: string, public boletoData: ValidatorBoletoData) {}
// }
// export class ErrorPaymentBoletoState implements PaymentBoletoState {
//   loading: boolean = false;

//   constructor(public errorMessage: string) {}
// }
