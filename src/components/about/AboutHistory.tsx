import HoverCardComponent from "../HoverCardComponent";

const HistoryComponent = () => {
  return (
    <div className="flex flex-col px-12 items-center py-8">
      <div>
        <header className="text-2xl font-bold text-black/90">
          Our History
        </header>
      </div>
      <div className="flex justify-center text-black/80 font-[14px] w-[70%] text-center">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever
        since the 1500s
      </div>
      <div className="w-full relative">
        <div className="flex w-full px-4 py-4 items-center relative">
          <div className="w-4 h-4 bg-green-600 animate-ping transition duration-[2000ms] ease-in-out rounded-full p-2 mx-4" />
          <HoverCardComponent  text={"Lorem ipsum dolro sit amet sit amet Lorem ipsum dolro sit amet sit ametLorem ipsum dolro sit amet sit ametLorem ipsum dolro sit amet sit amet"} triggerText="Start up 2019" 
          triggerClassname="w-full flex-items-center p"
          textClassname="p-4"
          />
          <div className="w-4 h-4 bg-green-600 rounded-full p-2 mx-4 absolute top-[20px] left-[16px]"/>
        </div>
        <div className="flex w-full px-4 py-4 items-center relative">
          <div className="w-4 h-4 bg-green-600 animate-ping transition duration-[2000ms] ease-in-out rounded-full p-2 mx-4" />
          <HoverCardComponent  text={"Lorem ipsum dolro sit amet sit amet Lorem ipsum dolro sit amet sit ametLorem ipsum dolro sit amet sit ametLorem ipsum dolro sit amet sit amet"} triggerText="Launched 2020" 
          triggerClassname="w-full flex-items-center p"
          textClassname="p-4"
          />
          <div className="w-4 h-4 bg-green-600 rounded-full p-2 mx-4 absolute top-[20px] left-[16px]"/>
        </div>
        <div className="flex w-full px-4 py-4 items-center relative">
          <div className="w-4 h-4 bg-green-600 animate-ping transition duration-[2000ms] ease-in-out rounded-full p-2 mx-4" />
          <HoverCardComponent  text={"Lorem ipsum dolro sit amet sit amet Lorem ipsum dolro sit amet sit ametLorem ipsum dolro sit amet sit ametLorem ipsum dolro sit amet sit amet"} triggerText="Start up 2019" 
          triggerClassname="w-full flex-items-center p"
          textClassname="p-4"
          />
          <div className="w-4 h-4 bg-green-600 rounded-full p-2 mx-4 absolute top-[20px] left-[16px]"/>
        </div>
        <div className="flex w-full px-4 py-4 items-center relative">
          <div className="w-4 h-4 bg-green-600 animate-ping transition duration-[2000ms] ease-in-out rounded-full p-2 mx-4" />
          <HoverCardComponent  text={"Lorem ipsum dolro sit amet sit amet Lorem ipsum dolro sit amet sit ametLorem ipsum dolro sit amet sit ametLorem ipsum dolro sit amet sit amet"} triggerText="Launched 2021" 
          triggerClassname="w-full flex-items-center"
          textClassname="p-4"
          />
          <div className="w-4 h-4 bg-green-600 rounded-full p-2 mx-4 absolute top-[20px] left-[16px]"/>
        </div>
        <div className="flex w-full px-4 py-4 items-center relative">
          <div className="w-4 h-4 bg-green-600 animate-ping transition duration-[2000ms] ease-in-out rounded-full p-2 mx-4" />
          <HoverCardComponent  text={"Lorem ipsum dolro sit amet sit amet Lorem ipsum dolro sit amet sit ametLorem ipsum dolro sit amet sit ametLorem ipsum dolro sit amet sit amet"} triggerText="Rebranded 2023" 
          triggerClassname="w-full flex-items-center"
          textClassname="p-4"
          />
          <div className="w-4 h-4 bg-green-600 rounded-full p-2 mx-4 absolute top-[20px] left-[16px]"/>
        </div>
        <div className="h-[220px] w-[2px] bg-footergray/90 absolute top-[32px] left-[39px] z-[-20]" />
      </div>
    </div>
  );
};

export default HistoryComponent;
