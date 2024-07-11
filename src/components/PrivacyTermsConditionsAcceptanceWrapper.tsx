import ClientSideCookiesManager from "@/app/cookieManager";
import PrivacyTermsConditionsAcceptance from "./PrivacyTermsConditionsAcceptance";
import { privacy_Terms_Cond_Cookies_Policies_Acceptance_Cookie } from "@/helpers/cookies manager/cookieNames";

const PrivacyTermsConditionsAcceptanceWrapper = () => {
  const isTermsAncConditionsAndPrivacyCookiesPolicyAccepted = () => {
    const cookieManager = new ClientSideCookiesManager();

    return cookieManager.isCookieSet(
      privacy_Terms_Cond_Cookies_Policies_Acceptance_Cookie
    );
  };

  console.log(isTermsAncConditionsAndPrivacyCookiesPolicyAccepted());
  return (
    <div>
      {/* if cookie is not set, render ui to remind the user that by continuing to use the website, they consent to the terms, conditions, privacy and cookies policies */}
      {!isTermsAncConditionsAndPrivacyCookiesPolicyAccepted() && (
        <PrivacyTermsConditionsAcceptance />
      )}
    </div>
  );
};

export default PrivacyTermsConditionsAcceptanceWrapper;
