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
      <div className="border-[1px] p-3">
        <span className="font-bold ">
          Our professional cleaners are certified and accredited by:
        </span>

        <div className="flex text-center italic">
          Your certifications go here
        </div>
      </div>

      {/* Domestic cleaning service in London */}
        <div className="relative w-full flex flex-col items-center justify-center overflow-hidden bg-home-domestic-cleaning1  md:bg-home-domestic-cleaning2 bg-no-repeat bg-cover md:bg-right-bottom">
          <div className="flex flex-col items-center top-0 bg-black/50 w-full h-full p-2">
            <div className="bg-white/25 hover:scale-[0.98]">
              <article className="py-4 px-6">
                <div className="text-white text-2xl">
                  Domestic Cleaning Service in London
                </div>
                <p className="mt-3 text-white text-sm leading-6">
                  We take pride in creating spotless environments that improve
                  the quality of life of and work of our clients. <br />
                  We know you are busy, we are here to take care of your home,
                  restaurant office, event centre and community. We offer a wide
                  range of cleaning services from domestic to commercial to
                  clients in London and South East London.
                </p>
              </article>
            </div>
            <article className="py-4 px-6 bg-white/25 mt-1 md:mt-1 hover:scale-[0.98]">
              <div className="text-white text-2xl">About Our Cleaners</div>
              <p className="mt-3 text-white text-sm leading-6">
                We take pride in creating spotless environments that improve the
                quality of life of and work of our clients. <br />
                We know you are busy, we are here to take care of your home,
                restaurant office, event centre and community. We offer a wide
                range of cleaning services from domestic to commercial to
                clients in London and South East London.
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
      <div className="bg-homemidshadegray">
        <article className="py-4 px-6">
          <div className="text-slate-600 text-xl">
            Why Choose McLev Cleaning Company?
          </div>
          <p className="mt-3 text-black/85 text-sm leading-6">
            We take pride in creating spotless environments that improve the
            quality of life of and work of our clients. <br />
            We know you are busy, we are here to take care of your home,
            restaurant office, event centre and community. We offer a wide range
            of cleaning services from domestic to commercial to clients in
            London and South East London.
          </p>
        </article>
        <article className="py-4 px-6">
          <div className="text-black/95 text-md mb-2 text-xl">
            Here are a few more reasons to call us right now:
          </div>
          <IconText
            key={Date.now.toString() + 7}
            icon={<Check size={15} strokeWidth={4} />}
            text="Lorem ipsum dolor sit amet dolor dolor sit"
            textStyle="text-sm leading-6 font-[450]"
            iconStyle="text-white rounded-full bg-primarycol p-1 mr-2"
          />
          <IconText
            key={Date.now.toString() + 6}
            icon={<Check size={15} strokeWidth={4} />}
            text="Lorem ipsum dolor sit amet dolor dolor sit"
            textStyle="text-sm leading-6 font-[450]"
            iconStyle="text-white rounded-full bg-primarycol p-1 mr-2"
          />
          <IconText
            key={Date.now.toString() + 5}
            icon={<Check size={15} strokeWidth={4} />}
            text="Lorem ipsum dolor sit amet dolor dolor sit"
            textStyle="text-sm leading-6 font-[450]"
            iconStyle="text-white rounded-full bg-primarycol p-1 mr-2"
          />
          <IconText
            key={Date.now.toString() + 4}
            icon={<Check size={15} strokeWidth={4} />}
            text="Lorem ipsum dolor sit amet dolor dolor sit"
            textStyle="text-sm leading-6 font-[450]"
            iconStyle="text-white rounded-full bg-primarycol p-1 mr-2"
          />
          <IconText
            key={Date.now.toString() + 3}
            icon={<Check size={15} strokeWidth={4} />}
            text="Lorem ipsum dolor sit amet dolor dolor sit"
            textStyle="text-sm leading-6 font-[450]"
            iconStyle="text-white rounded-full bg-primarycol p-1 mr-2"
          />
          <IconText
            key={Date.now.toString() + 1}
            icon={<Check size={15} strokeWidth={4} />}
            text="Lorem ipsum dolor sit amet dolor dolor sit"
            textStyle="text-sm leading-6 font-[450]"
            iconStyle="text-white rounded-full bg-primarycol p-1 mr-2"
          />
          <IconText
            key={Date.now.toString() + 2}
            icon={<Check size={15} strokeWidth={4} />}
            text="Lorem ipsum dolor sit amet dolor dolor sit"
            textStyle="text-sm leading-6 font-[450]"
            iconStyle="text-white rounded-full bg-primarycol p-1 mr-2"
          />
          <IconText
            icon={<Check size={15} strokeWidth={4} />}
            text="Lorem ipsum dolor sit amet dolor dolor sit"
            textStyle="text-sm leading-6 font-[450]"
            iconStyle="text-white rounded-full bg-primarycol p-1 mr-2"
          />
        </article>
      </div>
      {/* What our customers say about us */}
      <div className="py-4 px-3">
        <div className="text-xl text-black/80 mb-2 text-center p-2">
          <div className="bg-white/95 p-2">
            What our customers say about us{" "}
          </div>
        </div>
        {isFetchingFeedbacks ? (
          <div className="flex justify-center">
            <Loader2 className="animate-spin" />
          </div>
        ) : fetchFeedbacksError ? (
          <div className="text-center">Could not display feedbacks. </div>
        ) : (
          fetchFeedbacksData.feedbacks.length > 0 && (
            <div className="relative w-full flex flex-col items-center justify-center overflow-hidden">
              <div className="w-full h-full overflow-hidden">
                <Image
                  className="w-full h-full object-cover"
                  src={"/assets/img/new9.jpg"}
                  alt="cleaners"
                  width={500}
                  height={500}
                  quality={80}
                />
              </div>
              <div className="flex flex-col justify-center items-center absolute top-0 bg-black/40 w-full h-full p-2">
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
            <p className="mt-3 text-black/85 text-sm leading-6 text-center">
              Book a service with <b>McLev Cleaning Company</b> on{" "}
              <span className="text-secondarycol">{companyPhoneNumber}</span>.
              You can call us <b>24/7</b> now. We will be more than happy to
              provide you with all the information you need about our services.
              Don’t hesitate to take advantage competitive rates! We cover all
              major London areas and no job is too big or too small for us.
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
