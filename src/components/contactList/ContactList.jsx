import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteContact,
  fetchContacts,
  filterContacts,
  selectContacts,
  selectContactsError,
  selectContactsLoading,
  selectFilter,
} from '../../redux/contactFormReducer';

const ContactList = () => {
  const contacts = useSelector(selectContacts) || [];
  const filter = useSelector(selectFilter) || '';
  const isLoading = useSelector(selectContactsLoading);
  const error = useSelector(selectContactsError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDelete = id => {
    dispatch(deleteContact(id));
  };

  const handleChange = e => {
    dispatch(filterContacts(e.target.value));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <div>
        <label>Find contacts by name</label>
        <input type="text" name="filter" onChange={handleChange} />
      </div>
      {error !== null && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}
      <div>
        <ul>
          {filteredContacts.map(contact => (
            <li key={contact.id}>
              {contact.name}: {contact.number}
              <button type="button" onClick={() => handleDelete(contact.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContactList;
