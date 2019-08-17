import React, { useContext, useEffect } from "react";
import Contacts from "../components/contacts/Contacts";
import ContactForm from "../components/contacts/ContactForm";
import FilterContacts from "../components/contacts/FilterContacts";
import AuthContext from "../context/auth/authContext";
import ContactContext from "../context/contact/contactContext";

const Home = props => {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);

  useEffect(() => {
    authContext.loadUser();
    contactContext.getContacts();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        <FilterContacts />
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
