import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  editIndex: null,
  searchTerm: '',
  currentPage: 1,
  itemsPerPage: 2,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {

    addUser: (state, action) => {
      state.users.push(action.payload);
    },

    updateUser: (state, action) => {
      const { index, user } = action.payload;
      state.users[index] = user;
      state.editIndex = null;
    },

    deleteUser: (state, action) => {
      state.users.splice(action.payload, 1);
    },

    setEditIndex: (state, action) => {
      state.editIndex = action.payload;
    },

    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.currentPage = 1;
    },

    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
  },
});

export const { 
  addUser, 
  updateUser, 
  deleteUser, 
  setEditIndex, 
  setSearchTerm, 
  setCurrentPage,
  setFormData
} = userSlice.actions;

export default userSlice.reducer;