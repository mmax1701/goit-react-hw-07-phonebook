import { configureStore } from '@reduxjs/toolkit';
import { contactFormReducer } from './contactFormReducer';

export const store = configureStore({
  reducer: {
    contactForm: contactFormReducer,
  },
});
