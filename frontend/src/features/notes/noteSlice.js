import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import noteService from "./noteService";

const initialState = {
  notes: [],
  editNote: '',
  isError: false,
  isSuccess: false,
  isLoading: false,
  isEdit: false,
  message: "",
};

// Create new note
export const createNote = createAsyncThunk(
  "notes/create",
  async (noteData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.createNote(noteData, token);
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user notes
export const getNotes = createAsyncThunk(
  "notes/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.getNotes(token);
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Update user note
export const updateNote = createAsyncThunk(
  "notes/update",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.updateNote(id, token);
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Updated user note
export const updatedNote = createAsyncThunk(
  "notes/updated",
  async ([id, noteData], thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.updatedNote(id, noteData, token);
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete user note
export const deleteNote = createAsyncThunk(
  "notes/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.deleteNote(id, token);
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes.push(action.payload);
      })
      .addCase(createNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes = action.payload;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.editNote = action.payload
        state.isEdit = false;
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updatedNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatedNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.editNote = {}
        state.isEdit = false;
      })
      .addCase(updatedNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes = state.notes.filter(
          (note) => note._id !== action.payload.id
        );
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = noteSlice.actions;
export default noteSlice.reducer;
