import { ISortObject } from "../types/product.type";

export const parseSortParameter = (
  sortParam: string | undefined
): ISortObject | undefined => {
  if (!sortParam) {
    return undefined;
  }

  const sortFields = sortParam.split(",");
  const sortObject: ISortObject = {};
  for (const field of sortFields) {
    const [key, value] = field.split(":");
    if (value === "asc" || value === "desc") {
      sortObject[key] = value;
    }
  }
  return sortObject;
};
