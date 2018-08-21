import React, { Component } from 'react';

import TestTableRow from './TestTableRow';

class TestContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldShowAllPlayIcons: true,
    }

    this.tableArr = [
      { name: 'Miles Davies', length: '3:21' },
      { name: 'George Share', length: '4:09' },
      { name: 'Bill Glevans', length: '1:42' },
      { name: 'Erroll Grander', length: '8:16' },
    ];
  }

  // onClickControl() {
  //   const { shouldShowAllPlayIcons } = this.state;
  //   console.log('clicked control...');
  //   this.setState({ shouldShowAllPlayIcons: !shouldShowAllPlayIcons });
  // }

  renderTestTableRows() {
    const { shouldShowAllPlayIcons } = this.state;

    const tableRows = this.tableArr.map((data) => {
      return (
        <TestTableRow 
          data={data}
        />
      );
    });

    return tableRows;
  }

  render() {
    return (
      <table className="test-table">
        <thead>
          <tr>
            <th>Control</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {this.renderTestTableRows()}
        </tbody>
      </table>
    );
  }
}

export default TestContainer;