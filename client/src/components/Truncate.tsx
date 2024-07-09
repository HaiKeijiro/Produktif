import React from "react";

const Truncate = (text: string, limit: number): string => {
  if (text.length > limit) {
    return text.substring(0, limit) + "...";
  }
  return text;
};

export default Truncate;
