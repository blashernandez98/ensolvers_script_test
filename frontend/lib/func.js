
// Converts date from ISO format to "dd/mm/yyyy" format
export function convertDate(date) {
  // Convert the ISO date string to a Date object
  const dateObj = new Date(date)

  // Get the day, month, and year from the Date object
  const day = dateObj.getDate()
  const month = dateObj.getMonth() + 1 // Months are zero-indexed, so we add 1 to get the correct month
  const year = dateObj.getFullYear()

  // Format the date as "dd/mm/yyyy"
  const formattedDate = `${day.toString().padStart(2, '0')}/${month
    .toString()
    .padStart(2, '0')}/${year}`

  return formattedDate
}