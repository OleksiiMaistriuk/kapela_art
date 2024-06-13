import * as React from "react";
import ContactSection from "../components/ContactSection";
import Layout from "../components/Layout";
import Seo from "../components/seo";

const ContactPage = () => {
  return <Layout>{<ContactSection />}</Layout>;
};

export default ContactPage;

export const Head = () => (
  <Seo
    title="Kontakt"
    description="Skontaktuj się z nami w celu uzyskania więcej informacji o moich pracach artystycznych."
  />
);
