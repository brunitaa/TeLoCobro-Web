import axios from "./axios";

export const createCompany = async (companyData) => {
  try {
    const response = await axios.post("/companies", companyData);
    return response.data;
  } catch (error) {
    console.error("Error creating company:", error);
    throw error;
  }
};
export const getCompanies = async () => {
  try {
    const response = await axios.get("/companies");
    return response.data;
  } catch (error) {
    console.error("Error fetching companies:", error);
    throw error;
  }
};


export const updateCompanyRequest = async (companyData) => {
  try {
    const response = await axios.put("/companies", companyData);
    return response.data;
  } catch (error) {
    console.error("Error updating company:", error);
    throw error;
  }
};
