import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <FontAwesomeIcon icon={faSpinner} spin size="lg" />
    </div>
  );
}

export default Loading;
