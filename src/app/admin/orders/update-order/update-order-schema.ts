import { OrderStatus } from "@/constants/status.enum";
import z from "zod";

const UpdateOrderSchema = z.object({
  status: z.enum(OrderStatus),
});

export default UpdateOrderSchema;
