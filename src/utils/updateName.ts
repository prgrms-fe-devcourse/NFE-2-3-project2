import { api } from "../api/axios";

export const updateNameFn = async (fullName: string) => {
  try {
    const response = await api.put("/settings/update-user", {
      fullName,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
