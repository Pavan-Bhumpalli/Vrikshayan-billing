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
    const [customerData, setCustomerData] = useState(null); // Assuming this is where you store customer data

    const steps = [
        "Data Entry",
        "Details",
        "Shopping",
    ];

    const handleNext = () => {
        setCurrentStep(currentStep + 1);
    };

    const handleUpdateUserData = (data) => {
        setUserData(data);
        handleNext();
    };

    const displayStep = (step) => {
        switch (step) {
            case 1:
                return <Account onNext={handleUpdateUserData} />;
            case 2:
                return <Details userData={userData} />;
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
        <div className="flex items-center h-screen">
            <Sidebar />
            <div className="w-1/2 pb-2 mx-auto bg-white shadow-xl rounded-2xl">
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
    );
};

export default Nursery;
