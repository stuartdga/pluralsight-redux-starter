import expect from 'expect';
import {sortList} from './utility';

describe ('utility function - sortList', () => {
  it('sorts an array of objects by a property name', () => {
    const unsortedList = [
      { id: 2, name: 'a'},
      { id: 1, name: 'b'},
      { id: 1, name: 'b'}
    ];
    let sortedList = sortList(unsortedList, 'id');
    expect(sortedList[0].id).toBe(1);
    expect(sortedList[2].id).toBe(2);
    sortedList = sortList(unsortedList, 'name', 'desc');
    expect(sortedList[0].name).toBe('b');
    expect(sortedList[2].name).toBe('a');
  });

  it('returns an empty array or array of 1 item', () => {
    const emptyList = [];
    let sortedList = sortList(emptyList, '');
    expect(sortedList.length).toBe(0);
    const singleList = [{id: 1}];
    sortedList = sortList(singleList, '');
    expect(singleList.length).toBe(1);
    expect(sortedList[0].id).toBe(1);
  });
});
