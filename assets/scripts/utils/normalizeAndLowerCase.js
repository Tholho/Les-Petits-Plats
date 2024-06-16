import removeAccents from "./removeAccents";

export default function normalizeAndLowerCase(str) {
  return removeAccents(str).toLowerCase();
}
