import axiosInstance from "@/config/axios";

export enum PaymentStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
  CANCELED = "canceled",
}

const createPaypal = async (data: { orderId: number }) => {
  const response = await axiosInstance.post("payments/paypal/create", data);
  return response.data as {
    orderId: number;
    paypalOrderId: any;
    approveUrl: any;
  };
};

const capturePaypal = async (params: { token: string }) => {
  const response = await axiosInstance.get("payments/paypal/capture", {
    params,
  });
  return response.data as {
    orderId: number;
    paymentStatus: PaymentStatus.COMPLETED | PaymentStatus.FAILED;
    paypalStatus: string;
    verifiedAmount: number;
  };
};

export { createPaypal, capturePaypal };
