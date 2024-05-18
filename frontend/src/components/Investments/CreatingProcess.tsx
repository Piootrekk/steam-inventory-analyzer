import Stepper from "../common/Stepper/Stepper";
import ContentWrapper from "../wrapper/ContentWrapper";
import { useState } from "react";

type ContentWrapperProps = {};

const CreatingProcess: React.FC<ContentWrapperProps> = () => {
  const [currentStep, setCurrentStep] = useState(0);
  return (
    <ContentWrapper className="m-12 p-12 flex justify-center">
      <Stepper steps={["Start", "Step-duo", "End"]} currentStep={currentStep} />
    </ContentWrapper>
  );
};

export default CreatingProcess;
