"use client";
import { companyPhoneNumber } from "@/helpers/siteInfo";
import HomeImageGallery from "../HomeImageGalery";
import HomeheroButton from "../ui/HomeheroButton";
import CarouselComponent, { FeedbackCarousel } from "../Carousel";
import { happyCustomersImages } from "@/helpers/homeImages";
import IconText from "../IconText";
import { Check, Loader2 } from "lucide-react";
import TestimonialCard from "../TestimonialCard";
import { trpc } from "@/trpc-client/client";
import { formatTimeDuration } from "@/helpers/utilities";
import { formatDistanceToNowStrict } from "date-fns";
import Link from "next/link";
import "./homeContent.css";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

const Homecontent = () => {
  const {
    data: fetchFeedbacksData,
    error: fetchFeedbacksError,
    isLoading: isFetchingFeedbacks,
  } = trpc.feedback.get.useQuery();

  const generateFeedbacksUi = (): React.JSX.Element[] => {
    const feebacksUi: React.JSX.Element[] = [];
    fetchFeedbacksData?.feedbacks.forEach((feedback, index) => {
      if (feedback.publishToFrontend) {
        feebacksUi.push(
          <TestimonialCard
            key={Date.now().toString() + 122}
            title={
              feedback.name.length > 24
                ? feedback.name.slice(0, 24)
                : feedback.name
            }
            subtitle={formatTimeDuration(
              formatDistanceToNowStrict(new Date(feedback.timeStamp), {
                addSuffix: true,
              })
            )}
            rating={feedback.rating}
            review={feedback.experience}
            response={
              feedback.adminResponse !== "" ? feedback.adminResponse : undefined
            }
          />
        );
      }
    });
    return feebacksUi;
  };
  return (
    <section>
      <article className="text-center py-6 px-3">
        <div className="flex items-center justify-center text-slate-600 text-2xl smd:text-2xl">
          <div className="inline-block smd:w-[3%] mr-3 h-[1px] bg-accentcol lgmd:w-[8%] lgmd:mr-4"></div>
          McLev Cleaning Company
          <div className="inline-block smd:w-[3%] ml-3 h-[1px] bg-accentcol lgmd:w-[8%] lgmd:mr-4"></div>
        </div>
        <span className="text-slate-500 block pt-4">
          McLev is a leading cleaning company dedicated to providing first-class
          cleaning services personalised to meet the exceptional needs of our
          clients in London and South East London.
          <br />
          We know you are busy, We are here to take care of your home,
          restaurant, office, event center and community.
          <br />
          Our dedicated team of cleaning professionals is passionate about
          delivering outstanding and high-quality cleaning solutions tailored to
          your unique needs. Don’t hesitate to call us today on <br />
          <span className="text-secondarycol">{companyPhoneNumber}</span>
        </span>
      </article>

      {/* Gallery section */}
      <HomeImageGallery />

      {/* certifications */}
      {/* <div className="border-[1px] p-3">
        <span className="font-bold ">
          Our professional cleaners are certified and accredited by:
        </span>

        <div className="flex text-center italic">
          Your certifications go here
        </div>
      </div> */}

      {/* Domestic cleaning service in London */}
      <div className="relative w-full flex flex-col items-center justify-center overflow-hidden bg-home-domestic-cleaning1  md:bg-home-domestic-cleaning2 bg-no-repeat bg-cover bg-center md:bg-right-bottom">
        <div className="flex flex-col items-center top-0 bg-black/60 w-full h-full p-2">
          <div className="bg-white/30 hover:scale-[0.98]">
            <article className="py-4 px-6">
              <div className="text-white text-2xl">
                Domestic Cleaning Service in London
              </div>
              <p className="mt-3 text-white text-sm md:text-base leading-6">
                At McLev Cleaning&#44; we offer comprehensive domestic cleaning
                services across London&#44; tailored to meet the unique needs of
                your home&#46; Our dedicated team of cleaning professionals is
                committed to delivering exceptional service and ensuring your
                space is spotless and hygienic&#46;
              </p>
            </article>
          </div>
          <article className="py-4 px-6 bg-white/30 mt-1 md:mt-1 hover:scale-[0.98]">
            <div className="text-white text-2xl">About Our Cleaners</div>
            <p className="mt-3 text-white text-sm leading-6 md:text-base">
              At McLev Cleaning&#44; our dedicated team of professional cleaners
              is committed to delivering exceptional service&#46; <br /> With
              years of expertise in the industry&#44; our cleaners uphold high
              standards of professionalism and integrity&#46; They are
              extensively trained&#44; ensuring they can handle various cleaning
              challenges with ease&#46; We prioritize customer satisfaction&#44;
              offering personalized cleaning solutions tailored to your
              needs&#46; Our cleaners use eco&#45;friendly products and
              practices to promote sustainability while providing outstanding
              results&#46; Trust our reliable team for transparent service and a
              cleaner&#44; healthier environment&#46;
            </p>
          </article>
        </div>
      </div>

      {/* happy clients carousel */}
      <div className="pt-4 pb-2">
        <div className="text-slate-600 text-xl text-center">
          Our Happy Clients
        </div>
        <div className="flex justify-center mt-2">
          <CarouselComponent
            images={[...happyCustomersImages, ...happyCustomersImages]}
          />
        </div>
        {/* All clients button
        <div className="flex justify-center mb-2">
          <HomeheroButton
            text={"ALL CLIENTS"}
            variant={"outline"}
            className="mt-4 rounded-none hover:bg-footergray hover:text-white border-black/75 text-black/75"
            size={"default"}
          />
        </div> */}
      </div>

      {/* Cant find service youre looking for section */}
      {/* <div className="bg-homegray flex flex-col items-center py-4">
        <span className="text-center text-slate-600">
          Can&apos;t find a service that you are looking for?
        </span>
        <div className="flex justify-center mb-2">
          <HomeheroButton
            text={"REQUEST A QUOTE"}
            variant={"outline"}
            className="mt-4 bg-accentcol text-white rounded-none hover:bg-transparent hover:border-black/75 hover:text-black/75"
            size={"default"}
          />
        </div>
      </div> */}

      {/* why choose mcLev section */}
      <div className="bg-homemidshadegray text-center">
        <article className="py-4 px-6">
          <div className="text-slate-600 text-xl md:text-2xl">
            Why Choose McLev Cleaning?
          </div>
          {/* <p className="mt-3 text-black/85 text-sm leading-6">
            We take pride in creating spotless environments that improve the
            quality of life of and work of our clients. <br />
            We know you are busy, we are here to take care of your home,
            restaurant office, event centre and community. We offer a wide range
            of cleaning services from domestic to commercial to clients in
            London and South East London.
          </p> */}
        </article>
        <article className="py-1 pb-4 px-2">
          <div className="text-black/95  mb-2 text-[16px]">
            Discover the McLev Cleaning difference:
          </div>
          <div className="flex flex-col items-center lgmd:flex-row lgmd:justify-evenly">
            <div className="px-2">
              <IconText
                key={Date.now.toString() + 7}
                icon={<Check size={15} strokeWidth={4} />}
                text="Professional Excellence&#58; Years of industry expertise ensuring top&#45;quality service&#46;"
                textStyle="text-sm leading-6 font-[450] md:text-[15px]"
                iconStyle="text-white rounded-full bg-primarycol p-1 mr-2"
                generalStyle="animate-in"
              />
              <IconText
                key={Date.now.toString() + 6}
                icon={<Check size={15} strokeWidth={4} />}
                text="Tailored Solutions&#58; Customized cleaning plans for homes and businesses&#46;"
                textStyle="text-sm leading-6 font-[450] md:text-[15px]"
                iconStyle="text-white rounded-full bg-primarycol p-1 mr-2"
                generalStyle="animate-in"
              />
              <IconText
                key={Date.now.toString() + 5}
                icon={<Check size={15} strokeWidth={4} />}
                text="Commitment to Quality&#58; Eco&#45;friendly products and meticulous cleaning methods&#46;"
                textStyle="text-sm leading-6 font-[450] md:text-[15px]"
                iconStyle="text-white rounded-full bg-primarycol p-1 mr-2"
              />
            </div>
            <div className="px-2">
              <IconText
                key={Date.now.toString() + 4}
                icon={<Check size={15} strokeWidth={4} />}
                text="Trusted Reputation&#58; Reliable&#44; transparent&#44; and customer&#45;focused service&#46;"
                textStyle="text-sm leading-6 font-[450] md:text-[15px]"
                iconStyle="text-white rounded-full bg-primarycol p-1 mr-2"
              />
              <IconText
                key={Date.now.toString() + 3}
                icon={<Check size={15} strokeWidth={4} />}
                text="Competitive Pricing&#58; Fair rates with no hidden costs&#46;"
                textStyle="text-sm leading-6 font-[450] md:text-[15px]"
                iconStyle="text-white rounded-full bg-primarycol p-1 mr-2"
              />
              <IconText
                key={Date.now.toString() + 1}
                icon={<Check size={15} strokeWidth={4} />}
                text="Convenient Scheduling&#58; Flexible options to fit your busy lifestyle&#46;"
                textStyle="text-sm leading-6 font-[450] md:text-[15px]"
                iconStyle="text-white rounded-full bg-primarycol p-1 mr-2"
              />
            </div>
          </div>
          <p className="italic mb-2">
            Experience cleanliness redefined with McLev Cleaning. <br />
          </p>
          <p>
            <Link href="/contact-us">
            <Button className="bg-primarycol text-white px-4 py-1  hover:bg-transparent hover:text-primarycol hover:border-[1px] border-primarycol tracking-wide" variant="default">Contact us today!</Button>
            </Link>
          </p>
        </article>
      </div>
      {/* What our customers say about us */}
      <div className="py-4 px-3">
        <div className="text-xl text-black/80 mb-2 text-center px-2">
          <div className="bg-white/95 p-2 text-slate-600">
            What our customers say about us{" "}
          </div>
        </div>
        {isFetchingFeedbacks ? (
          <div className="flex justify-center">
            <Loader2 className="animate-spin" />
          </div>
        ) : fetchFeedbacksError ? (
          <div className="text-center">Service temporarily unavailable&#46;</div>
        ) : (
          fetchFeedbacksData.feedbacks.length > 0 && (
            <div className="relative w-full flex flex-col items-center justify-center overflow-hidden">
              <div className="w-full h-full min-h-[400px] max-h-[500px] overflow-hidden">
                <Image
                  className="w-full h-full object-contain scale-[1.6] lgmd:scale-[1.0]"
                  src={"/assets/img/new9.jpg"}
                  alt="cleaners"
                  width={500}
                  height={500}
                  quality={80}
                />
              </div>
              <div className="flex flex-col justify-center items-center absolute top-0 bg-black/40 w-full h-full p-4">
                <FeedbackCarousel items={[...generateFeedbacksUi()]} />
              </div>
            </div>
          )
        )}
      </div>

      {/* How to get in touch section */}
      <div>
        <div className="bg-[#F4F4F4]">
          <article className="py-4 px-6">
            <div className="text-slate-600 text-2xl text-center">
              How to Get in Touch
            </div>
            <p className="mt-3 text-black/85 leading-6 text-center">
              Experience the difference with McLev Cleaning&#46; Contact us on{" "}
              <span className="text-secondarycol">{companyPhoneNumber}</span> today to schedule your cleaning service and discover a cleaner&#44; healthier space&#46;
            </p>
          </article>

          {/* book now and request a quote buttons */}
          <div className="flex flex-col items-center justify-center py-6 bg-[#F4F4F4]">
            <Link href={"/book-now"}>
              <HomeheroButton
                key={Date.now.toString() + 13}
                text={"BOOK NOW"}
                variant={"outline"}
                className="mt-4 bg-accentcol text-white rounded-none hover:bg-transparent hover:border-black/75 hover:text-black/75
              transition-all"
                size={"default"}
              />
            </Link>
            {/* <HomeheroButton
              key={Date.now.toString() + 14}
              text={"REQUEST A QUOTE"}
              variant={"outline"}
              className="mt-4 bg-transparent text-accentcol rounded-none hover:bg-transparent border-accentcol hover:border-2 hover:tracking-wider hover:text-accentcol transition-all"
              size={"default"}
            /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Homecontent;
