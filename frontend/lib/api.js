export async function getNotes() {
  const res = await fetch('http://localhost:3000/api/notes');
  const data = await res.json();
  return data;
}

export async function postNote(note) {
  const res = await fetch('http://localhost:3000/api/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  });
  if (!res.ok) {
    throw new Error(res.status);
  }
  const data = await res.json();
  return data;
}

export async function deleteNoteById(id) {
  const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error(res.status);
  }
  const data = await res.json();
  return data;
}

export async function updateNote(newNote) {
  const res = await fetch(`http://localhost:3000/api/notes/${newNote.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newNote),
  });
  if (!res.ok) {
    throw new Error(res.status);
  }
  const data = await res.json();
  return data;
}
