import Stepper from "../common/Stepper/Stepper";
import ContentWrapper from "../wrapper/ContentWrapper";
import FormCreating from "./FormCreating";

import { useState } from "react";

type ContentWrapperProps = {};

const CreatingProcess: React.FC<ContentWrapperProps> = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleClickNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleClickPrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <>
      <ContentWrapper className="m-12 p-12 flex flex-col gap-y-16">
        <div className="flex justify-center">
          <Stepper
            steps={["Spreedsheet", "Investments form", "Send to DB"]}
            currentStep={currentStep}
          />
        </div>
        <FormCreating
          page={currentStep}
          handleClickNext={handleClickNext}
          handleClickPrev={handleClickPrev}
        />
      </ContentWrapper>
    </>
  );
};

export default CreatingProcess;
