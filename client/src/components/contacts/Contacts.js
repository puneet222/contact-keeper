import React, { useContext } from "react";
import ContactItem from "./ContactItem";
import Loader from "../layout/Loader";

import ContactContext from "../../context/contact/contactContext";

const Contacts = props => {
  const contactContext = useContext(ContactContext);

  const { contacts, filteredContacts, loading } = contactContext;

  return (
    <div>
      {contacts !== null && !loading ? (
        filteredContacts ? (
          filteredContacts.map(contact => {
            return <ContactItem key={contact._id} contact={contact} />;
          })
        ) : (
          contacts.map(contact => {
            return <ContactItem key={contact._id} contact={contact} />;
          })
        )
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Contacts;
