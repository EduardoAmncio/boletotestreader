import { StoreState } from "redux/state";
import { ConfigProvider } from "_config/configProvider";

interface BaseRequestData {
  url: string;
  defaultHeaders: {
    ApiVersion: number;
  };
  taxId?: string;
  userTaxId?: string;
  userId?: number;
  accountTaxId?: string;
  accountId?: number;
  token?: string;
}

export const getBaseRequestData = (
  endpoint: string,
  state?: StoreState
): BaseRequestData => {
  return {
    url: `${ConfigProvider.config.api.baseUrl}${endpoint}`,
    defaultHeaders: ConfigProvider.config.api.defaultHeaders,

    taxId: state?.auth.user?.taxId,
    userTaxId: state?.auth.user?.taxId,
    userId: state?.auth.user?.id,
    accountTaxId: state?.account.account?.taxId,
    accountId: state?.account.account?.accountId,
    token: state?.auth.token,

  };
};
