import React from "react";

const SummaryPreview = ({ resumeInfo }) => {
  return (
    <div>
      <p className="text-xs"></p>
      {resumeInfo?.summery}
    </div>
  );
};

export default SummaryPreview;
