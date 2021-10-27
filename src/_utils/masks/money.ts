import { currencySymbol } from "_translate";

export const maskMoney = (value: string) => {
  let result = value
    .replace(/[\D]+/g, "")
    .replace(/(\d)/, `${currencySymbol} $1`)
    .replace(/([0-9]{2})$/g, ",$1");

  if (result.length > 5)
    result = result.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");

  return result;
};
