import { useEffect, useState } from 'react'
import { getNotes } from '../lib/api'
import { NoteEditor } from './components/NoteEditor'
import { NoteList } from './components/NoteList'
import { Header } from './components/Header'
import {
  postNote,
  deleteNoteById,
  updateNote,
  getTags,
  postTag,
  getNotesByTag,
  linkTagToNote,
  unlinkTagFromNote,
} from '../lib/api'

function App() {
  const [notes, setNotes] = useState([])
  const [tags, setTags] = useState([])
  const [noteEditorDialog, setNoteEditorDialog] = useState(false)
  const [noteToEdit, setNoteToEdit] = useState(null)
  const [showingArchived, setShowingArchived] = useState(false)

  // Fetch notes on page load
  useEffect(() => {
    async function fetchNotes() {
      const notes = await getNotes()
      const tags = await getTags()
      setTags(tags)
      setNotes(notes)
    }
    fetchNotes()
  }, [])

  async function addNote(note) {
    try {
      const res = await postNote(note)
      setNotes([res, ...notes])
      closeEditor()
      return res
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

  async function addTag(tag) {
    try {
      const res = await postTag(tag)
      setTags([res, ...tags])
    } catch (error) {
      alert('Error updating note')
    }
  }

  async function addTagToNote(tagId, noteId) {
    try {
      const res = await linkTagToNote(tagId, noteId)
      console.log(res)
    } catch (error) {
      alert('Error updating note')
    }
  }

  async function deleteTagFromNote(tagId, noteId) {
    try {
      const res = await unlinkTagFromNote(tagId, noteId)
      console.log(res)
    } catch (error) {
      alert('Error updating note')
    }
  }

  async function filterNotesByTag(tagId) {
    if (!tagId) {
      const notes = await getNotes()
      setNotes(notes)
      return
    }
    try {
      const res = await getNotesByTag(tagId)
      setNotes(res)
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
    <div
      className={`relative flex flex-col items-center p-4 bg-zinc-100 h-screen ${
        noteEditorDialog && 'bg-opacity-50'
      }`}
    >
      <Header
        openEditor={openEditor}
        showingArchived={showingArchived}
        toggleArchived={toggleArchived}
        tags={tags}
        filterNotesByTag={filterNotesByTag}
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
          addTagToNote={addTagToNote}
          deleteTagFromNote={deleteTagFromNote}
          editNote={editNote}
          closeEditor={closeEditor}
          noteToEdit={noteToEdit}
          tags={tags}
          addTag={addTag}
        />
      )}
    </div>
  )
}

export default App
