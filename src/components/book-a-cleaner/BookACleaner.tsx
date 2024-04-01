"use client";

import { useState } from "react";
import HomeheroButton from "../ui/HomeheroButton";
import SelectComponent from "../SelectComponent";
import { servicesToSelect, servicesToSelectLookup } from "@/helpers/servicesToSelect";
import AlertDialogComponent from "../AlertDialogComponent";
import { Loader2 } from "lucide-react";
import ServiceDetail from "../ServiceDetail";
import PersonalDetailsForm from "./PersonalDetailsForm";

const BookACleaner = () => {
  // const section = ["choose a service", "details", "personal information"]
  const [currentSection, setCurrentSection] = useState<
    "choose a service" | "details" | "personal information"
  >("choose a service");

  const [selectedService, setSelectedService] = useState<string>("");

  // store the selected answered question and its answers
  const [serviceDetailsQuestionsAndAnswers, setServiceDetailsQuestionsAndAnswers] = useState([]);


  
  let currentSectionUi = <div></div>;
  
  const currentSectionUiGenerator = (sectionUiToGenerate:string)=> {

    if (sectionUiToGenerate === "choose a service") {
      currentSectionUi = (
        <div className="px-8">
          <div className="pt-4">
            <span>
              Choose a service<span className="text-red-500">&#42;</span>
            </span>
          </div>
          <div className="flex justify-start pb-8 border-b-[1px] border-greenaccentcol/15">
            <SelectComponent
              placeholder={"choose a service"}
              label={"Services"}
              itemsToSelect={servicesToSelect}
              onValueChange={setSelectedService}
            />
          </div>
        </div>
      );
    }



    else if(sectionUiToGenerate === "details"){
      
       currentSectionUi = <ServiceDetail serviceName={servicesToSelectLookup[selectedService]} onSelected={setServiceDetailsQuestionsAndAnswers}/>
    }
    
    else if(sectionUiToGenerate === "personal information"){
      
      currentSectionUi = <PersonalDetailsForm />
   }

  }
;

  // GENERATE THE CURRENT SECTION
  currentSectionUiGenerator(currentSection)
  // const validateInput = () => {
  //   if (currentSection === "choose a service") {
  //     setSelectedService("details");
  //   }
  // };

  return (
    <div>
      {/* Current section display */}
      <div className="p-8 pb-2 text-greenaccentcol">
        <div
          className={`text-[17px] ${
            currentSection === "choose a service" ? "opacity-100" : "opacity-30"
          }`}
        >
          <span className="text-2xl">&#49;</span> Choose a service
        </div>
        <div
          className={`text-[17px] ${
            currentSection === "details" ? "opacity-100" : "opacity-30"
          }`}
        >
          <span className="text-2xl">&#50;</span> Details
        </div>
        <div
          className={`text-[17px] ${
            currentSection === "personal information"
              ? "opacity-100"
              : "opacity-30"
          } pb-1 border-b-[1px] border-greenaccentcol/50`}
        >
          <span className="text-2xl">&#51;</span> Personal information
        </div>
      </div>

      {/* Ui generator */}
      {currentSectionUi}

      {/* Buttons */}
      <div className="flex flex-col items-center py-4">
        {selectedService !== "" ? (
          <HomeheroButton
            text={"Next"}
            variant={"outline"}
            className="mt-4 bg-transparent text-accentcol rounded-none border-2 hover:bg-transparent border-accentcol hover:bg-accentcol hover:tracking-wider hover:text-white/80 transition-all"
            size={"default"}
            // LOADER FOR WHEN API CALL IS MADE
            icon={
              <div className="hidden">
                <div className="pl-2">
                  <Loader2 size={16} className="animate-spin" />
                </div>
              </div>
            }
            onClick={()=>{
              if(currentSection === "choose a service"){
                setCurrentSection("details")
            }else if(currentSection === "details"){
              setCurrentSection("personal information") 
            }
            }}
          />
        ) : (
          <AlertDialogComponent
            description={"Please choose a service"}
            title={"No Service Selected"}
            actionText={"OK"}
            buttonClassname={
              "mt-4 bg-transparent text-accentcol rounded-none border-2 hover:bg-transparent border-accentcol hover:bg-accentcol hover:tracking-wider hover:text-white/80 transition-all"
            }
            buttonSize={"default"}
            buttonText={"Next"}
            buttonVariant={"outline"}
            actionButtonClassName={"bg-red-600 hover:bg-red-700"}
          />
        )}


           {/* PREVIOUS BUTTON LOGIC */}
        {
          currentSection !== "choose a service" && <HomeheroButton
          text={"Previous"}
          variant={"outline"}
          className="mt-4 bg-transparent text-accentcol rounded-none border-2 hover:bg-transparent border-accentcol hover:bg-accentcol hover:tracking-wider hover:text-white/80 transition-all"
          size={"default"}
          // LOADER FOR WHEN API CALL IS MADE
          icon={
            <div className="hidden">
              <div className="pl-2">
                <Loader2 size={16} className="animate-spin" />
              </div>
            </div>
          }
          onClick={()=>{
            setSelectedService("")
            if(currentSection === "details"){
                setCurrentSection("choose a service")
            }else{
              setCurrentSection("details") 
            }
          }}
        />
        }
      </div>
    </div>
  );
};

export default BookACleaner;
