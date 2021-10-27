import { AttachFile } from "@material-ui/icons";
import { CurrencyFormatter, DateFormatter } from "_translate";
import React from "react";

import "./DetailPaymentDescription.scss"

interface DetailPaymentDescriptionProps {
    paymentValue: number;
    receiverName: string;
    paymentDate: Date;
    description: string;
    // company: string;
    barcode: string;
}

export const DetailPaymentDescription: React.FC<DetailPaymentDescriptionProps> =
    ({ paymentValue, receiverName, paymentDate, description, /*company,*/ barcode }: DetailPaymentDescriptionProps) => {

        return (
            <div className="detailPayment-content">
                <div> Pagamento no valor de </div>
                <div className="payment-detail">{CurrencyFormatter.format(paymentValue)}</div>
                <div> Recebedor </div>
                <div className="payment-detail">{receiverName}</div>
                <div> no dia </div>
                <div className="payment-detail"> {DateFormatter.format(paymentDate)} </div>
                <div> sua descrição foi </div>
                <div className="payment-detail"> {description} </div>
                {/* <div> Banco Emissor </div>
                <div className="payment-detail"> {company} </div> */}
                {/* <div> Código do Boleto </div>
                <div className="payment-detail"> {barcode} </div> */}
                <div> Anexos </div>
            </div>
        );

    };