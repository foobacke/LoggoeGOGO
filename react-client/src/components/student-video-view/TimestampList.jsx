import React from 'react';

import TimestampListEntry from './TimestampListEntry.jsx';

class TimestampList extends React.Component {
  constructor(props) {
    super(props)

    this.state = { 
      items: null
    };
  }
  
  render() {
    return (
      <div>
        <ul>
          {this.props.timestamps.map((timestamp, index) => {
            return <TimestampListEntry 
            key={index} 
            timestamp={timestamp} 
            changeVideo={this.props.changeVideo} 
            deleteTimestamp={this.props.deleteTimestamp}/>
          })}
        </ul>
      </div>
    );
  }

}

export default TimestampList;