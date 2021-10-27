
import { TypeBoleto } from "./Enum/TypeBoleto";

export interface BarcodeCIPPaymentData {
    receiverTaxId?: string;
    receiverName?: string;
    payerTaxId?: string;
    payerName?: string;
    paymentValue?: number;
    dueDate?: Date;
    discountValue?: number;
    fineValue?: number;
    tags?: string[];
    paymentDate?: Date;
    description?: string;
    canBePaid?: Boolean;
    type?: TypeBoleto;

}

