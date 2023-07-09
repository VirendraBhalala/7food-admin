import React from "react";

export const Icon = ({ type, iconName, size, color }) => {
  const IconName = require(`iconsax-react`)[iconName];
  return <IconName size={size} color={color} />;
};
