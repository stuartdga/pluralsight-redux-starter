import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authorActions from '../../actions/authorActions';
import AuthorList from './AuthorList';
import {browserHistory} from 'react-router';
import { sortList } from '../../helpers/utility';
import toastr from 'toastr';

class AuthorsPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      error: {},
      deleting: false
    };

    this.redirectToAddAuthorPage = this.redirectToAddAuthorPage.bind(this);
    this.deleteAuthor = this.deleteAuthor.bind(this);
    this.sortAuthors = this.sortAuthors.bind(this);
  }

  authorRow(author, index) {
    return <div key={index}>{author.title}</div>;
  }

  redirectToAddAuthorPage() {
    browserHistory.push('/author');
  }

  sortAuthors(event) {
    this.props.actions.sortAuthors(this.props.authors, event.target.dataset.column, event.target.dataset.direction);
  }

  deleteAuthor(event) {
    this.setState({deleting: true});
    this.props.actions.deleteAuthor(event.target.id)
      .then(() => this.authorDeleted())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  authorDeleted() {
    this.setState({saving: false});
    toastr.success('Author deleted');
  }

  render() {
    return (
      <div>
        <h1>Authors</h1>
        <input type="submit"
               value="Add Author"
               className="btn btn-primary"
               onClick={this.redirectToAddAuthorPage}/>
        <AuthorList
          authors={this.props.authors}
          onDelete={this.deleteAuthor}
          onSort={this.sortAuthors}
        />
      </div>
    );
  }
}

AuthorsPage.propTypes = {
  actions: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps){
  return {
    authors: state.authors
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authorActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);
