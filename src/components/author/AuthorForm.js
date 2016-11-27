import React from 'react';
import TextInput from '../common/TextInput';

const AuthorForm = ({author, allAuthors, onSave, onChange, saving, errors}) => {
  return (
    <form>
      <h1>Manage Author</h1>
      <TextInput
        name="id"
        label="ID"
        value={author.id}
        onChange={onChange}
        error={errors.id}/>

      <TextInput
        name="firstName"
        label="First Name"
        value={author.firstName}
        onChange={onChange}
        error={errors.firstName}/>

      <TextInput
        name="lastName"
        label="Last Name"
        value={author.lastName}
        onChange={onChange}
        error={errors.lastName}/>

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onClick={onSave}/>
    </form>
  );
};

AuthorForm.propTypes = {
  author: React.PropTypes.object.isRequired,
  allAuthors: React.PropTypes.array,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default AuthorForm;
