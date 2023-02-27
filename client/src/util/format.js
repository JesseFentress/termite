export const formatDate = (date) => {
  let newDate = new Date(date);
  let dd = String(newDate.getDate()).padStart(2, "0");
  let mm = String(newDate.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = newDate.getFullYear();
  newDate = mm + "/" + dd + "/" + yyyy;
  return newDate;
};

export const formatString = (string) => {
  let newString = string.charAt(0).toUpperCase() + string.slice(1);
  return newString;
};

export const priorities = {
  1: "low",
  2: "medium",
  3: "high",
  4: "urgent",
};

export const status = {
  new: "green",
  inprogress: "blue",
  closed: "red",
};
