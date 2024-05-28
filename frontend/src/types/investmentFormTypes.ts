export type InvestmentDetails = {
  id: number;
  name: string;
  boughtPrice: number;
};

export type InvestmentFormTypes = {
  id: number;
  spreadsheetName: string;
  investments: InvestmentDetails[];
};
