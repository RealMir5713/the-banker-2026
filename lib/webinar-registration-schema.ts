import { z } from "zod";
import { studentYearOptions } from "@/lib/registration-schema";

export const webinarInterestOptions = [
  "Có, tôi dự định đăng ký",
  "Đang cân nhắc",
  "Tôi chỉ tham dự webinar"
] as const;

const phoneRegex = /^(0|\+84)([\s.-]?\d){8,10}$/;

export const webinarRegistrationSchema = z.object({
  full_name: z.string().trim().min(2, "Vui lòng nhập họ và tên"),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, "Số điện thoại chưa đúng định dạng"),
  email: z.string().trim().email("Email chưa đúng định dạng"),
  university: z.string().trim().min(2, "Vui lòng nhập trường đại học"),
  year: z.enum(studentYearOptions, {
    errorMap: () => ({ message: "Vui lòng chọn năm học" })
  }),
  major: z.string().trim().optional().default(""),
  student_id: z.string().trim().optional().default(""),
  facebook_url: z.string().trim().optional().default(""),
  competition_interest: z.enum(webinarInterestOptions, {
    errorMap: () => ({ message: "Vui lòng chọn mức độ quan tâm" })
  }),
  referral_source: z.string().trim().optional().default(""),
  expectations: z.string().trim().optional().default("")
});

export type WebinarRegistrationInput = z.infer<
  typeof webinarRegistrationSchema
>;
