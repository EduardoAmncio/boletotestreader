import React from "react";


interface VoucherDescriptionProps {
    value: string;
    account: string;
    cpf: string;
    data: string;
    description: string;
}


export const VoucherDescription: React.FC<VoucherDescriptionProps> = ({ value, account, cpf, data , description }: VoucherDescriptionProps) => {

    return (
        <div className="voucher-content">
            <div> Transferência no valor de </div>
            <strong> R$ {value} </strong>
            <div> para a conta Fitbank de </div>
            <strong> {account} </strong>
            <div> com CPF </div>
            <strong> {cpf} </strong>
            <div> no dia </div>
            <strong> {data} </strong>
            <div> descrição da transferência </div>
            <strong> {description} </strong>
        </div>
    );


};