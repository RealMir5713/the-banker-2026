"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowLeft, ArrowRight, CheckCircle, Loader2, Send, UploadCloud, X } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  registrationSchema,
  registrationTypeOptions,
  studentYearOptions,
  type RegistrationInput
} from "@/lib/registration-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-red-600">
      <AlertCircle className="h-3.5 w-3.5" />
      {message}
    </p>
  );
}

function compressImage(file: File, maxWidth: number = 1200): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.7);
          resolve(compressedDataUrl.split(",")[1]);
        } else {
          resolve((event.target?.result as string).split(",")[1]);
        }
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
}

export function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors }
  } = useForm<RegistrationInput>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      registration_type: "Cá nhân",
      commitment: false
    }
  });

  const regType = watch("registration_type");
  const teamSize = watch("team_size");

  const handleNext = async () => {
    let fieldsToValidate: any[] = [];
    
    if (step === 1) {
      fieldsToValidate = ["registration_type"];
    } else if (step === 2) {
      if (regType === "Cá nhân") {
        fieldsToValidate = ["full_name", "phone", "email", "birth_date", "facebook_url", "university", "major", "year", "cv_file"];
      } else {
        fieldsToValidate = ["team_name", "team_size"];
      }
    } else if (step === 3 && regType === "Đồng đội") {
      fieldsToValidate = [
        "full_name", "phone", "email", "birth_date", "facebook_url", "university", "major", "year",
        "member_a_name", "member_a_university", "member_a_major", "member_a_year",
        "member_b_name", "member_b_university", "member_b_major", "member_b_year",
      ];
      if (teamSize === "4") {
        fieldsToValidate.push(
          "member_c_name", "member_c_university", "member_c_major", "member_c_year"
        );
      }
    }

    const isValid = await trigger(fieldsToValidate as any);
    if (isValid) {
      setStep((s) => s + 1);
    }
  };

  const handlePrev = () => {
    setStep((s) => Math.max(1, s - 1));
  };



  const handleProofImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setIsSubmitting(true);
    try {
      const currentImages = watch("proof_images") || [];
      const newImages = [...currentImages];

      for (const file of files) {
        if (newImages.length >= 5) break;
        if (file.size > 5 * 1024 * 1024) {
          alert(`File ${file.name} vượt quá 5MB`);
          continue;
        }

        const base64String = await compressImage(file, 1200);
        newImages.push({
          filename: file.name,
          mimeType: "image/jpeg",
          base64: base64String
        });
      }

      setValue("proof_images", newImages, { shouldValidate: true });
    } catch (err) {
      console.error("Error processing images:", err);
      alert("Có lỗi xảy ra khi xử lý ảnh. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
      e.target.value = "";
    }
  };

  const removeProofImage = (index: number) => {
    const currentImages = watch("proof_images") || [];
    const newImages = [...currentImages];
    newImages.splice(index, 1);
    setValue("proof_images", newImages, { shouldValidate: true });
  };



  const onSubmit = async (data: RegistrationInput) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Có lỗi xảy ra, vui lòng thử lại sau.");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto flex max-w-lg flex-col items-center justify-center rounded-[24px] bg-white p-10 text-center shadow-[0_12px_40px_-12px_rgba(249,115,22,0.15)] ring-1 ring-banker-orange/20"
        initial={{ opacity: 0, scale: 0.95 }}
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
          <CheckCircle className="h-10 w-10" />
        </div>
        <h3 className="mt-6 text-2xl font-black text-banker-navy">
          Đăng ký thành công!
        </h3>
        <p className="mt-3 leading-relaxed text-banker-navy/70">
          Cảm ơn bạn đã đăng ký tham gia <strong>The Banker 2026</strong>. 
          Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất. Hãy thường xuyên kiểm tra email nhé!
        </p>
        <div className="mt-8 rounded-xl bg-blue-50 p-6 ring-1 ring-blue-100">
          <p className="mb-4 font-medium text-banker-navy">
            <strong>Bạn hãy tham gia</strong> Group Cộng đồng dành riêng cho Thí sinh để cập nhật thông tin và thảo luận:
          </p>
          <a 
            href="https://www.facebook.com/share/g/1ChBb1u7NC/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#1877F2] px-6 py-3 font-bold text-white transition hover:bg-[#1877F2]/90 shadow-sm"
          >
            Tham gia Facebook Group
          </a>
        </div>
      </motion.div>
    );
  }

  const proofImages = watch("proof_images") || [];

  const totalSteps = regType === "Cá nhân" ? 3 : 4;

  return (
    <div className="mx-auto max-w-4xl rounded-[24px] bg-white p-6 md:p-10 shadow-[0_12px_40px_-12px_rgba(249,115,22,0.15)] ring-1 ring-banker-orange/20">
      {error ? (
        <div className="mb-8 flex items-start gap-3 rounded-[12px] bg-red-50 p-4 text-red-700 ring-1 ring-inset ring-red-600/20">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <div className="text-sm font-medium">{error}</div>
        </div>
      ) : null}

      <div className="mb-8 flex items-center justify-between">
        <div className="flex gap-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-2 w-12 rounded-full transition-colors",
                step >= i + 1 ? "bg-banker-orange" : "bg-banker-orange/20"
              )}
            />
          ))}
        </div>
        <div className="text-sm font-bold text-banker-orange">
          Bước {step} / {totalSteps}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        {/* STEP 1: HÌNH THỨC */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="mb-6">
              <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-banker-orange">
                I. HÌNH THỨC DỰ THI
              </h3>
              <h2 className="mt-2 text-2xl md:text-3xl font-black text-banker-navy">
                Bạn tham gia cuộc thi theo hình thức nào?
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {registrationTypeOptions.map((type) => (
                <label
                  key={type}
                  className={cn(
                    "flex cursor-pointer flex-col items-center justify-center rounded-[16px] border-2 p-6 text-center transition-all hover:bg-orange-50",
                    regType === type
                      ? "border-banker-orange bg-orange-50 text-banker-orange"
                      : "border-banker-orange/20 text-banker-navy/60"
                  )}
                  onClick={() => setValue("registration_type", type)}
                >
                  <span className="text-lg font-bold">{type}</span>
                </label>
              ))}
            </div>
          </motion.div>
        )}

        {/* STEP 2: THÔNG TIN CÁ NHÂN / NHÓM TRƯỞNG */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
            <div className="mb-6">
              <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-banker-orange">
                II. {regType === "Cá nhân" ? "THÔNG TIN CÁ NHÂN" : "THÔNG TIN ĐỘI VÀ NHÓM TRƯỞNG"}
              </h3>
              <h2 className="mt-2 text-2xl md:text-3xl font-black text-banker-navy">
                Điền thông tin chi tiết
              </h2>
            </div>

            {regType === "Đồng đội" && (
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold text-banker-navy">Tên nhóm <span className="text-banker-orange">*</span></label>
                  <Input {...register("team_name")} placeholder="VD: The Avengers" className="h-12 rounded-[12px]" />
                  <FieldError message={errors.team_name?.message} />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-banker-navy">Số lượng thành viên (bao gồm nhóm trưởng) <span className="text-banker-orange">*</span></label>
                  <select
                    {...register("team_size")}
                    className="w-full h-12 rounded-[12px] border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="">Chọn số lượng</option>
                    <option value="3">3 thành viên</option>
                    <option value="4">4 thành viên</option>
                  </select>
                  <FieldError message={errors.team_size?.message} />
                </div>
              </div>
            )}

            {regType === "Cá nhân" && (
              <>
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-banker-navy">Họ và tên của bạn <span className="text-banker-orange">*</span></label>
                    <Input {...register("full_name")} placeholder="Nguyễn Văn A" className="h-12 rounded-[12px]" />
                    <FieldError message={errors.full_name?.message} />
                  </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-banker-navy">Số điện thoại <span className="text-banker-orange">*</span></label>
                <Input {...register("phone")} placeholder="09xx xxx xxx" className="h-12 rounded-[12px]" />
                <FieldError message={errors.phone?.message} />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-banker-navy">Địa chỉ email <span className="text-banker-orange">*</span></label>
                <Input {...register("email")} type="email" placeholder="email@example.com" className="h-12 rounded-[12px]" />
                <FieldError message={errors.email?.message} />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-banker-navy">Ngày sinh <span className="text-banker-orange">*</span></label>
                <Input {...register("birth_date")} placeholder="DD/MM/YYYY" className="h-12 rounded-[12px]" />
                <FieldError message={errors.birth_date?.message} />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-banker-navy">Link Facebook <span className="text-banker-orange">*</span></label>
                <Input {...register("facebook_url")} placeholder="https://facebook.com/..." className="h-12 rounded-[12px]" />
                <FieldError message={errors.facebook_url?.message} />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-banker-navy">Link Google Drive CV Cá nhân <span className="text-banker-orange">*</span></label>
                <Input {...register("cv_link")} placeholder="https://drive.google.com/..." className="h-12 rounded-[12px]" />
                <FieldError message={errors.cv_link?.message} />
              </div>
            </div>

              <div className="grid gap-5 md:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-bold text-banker-navy">Trường đại học <span className="text-banker-orange">*</span></label>
                  <Input {...register("university")} placeholder="ĐH Ngoại thương" className="h-12 rounded-[12px]" />
                  <FieldError message={errors.university?.message} />
                </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-banker-navy">Chuyên ngành <span className="text-banker-orange">*</span></label>
                <Input {...register("major")} placeholder="Kinh tế quốc tế" className="h-12 rounded-[12px]" />
                <FieldError message={errors.major?.message} />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-banker-navy">Năm học <span className="text-banker-orange">*</span></label>
                <select
                  {...register("year")}
                  className="w-full h-12 rounded-[12px] border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="">Chọn năm học</option>
                  {studentYearOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <FieldError message={errors.year?.message} />
              </div>
            </div>
          </>
        )}
      </motion.div>
    )}

        {/* STEP 3 (ONLY FOR TEAM): THÔNG TIN CÁC THÀNH VIÊN */}
        {step === 3 && regType === "Đồng đội" && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
            <div className="mb-6">
              <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-banker-orange">
                III. THÔNG TIN THÀNH VIÊN
              </h3>
              <h2 className="mt-2 text-2xl md:text-3xl font-black text-banker-navy">
                Cập nhật thông tin {teamSize === "4" ? "4" : "3"} thành viên
              </h2>
            </div>

            {/* Thành viên A */}
            <div className="rounded-[16px] border-2 border-banker-orange bg-banker-orange/5 p-6 shadow-sm">
              <h4 className="mb-4 text-xl font-black text-banker-orange">Thành viên A</h4>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold text-banker-navy">Họ và tên <span className="text-banker-orange">*</span></label>
                  <Input {...register("full_name")} placeholder="Nguyễn Văn A" className="h-12 rounded-[12px] bg-white" />
                  <FieldError message={errors.full_name?.message} />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-banker-navy">Số điện thoại <span className="text-banker-orange">*</span></label>
                  <Input {...register("phone")} placeholder="09xx xxx xxx" className="h-12 rounded-[12px] bg-white" />
                  <FieldError message={errors.phone?.message} />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-banker-navy">Địa chỉ email <span className="text-banker-orange">*</span></label>
                  <Input {...register("email")} type="email" placeholder="email@example.com" className="h-12 rounded-[12px] bg-white" />
                  <FieldError message={errors.email?.message} />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-banker-navy">Ngày sinh <span className="text-banker-orange">*</span></label>
                  <Input {...register("birth_date")} placeholder="DD/MM/YYYY" className="h-12 rounded-[12px] bg-white" />
                  <FieldError message={errors.birth_date?.message} />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-bold text-banker-navy">Link Facebook <span className="text-banker-orange">*</span></label>
                  <Input {...register("facebook_url")} placeholder="https://facebook.com/..." className="h-12 rounded-[12px] bg-white" />
                  <FieldError message={errors.facebook_url?.message} />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-banker-navy">Trường đại học <span className="text-banker-orange">*</span></label>
                  <Input {...register("university")} placeholder="ĐH Ngoại thương" className="h-12 rounded-[12px] bg-white" />
                  <FieldError message={errors.university?.message} />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-banker-navy">Chuyên ngành <span className="text-banker-orange">*</span></label>
                  <Input {...register("major")} placeholder="Kinh tế quốc tế" className="h-12 rounded-[12px] bg-white" />
                  <FieldError message={errors.major?.message} />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-bold text-banker-navy">Năm học <span className="text-banker-orange">*</span></label>
                  <select
                    {...register("year")}
                    className="w-full h-12 rounded-[12px] border border-input bg-white px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="">Chọn năm học</option>
                    {studentYearOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <FieldError message={errors.year?.message} />
                </div>
              </div>
            </div>

            {[
              { id: "b", title: "Thành viên B" },
              { id: "c", title: "Thành viên C" },
              ...(teamSize === "4" ? [{ id: "d", title: "Thành viên D" }] : [])
            ].map((member) => (
              <div key={member.id} className="rounded-[16px] border border-banker-orange/20 p-6 shadow-sm">
                <h4 className="mb-4 text-lg font-bold text-banker-navy">{member.title}</h4>
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-banker-navy">Họ và tên <span className="text-banker-orange">*</span></label>
                    <Input {...register(`member_${member.id}_name` as any)} placeholder="Nguyễn Văn A" className="h-12 rounded-[12px]" />
                    <FieldError message={(errors as any)[`member_${member.id}_name`]?.message} />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold text-banker-navy">Số điện thoại <span className="text-banker-orange">*</span></label>
                    <Input {...register(`member_${member.id}_phone` as any)} placeholder="09xx xxx xxx" className="h-12 rounded-[12px]" />
                    <FieldError message={(errors as any)[`member_${member.id}_phone`]?.message} />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold text-banker-navy">Địa chỉ email <span className="text-banker-orange">*</span></label>
                    <Input {...register(`member_${member.id}_email` as any)} type="email" placeholder="email@example.com" className="h-12 rounded-[12px]" />
                    <FieldError message={(errors as any)[`member_${member.id}_email`]?.message} />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold text-banker-navy">Ngày sinh <span className="text-banker-orange">*</span></label>
                    <Input {...register(`member_${member.id}_birth_date` as any)} placeholder="DD/MM/YYYY" className="h-12 rounded-[12px]" />
                    <FieldError message={(errors as any)[`member_${member.id}_birth_date`]?.message} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-bold text-banker-navy">Link Facebook <span className="text-banker-orange">*</span></label>
                    <Input {...register(`member_${member.id}_facebook_url` as any)} placeholder="https://facebook.com/..." className="h-12 rounded-[12px]" />
                    <FieldError message={(errors as any)[`member_${member.id}_facebook_url`]?.message} />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold text-banker-navy">Trường đại học <span className="text-banker-orange">*</span></label>
                    <Input {...register(`member_${member.id}_university` as any)} placeholder="ĐH Ngoại thương" className="h-12 rounded-[12px]" />
                    <FieldError message={(errors as any)[`member_${member.id}_university`]?.message} />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold text-banker-navy">Chuyên ngành <span className="text-banker-orange">*</span></label>
                    <Input {...register(`member_${member.id}_major` as any)} placeholder="Kinh tế" className="h-12 rounded-[12px]" />
                    <FieldError message={(errors as any)[`member_${member.id}_major`]?.message} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-bold text-banker-navy">Năm học <span className="text-banker-orange">*</span></label>
                    <select
                      {...register(`member_${member.id}_year` as any)}
                      className="w-full h-12 rounded-[12px] border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <option value="">Chọn năm học</option>
                      {studentYearOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    <FieldError message={(errors as any)[`member_${member.id}_year`]?.message} />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* STEP 4/3: MINH CHỨNG & XÁC NHẬN */}
        {((step === 3 && regType === "Cá nhân") || (step === 4 && regType === "Đồng đội")) && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
            <div className="mb-6">
              <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-banker-orange">
                {regType === "Cá nhân" ? "III" : "IV"}. XÁC NHẬN THÔNG TIN
              </h3>
              <h2 className="mt-2 text-2xl md:text-3xl font-black text-banker-navy">
                Hoàn tất đăng ký
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-bold text-banker-navy">
                  Ảnh minh chứng Like/Share/Follow (Tối đa 5 ảnh) <span className="text-banker-orange">*</span>
                </label>
                <label className="flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-[12px] border border-dashed border-banker-orange/30 bg-banker-orange/5 px-5 py-5 text-center transition hover:border-banker-orange hover:bg-banker-orange/10">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleProofImages}
                  />
                  <UploadCloud className="h-7 w-7 text-banker-orange" />
                  <span className="mt-2 text-sm font-black text-banker-navy">
                    Tải lên ảnh minh chứng
                  </span>
                  <span className="mt-1 text-xs leading-5 text-banker-navy/55">
                    Định dạng: JPG, PNG. Tối đa 5MB/ảnh.
                  </span>
                </label>

                {proofImages.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {proofImages.map((img, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3 shadow-sm"
                      >
                        <div className="flex items-center space-x-3 overflow-hidden">
                          <img
                            src={`data:${img.mimeType};base64,${img.base64}`}
                            alt={img.filename}
                            className="h-10 w-10 flex-shrink-0 rounded object-cover"
                          />
                          <span className="truncate text-sm font-medium text-gray-700">
                            {img.filename}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeProofImage(index)}
                          className="ml-4 rounded-full p-1 text-gray-400 hover:bg-red-50 hover:text-red-500"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <FieldError message={errors.proof_images?.message} />
              </div>

              {/* CV upload: only for team registration */}
              {regType === "Đồng đội" && (
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-bold text-banker-navy">
                    Link Google Drive CV tổng hợp của nhóm <span className="text-banker-orange">*</span>
                  </label>
                  <Input {...register("team_cv_link")} placeholder="https://drive.google.com/..." className="h-12 rounded-[12px]" />
                  <FieldError message={(errors as any).team_cv_link?.message} />
                </div>
              )}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-bold text-banker-navy">Bạn biết đến cuộc thi từ đâu?</label>
                <Input {...register("source")} placeholder="Fanpage, Bạn bè, Email..." className="h-12 rounded-[12px]" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-bold text-banker-navy">Mục tiêu khi tham gia The Banker (tối đa 200 từ)</label>
                <textarea 
                  {...register("goals")} 
                  placeholder="Mục tiêu của bạn..." 
                  className="w-full rounded-[12px] border border-input bg-transparent px-3 py-3 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring min-h-[120px]" 
                />
                <FieldError message={errors.goals?.message} />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-bold text-banker-navy">Bạn đã từng tham gia các cuộc thi học thuật tương tự chưa?</label>
                <Input {...register("has_participated")} placeholder="Chưa / Đã từng (ghi rõ tên cuộc thi)" className="h-12 rounded-[12px]" />
              </div>
            </div>

            <div className="rounded-[16px] bg-banker-orange/5 p-6 border border-banker-orange/20">
              <label className="flex items-start gap-3 cursor-pointer">
                <div className="flex h-6 items-center">
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded-[4px] border-banker-orange/40 text-banker-orange focus:ring-banker-orange"
                    {...register("commitment")}
                  />
                </div>
                <div className="text-sm font-medium leading-relaxed text-banker-navy/80">
                  Tôi cam kết mọi thông tin cung cấp là chính xác, trung thực. 
                  Tôi cam kết tuân thủ Thể lệ, Quy chế của The Banker 2026. 
                  Tôi đồng ý để BTC sử dụng hình ảnh và thông tin cho công tác truyền thông.
                </div>
              </label>
              <FieldError message={errors.commitment?.message} />
            </div>

          </motion.div>
        )}

        {/* NAVIGATION BUTTONS */}
        <div className="flex items-center justify-between pt-6 border-t border-banker-orange/10">
          <Button 
            type="button" 
            variant="outline" 
            onClick={handlePrev} 
            disabled={step === 1 || isSubmitting}
            className="h-12 rounded-[12px] border-banker-orange/20 px-6 font-bold text-banker-navy hover:bg-banker-orange/5 hover:text-banker-orange"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Button>

          {((step === 3 && regType === "Cá nhân") || (step === 4 && regType === "Đồng đội")) ? (
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 rounded-[12px] bg-banker-orange px-8 font-bold text-white hover:bg-[#e06611]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang xử lý
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Nộp đơn đăng ký
                </>
              )}
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleNext}
              className="h-12 rounded-[12px] bg-banker-navy px-8 font-bold text-white hover:bg-banker-navy/90"
            >
              Tiếp tục
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>

      </form>
    </div>
  );
}
