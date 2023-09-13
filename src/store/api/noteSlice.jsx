import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    notes: [],
    status: 'idle',
    error: null
}

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
    const response = await axios.get("http://localhost:9003/notes");
    return response.data
});

export const addNote = createAsyncThunk("create_note/addNote", async (newNote) => {
    const response = await axios.post("http://localhost:9003/create_note", newNote);
    return response.data
});

export const editNote = createAsyncThunk("notes/editNote", async ({noteID, updatedNote}) => {
    const response = await axios.put(`http://localhost:9003/update_note/${noteID}`, updatedNote);
    return response.data
});

export const deleteNote = createAsyncThunk("notes/deleteNote", async (noteID) => {
    await axios.delete(`http://localhost:9003/delete_note/${noteID}`)
    return noteID
});

export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchNotes.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchNotes.fulfilled, (state, action) => {
            state.status = 'succeed';
            state.notes = action.payload
        })
        .addCase(fetchNotes.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(addNote.fulfilled, (state, action) => {
            state.notes.push(action.payload);
        })
        .addCase(editNote.fulfilled, (state, action) => {
            const {id, title, content} = action.payload;
            const existingNote = state.notes.find((note) => note.id === Number(id));
            if(existingNote) {
                existingNote.title = title;
                existingNote.content = content;
            }
        })
        .addCase(deleteNote.fulfilled, (state, action) => {
            const noteID = action.payload;
            state.notes = state.notes.filter((note) => note.id !== noteID)
        })
    },
});

export default noteSlice.reducer;