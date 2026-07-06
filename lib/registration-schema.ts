import { z } from "zod";

export const studentYearOptions = [
  "Sinh viên năm 1",
  "Sinh viên năm 2",
  "Sinh viên năm 3",
  "Sinh viên năm 4",
  "Đã tốt nghiệp",
  "Khác"
] as const;

export const genderOptions = ["Nam", "Nữ", "Khác"] as const;
export const gpaScaleOptions = ["4.0", "10", "100", "Khác"] as const;

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
  gender: z.enum(genderOptions, {
    errorMap: () => ({ message: "Vui lòng chọn giới tính" })
  }),
  birth_date: z
    .string()
    .trim()
    .min(1, "Vui lòng chọn ngày sinh"),
  facebook_url: z
    .string()
    .trim()
    .min(3, "Vui lòng nhập link Facebook"),
  hometown: z
    .string()
    .trim()
    .min(2, "Vui lòng nhập quê quán"),
  current_city: z
    .string()
    .trim()
    .min(2, "Vui lòng nhập tỉnh/thành phố đang sinh sống"),
  university: z
    .string()
    .trim()
    .min(2, "Vui lòng nhập trường đại học"),
  year: z.enum(studentYearOptions, {
    errorMap: () => ({ message: "Vui lòng chọn năm học" })
  }),
  major: z
    .string()
    .trim()
    .min(2, "Vui lòng nhập chuyên ngành"),
  class_info: z.string().trim().optional().default(""),
  student_id: z.string().trim().optional().default(""),
  gpa: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập GPA/CPA"),
  gpa_scale: z.enum(gpaScaleOptions, {
    errorMap: () => ({ message: "Vui lòng chọn thang điểm" })
  }),
  english_certificates: z.string().trim().optional().default(""),
  professional_certificates: z.string().trim().optional().default(""),
  other_certificates: z.string().trim().optional().default(""),
  awards: z.string().trim().optional().default(""),
  team_name: z
    .string()
    .trim()
    .min(2, "Vui lòng nhập tên nhóm"),
  proof_links: z.string().trim().optional().default(""),
  referral_source: z.string().trim().optional().default(""),
  expectations: z.string().trim().optional().default(""),
  fanpage_like_proof_file: z.object({
    filename: z.string(),
    mimeType: z.string(),
    base64: z.string()
  }).optional(),
  other_proof_file: z.object({
    filename: z.string(),
    mimeType: z.string(),
    base64: z.string()
  }).optional()
});

export type RegistrationInput = z.infer<typeof registrationSchema>;
