import ClientSideCookiesManager from "@/app/cookieManager";
import PrivacyTermsConditionsAcceptance from "./PrivacyTermsConditionsAcceptance";
import { privacy_Terms_Cond_Cookies_Policies_Acceptance_Cookie } from "@/helpers/cookies manager/cookieNames";
import { headers } from "next/headers";

const PrivacyTermsConditionsAcceptanceWrapper = () => {
  //  get the current path from the request headers. The x-current-path is set in the middleware.ts file located at the root of the project
  const headerList = headers();
  const currentPath: string | null = headerList.get("x-current-path");

  const isTermsAncConditionsAndPrivacyCookiesPolicyAccepted = () => {
    const cookieManager = new ClientSideCookiesManager();

    return cookieManager.isCookieSet(
      privacy_Terms_Cond_Cookies_Policies_Acceptance_Cookie
    );
  };

  const shouldDisplayPrivacyAndTerms = (currentPath: string | null) => {
    // determines if the desktop nav bar should have a transparent or white background based on the current url

    // if the current path is null, return false and dont continue executing
    if (!currentPath) {
      return false;
    }

    if (
      currentPath?.toLowerCase().indexOf("contact") !== -1 ||
      currentPath?.toLowerCase().indexOf("book") !== -1 ||
      currentPath?.toLowerCase().indexOf("sign") !== -1 ||
      currentPath?.toLowerCase().indexOf("log") !== -1 ||
      currentPath?.toLowerCase().indexOf("auth") !== -1
    ) {
      return true;
    }
    return false;
  };

  return (
    <div>
      {/* if cookie is not set, or user visits a page where we collect information from user, render ui to remind the user that by continuing to use the website, they consent to the terms, conditions, privacy and cookies policies */}
      {(isTermsAncConditionsAndPrivacyCookiesPolicyAccepted() ||
        shouldDisplayPrivacyAndTerms(currentPath)) && (
        <PrivacyTermsConditionsAcceptance />
      )}
    </div>
  );
};

export default PrivacyTermsConditionsAcceptanceWrapper;
