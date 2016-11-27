import expect from 'expect';
import {authorsFormattedForDropdown} from './selectors';

describe('Selectors', () => {
  describe('authorsFormattedForDropdown', () => {
    it('should return author data formatted for use in a dropdown', () => {
      const authors = [
        {id: '1', firstName:'A', lastName: 'A'},
        {id: '2', firstName:'B', lastName: 'B'}
      ];
      const expected = [
        {value: '1', text: 'A A'},
        {value: '2', text: 'B B'}
      ];
      expect(authorsFormattedForDropdown(authors)).toEqual(expected);
    });
  });
});
