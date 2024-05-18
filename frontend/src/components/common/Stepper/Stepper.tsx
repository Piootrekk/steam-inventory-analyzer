import { TiTick } from "react-icons/ti";
import "./Stepper.css";

type StepperProps = {
  steps: string[];
  currentStep: number;
};

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <>
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`step-item ${currentStep === index && "current-step"} ${
              currentStep > index && "done"
            } `}
          >
            <div className="step">
              {currentStep > index ? <TiTick size={22} /> : index + 1}
            </div>
            <p>{step}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Stepper;
