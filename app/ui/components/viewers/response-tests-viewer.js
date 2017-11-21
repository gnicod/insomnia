import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Link from '../base/link';
import {showModal} from '../modals/index';

class ResponseTestsViewer extends PureComponent {
  render () {
    const {testResults, fontSize} = this.props;
    console.log(testResults)
    var rows = [];
    for (var i=0; i < testResults.length ; i++) {
      let test = testResults[i]
      rows.push(<div>{test.name}<div/>);
    }

    return (
      <div>
        {rows}
      </div>
    );
  }
}

ResponseTestsViewer.propTypes = {
  // Required
};

export default ResponseTestsViewer;

