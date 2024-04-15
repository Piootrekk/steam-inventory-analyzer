export const fetchApiJson = async (url: string) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};
