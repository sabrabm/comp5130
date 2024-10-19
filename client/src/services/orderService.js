// orderService.js
export const placeOrder = async (orderData) => {
    const response = await axios.post(`http://localhost:3005/api/orders/place`, orderData);
    return response.data;
  };