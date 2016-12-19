import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import LoadingDots from './LoadingDots';

const Header = ({loading, courseCount}) => {
  return (
    <div id="mainHeaderDiv" key="mainHeaderDiv">
      <div id="navHeaderDiv" key="navHeaderDiv">
        <nav className="navbar navbar-default">
          <IndexLink to="/" activeClassName="active">Home</IndexLink>
          {" | "}
          <Link to="/courses" activeClassName="active">Courses</Link>
          {" | "}
          <Link to="/authors" activeClassName="active">Authors</Link>
          {" | "}
          <Link to="/about" activeClassName="active">About</Link>
          {loading && <LoadingDots interval={100} dots={20}/>}
        </nav>
      </div>
      <div style={rightDivStyle}>Total courses: {courseCount}</div>
    </div>
  );
};

const rightDivStyle = {
  float: 'right',
  paddingTop: '10px',
  paddingRight: '5px'
};

const leftDivStyle = {
  float: 'left',
  paddingLeft: '5px'
};

const topDivStyle = {
  paddingBottom: '20px'
};

Header.propTypes = {
  loading: PropTypes.bool.isRequired,
  courseCount: PropTypes.number.isRequired
};

export default Header;
