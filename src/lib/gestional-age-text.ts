export const gestationalAgeToText = (gestationalAge: number | undefined) => {
  if (gestationalAge !== undefined) {
    const weeks = Math.floor(gestationalAge);
    const days = Math.round((gestationalAge - weeks) * 7);

    let output = "";
    if (weeks > 0) {
      output += `${weeks} semana${weeks !== 1 ? "s" : ""}`;
    }
    if (days > 0) {
      if (output) {
        output += " y ";
      }
      output += `${days} día${days !== 1 ? "s" : ""}`;
    }
    if (!output) {
      return undefined;
    }
    return output;
  }
  return undefined;
};
