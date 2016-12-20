import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import {authorsFormattedForDropdown} from '../../selectors/selectors';
import toastr from 'toastr';
import { browserHistory, withRouter } from 'react-router';
import {validateCourseForm} from './CourseValidation';

export class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {},
      saving: false,
      notFound: false,
      dirty: true
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
    this.routerWillLeave = this.routerWillLeave.bind(this);
    this.showLeaveConfirmation = this.showLeaveConfirmation.bind(this);
  }

  componentDidMount() {
    this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.course.id != nextProps.course.id) {
      this.setState({course: Object.assign({}, nextProps.course)});
    }
  }

  routerWillLeave(nextLocation) {
    // Return false to prevent a transition w/o prompting the user,
    // or return a string to allow the user to decide:
     if (this.state.dirty) {
       // debugger;
       this.showLeaveConfirmation(nextLocation.pathname);
       return false;
    }
    return true;
  }

  showLeaveConfirmation(nextLocationPath) {
    const html = "<br /><br /><button type='button' class='btn clear'>Yes</button>";
    toastr.warning(html,'Leave without saving?',
      {
        allowHtml: true,
        closeButton: true,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: true,
        showDuration: "300",
        hideDuration: "1000",
        timeOut: 0,
        extendedTimeOut: 0,
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
        tapToDismiss: true,
        onclick: function() {
          window.location = window.location.origin + nextLocationPath;
        }
      });
  }

  updateCourseState(event) {
   const field = event.target.name;
   let course = this.state.course;
   if (field == 'authorId') {
     course.authorName = event.nativeEvent.target[event.nativeEvent.target.selectedIndex].text;
   }
   course[field] = event.target.value;
   return this.setState({course:course});
  }

  courseFormIsValid() {
    let formIsValid = true;
    let errors = validateCourseForm(this.state.course);
    if (Object.keys(errors).length > 0) {
      formIsValid = false;
    }
    this.setState({errors:errors});
    return formIsValid;
  }

  saveCourse(event) {
    event.preventDefault();

    if (!this.courseFormIsValid()) {
      return;
    }

    this.setState({saving: true});
    this.props.actions.saveCourse(this.state.course)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
        this.setState({dirty: false});
      });
  }

  redirect() {
    this.setState({saving: false});
    this.setState({dirty: false});
    toastr.success('Course saved');
    this.context.router.push('/courses');
  }

  render() {
    return (
      <CourseForm
        allAuthors={this.props.authors}
        onChange={this.updateCourseState}
        onSave={this.saveCourse}
        course={this.state.course}
        errors={this.state.errors}
        saving={this.state.saving}
        dirty={this.state.dirty}
      />
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  router: PropTypes.object,
  route: PropTypes.object
};

ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function getCourseById(courses, id) {
  const course = courses.filter(course => course.id == id);
  if (course.length) return course[0];
  return null;
}

function mapStateToProps(state, ownProps) {
  const courseId = ownProps.params.id;
  let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};

  if (courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
    if (course == null) {
      browserHistory.push('/NotFoundPage');
    }
  }

  return {
    course: course,
    authors: authorsFormattedForDropdown(state.authors)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage));
