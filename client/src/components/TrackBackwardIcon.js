import React from 'react';

const TrackBackwardIcon = (props) => {
  const { handleStepClick } = props;

  return (
    <i onClick={handleStepClick} className="fas fa-step-backward"></i>
  );
}

export default TrackBackwardIcon;