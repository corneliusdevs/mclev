import MaxwidthWrapper from "@/components/Max_Min_widthWrapper";
import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <MaxwidthWrapper>
      <main className="px-2 md:px-4">
        <div className="mt-[70px]">
          <h1 className="font-bold text-xl">Privacy Policy</h1>

          {/* INTRODUCTION */}
          <div className="mb-3">
            <h2 className="font-bold text-base">1. Introduction</h2>
            <p className="">
              This Privacy Policy outlines how we collect, use, and protect the
              personal information of our users on our website.
            </p>
            <p>
              By using our website, you agree to the terms of this Privacy
              Policy.
            </p>
          </div>

          {/* PERSONAL INFORMATION WE COLLECT */}
          <div className="mb-3">
            <h2 className="font-bold">2. Personal Information We Collect</h2>
            <ul className="list-disc pl-6">
              <li>
                We collect the following personal information from you: name,
                email address, phone number, address, and postal code.
              </li>
              <li>
                We may also collect information about your device, such as your
                IP address, browser type, and operating system, as well as your
                usage of our website, such as the pages you visit and the
                actions you take.
              </li>
              <li>
                We use cookies to enhance the functionality of our live chat
                feature, to aid in the authentication process, and to improve
                your overall experience on our website.
              </li>
            </ul>
          </div>

          {/* HOW WE USE YOUR PERSONAL INFORMATION */}
          <div className="mb-3">
            <h2 className="font-bold">
              3. How We Use Your Personal Information
            </h2>
            <ul className="list-disc pl-6">
              <li>
                We use your personal information to provide you with our
                cleaning services, to communicate with you, and to improve our
                website and services.
              </li>
              <li>
                We may use your email address and phone number to send you
                updates, newsletters, or other information about our services.
              </li>
              <li>
                We may use your address and postal code to provide you with
                customized cleaning services and to ensure accurate scheduling
                and delivery.
              </li>
            </ul>
          </div>

          {/* SHARING YOUR PERSONAL INFORMATION */}
          <div className="mb-3">
            <h2 className="font-bold">4. Sharing Your Personal Information</h2>
            <ul className="list-disc pl-6">
              <li>
                We do not sell or rent your personal information to third
                parties.
              </li>
              <li>
                We may share your personal information with our service
                providers, such as payment processors, third-party cleaning
                providers, or authentication service providers, to enable us to
                deliver our services to you.
              </li>
              <li>
                We may also share your personal information as required by law
                or to protect our rights and the rights of others.
              </li>
            </ul>
          </div>

          {/* DATA SECURITY */}
          <div className="mb-3">
            <h2 className="font-bold">5. Data Security</h2>
            <ul className="list-disc pl-6">
              <li>
                We take reasonable measures to protect your personal information
                from unauthorized access, use, or disclosure.
              </li>
              <li>
                We use industry-standard encryption and security practices to
                safeguard your data.
              </li>
              <li>
                However, no method of transmission over the internet or method
                of electronic storage is 100% secure. Therefore, we cannot
                guarantee the absolute security of your personal information.
              </li>
            </ul>
          </div>

          {/* YOUR RIGHTS */}
          <div className="mb-3">
            <h2 className="font-bold">6. Your Rights</h2>
            <ul className="list-disc pl-6">
              <li>
                You have the right to access, correct, or delete your personal
                information.
              </li>
              <li>
                You can also request that we stop using your personal
                information or that we limit our use of it.
              </li>
              <li>
                If you have any questions or concerns about our privacy
                practices, please contact us at &#91;email protected&#93;
              </li>
            </ul>
          </div>

          {/* CHANGES TO THIS PRIVACY POLICY */}
          <div className="mb-3">
            <h2 className="font-bold">7. Changes to this Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page, and the revised version will be
              effective immediately upon posting.
            </p>
          </div>
        </div>
      </main>
    </MaxwidthWrapper>
  );
};

export default PrivacyPolicyPage;
