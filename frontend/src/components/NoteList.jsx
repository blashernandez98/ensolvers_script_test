import PropTypes from 'prop-types'
import { notePropTypes } from '../prop-types'
import { Note } from './Note'

export function NoteList({
  notes,
  showingArchived,
  deleteNote,
  editNote,
  openEditor,
}) {
  if (showingArchived) {
    notes = notes.filter((note) => note.archived)
  } else {
    notes = notes.filter((note) => !note.archived)
  }

  return (
    <div className='grid md:grid-cols-2 items-center justify-center w-full p-10 gap-2'>
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          onDelete={deleteNote}
          onEdit={editNote}
          openEditor={openEditor}
        />
      ))}
    </div>
  )
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(notePropTypes),
  showingArchived: PropTypes.bool.isRequired,
  deleteNote: PropTypes.func.isRequired,
  editNote: PropTypes.func.isRequired,
  openEditor: PropTypes.func.isRequired,
}

NoteList.defaultProps = {
  notes: [],
  showingArchived: false,
}
