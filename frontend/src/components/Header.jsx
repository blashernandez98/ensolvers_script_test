import PropTypes from 'prop-types'

export function Header({ showingArchived, toggleArchived, openEditor }) {
  const activeTabClasses = 'bg-blue-200 text-blue-500 w-28 p-2 border-2'
  const inactiveTabClasses = 'bg-zinc-300 text-zinc-500 w-28 p-2 border-2'
  return (
    <header className='flex flex-row items-center justify-center p-2 shadow-lg h-28 w-full gap-5'>
      <h1 className='text-4xl'>My Notes</h1>
      <button
        onClick={() => openEditor()}
        className='button w-28 h-10 text-lg bg-zinc-100  cursor-pointer select-none
          shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]
          active:shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]
          active:translate-y-1 active:bg-zinc-200
          rounded-lg'
      >
        Add Note
      </button>
      <button
        className={`${
          !showingArchived ? activeTabClasses : inactiveTabClasses
        }`}
        onClick={toggleArchived}
      >
        Active
      </button>
      <button
        className={`${showingArchived ? activeTabClasses : inactiveTabClasses}`}
        onClick={toggleArchived}
      >
        Archived
      </button>
    </header>
  )
}

Header.propTypes = {
  showingArchived: PropTypes.bool.isRequired,
  toggleArchived: PropTypes.func.isRequired,
  openEditor: PropTypes.func.isRequired,
}

export default Header
