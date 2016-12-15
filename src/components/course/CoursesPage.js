import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';
import {browserHistory} from 'react-router';
import { sortList } from '../../helpers/utility';
import toastr from 'toastr';

class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      error: {},
      deleting: false
    };

    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
    this.sortCourses = this.sortCourses.bind(this);
  }

  courseRow(course, index) {
    return <div key={index}>{course.title}</div>;
  }

  redirectToAddCoursePage() {
    browserHistory.push('/course');
  }

  sortCourses(event) {
    this.props.actions.sortAuthors(this.props.courses, event.target.dataset.column, event.target.dataset.direction);
  }

  deleteCourse(event) {
    this.setState({deleting: true});
    this.props.actions.deleteCourse(event.target.id)
      .then(() => this.courseDeleted())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  courseDeleted() {
    this.setState({saving: false});
    toastr.success('Course deleted');
  }

  render() {
    return (
      <div>
        <h1>Courses</h1>
        <input type="submit"
               value="Add Course"
               className="btn btn-primary"
               onClick={this.redirectToAddCoursePage}/>
        <CourseList
          courses={this.props.courses}
          onDelete={this.deleteCourse}
          onSort={this.sortCourses}
        />
      </div>
    );
  }
}

CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps){
  return {
    courses: state.courses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
