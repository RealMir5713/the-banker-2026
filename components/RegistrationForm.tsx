"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle, Loader2, Send, X } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  genderOptions,
  gpaScaleOptions,
  registrationSchema,
  studentYearOptions,
  type RegistrationInput
} from "@/lib/registration-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const referralOptions = [
  "Fanpage The Banker",
  "Fanpage FBN",
  "MSB",
  "Bạn bè / người thân",
  "Trường đại học",
  "Đối tác truyền thông",
  "Khác"
];

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return (
    <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-red-600">
      <AlertCircle className="h-3.5 w-3.5" />
      {message}
    </p>
  );
}

function FormGroup({
  title,
  description,
  children
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-xl font-black text-banker-navy">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-banker-navy/62">
          {description}
        </p>
      </div>
      {children}
    </div>
  );
}

export function RegistrationForm() {
  const [serverMessage, setServerMessage] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<RegistrationInput>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      full_name: "",
      phone: "",
      email: "",
      gender: "Nam",
      birth_date: "",
      facebook_url: "",
      hometown: "",
      current_city: "",
      university: "",
      year: "Sinh viên năm 1",
      major: "",
      class_info: "",
      student_id: "",
      gpa: "",
      gpa_scale: "4.0",
      english_certificates: "",
      professional_certificates: "",
      other_certificates: "",
      awards: "",
      proof_links: "",
      referral_source: "",
      expectations: "",
      fanpage_like_proof_file: undefined,
      other_proof_file: undefined
    }
  });

  const onSubmit = async (values: RegistrationInput) => {
    setServerMessage("");

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    });

    const result = (await response.json()) as { message?: string };

    if (!response.ok) {
      setServerMessage(
        result.message ??
          "Chưa thể gửi đăng ký. Vui lòng kiểm tra thông tin và thử lại."
      );
      return;
    }

    reset();
    setSuccessOpen(true);
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "fanpage_like_proof_file" | "other_proof_file"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("Dung lượng file vượt quá 10MB. Vui lòng chọn file nhỏ hơn.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = (event.target?.result as string).split(",")[1];
      setValue(field, {
        filename: file.name,
        mimeType: file.type,
        base64: base64String
      });
    };
    reader.readAsDataURL(file);
  };

  const fieldClass = "space-y-2";
  const labelClass = "text-sm font-bold text-banker-navy";

  return (
    <>
      <form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
        <FormGroup
          title="Thông tin cá nhân"
          description="Các thông tin dùng để BTC xác nhận hồ sơ dự thi và liên hệ trong suốt hành trình The Banker 2026."
        >
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <div className={fieldClass}>
              <label className={labelClass} htmlFor="full_name">
                Họ và tên *
              </label>
              <Input id="full_name" placeholder="VD: Nguyễn Văn A" {...register("full_name")} />
              <FieldError message={errors.full_name?.message} />
            </div>

            <div className={fieldClass}>
              <label className={labelClass} htmlFor="phone">
                Số điện thoại *
              </label>
              <Input id="phone" placeholder="VD: 0912345678" {...register("phone")} />
              <FieldError message={errors.phone?.message} />
            </div>

            <div className={fieldClass}>
              <label className={labelClass} htmlFor="email">
                Email *
              </label>
              <Input id="email" type="email" placeholder="VD: banker@email.com" {...register("email")} />
              <FieldError message={errors.email?.message} />
            </div>

            <div className={fieldClass}>
              <label className={labelClass} htmlFor="gender">
                Giới tính *
              </label>
              <Select id="gender" {...register("gender")}>
                {genderOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
              <FieldError message={errors.gender?.message} />
            </div>

            <div className={fieldClass}>
              <label className={labelClass} htmlFor="birth_date">
                Ngày sinh *
              </label>
              <Input id="birth_date" type="date" {...register("birth_date")} />
              <FieldError message={errors.birth_date?.message} />
            </div>

            <div className={fieldClass}>
              <label className={labelClass} htmlFor="facebook_url">
                Link Facebook *
              </label>
              <Input id="facebook_url" placeholder="VD: facebook.com/..." {...register("facebook_url")} />
              <FieldError message={errors.facebook_url?.message} />
            </div>

            <div className={fieldClass}>
              <label className={labelClass} htmlFor="hometown">
                Quê quán *
              </label>
              <Input id="hometown" placeholder="VD: Hà Nội" {...register("hometown")} />
              <FieldError message={errors.hometown?.message} />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className={labelClass} htmlFor="current_city">
                Tỉnh/Thành phố đang sinh sống *
              </label>
              <Input id="current_city" placeholder="VD: Hà Nội" {...register("current_city")} />
              <FieldError message={errors.current_city?.message} />
            </div>
          </div>
        </FormGroup>

        <FormGroup
          title="Thông tin học tập"
          description="Cung cấp thông tin học thuật để BTC đánh giá hồ sơ và sắp xếp các vòng chuyên môn phù hợp."
        >
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <div className="space-y-2 xl:col-span-2">
              <label className={labelClass} htmlFor="university">
                Trường đại học đã/đang theo học *
              </label>
              <Input
                id="university"
                placeholder="VD: Trường Đại học Ngoại thương"
                {...register("university")}
              />
              <FieldError message={errors.university?.message} />
            </div>

            <div className={fieldClass}>
              <label className={labelClass} htmlFor="year">
                Bạn là sinh viên năm thứ? *
              </label>
              <Select id="year" {...register("year")}>
                {studentYearOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
              <FieldError message={errors.year?.message} />
            </div>

            <div className={fieldClass}>
              <label className={labelClass} htmlFor="major">
                Chuyên ngành *
              </label>
              <Input id="major" placeholder="VD: Tài chính - Ngân hàng" {...register("major")} />
              <FieldError message={errors.major?.message} />
            </div>

            <div className={fieldClass}>
              <label className={labelClass} htmlFor="class_info">
                Khóa - Lớp - Chuyên ngành
              </label>
              <Input id="class_info" placeholder="VD: K62 - Anh 01 - TCQT" {...register("class_info")} />
            </div>

            <div className={fieldClass}>
              <label className={labelClass} htmlFor="student_id">
                Mã sinh viên
              </label>
              <Input id="student_id" placeholder="VD: MSV gồm 10 chữ số" {...register("student_id")} />
            </div>

            <div className={fieldClass}>
              <label className={labelClass} htmlFor="gpa">
                GPA/CPA *
              </label>
              <Input id="gpa" placeholder="VD: 3.45" {...register("gpa")} />
              <FieldError message={errors.gpa?.message} />
            </div>

            <div className={fieldClass}>
              <label className={labelClass} htmlFor="gpa_scale">
                Thang điểm *
              </label>
              <Select id="gpa_scale" {...register("gpa_scale")}>
                {gpaScaleOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
              <FieldError message={errors.gpa_scale?.message} />
            </div>
          </div>
        </FormGroup>

        <FormGroup
          title="Hồ sơ năng lực"
          description="Bạn có thể dán link minh chứng, chứng chỉ hoặc mô tả thành tích liên quan tới tài chính, ngân hàng, công nghệ và hoạt động ngoại khóa."
        >
          <div className="grid gap-5 lg:grid-cols-2">
            <div className={fieldClass}>
              <label className={labelClass} htmlFor="english_certificates">
                Chứng chỉ tiếng Anh
              </label>
              <Textarea
                id="english_certificates"
                placeholder="VD: IELTS 7.0, TOEIC 900, link minh chứng..."
                {...register("english_certificates")}
              />
            </div>

            <div className={fieldClass}>
              <label className={labelClass} htmlFor="professional_certificates">
                Chứng chỉ chuyên môn
              </label>
              <Textarea
                id="professional_certificates"
                placeholder="VD: MOS, CFA Research Challenge, chứng chỉ tài chính, dữ liệu..."
                {...register("professional_certificates")}
              />
            </div>

            <div className={fieldClass}>
              <label className={labelClass} htmlFor="other_certificates">
                Chứng chỉ khác
              </label>
              <Textarea
                id="other_certificates"
                placeholder="Các chứng chỉ, khóa học hoặc hoạt động bổ trợ khác."
                {...register("other_certificates")}
              />
            </div>

            <div className={fieldClass}>
              <label className={labelClass} htmlFor="awards">
                Giải thưởng
              </label>
              <Textarea
                id="awards"
                placeholder="Các giải thưởng học thuật, cuộc thi, nghiên cứu hoặc hoạt động liên quan."
                {...register("awards")}
              />
            </div>

            <div className={fieldClass}>
              <label className={labelClass} htmlFor="team_name">
                Tên nhóm *
              </label>
              <Input id="team_name" placeholder="VD: Digital Bankers" {...register("team_name")} />
              <FieldError message={errors.team_name?.message} />
            </div>

            <div className={fieldClass}>
              <label className={labelClass} htmlFor="referral_source">
                Bạn biết đến cuộc thi từ đâu?
              </label>
              <Select id="referral_source" {...register("referral_source")}>
                <option value="">Chọn kênh thông tin</option>
                {referralOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </div>

            <div className={fieldClass}>
              <label className={labelClass} htmlFor="proof_links">
                Link minh chứng tổng hợp
              </label>
              <Textarea
                id="proof_links"
                placeholder="Dán Google Drive/OneDrive/portfolio chứa minh chứng bổ sung nếu có."
                {...register("proof_links")}
              />
            </div>

            <div className={fieldClass}>
              <label className={labelClass} htmlFor="expectations">
                Kỳ vọng khi tham gia cuộc thi
              </label>
              <Textarea
                id="expectations"
                placeholder="Bạn mong muốn học hỏi, kết nối hoặc phát triển điều gì qua The Banker 2026?"
                {...register("expectations")}
              />
            </div>

            <div className={fieldClass}>
              <label className={labelClass} htmlFor="fanpage_like_proof">
                Ảnh chụp màn hình minh chứng Like Fanpage The Banker (Dung lượng &lt; 10MB) *
              </label>
              <Input
                accept="image/*,.pdf"
                className="cursor-pointer file:text-banker-navy"
                id="fanpage_like_proof"
                onChange={(e) => handleFileUpload(e, "fanpage_like_proof_file")}
                type="file"
              />
            </div>

            <div className={fieldClass}>
              <label className={labelClass} htmlFor="other_proof">
                Ảnh minh chứng (nếu có) Dung lượng &lt; 10MB
              </label>
              <Input
                accept="image/*,.pdf"
                className="cursor-pointer file:text-banker-navy"
                id="other_proof"
                onChange={(e) => handleFileUpload(e, "other_proof_file")}
                type="file"
              />
            </div>
          </div>
        </FormGroup>

        {serverMessage ? (
          <div className="flex items-start gap-3 rounded-[8px] border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{serverMessage}</span>
          </div>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium text-banker-navy/62">
            Thông tin của bạn chỉ được dùng cho hoạt động xét hồ sơ, xác nhận đăng ký và liên hệ trong khuôn khổ cuộc thi.
          </p>
          <Button className="min-w-48" disabled={isSubmitting} size="lg" type="submit">
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            Gửi đăng ký dự thi
          </Button>
        </div>
      </form>

      <AnimatePresence>
        {successOpen ? (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-banker-navy/40 px-4 backdrop-blur-sm"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          >
            <motion.div
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="relative max-w-md rounded-[8px] border border-white/70 bg-white p-8 text-center shadow-premium"
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
            >
              <button
                className="absolute right-4 top-4 rounded-full p-2 text-banker-navy/50 transition hover:bg-banker-light/40 hover:text-banker-navy"
                onClick={() => setSuccessOpen(false)}
                aria-label="Đóng thông báo"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-banker-orange/10 text-banker-orange">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-black text-banker-navy">
                Đăng ký dự thi thành công
              </h3>
              <p className="mt-3 text-sm leading-6 text-banker-navy/68">
                Cảm ơn bạn đã gửi hồ sơ đăng ký The Banker 2026. BTC sẽ kiểm tra
                thông tin và gửi email xác nhận trong thời gian sớm nhất.
              </p>
              <Button className="mt-6 w-full" onClick={() => setSuccessOpen(false)}>
                Hoàn tất
              </Button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
