import removeAccents from "./removeAccents";
//returns a copy of parameter string both without accent and all lowercase
export default function normalizeAndLowerCase(str) {
  return removeAccents(str).toLowerCase();
}
