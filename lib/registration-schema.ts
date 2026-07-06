import { z } from "zod";

export const studentYearOptions = [
  "Sinh viên năm 1",
  "Sinh viên năm 2",
  "Sinh viên năm 3",
  "Sinh viên năm 4",
  "Đã tốt nghiệp",
  "Khác"
] as const;

export const registrationTypeOptions = ["Cá nhân", "Đồng đội"] as const;

const phoneRegex = /^(0|\+84)([\s.-]?\d){8,10}$/;

const fileSchema = z.object({
  filename: z.string(),
  mimeType: z.string(),
  base64: z.string()
});

export const registrationSchema = z.object({
  registration_type: z.enum(registrationTypeOptions),
  
  // -- COMMON / INDIVIDUAL FIELDS (Or Team Leader Fields) --
  full_name: z.string().trim().min(2, "Vui lòng nhập họ và tên").optional(),
  phone: z.string().trim().regex(phoneRegex, "Số điện thoại chưa đúng định dạng").optional(),
  email: z.string().trim().email("Email chưa đúng định dạng").optional(),
  birth_date: z.string().trim().min(1, "Vui lòng chọn ngày sinh").optional(),
  facebook_url: z.string().trim().min(3, "Vui lòng nhập link Facebook").optional(),
  
  // -- ACADEMIC INFO --
  university: z.string().trim().min(2, "Vui lòng nhập trường đại học").optional(),
  major: z.string().trim().min(2, "Vui lòng nhập chuyên ngành").optional(),
  year: z.enum(studentYearOptions).optional(),
  
  // -- TEAM INFO --
  team_name: z.string().trim().min(2, "Vui lòng nhập tên nhóm").optional(),
  team_size: z.enum(["3", "4"]).optional(),
  
  // Team Member A
  member_a_name: z.string().trim().min(2, "Vui lòng nhập tên thành viên").optional(),
  member_a_university: z.string().trim().min(2, "Vui lòng nhập trường").optional(),
  member_a_major: z.string().trim().min(2, "Vui lòng nhập chuyên ngành").optional(),
  member_a_year: z.enum(studentYearOptions).optional(),

  // Team Member B
  member_b_name: z.string().trim().min(2, "Vui lòng nhập tên thành viên").optional(),
  member_b_university: z.string().trim().min(2, "Vui lòng nhập trường").optional(),
  member_b_major: z.string().trim().min(2, "Vui lòng nhập chuyên ngành").optional(),
  member_b_year: z.enum(studentYearOptions).optional(),

  // Team Member C
  member_c_name: z.string().trim().min(2, "Vui lòng nhập tên thành viên").optional(),
  member_c_university: z.string().trim().min(2, "Vui lòng nhập trường").optional(),
  member_c_major: z.string().trim().min(2, "Vui lòng nhập chuyên ngành").optional(),
  member_c_year: z.enum(studentYearOptions).optional(),

  // -- FINAL INFO --
  cv_file: fileSchema.optional(), // for individual
  proof_links: z.string().trim().optional().default(""), // file upload changed to link? Actually user didn't specify. PDF says "Link minh chứng tổng hợp". So it's a link.
  proof_file: fileSchema.optional(), // if they want to upload
  source: z.string().trim().optional().default(""),
  goals: z.string().trim().max(200, "Tối đa 200 từ").optional().default(""),
  has_participated: z.string().trim().optional().default(""),
  commitment: z.boolean().refine((val) => val === true, "Bạn phải đồng ý với cam kết"),
}).superRefine((data, ctx) => {
  // If Team, require team fields
  if (data.registration_type === "Đồng đội") {
    if (!data.team_name) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Vui lòng nhập tên nhóm", path: ["team_name"] });
    }
    if (!data.team_size) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Vui lòng chọn số lượng thành viên", path: ["team_size"] });
    }
    if (!data.member_a_name) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Vui lòng nhập tên thành viên A", path: ["member_a_name"] });
    }
    if (!data.member_b_name) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Vui lòng nhập tên thành viên B", path: ["member_b_name"] });
    }
    if (data.team_size === "4" && !data.member_c_name) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Vui lòng nhập tên thành viên C", path: ["member_c_name"] });
    }
  }

  // Common required fields
  if (!data.full_name) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Vui lòng nhập họ và tên", path: ["full_name"] });
  }
  if (!data.phone || !phoneRegex.test(data.phone)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Số điện thoại chưa đúng", path: ["phone"] });
  }
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Email chưa đúng", path: ["email"] });
  }
  if (!data.university) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Vui lòng nhập trường", path: ["university"] });
  }
});

export type RegistrationInput = z.infer<typeof registrationSchema>;
