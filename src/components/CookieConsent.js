import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const CookieConsent = () => {
  const { t } = useTranslation();
  const [showConsent, setShowConsent] = useState(false);
  const [showPolicyDetails, setShowPolicyDetails] = useState(false);

  const policyDetails = t("policySection.sections", {
    returnObjects: true,
  });

  useEffect(() => {
    if (!Cookies.get("cookies-accepted")) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    Cookies.set("cookies-accepted", "true", { expires: 365 });
    setShowConsent(false);
  };

  const declineCookies = () => {
    Cookies.set("cookies-accepted", "false", { expires: 365 });
    setShowConsent(false);
  };

  const togglePolicyDetails = () => {
    setShowPolicyDetails(!showPolicyDetails);
  };

  return (
    <>
      {showConsent && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10"
          onClick={declineCookies}
          role="button"
          aria-label="Decline cookies"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Esc" || e.key === " ") {
              declineCookies();
            }
          }}
        />
      )}
      {showConsent && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 md:w-3/5 lg:w-1/2 bg-dark-licorice bg-opacity-90 rounded-lg p-5 md:p-10 z-20 overflow-y-auto max-h-4/5">
          {showPolicyDetails ? (
            <ul className="max-h-96 overflow-y-auto">
              {policyDetails.map((detail) => (
                <li key={detail.sectionTitle} className="mb-4">
                  <h2 className="font-bold text-lg">{detail.title}</h2>
                  <p className="text-sm">{detail.content}</p>
                </li>
              ))}
              <button
                className="px-4 py-2 border hover:border-gray-700 hover:text-gray-700 rounded mr-2"
                onClick={togglePolicyDetails}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setShowConsent(false);
                  }
                }}
              >
                {t("cookie_consent.policy_details")}
              </button>
            </ul>
          ) : (
            <div>
              <p className="mb-4 text-sm">{t("cookie_consent.description")}</p>
              <p className="mb-4 text-sm">
                {t("cookie_consent.privacy_policy")}
                <span
                  className="text-blue-500 cursor-pointer hover:underline"
                  onClick={togglePolicyDetails}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      togglePolicyDetails();
                    }
                  }}
                >
                  {t("cookie_consent.learn_more")}
                </span>
              </p>
              <button
                className="px-4 py-2 border hover:border-gray-700 hover:text-gray-700 rounded mr-2"
                onClick={acceptCookies}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setShowConsent(false);
                  }
                }}
              >
                {t("cookie_consent.accept")}
              </button>
              <button
                className="px-4 py-2 border hover:border-gray-700 hover:text-gray-700 rounded"
                onClick={declineCookies}
                onKeyDown={(e) => {
                  if (e.key === "Esc" || e.key === " ") {
                    setShowConsent(false);
                  }
                }}
              >
                {t("cookie_consent.decline")}
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CookieConsent;
