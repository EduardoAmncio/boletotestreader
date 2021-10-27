import React from "react";
import { DateFormatter } from "_translate";

import { useStyles } from "./ReceiptDescription.style";

interface VoucherDescriptionProps {
  paymentValue: number;
  account: string;
  bank: string;
  paymentDate: Date;
  barcode: string;
}

export const ReceiptDescription: React.FC<VoucherDescriptionProps> = ({
  paymentValue,
  account,
  bank,
  paymentDate,
  barcode,
}: VoucherDescriptionProps) => {
  const styles = useStyles();
  return (
    <div className={styles.voucherContent}>
      <div> Transferência no valor de </div>
      <strong> R$ {paymentValue} </strong>
      <div> Recebedor </div>
      <strong> {account} </strong>
      <div> Data </div>
      {/* <strong> {bank} </strong> */}
      {/* <div> Banco emissor </div> */}
      <strong> {DateFormatter.format(paymentDate)} </strong>
      <div> Código de barras </div>
      <strong> {barcode} </strong>
    </div>
  );
};
