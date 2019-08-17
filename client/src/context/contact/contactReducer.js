import {
  ADD_CONTACT,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  CLEAR_CONTACTS,
  GET_CONTACTS,
  CONTACT_ERROR,
  FILTER_CONTACT,
  CLEAR_FILTER,
  SET_CURRENT_CONTACT,
  CLEAR_CURRENT_CONTACT
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        loading: false
      };
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
        loading: false
      };
    case DELETE_CONTACT: {
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact._id !== action.payload
        ),
        loading: false
      };
    }
    case CLEAR_CONTACTS: {
      return {
        ...state,
        contacts: []
      };
    }
    case CONTACT_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }
    case SET_CURRENT_CONTACT: {
      return {
        ...state,
        current: action.payload
      };
    }
    case CLEAR_CURRENT_CONTACT: {
      return {
        ...state,
        current: null
      };
    }
    case UPDATE_CONTACT: {
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact._id === action.payload._id ? action.payload : contact
        ),
        loading: false
      };
    }
    case FILTER_CONTACT: {
      return {
        ...state,
        filteredContacts: state.contacts.filter(contact => {
          let regex = new RegExp(`${action.payload}`, "gi");
          return contact.name.match(regex) || contact.email.match(regex);
        }),
        loading: false
      };
    }
    case CLEAR_FILTER:
      return {
        ...state,
        filteredContacts: null
      };
    default:
      return state;
  }
};
