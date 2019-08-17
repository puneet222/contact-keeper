import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactForm = () => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal"
  });

  const { name, email, phone, type } = contact;

  const contactContext = useContext(ContactContext);

  const {
    addContact,
    current,
    clearCurrentContact,
    updateContact
  } = contactContext;

  useEffect(() => {
    if (contactContext.current) {
      setContact(contactContext.current);
    } else {
      clearForm();
    }
  }, [contactContext, current]);

  const clearForm = () => {
    setContact({
      name: "",
      email: "",
      phone: "",
      type: "personal"
    });
  };

  const onChange = e => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (current) {
      // Update Contact
      updateContact(contact);
      clearCurrentContact();
    } else {
      addContact(contact);
    }
    clearForm();
  };

  return (
    <form onSubmit={onSubmit}>
      <h3 className="text-primary">
        {current ? "Edit Contact" : "Add Contact"}
      </h3>
      <input
        type="text"
        name="name"
        label="Name"
        placeholder="Name"
        value={name}
        onChange={onChange}
      />
      <input
        type="text"
        name="email"
        label="Email"
        placeholder="Email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        name="phone"
        label="Phone"
        placeholder="Phone"
        value={phone}
        onChange={onChange}
      />
      <input
        type="radio"
        name="type"
        label="Type"
        value="personal"
        checked={type === "personal"}
        onChange={onChange}
      />{" "}
      Personal{" "}
      <label>
        <input
          className="radio"
          type="radio"
          name="type"
          label="Type"
          value="professional"
          checked={type === "professional"}
          onChange={onChange}
        />{" "}
        Professional{" "}
      </label>
      <br />
      <input
        type="submit"
        className="btn btn-primary btn-block"
        value={current ? "Update Contact" : "Add Contact"}
      />
      {current && (
        <input
          type="submit"
          className="btn btn-light btn-block"
          value="Clear Contact"
          onClick={clearCurrentContact}
        />
      )}
    </form>
  );
};

export default ContactForm;
