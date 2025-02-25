export const apiResponse = (payload: { statusCode?: number; message?: string; data?: any }) => {
  return {
    statusCode: payload.statusCode || 200,
    message: payload.message || "",
    data: payload.data || null,
  };
};
