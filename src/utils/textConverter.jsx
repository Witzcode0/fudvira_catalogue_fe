export const textConverter = (text, type = "title") => {
  if (!text) return "";

  switch (type) {
    case "upper":
      return text.toUpperCase();

    case "lower":
      return text.toLowerCase();

    case "capitalize":
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

    case "title":
      return text
        .toLowerCase()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    default:
      return text;
  }
};
