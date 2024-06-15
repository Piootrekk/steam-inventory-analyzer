import { InvestmentDetails } from "./investmentFormTypes";

export type ResponseInvestmentTemplate = {
  _id: string;
  steamId: string;
  spreadsheetName: string;
  investment: InvestmentDetails[] & { _id: string }[];
};
