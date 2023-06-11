import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import EditNote from '../../components/EditNote';





// 1. Fetch Notes
export const fetchNotes = createAsyncThunk('note/fetchNotes', async () => {
        const response = await axios.get('https://localhost:9000/notes');
        return response.data;

});
export const addNote = createAsyncThunk("book/addBook", async (newNote) => {
    const response = await axios.post("http://localhost:8000/notes", newNote);
    return response.data;
});


export const editNote = createAsyncThunk("book/editNote", async ({noteId, updatedNote}) => {
    const response = await axios.put(`http://localhost:8000/notes/${noteId}`, updatedNote);
    return response.data;
});

export const deleteNote = createAsyncThunk("book/deleteNote", async (NoteId) => {
    await axios.delete(`http://localhost:8000/books/${NoteId}`);
    return noteId;
});

const initialState = {
    notes : [],
    status : 'idle',
    error : null,

}


export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {},
    extrareducers: (builder) => {
        builder
        .addCase(fetchNotes.pending, (state) =>{
            state.status ='Loading...';
            state.error = null;
        })
        .addCase(fetchNotes.fulfilled, (state, action) => {
            state.status = 'success';
            state.name = action.payload;
        })
        .addCase(fetchNotes.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(addNote.fulfilled, (state, action) => {
            state.notes.push(action.payload);
        }).addCase(editNote.fulfilled, (state, action) => {
            const {NoteId, updatedNote} = action.payload;
            const existingBook = state.books.find((book) => note.id === noteId);
            if (existingNote) {
                existingNote.title = updatedNote.title;
                existingNote.content = updatedNote.content;
                
            }
        }).addCase(deleteNote.fulfilled, (state, action) => {
            const noteId = action.payload;
            state.notes = state.notes.filter((book) => note.id !== noteId);
        });
    }

})


export default noteSlice.reducer;