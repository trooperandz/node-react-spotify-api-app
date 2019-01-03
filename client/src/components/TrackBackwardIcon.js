import React from 'react';

const TrackBackwardIcon = (props) => {
  const { handlePreviousClick } = props;

  return (
    <i onClick={handlePreviousClick} className="fas fa-step-backward"></i>
  );
}

export default TrackBackwardIcon;