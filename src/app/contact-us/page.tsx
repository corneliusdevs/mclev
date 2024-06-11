import MaxwidthWrapper from "@/components/Max_Min_widthWrapper";
import ContactUs from "@/components/contact/Contact";
import ContactUsForm from "@/components/contact/ContactUsForm";

const ContactPage = () => {
  return (
    <main className="px-4">
      <MaxwidthWrapper>
        <div className="w-full mt-4 p-4 font-bold text-2xl">
          <header>
            <span
              className="underline underline-offset-[8px]"
              style={{
                textDecorationColor: "green",
                textDecorationThickness: "4px",
                lineHeight: "2.5rem",
              }}
            >
              Get
            </span>{" "}
            In Touch
          </header>
        </div>
        <div>
          <ContactUsForm />
          <ContactUs />
        </div>
      </MaxwidthWrapper>
    </main>
  );
};

export default ContactPage;
