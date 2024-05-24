import ServicesBanner from "@/components/services page/ServicesBannner";
import ServicesCollapsible from "@/components/services page/ServicesCollapsible";

const ServicesPage = () => {
  return (
    <main>
      <ServicesBanner />
      <div className="w-full flex items-center flex-col mb-12">
        <div className="w-full max-w-[560px] px-4 mb-4 mt-4">
          <ServicesCollapsible
            headerText={"ANTIVIRAL SANITATION"}
            contentText={
              "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum "
            }
            imageSrc="/assets/home/cleaning7.jpg"
            imageAlt="home cleaning"
          />
        </div>
        <div className="w-full max-w-[560px] px-4 mb-4">
          <ServicesCollapsible
            headerText={"UPHOSTERY CLEANING"}
            contentText={
              "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum "
            }
            imageSrc="/assets/home/cleaning15.jpeg"
            imageAlt="home cleaning"
          />
        </div>
        <div className="w-full max-w-[560px] px-4 mb-4">
          <ServicesCollapsible
            headerText={"END OF TENANCY CLEANING"}
            contentText={
              "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum "
            }
            imageSrc="/assets/banner/banner6.jpg"
            imageAlt="home cleaning"
          />
        </div>
        <div className="w-full max-w-[560px] px-4 mb-4">
          <ServicesCollapsible
            headerText={"HOUSE CLEANING"}
            contentText={
              "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum "
            }
            imageSrc="/assets/banner/banner5.jpg"
            imageAlt="home cleaning"
          />
        </div>
      </div>
    </main>
  );
};

export default ServicesPage;
