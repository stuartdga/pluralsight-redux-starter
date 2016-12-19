import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const AuthorListRow = ({author, onDelete}) => {
  return (
    <tr>
      <td><a href={author.watchHref} target="_blank"></a></td>
      <td><Link to={'/author/' + author.id}>{author.id}</Link></td>
      <td>{author.firstName}</td>
      <td>{author.lastName}</td>
      <td><a href="#" key={author.id} id={author.id} onClick={onDelete}>Delete</a></td>
    </tr>
  );
};

AuthorListRow.propTypes = {
  author: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default AuthorListRow;
