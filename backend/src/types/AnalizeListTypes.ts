export type InvestmentDetails = {
  id: number;
  name: string;
  boughtPrice: number;
};

export type InvestmentFormTypes = {
  steamId: string;
  spreadsheetName: string;
  investments: InvestmentDetails[];
};
