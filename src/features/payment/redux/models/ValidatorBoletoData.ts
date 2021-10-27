import {TypeBoleto} from '../models/Enum/TypeBoleto';

export interface ValidatorBoletoData{
    typeBoleto: TypeBoleto,
    canBePaid: Boolean
}