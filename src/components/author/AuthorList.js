import React, {PropTypes} from 'react';
import AuthorListRow from './AuthorListRow';
import SortableHeader from '../common/SortableHeader';

const AuthorList = ({authors, onDelete, onSort}) => {
  return (
    <table className="table">
      <thead>
      <tr>
        <th>&nbsp;</th>
        <SortableHeader propName={'id'} propValue='ID' onSort={onSort}/>
        <SortableHeader propName={'firstName'} propValue='First Name' onSort={onSort}/>
        <SortableHeader propName={'lastName'} propValue='Last Name' onSort={onSort}/>
      </tr>
      </thead>
      <tbody>
      {authors.map(author =>
        <AuthorListRow key={author.id} author={author} />
      )}
      </tbody>
    </table>
  );
};

AuthorList.propTypes = {
  authors: PropTypes.array.isRequired
};

export default AuthorList;
