export const getDateWithTime = () => {
  const today = new Date();
  const dateAndTime =
    today.toLocaleDateString() + " " + today.toLocaleTimeString();
  return dateAndTime;
};
