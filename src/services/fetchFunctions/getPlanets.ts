import { Planets } from "../../entities/planet";
import {
  createFailResponse,
  createSuccessResponse,
  ResponseType,
} from "../responseHandlers";

export const getPlanets = async (
  page: number
): Promise<ResponseType<Planets>> => {
  try {
    const response = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
    const data = await response.json();
    return createSuccessResponse(data);
  } catch (err) {
    return createFailResponse(
      "There has been a problem with your fetch operation"
    );
  }
};
