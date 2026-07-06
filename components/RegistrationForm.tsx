"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle, Loader2, Send, X } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  registrationSchema,
  studentYearOptions,
  type RegistrationInput
} from "@/lib/registration-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

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
      university: "",
      year: "Sinh viên năm 1",
      class_info: "",
      student_id: "",
      questions: "",
      fanpage_like_proof_file: undefined,
      share_proof_file: undefined
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
    field: "fanpage_like_proof_file" | "share_proof_file"
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
        <div>
          <div className="grid gap-5 md:grid-cols-3">
            <div className={fieldClass}>
              <label className={labelClass} htmlFor="full_name">
                Họ và tên *
              </label>
              <Input className="bg-[#dcebfe] border-transparent text-banker-navy placeholder:text-[#8ea9cc] font-medium h-12 rounded-[16px]" id="full_name" placeholder="VD: Nguyễn Văn A" {...register("full_name")} />
              <FieldError message={errors.full_name?.message} />
            </div>

            <div className={fieldClass}>
              <label className={labelClass} htmlFor="phone">
                Số điện thoại *
              </label>
              <Input className="bg-[#dcebfe] border-transparent text-banker-navy placeholder:text-[#8ea9cc] font-medium h-12 rounded-[16px]" id="phone" placeholder="VD: 0123456789" {...register("phone")} />
              <FieldError message={errors.phone?.message} />
            </div>

            <div className={fieldClass}>
              <label className={labelClass} htmlFor="email">
                Email *
              </label>
              <Input className="bg-[#dcebfe] border-transparent text-banker-navy placeholder:text-[#8ea9cc] font-medium h-12 rounded-[16px]" id="email" type="email" placeholder="VD: thebanker@gmail.com" {...register("email")} />
              <FieldError message={errors.email?.message} />
            </div>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div className={fieldClass}>
              <label className={labelClass} htmlFor="university">
                Trường đã/đang theo học *
              </label>
              <Input
                className="bg-[#dcebfe] border-transparent text-banker-navy placeholder:text-[#8ea9cc] font-medium h-12 rounded-[16px]"
                id="university"
                {...register("university")}
              />
              <FieldError message={errors.university?.message} />
            </div>

            <div className={fieldClass}>
              <label className={labelClass} htmlFor="year">
                Bạn là sinh viên năm thứ? *
              </label>
              <Select className="bg-[#dcebfe] border-transparent text-banker-navy font-medium h-12 rounded-[16px]" id="year" {...register("year")}>
                {studentYearOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
              <FieldError message={errors.year?.message} />
            </div>
          </div>

          <div className="my-8 h-px w-full bg-[#dcebfe]" />

          <p className="mb-6 text-sm font-bold text-[#355fb5]">
            Sinh viên trường Đại học Ngoại thương - Cơ sở 1 điền 02 trường thông tin dưới đây để nhận điểm rèn luyện khi tham dự đêm chung kết
          </p>

          <div className="grid gap-5 md:grid-cols-2">
            <div className={fieldClass}>
              <label className={labelClass} htmlFor="class_info">
                Lớp - Chuyên ngành - Khóa
              </label>
              <Input className="bg-[#dcebfe] border-transparent text-banker-navy placeholder:text-[#8ea9cc] font-medium h-12 rounded-[16px]" id="class_info" placeholder="VD: Anh 01 - PTDT - K61" {...register("class_info")} />
            </div>

            <div className={fieldClass}>
              <label className={labelClass} htmlFor="student_id">
                Mã sinh viên
              </label>
              <Input className="bg-[#dcebfe] border-transparent text-banker-navy placeholder:text-[#8ea9cc] font-medium h-12 rounded-[16px]" id="student_id" placeholder="MSV gồm 10 chữ số" {...register("student_id")} />
            </div>
          </div>

          <div className="my-8 h-px w-full bg-[#dcebfe]" />

          <div className="grid gap-5 md:grid-cols-2">
            <div className={fieldClass}>
              <label className={labelClass} htmlFor="fanpage_like_proof">
                Minh chứng đã like fanpage The Banker
              </label>
              <div className="relative">
                <Input
                  accept="image/*,.pdf"
                  className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                  id="fanpage_like_proof"
                  onChange={(e) => handleFileUpload(e, "fanpage_like_proof_file")}
                  type="file"
                />
                <div className="flex h-12 items-center justify-center rounded-[16px] bg-[#dcebfe] font-medium text-[#8ea9cc] transition-colors hover:bg-[#c9ddfd]">
                  + Tải ảnh minh chứng
                </div>
              </div>
            </div>

            <div className={fieldClass}>
              <label className={labelClass} htmlFor="share_proof">
                Minh chứng like và share bài mở đơn
              </label>
              <div className="relative">
                <Input
                  accept="image/*,.pdf"
                  className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                  id="share_proof"
                  onChange={(e) => handleFileUpload(e, "share_proof_file")}
                  type="file"
                />
                <div className="flex h-12 items-center justify-center rounded-[16px] bg-[#dcebfe] font-medium text-[#8ea9cc] transition-colors hover:bg-[#c9ddfd]">
                  + Tải ảnh minh chứng
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className={fieldClass}>
              <label className={labelClass} htmlFor="questions">
                Bạn có câu hỏi gì cho BTC không?
              </label>
              <Input className="bg-[#dcebfe] border-transparent text-banker-navy placeholder:text-[#8ea9cc] font-medium h-12 rounded-[16px]" id="questions" placeholder="Không bắt buộc" {...register("questions")} />
            </div>
          </div>
        </div>

        {serverMessage ? (
          <div className="flex items-start gap-3 rounded-[8px] border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{serverMessage}</span>
          </div>
        ) : null}

        <div className="flex justify-center pt-6">
          <Button className="min-w-[200px] h-14 rounded-full bg-[#7a8ece] hover:bg-[#637bb9] text-white text-lg font-bold" disabled={isSubmitting} size="lg" type="submit">
            {isSubmitting ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : null}
            ĐĂNG KÝ
          </Button>
        </div>
      </form>

      <AnimatePresence>
        {successOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-banker-navy/40 backdrop-blur-sm"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              onClick={() => setSuccessOpen(false)}
            />
            <motion.div
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="relative z-10 w-full max-w-md overflow-hidden rounded-[16px] bg-white shadow-2xl"
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
            >
              <div className="absolute right-4 top-4">
                <button
                  className="rounded-full p-1.5 text-banker-navy/40 transition hover:bg-banker-navy/5 hover:text-banker-navy"
                  onClick={() => setSuccessOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-8 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="mb-3 text-2xl font-black text-banker-navy">
                  Đăng ký thành công!
                </h3>
                <p className="text-base leading-6 text-banker-navy/70">
                  Cảm ơn bạn đã quan tâm và đăng ký tham dự đêm chung kết The Banker 2026.
                </p>
                <div className="mt-8">
                  <Button
                    className="w-full"
                    onClick={() => setSuccessOpen(false)}
                    size="lg"
                  >
                    Đóng
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
