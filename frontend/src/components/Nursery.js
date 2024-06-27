import React, { useState } from 'react';
import Sidebar from './Sidebar';
import StepperControl from './nursery/StepperControl';
import Stepper from './nursery/Stepper';
import { UseContextProvider } from "./contexts/StepperContext";
import Account from "./nursery/steps/Account";
import Details from "./nursery/steps/Details";
import Final from "./nursery/steps/Final";

const Nursery = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [userData, setUserData] = useState({});
    const [pk, setPk] = useState(0);

    const steps = [
        "Data Entry",
        "Details",
        "Shopping",
    ];

    const handleNext = () => {
        setCurrentStep(currentStep + 1);
    };

    const displayStep = (step) => {
        switch (step) {
            case 1:
                return <Account onSubmit={setPk} />;
            case 2:
                return <Details pk={pk} />;
            case 3:
                return <Final />;
            default:
                return null;
        }
    };

    const handleClick = (direction) => {
        if (direction === "next") {
            handleNext();
        } else {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className="flex  items-center h-screen">
            <Sidebar />
            <div className='w-[95%] mx-auto pl-72'>
            <div className="pb-2 bg-white shadow-xl rounded-2xl ">
                <div className="container mt-5 horizontal">
                    <Stepper steps={steps} currentStep={currentStep} />
                    <div className="p-10 my-10">
                        <UseContextProvider>{displayStep(currentStep)}</UseContextProvider>
                    </div>
                </div>
                {currentStep !== steps.length && (
                    <StepperControl
                        handleClick={handleClick}
                        currentStep={currentStep}
                        steps={steps}
                    />
                )}
            </div>
            </div>
        </div>
    );
};

export default Nursery;
