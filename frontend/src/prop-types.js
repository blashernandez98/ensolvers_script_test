
import PropTypes from 'prop-types';

export const notePropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  updated_at: PropTypes.string.isRequired,
});
