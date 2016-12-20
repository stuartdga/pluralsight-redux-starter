import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authorActions from '../../actions/authorActions';
import AuthorForm from './AuthorForm';
import {authorsFormattedForDropdown} from '../../selectors/selectors';
import toastr from 'toastr';
import { browserHistory, withRouter } from 'react-router';
import {showLeaveConfirmation} from '../../helpers/utility';

export class ManageAuthorPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      author: Object.assign({}, this.props.author),
      errors: {},
      saving: false,
      dirty: true
    };

    this.updateAuthorState = this.updateAuthorState.bind(this);
    this.saveAuthor = this.saveAuthor.bind(this);
    this.routerWillLeave = this.routerWillLeave.bind(this);
  }

  componentDidMount() {
    this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.author.id != nextProps.author.id) {
      this.setState({author: Object.assign({}, nextProps.author)});
    }
  }

  routerWillLeave(nextLocation) {
    // Return false to prevent a transition w/o prompting the user,
    // or return a string to allow the user to decide:
    if (this.state.dirty) {
      // debugger;
      showLeaveConfirmation(nextLocation.pathname);
      return false;
    }
    return true;
  }

  updateAuthorState(event) {
    const field = event.target.name;
    let author = this.state.author;
    author[field] = event.target.value;
    return this.setState({author:author});
  }

  authorFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.author.firstName.length < 2) {
      errors.firstName = 'First name must be at least 2 characters.';
      formIsValid = false;
    }

    if (this.state.author.lastName.length < 2) {
      errors.lastName = 'Last name must be at least 2 characters.';
      formIsValid = false;
    }

    this.setState({errors:errors});
    return formIsValid;
  }

  saveAuthor(event) {
    event.preventDefault();

    if (!this.authorFormIsValid()) {
      return;
    }

    this.setState({saving: true});
    this.props.actions.saveAuthor(this.state.author)
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
    toastr.success('Author saved');
    this.context.router.push('/authors');
  }

  render() {
    return (
      <AuthorForm
        allAuthors={this.props.authors}
        onChange={this.updateAuthorState}
        onSave={this.saveAuthor}
        author={this.state.author}
        errors={this.state.errors}
        saving={this.state.saving}
      />
    );
  }
}

ManageAuthorPage.propTypes = {
  author: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  router: PropTypes.object,
  route: PropTypes.object
};

ManageAuthorPage.contextTypes = {
  router: PropTypes.object
};

function getAuthorById(authors, id) {
  const author = authors.filter(author => author.id == id);
  if (author.length) return author[0];
  return null;
}

function mapStateToProps(state, ownProps) {
  const authorId = ownProps.params.id;
  let author = {id: '', firstName: '', lastName: ''};

  if (authorId && state.authors.length > 0) {
    author = getAuthorById(state.authors, authorId);
  }

  return {
    author: author,
    authors: authorsFormattedForDropdown(state.authors)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authorActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManageAuthorPage));
