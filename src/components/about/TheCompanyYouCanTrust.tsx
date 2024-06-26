import Image from "next/image";

const TheCompanyYouCanTrust = () => {
  return (
    <div className="bg-homegray py-4 px-6 pb-8">
      <div className="w-full items-center flex flex-col my-3">
        <header className="font-bold text-black/90 mb-3">THE COMPANY YOU CAN TRUST</header>
        <div className="text-[14px] text-black/80 text-justify">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages.
        </div>
      </div>
      <div className="flex justify-center mt-8">
         <Image  width={400} height={400} src="/assets/home/cleaning6.jpg"className="w-full md:max-w-[400px]" quality={100} alt="workers" />
      </div>
    </div>
  );
};

export default TheCompanyYouCanTrust;
