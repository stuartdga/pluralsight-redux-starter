import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const CourseListRow = ({course}) => {
  return (
    <tr>
      <td><a href={course.watchHref} target="_blank"></a></td>
      <td><Link to={'/course/' + course.id}>{course.title}</Link></td>
      <td><Link to={'/author/' + course.authorId}>{course.authorName}</Link></td>
      <td>{course.category}</td>
      <td>{course.length}</td>
    </tr>
  );
};

CourseListRow.propTypes = {
  course: PropTypes.object.isRequired
};

export default CourseListRow;
