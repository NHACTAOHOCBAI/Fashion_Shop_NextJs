import z from "zod";

const ReviewModalSchema = z.object({
  comment: z
    .string("Comment is required")
    .min(1, { message: "Comment is required" }),
});

export default ReviewModalSchema;
