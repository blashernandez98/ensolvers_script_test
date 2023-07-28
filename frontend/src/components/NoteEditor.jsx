import PropTypes from 'prop-types'

export function NoteEditor({ addNote, editNote, noteToEdit, closeEditor }) {
  async function handleSubmit(e) {
    e.preventDefault()
    const title = e.target.title.value
    const content = e.target.content.value
    const note = { title, content }
    if (noteToEdit) {
      note.id = noteToEdit.id
      editNote(note)
    } else {
      addNote(note)
    }
    closeEditor()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='absolute top-20 flex flex-col p-2 items-center bg-blue-300'
    >
      <label htmlFor='title'>Title</label>
      <input
        type='text'
        name='title'
        className='bg-zinc-100'
        defaultValue={noteToEdit ? noteToEdit.title : ''}
      />
      <label htmlFor='content'>Content</label>
      <textarea
        name='content'
        cols='30'
        rows='10'
        defaultValue={noteToEdit ? noteToEdit.content : ''}
      ></textarea>
      <button onClick={closeEditor}>Cancel</button>
      <button type='submit'>Save</button>
    </form>
  )
}

NoteEditor.propTypes = {
  addNote: PropTypes.func.isRequired,
  closeEditor: PropTypes.func.isRequired,
  editNote: PropTypes.func.isRequired,
  noteToEdit: PropTypes.object,
}

export default NoteEditor
