import { useEffect, useState } from 'react'
import { getNotes } from '../lib/api'
import { NoteEditor } from './components/NoteEditor'
import { NoteList } from './components/NoteList'
import { Header } from './components/Header'
import { postNote, deleteNoteById, updateNote } from '../lib/api'

function App() {
  const [notes, setNotes] = useState([])
  const [noteEditorDialog, setNoteEditorDialog] = useState(false)
  const [noteToEdit, setNoteToEdit] = useState(null)
  const [showingArchived, setShowingArchived] = useState(false)

  // Fetch notes on page load
  useEffect(() => {
    async function fetchNotes() {
      const res = await getNotes()
      setNotes(res)
    }
    fetchNotes()
  }, [])

  async function addNote(note) {
    try {
      const res = await postNote(note)
      setNotes([res, ...notes])
      closeEditor()
    } catch (error) {
      alert('Failed to create note')
    }
  }

  async function deleteNote(id) {
    try {
      const res = await deleteNoteById(id)
      console.log(res)
      const newNotes = notes.filter((note) => note.id !== id)
      setNotes(newNotes)
    } catch (error) {
      alert('Error deleting note')
    }
  }

  async function editNote(note) {
    try {
      const res = await updateNote(note)
      console.log(res)
      const newNotes = notes.map((n) => {
        if (n.id === note.id) {
          return res
        }
        return n
      })
      setNotes(newNotes)
    } catch (error) {
      alert('Error updating note')
    }
  }

  function closeEditor() {
    setNoteEditorDialog(false)
  }

  function openEditor(noteToEdit) {
    if (noteToEdit) {
      setNoteToEdit(noteToEdit)
    } else {
      setNoteToEdit(null)
    }
    setNoteEditorDialog(true)
  }

  function toggleArchived() {
    setShowingArchived(!showingArchived)
  }

  return (
    <div className='relative flex flex-col items-center p-4 bg-zinc-100 h-screen'>
      <Header
        openEditor={openEditor}
        showingArchived={showingArchived}
        toggleArchived={toggleArchived}
      />
      <NoteList
        notes={notes}
        deleteNote={deleteNote}
        editNote={editNote}
        showingArchived={showingArchived}
        openEditor={openEditor}
      />
      {noteEditorDialog && (
        <NoteEditor
          addNote={addNote}
          editNote={editNote}
          closeEditor={closeEditor}
          noteToEdit={noteToEdit}
        />
      )}
    </div>
  )
}

export default App
