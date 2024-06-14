import MaxwidthWrapper from "@/components/Max_Min_widthWrapper";
import ServicesBanner from "@/components/services page/ServicesBannner";
import ServicesCollapsible from "@/components/services page/ServicesCollapsible";
import { servicesPayload } from "@/helpers/homeImages";

const ServicesPage = () => {
  return (
    <main>
      <MaxwidthWrapper>
        <ServicesBanner />
        <div className="w-full flex items-center flex-col mb-12">
          {servicesPayload.map((service, index) => {
            return (
              <div id={service.link} className="w-full max-w-[560px] px-4 mb-4 mt-4">
                <ServicesCollapsible
                  key={service.text + index + "service"}
                  headerText={service.headerText}
                  contentText={service.descriptionText}
                  imageSrc={service.imageSrc}
                  imageAlt={service.imageAlt}
                />
              </div>
            );
          })}
        </div>
      </MaxwidthWrapper>
    </main>
  );
};

export default ServicesPage;
