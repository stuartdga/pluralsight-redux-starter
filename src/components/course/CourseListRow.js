import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const CourseListRow = ({course, onDelete}) => {
  return (
    <tr>
      <td><a href={course.watchHref} target="_blank"></a></td>
      <td><Link to={'/course/' + course.id}>{course.title}</Link></td>
      <td><Link to={'/author/' + course.authorId}>{course.authorName}</Link></td>
      <td>{course.category}</td>
      <td>{course.length}</td>
      <td><a href="#" key={course.id} id={course.id} onClick={onDelete}>Delete</a></td>
    </tr>
  );
};

CourseListRow.propTypes = {
  course: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default CourseListRow;
