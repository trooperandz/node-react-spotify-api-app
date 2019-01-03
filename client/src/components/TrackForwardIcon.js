import React from 'react';

const TrackForwardIcon = (props) => {
  const { handleNextClick } = props;

  return (
    <i onClick={handleNextClick} className="fas fa-step-forward"></i>
  );
}

export default TrackForwardIcon;