import { z } from "zod";

export const studentYearOptions = [
  "Sinh viên năm 1",
  "Sinh viên năm 2",
  "Sinh viên năm 3",
  "Sinh viên năm 4",
  "Đã tốt nghiệp",
  "Khác"
] as const;

const phoneRegex = /^(0|\+84)([\s.-]?\d){8,10}$/;

export const registrationSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(2, "Vui lòng nhập họ và tên"),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, "Số điện thoại chưa đúng định dạng"),
  email: z
    .string()
    .trim()
    .email("Email chưa đúng định dạng"),
  university: z
    .string()
    .trim()
    .min(2, "Vui lòng nhập trường đại học"),
  year: z.enum(studentYearOptions, {
    errorMap: () => ({ message: "Vui lòng chọn năm học" })
  }),
  class_info: z.string().trim().optional().default(""),
  student_id: z.string().trim().optional().default(""),
  questions: z.string().trim().optional().default(""),
  fanpage_like_proof_file: z.object({
    filename: z.string(),
    mimeType: z.string(),
    base64: z.string()
  }).optional(),
  share_proof_file: z.object({
    filename: z.string(),
    mimeType: z.string(),
    base64: z.string()
  }).optional()
});

export type RegistrationInput = z.infer<typeof registrationSchema>;
