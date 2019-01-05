import React, { memo } from 'react';

const TrackForwardIcon = memo(function TrackForwardIcon(props) {
  const { handleNextClick } = props;

  return (
    <i onClick={handleNextClick} className="fas fa-step-forward"></i>
  );
});

export default TrackForwardIcon;