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
  
  // Team Member B
  member_b_name: z.string().trim().min(2, "Vui lòng nhập tên thành viên").optional(),
  member_b_phone: z.string().trim().regex(phoneRegex, "SĐT chưa đúng định dạng").optional(),
  member_b_email: z.string().trim().email("Email chưa đúng").optional(),
  member_b_birth_date: z.string().trim().min(1, "Vui lòng chọn ngày sinh").optional(),
  member_b_facebook_url: z.string().trim().min(3, "Vui lòng nhập link FB").optional(),
  member_b_university: z.string().trim().min(2, "Vui lòng nhập trường").optional(),
  member_b_major: z.string().trim().min(2, "Vui lòng nhập chuyên ngành").optional(),
  member_b_year: z.enum(studentYearOptions).optional(),

  // Team Member C
  member_c_name: z.string().trim().min(2, "Vui lòng nhập tên thành viên").optional(),
  member_c_phone: z.string().trim().regex(phoneRegex, "SĐT chưa đúng định dạng").optional(),
  member_c_email: z.string().trim().email("Email chưa đúng").optional(),
  member_c_birth_date: z.string().trim().min(1, "Vui lòng chọn ngày sinh").optional(),
  member_c_facebook_url: z.string().trim().min(3, "Vui lòng nhập link FB").optional(),
  member_c_university: z.string().trim().min(2, "Vui lòng nhập trường").optional(),
  member_c_major: z.string().trim().min(2, "Vui lòng nhập chuyên ngành").optional(),
  member_c_year: z.enum(studentYearOptions).optional(),

  // Team Member D
  member_d_name: z.string().trim().min(2, "Vui lòng nhập tên thành viên").optional(),
  member_d_phone: z.string().trim().regex(phoneRegex, "SĐT chưa đúng định dạng").optional(),
  member_d_email: z.string().trim().email("Email chưa đúng").optional(),
  member_d_birth_date: z.string().trim().min(1, "Vui lòng chọn ngày sinh").optional(),
  member_d_facebook_url: z.string().trim().min(3, "Vui lòng nhập link FB").optional(),
  member_d_university: z.string().trim().min(2, "Vui lòng nhập trường").optional(),
  member_d_major: z.string().trim().min(2, "Vui lòng nhập chuyên ngành").optional(),
  member_d_year: z.enum(studentYearOptions).optional(),

  // -- FINAL INFO --
  cv_link: z.string().trim().min(5, "Vui lòng nhập link CV").optional(), // for individual
  team_cv_link: z.string().trim().min(5, "Vui lòng nhập link CV").optional(), // for team
  proof_images: z.array(fileSchema)
    .min(1, "Vui lòng tải lên ít nhất 1 ảnh minh chứng (Like/Share/Follow)")
    .max(5, "Tối đa 5 ảnh minh chứng"),
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
    if (!data.member_b_name) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Vui lòng nhập tên thành viên B", path: ["member_b_name"] });
    }
    if (!data.member_b_phone || !phoneRegex.test(data.member_b_phone)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "SĐT chưa đúng", path: ["member_b_phone"] });
    }
    if (!data.member_b_email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.member_b_email)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Email chưa đúng", path: ["member_b_email"] });
    }
    if (!data.member_b_university) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Vui lòng nhập trường", path: ["member_b_university"] });
    }

    if (!data.member_c_name) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Vui lòng nhập tên thành viên C", path: ["member_c_name"] });
    }
    if (!data.member_c_phone || !phoneRegex.test(data.member_c_phone)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "SĐT chưa đúng", path: ["member_c_phone"] });
    }
    if (!data.member_c_email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.member_c_email)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Email chưa đúng", path: ["member_c_email"] });
    }
    if (!data.member_c_university) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Vui lòng nhập trường", path: ["member_c_university"] });
    }

    if (data.team_size === "4") {
      if (!data.member_d_name) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Vui lòng nhập tên thành viên D", path: ["member_d_name"] });
      }
      if (!data.member_d_phone || !phoneRegex.test(data.member_d_phone)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "SĐT chưa đúng", path: ["member_d_phone"] });
      }
      if (!data.member_d_email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.member_d_email)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Email chưa đúng", path: ["member_d_email"] });
      }
      if (!data.member_d_university) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Vui lòng nhập trường", path: ["member_d_university"] });
      }
    }
    
    if (!data.team_cv_link) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Vui lòng cung cấp link CV tổng hợp của nhóm", path: ["team_cv_link"] });
    }
  } else {
    // Individual registration
    if (!data.cv_link) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Vui lòng cung cấp link CV của bạn", path: ["cv_link"] });
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
