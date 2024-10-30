export default function stringToValidHtmlId(inputString: string) {
  // Replace whitespaces with hyphens and remove invalid characters
  const validId = inputString
    .replace(/\s+/g, '-') // Replace whitespaces with hyphens
    .replace(/[^A-Za-z0-9\-_:.]/g, ''); // Remove invalid characters

  return validId;
}