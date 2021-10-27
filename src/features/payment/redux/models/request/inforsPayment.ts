export interface InforsPaymentRequest {
  barcode: string;
  accountId: number;
  taxId?: string;
  description?: string;
}