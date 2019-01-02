import React from 'react';

const TrackForwardIcon = (props) => {
  const { handleStepClick } = props;

  return (
    <i onClick={handleStepClick} className="fas fa-step-forward"></i>
  );
}

export default TrackForwardIcon;