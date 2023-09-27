// apiService.js
export async function fetchAllData() {
  try {
    const response = await fetch(
      "http://127.0.0.1:4010/api/1.0/programs/2/application-form"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data?.data?.attributes;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function updateFormData(updatedData: any) {
  try {
    const response = await fetch(
      "http://127.0.0.1:4010/api/1.0/programs/2/application-form",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
}
