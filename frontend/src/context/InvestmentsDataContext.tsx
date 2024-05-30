import { createContext, useContext } from "react";
import { InvestmentFormTypes } from "../types/investmentFormTypes";

export const InvestmentsDataContext = createContext<
  | {
      investmentForm: InvestmentFormTypes;
      setInvestmentForm: (investmentForm: InvestmentFormTypes) => void;
    }
  | undefined
>(undefined);

export const useInvestmentsDataContext = () => {
  const context = useContext(InvestmentsDataContext);
  if (context === undefined) {
    throw new Error(
      "useInvestmentsDataContext must be used within an InvestmentsDataProvider"
    );
  }
  return context;
};
