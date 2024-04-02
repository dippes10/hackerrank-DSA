function encryption(s: string): string {
  const sanitizedString = s.replace(/\s/g, "");

  const length = sanitizedString.length;
  const columns = Math.ceil(Math.sqrt(length));

  let result = "";
  for (let j = 0; j < columns; j++) {
    for (let i = j; i < length; i += columns) {
      result += sanitizedString[i];
    }
    result += " ";
  }

  return result.trim();
}
