import React, { memo } from 'react';

const TrackBackwardIcon = memo(function TrackBackwardIcon(props) {
  const { handlePreviousClick } = props;

  return (
    <i onClick={handlePreviousClick} className="fas fa-step-backward"></i>
  );
});

export default TrackBackwardIcon;