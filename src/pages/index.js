import "animate.css";
import * as React from "react";
import { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import Layout from "../components/Layout";
import Seo from "../components/seo";
const IndexPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClick = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isLocalStorageAvailable()) {
      const modalShown = localStorage.getItem("modalShown");
      if (!modalShown) {
        setIsModalOpen(true);
        localStorage.setItem("modalShown", "true");
      }
    }
  }, []);

  return (
    <Layout>
      <Seo title="Home" />
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-dark-purple flex justify-center items-center z-50 cursor-pointer"
          onClick={handleModalClick}
        >
          <h1 className="text-3xl font-extrabold text-center xl:text-4xl">
            Magdalena Kapela
          </h1>
        </div>
      )}

      <HeroSection />
    </Layout>
  );
};

export default IndexPage;

export const Head = () => <Seo title="" description="" />;
function isLocalStorageAvailable() {
  try {
    localStorage.setItem("test", "test");
    localStorage.removeItem("test");
    console.log("location");
    return true;
  } catch (e) {
    return false;
  }
}
