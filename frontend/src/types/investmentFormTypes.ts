export type InvestmentDetails = {
  id: number;
  name: string;
  boughtPrice: number;
};

export type InvestmentFormTypes = {
  spreadsheetName: string;
  investments: InvestmentDetails[];
};
