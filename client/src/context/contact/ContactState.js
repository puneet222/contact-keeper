import React, { useReducer } from "react";
import axios from "axios";
import ContactContext from "./contactContext";
import ContactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  CLEAR_CONTACTS,
  FILTER_CONTACT,
  SET_CURRENT_CONTACT,
  CLEAR_CURRENT_CONTACT,
  CLEAR_FILTER,
  CONTACT_ERROR,
  GET_CONTACTS
} from "../types";

const ContactState = props => {
  const initialState = {
    contacts: null,
    current: null,
    filteredContacts: null,
    error: null,
    loading: true
  };

  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  // Get Contacts

  const getContacts = async () => {
    try {
      const res = await axios.get("/api/contacts", config);
      dispatch({
        type: GET_CONTACTS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.data
      });
    }
  };

  // Add Contact

  const addContact = async contact => {
    try {
      const res = await axios.post("/api/contacts", contact, config);
      dispatch({
        type: ADD_CONTACT,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.data
      });
    }
  };

  // Clear Contacts

  const clearContacts = () => {
    dispatch({
      type: CLEAR_CONTACTS
    });
  };

  // Delete Contact

  const deleteContact = async id => {
    try {
      const res = await axios.delete(`/api/contacts/${id}`, config);
      dispatch({
        type: DELETE_CONTACT,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.data
      });
    }
  };

  // Set Current Contact

  const setCurrentContact = contact => {
    dispatch({ type: SET_CURRENT_CONTACT, payload: contact });
  };

  // Clear Current Contact

  const clearCurrentContact = () => {
    dispatch({ type: CLEAR_CURRENT_CONTACT });
  };

  // Update Contact

  const updateContact = async contact => {
    try {
      const res = await axios.put(`/api/contacts/${contact._id}`, contact);
      dispatch({
        type: UPDATE_CONTACT,
        payload: res.data.contact
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.data
      });
    }
  };

  // Filter Contact

  const filterContacts = text => {
    dispatch({ type: FILTER_CONTACT, payload: text });
  };

  // Clear Filter

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filteredContacts: state.filteredContacts,
        loading: state.loading,
        deleteContact,
        addContact,
        setCurrentContact,
        clearCurrentContact,
        updateContact,
        filterContacts,
        clearFilter,
        getContacts,
        clearContacts
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
