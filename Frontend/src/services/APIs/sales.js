import axios from "@/services/axiosInterceptor";


export const getSalesByBookId = async (bookId) => {
  try {
    const response = await axios.get(`/orders?bookId=${bookId}`);
    return { status: true, data: response.data };
  } catch (error) {
    console.error("Error fetching sales data", error);
    return { status: false, message: error.message };
  }
};
