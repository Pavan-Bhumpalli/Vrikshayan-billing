import React, { useState } from 'react';
import Sidebar from './Sidebar';
import StepperControl from './StepperControl';
import Stepper from './Stepper';
import { UseContextProvider } from "./contexts/StepperContext";
import Account from "./steps/Account";
import Details from "./steps/Details";
import FinalNursery from "./steps/FinalNursery";
import { RiPlantFill } from 'react-icons/ri';
const Nursery = () => {
    const [currentStep, setCurrentStep] = useState(1);
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
                return <Account setPk={setPk} next={handleNext} />;
            case 2:
                return <Details pk={pk} next={handleNext} />;
            case 3:
                return <FinalNursery Customer_pk={pk} />;
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
            <div className="w-[95%] mx-auto pl-72">
                <div className="flex flex-col items-center justify-center bg-white shadow-xl rounded-2xl">
                    <div className={`mt-8 mb-8 rounded-full h-12 w-12 flex flex-col items-center justify-center bg-green-600 text-white font-bold  border-green-600"}`}>
                        <span className="text-xl font-bold text-white"><RiPlantFill className='w-7 h-7' /></span>
                        <div className='absolute w-32 mt-16 text-xl font-bold text-center text-[#2e7120] uppercase'>Nursery</div>
                    </div>
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
