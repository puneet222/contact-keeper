import React, { useContext, useState } from "react";
import ContactContext from "../../context/contact/contactContext";

const FilterContacts = () => {
  const contactContext = useContext(ContactContext);

  const [filter, setFilter] = useState("");

  const onChange = e => {
    setFilter(e.target.value);
    contactContext.filterContacts(filter);
    if (e.target.value === "") {
      contactContext.clearFilter();
    } else {
    }
  };

  return (
    <div>
      <input
        type="text"
        name="filter"
        placeholder="Filter"
        value={filter}
        onChange={onChange}
      />
    </div>
  );
};

export default FilterContacts;
