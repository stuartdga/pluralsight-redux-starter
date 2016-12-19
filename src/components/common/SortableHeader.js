import React, {PropTypes} from 'react';

class SortableHeader extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {direction: 'asc'};
    this.clickSort = this.clickSort.bind(this);
  }

  clickSort(event) {
    this.props.onSort(event);
    if (this.state.direction == 'asc')
      this.setState({direction: 'desc'});
    else {
      this.setState({direction: 'asc'});
    }
  }

  render() {
    return <th><a href="#" data-column={this.props.propName} data-direction={this.state.direction} onClick={this.clickSort}>{this.props.propValue}</a></th>;
  }
}

SortableHeader.propTypes = {
  propName: PropTypes.string.isRequired,
  propValue: PropTypes.string.isRequired,
  onSort: PropTypes.func.isRequired
};

export default SortableHeader;
