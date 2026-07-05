import { z } from "zod";
import { studentYearOptions } from "@/lib/registration-schema";

const phoneRegex = /^(0|\+84)([\s.-]?\d){8,10}$/;

export const webinarRegistrationSchema = z.object({
  full_name: z.string().trim().min(2, "Vui lòng nhập họ và tên"),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, "Số điện thoại chưa đúng định dạng"),
  email: z.string().trim().email("Email chưa đúng định dạng"),
  facebook_url: z
    .string()
    .trim()
    .url("Vui lòng nhập đầy đủ link Facebook cá nhân"),
  university: z.string().trim().min(2, "Vui lòng nhập trường đại học"),
  year: z.enum(studentYearOptions, {
    errorMap: () => ({ message: "Vui lòng chọn năm học" })
  }),
  student_id: z.string().trim().min(2, "Vui lòng nhập mã số sinh viên"),
  class_info: z
    .string()
    .trim()
    .min(4, "Vui lòng nhập Khóa - Lớp - Chuyên ngành"),
  speaker_question: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập câu hỏi hoặc N/A"),
  organizer_message: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập lời nhắn hoặc N/A")
});

export type WebinarRegistrationInput = z.infer<
  typeof webinarRegistrationSchema
>;

export type WebinarProofFile = {
  path: string;
  name: string;
  size: number;
  type: string;
};

export const webinarProofFileSchema = z.object({
  path: z.string().trim().min(1),
  name: z.string().trim().min(1).max(255),
  size: z.number().int().positive().max(5 * 1024 * 1024),
  type: z.string().startsWith("image/")
});

export const webinarRegistrationSubmissionSchema =
  webinarRegistrationSchema.extend({
    registration_id: z.string().uuid(),
    proof_post_files: z
      .array(webinarProofFileSchema)
      .min(1)
      .max(5),
    proof_fanpage_files: z
      .array(webinarProofFileSchema)
      .min(1)
      .max(5)
  });

export type WebinarRegistrationSubmission = z.infer<
  typeof webinarRegistrationSubmissionSchema
>;

export type WebinarRegistrationPayload = WebinarRegistrationInput & {
  proof_post_files: WebinarProofFile[];
  proof_fanpage_files: WebinarProofFile[];
};
