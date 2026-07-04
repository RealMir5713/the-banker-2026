"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle,
  Loader2,
  Send,
  ShieldCheck,
  X
} from "lucide-react";
import { useForm } from "react-hook-form";
import { studentYearOptions } from "@/lib/registration-schema";
import {
  webinarInterestOptions,
  webinarRegistrationSchema,
  type WebinarRegistrationInput
} from "@/lib/webinar-registration-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const referralOptions = [
  "Facebook Group The Banker 2026",
  "Fanpage The Banker",
  "Fanpage FBN",
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

function Field({
  children,
  label,
  required = false
}: {
  children: React.ReactNode;
  label: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-banker-navy">
        {label}
        {required ? <span className="text-banker-orange"> *</span> : null}
      </span>
      {children}
    </label>
  );
}

export function WebinarRegistrationForm() {
  const [serverMessage, setServerMessage] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<WebinarRegistrationInput>({
    resolver: zodResolver(webinarRegistrationSchema),
    defaultValues: {
      full_name: "",
      phone: "",
      email: "",
      university: "",
      year: "Sinh viên năm 1",
      major: "",
      student_id: "",
      facebook_url: "",
      competition_interest: "Có, tôi dự định đăng ký",
      referral_source: "",
      expectations: ""
    }
  });

  const onSubmit = async (values: WebinarRegistrationInput) => {
    setServerMessage("");

    const response = await fetch("/api/webinar-register", {
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

  return (
    <>
      <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="mb-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-banker-orange">
              Thông tin người tham dự
            </p>
            <h3 className="mt-2 text-2xl font-black text-banker-navy">
              Giữ chỗ cho webinar trực tuyến
            </h3>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <Field label="Họ và tên" required>
                <Input
                  autoComplete="name"
                  placeholder="Nguyễn Văn A"
                  required
                  {...register("full_name")}
                />
              </Field>
              <FieldError message={errors.full_name?.message} />
            </div>

            <div>
              <Field label="Số điện thoại" required>
                <Input
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="09xx xxx xxx"
                  required
                  {...register("phone")}
                />
              </Field>
              <FieldError message={errors.phone?.message} />
            </div>

            <div>
              <Field label="Email" required>
                <Input
                  autoComplete="email"
                  placeholder="email@example.com"
                  required
                  type="email"
                  {...register("email")}
                />
              </Field>
              <FieldError message={errors.email?.message} />
            </div>

            <div>
              <Field label="Trường đại học" required>
                <Input
                  placeholder="Trường Đại học Ngoại thương"
                  required
                  {...register("university")}
                />
              </Field>
              <FieldError message={errors.university?.message} />
            </div>

            <div>
              <Field label="Bạn là sinh viên năm thứ?" required>
                <Select required {...register("year")}>
                  {studentYearOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </Field>
              <FieldError message={errors.year?.message} />
            </div>

            <Field label="Chuyên ngành">
              <Input
                placeholder="Tài chính - Ngân hàng"
                {...register("major")}
              />
            </Field>

            <Field label="Mã sinh viên">
              <Input placeholder="Mã sinh viên" {...register("student_id")} />
            </Field>

            <Field label="Link Facebook">
              <Input
                placeholder="https://facebook.com/..."
                type="url"
                {...register("facebook_url")}
              />
            </Field>
          </div>
        </div>

        <div className="border-t border-banker-orange/10 pt-8">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <Field label="Bạn có quan tâm tới cuộc thi?" required>
                <Select required {...register("competition_interest")}>
                  {webinarInterestOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </Field>
              <FieldError message={errors.competition_interest?.message} />
            </div>

            <Field label="Bạn biết webinar từ đâu?">
              <Select {...register("referral_source")}>
                <option value="">Chọn nguồn thông tin</option>
                {referralOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </Field>

            <div className="md:col-span-2">
              <Field label="Điều bạn mong muốn nhận được từ webinar">
                <Textarea
                  placeholder="Chủ đề, câu hỏi hoặc kiến thức bạn đang quan tâm..."
                  {...register("expectations")}
                />
              </Field>
            </div>
          </div>
        </div>

        {serverMessage ? (
          <p className="rounded-[8px] border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {serverMessage}
          </p>
        ) : null}

        <div className="flex flex-col gap-4 border-t border-banker-orange/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex max-w-lg items-start gap-2 text-xs leading-5 text-banker-navy/[0.64]">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-banker-orange" />
            Thông tin chỉ được sử dụng để xác nhận tham dự và gửi hướng dẫn
            truy cập webinar.
          </p>
          <Button disabled={isSubmitting} size="lg" type="submit">
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            Đăng ký tham dự
          </Button>
        </div>
      </form>

      <AnimatePresence>
        {successOpen ? (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-banker-navy/[0.62] px-4 backdrop-blur-sm"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          >
            <motion.div
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="relative w-full max-w-md rounded-[8px] border border-white/70 bg-white p-7 text-center shadow-premium"
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
            >
              <button
                aria-label="Đóng"
                className="absolute right-4 top-4 rounded-full p-2 text-banker-navy/50 transition hover:bg-banker-light/40 hover:text-banker-navy"
                onClick={() => setSuccessOpen(false)}
                type="button"
              >
                <X className="h-5 w-5" />
              </button>
              <CheckCircle className="mx-auto h-14 w-14 text-banker-orange" />
              <h3 className="mt-5 text-2xl font-black text-banker-navy">
                Đăng ký thành công
              </h3>
              <p className="mt-3 text-sm leading-6 text-banker-navy/[0.68]">
                Ban tổ chức sẽ gửi email xác nhận và hướng dẫn tham dự webinar
                tới bạn.
              </p>
              <Button
                className="mt-6"
                onClick={() => setSuccessOpen(false)}
                type="button"
              >
                Hoàn tất
              </Button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
