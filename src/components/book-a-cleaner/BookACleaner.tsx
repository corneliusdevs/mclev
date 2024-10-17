"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import HomeheroButton from "@/components/ui/HomeheroButton";
import SelectComponent from "@/components/SelectComponent";
import {
  servicesToSelect,
  servicesToSelectLookup,
} from "@/helpers/servicesToSelect";
import AlertDialogComponent from "@/components/AlertDialogComponent";
import { Loader2 } from "lucide-react";
import ServiceDetail from "@/components/book-a-cleaner/ServiceDetail";
import PersonalDetailsForm from "@/components/book-a-cleaner/PersonalDetailsForm";
import { getServiceQuestionaire } from "@/helpers/getServiceQuestionaire";
import { validateServiceQuestionaire } from "@/helpers/validateServiceQuestionaire";
import { SelectedOptionWithAnswers } from "@/helpers/updateSelectedOptions";

export type BookingSectionsType = "service type" | "details" | "personal information"

const BookACleaner = () => {

  const [currentSection, setCurrentSection] = useState<
  BookingSectionsType
  >("service type");

  const [selectedService, setSelectedService] = useState<string>("");

  const [selectedAnswers, setSelectedAnswers] = useState<
    SelectedOptionWithAnswers[]
  >([]);

  const persistedSelectedServiceRef = useRef<string>("");
  const persistedValidatedAnswersRef = useRef<SelectedOptionWithAnswers[]>();

  const updateSelectedAnswers = useCallback(setSelectedAnswers, [
    selectedAnswers, setSelectedAnswers
  ]);

  useEffect(() => {
    console.log(servicesToSelectLookup[selectedService], " selected Services");
  }, [selectedService, setSelectedAnswers]);

  const [error, setError] = useState({
    isError: false,
    detailsValidated: false,
    message: {
      title: "",
      description: "",
    },
  });

  let currentSectionUi = <div></div>;

  const sectionErrorManager = () => {
    const dummyReturn = <div className="hidden"></div>;
    console.log("errors ", error, currentSection);
    // manage errors if current section is 'choose a service'
    if (currentSection === "service type") {
      // if a service has been selected and there is still an error message, clear the error message
      if (selectedService !== "" && error.message.title !== "") {
        setError({
          isError: false,
          detailsValidated: false,
          message: {
            title: "",
            description: "",
          },
        });
      }
      // if no service has been selected and there is no error message, set the error message
      if (selectedService === "" && error.message.title === "") {
        setError((previousState) => {
          return {
            isError: true,
            detailsValidated: false,
            message: {
              title: "No Service Selected",
              description: "Please select a service",
            },
          };
        });
      }
    } else if (
      currentSection === "details" &&
      error.detailsValidated === false
    ) {
      //  manage errors if current section is 'details'
      // every required question must have at least one answer
      if (
        selectedAnswers.length === 0 &&
        error.message.description !==
          "Please make sure all questions are answered"
      ) {
        setError({
          isError: true,
          detailsValidated: false,
          message: {
            title: "Oops!",
            description: "Please make sure all questions are answered",
          },
        });
      }

      if (selectedAnswers.length !== 0) {
        let serviceName =
          selectedService !== ""
            ? servicesToSelectLookup[selectedService]
            : servicesToSelectLookup[persistedSelectedServiceRef.current];

        let questionaire = getServiceQuestionaire(serviceName);

        let result = validateServiceQuestionaire(questionaire, selectedAnswers);
        console.log(questionaire, selectedService, selectedAnswers);
        // if a service has been selected and there is still an error message, clear the error message

        if (result.pass === true && error.detailsValidated === false) {
          // clear errors
          setError({
            isError: false,
            detailsValidated: true,
            message: {
              title: "",
              description: "",
            },
          });
          return dummyReturn;
        } else {
          if (error.message.description !== result.question) {
            setError({
              isError: true,
              detailsValidated: false,
              message: {
                title: "Unanswered Question",
                description: result.question,
              },
            });

            return dummyReturn;
          }
        }
      }
    } else {
      if (error.isError !== false) {
        setError({
          isError: false,
          detailsValidated: false,
          message: {
            title: "",
            description: "",
          },
        });
      }
    }

    // dummy return to prevent errors because typescript expects us to return a react node since were calling the funtion in our component's JSX
    return <div className="hidden"></div>;
  };

  const currentSectionUiGenerator = (sectionUiToGenerate: BookingSectionsType) => {
    if (sectionUiToGenerate === "service type") {
      currentSectionUi = (
        <div className="px-8">
          <div className="pt-4">
            <span>
              Service Type<span className="text-red-500">&#42;</span>
            </span>
          </div>
          <div className="flex justify-start pb-8 border-b-[1px] border-greenaccentcol/15">
            <SelectComponent
              placeholder={"Select a service"}
              label={"Services"}
              itemsToSelect={servicesToSelect}
              onValueChange={setSelectedService}
            />
          </div>
        </div>
      );
    } else if (sectionUiToGenerate === "details") {
      currentSectionUi =
        selectedService !== "" ? (
          <ServiceDetail
            serviceName={servicesToSelectLookup[selectedService]}
            updateSelectedAnswers={updateSelectedAnswers}
          />
        ) : (
          <ServiceDetail
            serviceName={
              servicesToSelectLookup[persistedSelectedServiceRef.current]
            }
            updateSelectedAnswers={updateSelectedAnswers}
          />
        );
    } else if (sectionUiToGenerate === "personal information") {
      currentSectionUi = (
        <PersonalDetailsForm
          bookingInfo={
            selectedAnswers.length !== 0
              ? selectedAnswers
              : persistedValidatedAnswersRef.current
          }
          selectedService={
            selectedService !== ""
              ? selectedService
              : persistedSelectedServiceRef.current
          }
        />
      );
    }
  };

  // GENERATE THE CURRENT SECTION
  currentSectionUiGenerator(currentSection);
  {
    /* DETERMINE IF THERE ARE NO ERRORS */
  }
  {
    sectionErrorManager();
  }

  return (
    <div>
      {/* Current section display */}
      <div className="p-8 pb-2 text-greenaccentcol flex flex-col mdmid:flex-row">
        <div
          className={`text-[15px] mdmid:mr-4 ${
            currentSection === "service type" ? "opacity-100 underline underline-offset-8" : "opacity-30"
          }`}
        >
          Service type
        </div>
        <div
          className={`text-[15px] mdmid:mr-4 ${
            currentSection === "details" ? "opacity-100 underline underline-offset-8" : "opacity-30"
          }`}
        >
           Details
        </div>
        <div
          className={`text-[15px] mdmid:mr-4 ${
            currentSection === "personal information"
              ? "opacity-100 underline underline-offset-8"
              : "opacity-30"
          } pb-1`}
        >
          Personal information
        </div>
      </div>

      {/* Ui generator */}
      {currentSectionUi}

      {/* Buttons */}
      <div className="flex flex-col items-center py-4">
        {error.message.title === "No Service Selected" ? (
          <AlertDialogComponent
            description={error.message.description}
            title={error.message.title}
            actionText={"OK"}
            buttonClassname={
              "mt-4 bg-transparent px-8 text-secondarycol rounded-sm border-2 hover:bg-secondarycol border-secondarycol hover:tracking-wider hover:text-white transition-all"
            }
            buttonSize={"default"}
            buttonText={"Next"}
            buttonVariant={"outline"}
            actionButtonClassName={"bg-red-600 hover:bg-red-700"}
          />
        ) : currentSection === "details" && error.detailsValidated === false ? (
          <AlertDialogComponent
            description={error.message.description}
            title={error.message.title}
            actionText={"OK"}
            buttonClassname={
              "mt-4 bg-transparent px-8 text-secondarycol rounded-sm border-2 hover:bg-secondarycol border-secondarycol hover:tracking-wider hover:text-white transition-all transition-all"
            }
            buttonSize={"default"}
            buttonText={"Next"}
            buttonVariant={"outline"}
            actionButtonClassName={"bg-red-600 hover:bg-red-700"}
          />
        ) : (
          <HomeheroButton
            text={"Next"}
            variant={"outline"}
            className={`${
              currentSection === "personal information" && "hidden"
            } bg-transparent px-8 text-secondarycol rounded-sm border-2 hover:bg-secondarycol border-secondarycol hover:tracking-wider hover:text-white transition-all`}
            size={"default"}
            // LOADER FOR WHEN API CALL IS MADE
            icon={
              <div className="hidden">
                <div className="pl-2">
                  <Loader2 size={16} className="animate-spin" />
                </div>
              </div>
            }
            onClick={() => {
              if (currentSection === "service type") {
                persistedSelectedServiceRef.current = selectedService;
                setSelectedService("");
                setCurrentSection("details");
              } else if (currentSection === "details") {
                persistedValidatedAnswersRef.current = selectedAnswers;
                setSelectedAnswers([]);
                setCurrentSection("personal information");
              }
            }}
          />
        )}

        {/* PREVIOUS BUTTON LOGIC */}
        {currentSection !== "service type" && (
          <HomeheroButton
            text={"Previous"}
            variant={"outline"}
            className={`${
              currentSection === "personal information" ? "mt-[-50px]" : "mt-4 "
            } bg-transparent px-8 text-secondarycol rounded-sm border-2 hover:bg-secondarycol border-secondarycol hover:tracking-wider hover:text-white transition-all`}
            size={"default"}
            // LOADER FOR WHEN API CALL IS MADE
            icon={
              <div className="hidden">
                <div className="pl-2">
                  <Loader2 size={16} className="animate-spin" />
                </div>
              </div>
            }
            onClick={() => {
              setSelectedService("");
              if (currentSection === "details") {
                setCurrentSection("service type");
                setError({
                  isError: true,
                  detailsValidated: false,
                  message: {
                    title: "No Service Selected",
                    description: "Please select a service",
                  },
                });
              } else {
                setError((prev) => {
                  return {
                    ...prev,
                    detailsValidated: false,
                  };
                });
                setCurrentSection("details");
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default BookACleaner;
