import MaxwidthWrapper from "@/components/Max_Min_widthWrapper";

const CookiesPolicyPage = () => {
  return (
    <MaxwidthWrapper>
      <main className="mt-[70px] px-2 md:px-4">
        <h1 className="text-xl font-bold">Cookies Policy</h1>

        {/* INTRODUCTION */}
        <div className="mb-3">
          <h2 className="font-bold">1. Introduction</h2>
          <p>
            This Cookies Policy explains how we use cookies and similar
            technologies on our website.
          </p>
          <p>
            By using our website, you consent to our use of cookies as described
            in this policy.
          </p>
        </div>

        {/* WHAT ARE COOKIES? */}
        <div className="mb-3">
          <h2 className="font-bold">2. What are Cookies?</h2>
          <ul className="list-disc pl-6">
            <li>
              Cookies are small text files that are stored on your device when
              you visit a website.
            </li>
            <li>
              They are used to store information about your preferences and to
              help the website function more effectively.
            </li>
          </ul>
        </div>

        {/* TYPES OF COOKIES WE USE */}
        <div className="mb-3">
          <h2 className="font-bold">3. Types of Cookies We Use</h2>
          <ul className="list-disc pl-6">
            <li>
              Session Cookies: These cookies are temporary and are deleted when
              you close your browser.
            </li>
            <li>
              Persistent Cookies: These cookies remain on your device for a
              longer period of time and help us remember your preferences and
              actions.
            </li>
            <li>
              Third-Party Cookies: These cookies are set by third-party
              services, such as our live chat provider or authentication
              service, and are used to enhance the functionality of our website.
            </li>
          </ul>
        </div>

        {/* HOW WE USE COOKIES */}
        <div className="mb-3">
          <h2 className="font-bold">4. How We Use Cookies</h2>
          <ul className="list-disc pl-6">
            <li>
              We use cookies to improve the functionality of our website, to
              enhance the user experience, and to aid in the authentication
              process.
            </li>
            <li>
              Our live chat feature relies on cookies to store session
              information and to provide a seamless experience for our users.
            </li>
            <li>
              We also use cookies to track your usage of our website and to help
              us understand how you interact with our services.
            </li>
          </ul>
        </div>

        {/* MANAGING COOKIES */}
        <div className="mb-3">
          <h2 className="font-bold">5. Managing Cookies</h2>
          <ul className="pl-6 list-disc">
            <li>
              You can manage or delete cookies through your browser settings.
            </li>
            <li>
              However, please note that disabling cookies may affect the
              functionality of our website and the services we provide.
            </li>
          </ul>
        </div>

        {/* CHANGES TO THIS COOKIES POLICY */}
        <div className="mb-3">
          <h2 className="font-bold">6. Changes to this Cookies Policy</h2>
          <p>
            We may update this Cookies Policy from time to time. Any changes
            will be posted on this page, and the revised version will be
            effective immediately upon posting.
          </p>
        </div>
      </main>
    </MaxwidthWrapper>
  );
};

export default CookiesPolicyPage;
