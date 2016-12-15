import React, {PropTypes} from 'react';
import CourseListRow from './CourseListRow';
import SortableHeader from '../common/SortableHeader';

const CourseList = ({courses, onDelete, onSort}) => {
  return (
      <table className="table">
          <thead>
            <tr>
              <th>&nbsp;</th>
              <SortableHeader propName={'title'} propValue='Title' onSort={onSort}/>
              <SortableHeader propName={'authorName'} propValue='Author' onSort={onSort}/>
              <SortableHeader propName={'category'} propValue='Category' onSort={onSort}/>
              <th>Length</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course =>
              <CourseListRow key={course.id} course={course} onDelete={onDelete} />
            )}
          </tbody>
      </table>
    );
};

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
  onDelete: React.PropTypes.func.isRequired
};

export default CourseList;
