export type InvestmentDetails = {
  name: string;
  boughtPrice: number;
};

export type InvestmentFormTypes = {
  spreadsheetName: string;
  investments: InvestmentDetails[];
};
