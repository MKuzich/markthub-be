import { createError } from "./errors";

interface IData {
  owner: string;
}

export const checkOwner = (
  data: IData | null,
  userId: string,
  dataName: string
) => {
  if (!data) {
    throw createError(
      404,
      `${dataName.charAt(0).toUpperCase() + dataName.slice(1)} not found.`
    );
  }
  if (data.owner !== userId) {
    throw createError(
      403,
      `Forbidden. You cann't change this ${dataName}, because it's not your.`
    );
  }
};
