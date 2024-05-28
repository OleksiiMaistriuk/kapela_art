import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { policyDetails } from "../constants/policyDetails";

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);
  const [showPolicyDetails, setShowPolicyDetails] = useState(false);

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
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10 scrollbar-custom"
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
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 md:w-3/5 lg:w-1/2 bg-white bg-opacity-90 rounded-lg p-5 md:p-10 z-20 overflow-y-auto max-h-4/5">
          {showPolicyDetails ? (
            <ul className="max-h-96 overflow-y-auto">
              {policyDetails.map((detail) => (
                <li key={detail.title} className="mb-4">
                  <h2 className="font-bold text-lg">{detail.title}</h2>
                  <p className="text-sm">{detail.content}</p>
                </li>
              ))}
              <button
                className="mt-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                onClick={togglePolicyDetails}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setShowConsent(false);
                  }
                }}
              >
                Wróć
              </button>
            </ul>
          ) : (
            <div>
              <p className="mb-4 text-sm">
                Strona korzysta z plików cookies w celach statystycznych,
                marketingowych, realizacji obsługi uwierzytelniania
                użytkowników. Możesz określić warunki przechowywania lub dostępu
                do plików cookies w Twojej przeglądarce. Informujemy jednak, że
                zablokowanie cookies może uniemożliwić korzystanie z niektórych
                lub wszystkich funkcji serwisu.
              </p>
              <p className="mb-4 text-sm">
                Zapoznaj się z naszą{" "}
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
                  polityką prywatności
                </span>
                , aby dowiedzieć się więcej o tym, jak wykorzystujemy pliki
                cookies i chronimy Twoje dane.
              </p>
              <button
                className="px-4 py-2 bg-green-500 hover:bg-green-900rounded mr-2"
                onClick={acceptCookies}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setShowConsent(false);
                  }
                }}
              >
                Akceptuj
              </button>
              <button
                className="px-4 py-2 bg-red-500 hover:bg-red-900rounded"
                onClick={declineCookies}
                onKeyDown={(e) => {
                  if (e.key === "Esc" || e.key === " ") {
                    setShowConsent(false);
                  }
                }}
              >
                Nie akceptuj
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CookieConsent;
