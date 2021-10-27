
import { TypeBoleto } from "./Enum/TypeBoleto";

export interface BarcodePaymentData {
    digitableLine: string;
    barcode: string;
    dueDate: Date;
    bankCode: string;
    bankName: string;
    value: number;
    concessionaireName: string;
    concessionaireCode: string;
}

