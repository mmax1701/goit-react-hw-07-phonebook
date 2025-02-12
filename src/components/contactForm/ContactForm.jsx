import React from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactFormReducer';
import { nanoid } from 'nanoid';

const ContactForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const contact = {
      name: e.target[0].value,
      number: e.target[1].value,
      id: nanoid(),
    };

    e.target[0].value = '';
    e.target[1].value = '';

    dispatch(addContact(contact));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>Name</p>
        <input
          type="text"
          pattern="^[a-zA-Zа-яА-Я]+((['\- ][a-zA-Zа-яА-Я])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces."
          required
        />
        <p>Number</p>
        <input
          type="tel"
          pattern="^[\d\+\-\(\)\s]*$"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <button type="submit">Add contact</button>
      </form>
    </div>
  );
};

export default ContactForm;
