import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL =
  'https://67ac68045853dfff53da90aa.mockapi.io/contacts/contacts';

export const fetchContacts = createAsyncThunk(
  'contactForm/fetchContacts',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(BASE_URL);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contactForm/addContact',
  async (contact, thunkAPI) => {
    try {
      const { data } = await axios.post(BASE_URL, contact);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contactForm/deleteContact',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: '',
};

const contactSlice = createSlice({
  name: 'addNewContact',
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.contacts.items.push(action.payload);
    },
    deleteContact: (state, action) => {
      state.contacts.items = state.contacts.items.filter(
        contact => contact.id !== action.payload
      );
    },
    filterContacts: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchContacts.pending, state => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.items.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.contacts.error = action.payload;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.items = state.contacts.items.filter(
          contact => contact.id !== action.payload
        );
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.contacts.error = action.payload;
      }),
});

export const { filterContacts } = contactSlice.actions;

export const selectContacts = state => state.contactForm.contacts.items;
export const selectFilter = state => state.contactForm.filter;
export const selectContactsLoading = state =>
  state.contactForm.contacts.isLoading;
export const selectContactsError = state => state.contactForm.contacts.error;

export const contactFormReducer = contactSlice.reducer;
