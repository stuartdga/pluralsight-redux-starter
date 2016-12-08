import React, {PropTypes} from 'react';
import Header from "./common/Header";
import {connect} from 'react-redux';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {courses} = this.props;
    let courseCount = courses.length;
    return(
      <div className="container-fluid">
        <Header loading={this.props.loading} courseCount={courseCount}/>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  courses: PropTypes.array.isRequired,
  courseCount: PropTypes.number
};

function mapStateToProps(state, ownProps) {
  return {
    loading: state.ajaxCallsInProgress > 0,
    courses: state.courses
  };
}

export default connect(mapStateToProps)(App);
