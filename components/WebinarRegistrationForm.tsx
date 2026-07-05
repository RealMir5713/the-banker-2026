"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle,
  FileImage,
  Loader2,
  Send,
  ShieldCheck,
  UploadCloud,
  X
} from "lucide-react";
import { useForm } from "react-hook-form";
import { studentYearOptions } from "@/lib/registration-schema";
import {
  webinarRegistrationSchema,
  type WebinarProofFile,
  type WebinarRegistrationInput
} from "@/lib/webinar-registration-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const maxFilesPerGroup = 5;
const maxFileSize = 5 * 1024 * 1024;

type UploadDescriptor = {
  path: string;
  signed_url: string;
};

type UploadPlan = {
  registration_id: string;
  uploads: {
    post: UploadDescriptor[];
    fanpage: UploadDescriptor[];
  };
};

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

function formatFileSize(size: number) {
  return `${(size / 1024 / 1024).toFixed(2)} MB`;
}

function MultiFileField({
  error,
  files,
  label,
  onChange
}: {
  error?: string;
  files: File[];
  label: string;
  onChange: (files: File[], error?: string) => void;
}) {
  const addFiles = (selectedFiles: File[]) => {
    const invalidType = selectedFiles.find(
      (file) => !file.type.startsWith("image/")
    );
    if (invalidType) {
      onChange(files, `"${invalidType.name}" không phải là tệp ảnh.`);
      return;
    }

    const oversized = selectedFiles.find((file) => file.size > maxFileSize);
    if (oversized) {
      onChange(files, `"${oversized.name}" vượt quá giới hạn 5 MB.`);
      return;
    }

    const nextFiles = [...files, ...selectedFiles].filter(
      (file, index, allFiles) =>
        allFiles.findIndex(
          (candidate) =>
            candidate.name === file.name &&
            candidate.size === file.size &&
            candidate.lastModified === file.lastModified
        ) === index
    );

    if (nextFiles.length > maxFilesPerGroup) {
      onChange(files, `Mỗi mục chỉ nhận tối đa ${maxFilesPerGroup} ảnh.`);
      return;
    }

    onChange(nextFiles);
  };

  return (
    <div>
      <div className="mb-2 text-sm font-bold text-banker-navy">
        {label}
        <span className="text-banker-orange"> *</span>
      </div>
      <label className="flex min-h-32 cursor-pointer flex-col items-center justify-center border border-dashed border-banker-orange/35 bg-banker-light/20 px-5 py-5 text-center transition hover:border-banker-orange hover:bg-banker-light/35">
        <input
          accept="image/*"
          className="sr-only"
          multiple
          onChange={(event) => {
            addFiles(Array.from(event.currentTarget.files ?? []));
            event.currentTarget.value = "";
          }}
          type="file"
        />
        <UploadCloud className="h-7 w-7 text-banker-orange" />
        <span className="mt-2 text-sm font-black text-banker-navy">
          Chọn một hoặc nhiều ảnh
        </span>
        <span className="mt-1 text-xs leading-5 text-banker-navy/55">
          Tối đa 5 ảnh, 5 MB mỗi ảnh
        </span>
      </label>

      {files.length > 0 ? (
        <div className="mt-3 space-y-2">
          {files.map((file, index) => (
            <div
              className="flex min-w-0 items-center gap-3 border border-banker-orange/12 bg-white/75 px-3 py-2.5"
              key={`${file.name}-${file.size}-${file.lastModified}`}
            >
              <FileImage className="h-5 w-5 shrink-0 text-banker-orange" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold text-banker-navy">
                  {file.name}
                </p>
                <p className="mt-0.5 text-[11px] text-banker-navy/50">
                  {formatFileSize(file.size)}
                </p>
              </div>
              <button
                aria-label={`Xóa ${file.name}`}
                className="grid h-8 w-8 shrink-0 place-items-center text-banker-navy/45 transition hover:bg-red-50 hover:text-red-600"
                onClick={() =>
                  onChange(files.filter((_, fileIndex) => fileIndex !== index))
                }
                title="Xóa ảnh"
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      ) : null}

      <FieldError message={error} />
    </div>
  );
}

export function WebinarRegistrationForm() {
  const [serverMessage, setServerMessage] = useState("");
  const [submitStatus, setSubmitStatus] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);
  const [proofPostFiles, setProofPostFiles] = useState<File[]>([]);
  const [proofFanpageFiles, setProofFanpageFiles] = useState<File[]>([]);
  const [proofPostError, setProofPostError] = useState("");
  const [proofFanpageError, setProofFanpageError] = useState("");
  const [fileInputVersion, setFileInputVersion] = useState(0);

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
      facebook_url: "",
      university: "",
      year: "Sinh viên năm 1",
      student_id: "",
      class_info: "",
      speaker_question: "",
      organizer_message: ""
    }
  });

  const onSubmit = async (values: WebinarRegistrationInput) => {
    setServerMessage("");
    setSubmitStatus("");

    const missingPostProof = proofPostFiles.length === 0;
    const missingFanpageProof = proofFanpageFiles.length === 0;
    setProofPostError(
      missingPostProof ? "Vui lòng tải lên ít nhất một ảnh minh chứng." : ""
    );
    setProofFanpageError(
      missingFanpageProof ? "Vui lòng tải lên ít nhất một ảnh minh chứng." : ""
    );

    if (missingPostProof || missingFanpageProof) {
      return;
    }

    let registrationId = "";

    try {
      setSubmitStatus("Đang chuẩn bị tải ảnh...");

      const uploadPlanResponse = await fetch("/api/webinar-upload-urls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          post: proofPostFiles.map(({ name, size, type }) => ({
            name,
            size,
            type
          })),
          fanpage: proofFanpageFiles.map(({ name, size, type }) => ({
            name,
            size,
            type
          }))
        })
      });
      const uploadPlanResult = (await uploadPlanResponse.json()) as
        | UploadPlan
        | { message?: string };

      if (!uploadPlanResponse.ok || !("uploads" in uploadPlanResult)) {
        throw new Error(
          "message" in uploadPlanResult
            ? uploadPlanResult.message
            : "Chưa thể chuẩn bị khu vực tải ảnh."
        );
      }

      registrationId = uploadPlanResult.registration_id;
      const uploadGroup = async (
        files: File[],
        descriptors: UploadDescriptor[]
      ): Promise<WebinarProofFile[]> => {
        const metadata: WebinarProofFile[] = [];

        for (const [index, file] of files.entries()) {
          const descriptor = descriptors[index];
          if (!descriptor) {
            throw new Error("Danh sách tải ảnh không đầy đủ.");
          }

          const fileFormData = new FormData();
          fileFormData.append("cacheControl", "3600");
          fileFormData.append("", file);
          const uploadResponse = await fetch(descriptor.signed_url, {
            method: "PUT",
            headers: {
              "x-upsert": "false"
            },
            body: fileFormData
          });

          if (!uploadResponse.ok) {
            throw new Error(`Không thể tải ảnh "${file.name}".`);
          }

          metadata.push({
            path: descriptor.path,
            name: file.name,
            size: file.size,
            type: file.type
          });
        }

        return metadata;
      };

      setSubmitStatus("Đang tải ảnh minh chứng...");
      const [proofPostMetadata, proofFanpageMetadata] = await Promise.all([
        uploadGroup(proofPostFiles, uploadPlanResult.uploads.post),
        uploadGroup(proofFanpageFiles, uploadPlanResult.uploads.fanpage)
      ]);

      setSubmitStatus("Đang lưu thông tin đăng ký...");
      const response = await fetch("/api/webinar-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...values,
          registration_id: registrationId,
          proof_post_files: proofPostMetadata,
          proof_fanpage_files: proofFanpageMetadata
        })
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(
          result.message ??
            "Chưa thể gửi đăng ký. Vui lòng kiểm tra thông tin và thử lại."
        );
      }

      reset();
      setProofPostFiles([]);
      setProofFanpageFiles([]);
      setProofPostError("");
      setProofFanpageError("");
      setFileInputVersion((version) => version + 1);
      setSuccessOpen(true);
    } catch (error) {
      if (registrationId) {
        await fetch("/api/webinar-register", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ registration_id: registrationId })
        }).catch(() => undefined);
      }

      setServerMessage(
        error instanceof Error
          ? error.message
          : "Không thể kết nối tới hệ thống đăng ký. Vui lòng thử lại."
      );
    } finally {
      setSubmitStatus("");
    }
  };

  return (
    <>
      <form
        className="space-y-9"
        onSubmit={handleSubmit(onSubmit)}
      >
        <section>
          <div className="mb-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-banker-orange">
              I. Thông tin cá nhân
            </p>
            <h3 className="mt-2 text-2xl font-black text-banker-navy">
              Thông tin người tham dự
            </h3>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <Field label="Họ và tên của bạn" required>
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
              <Field label="Địa chỉ email" required>
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
              <Field label="Link Facebook cá nhân" required>
                <Input
                  placeholder="https://facebook.com/..."
                  required
                  type="url"
                  {...register("facebook_url")}
                />
              </Field>
              <FieldError message={errors.facebook_url?.message} />
            </div>

            <div>
              <Field label="Bạn là sinh viên trường nào?" required>
                <Input
                  placeholder="Trường Đại học Ngoại thương"
                  required
                  {...register("university")}
                />
              </Field>
              <FieldError message={errors.university?.message} />
            </div>

            <div>
              <Field label="Bạn là sinh viên năm?" required>
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

            <div>
              <Field label="Mã số sinh viên của bạn" required>
                <Input
                  placeholder="Mã số sinh viên"
                  required
                  {...register("student_id")}
                />
              </Field>
              <FieldError message={errors.student_id?.message} />
            </div>

            <div>
              <Field label="Khóa - Lớp - Chuyên ngành của bạn" required>
                <Input
                  placeholder="K64 - Anh 01 - Tài chính quốc tế"
                  required
                  {...register("class_info")}
                />
              </Field>
              <FieldError message={errors.class_info?.message} />
            </div>
          </div>
        </section>

        <section className="border-t border-banker-orange/10 pt-8">
          <div className="mb-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-banker-orange">
              II. Webinar Open Banking
            </p>
            <h3 className="mt-2 text-2xl font-black text-banker-navy">
              Minh chứng và câu hỏi
            </h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <MultiFileField
              error={proofPostError}
              files={proofPostFiles}
              key={`post-${fileInputVersion}`}
              label="Ảnh chụp màn hình đã like/share bài mở đơn đăng ký"
              onChange={(files, error = "") => {
                setProofPostFiles(files);
                setProofPostError(error);
              }}
            />
            <MultiFileField
              error={proofFanpageError}
              files={proofFanpageFiles}
              key={`fanpage-${fileInputVersion}`}
              label="Ảnh chụp màn hình đã like Fanpage CLB Nhà Ngân hàng Tương lai FBN - FTU"
              onChange={(files, error = "") => {
                setProofFanpageFiles(files);
                setProofFanpageError(error);
              }}
            />

            <div className="md:col-span-2">
              <Field
                label="Bạn có câu hỏi gì muốn gửi đến diễn giả không?"
                required
              >
                <Textarea
                  placeholder="Nếu không, vui lòng điền N/A"
                  required
                  {...register("speaker_question")}
                />
              </Field>
              <FieldError message={errors.speaker_question?.message} />
            </div>

            <div className="md:col-span-2">
              <Field
                label="Bạn có câu hỏi hay điều gì muốn nhắn gửi đến BTC không?"
                required
              >
                <Textarea
                  placeholder="Nếu không, vui lòng điền N/A"
                  required
                  {...register("organizer_message")}
                />
              </Field>
              <FieldError message={errors.organizer_message?.message} />
            </div>
          </div>
        </section>

        {serverMessage ? (
          <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {serverMessage}
          </p>
        ) : null}

        <div className="flex flex-col gap-4 border-t border-banker-orange/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex max-w-lg items-start gap-2 text-xs leading-5 text-banker-navy/[0.64]">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-banker-orange" />
            Ảnh minh chứng được lưu riêng tư trên Supabase và chỉ Ban tổ chức
            có quyền truy cập.
          </p>
          <Button disabled={isSubmitting} size="lg" type="submit">
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            {submitStatus || "Đăng ký tham dự"}
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
              className="relative w-full max-w-md border border-white/70 bg-white p-7 text-center shadow-premium"
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
            >
              <button
                aria-label="Đóng"
                className="absolute right-4 top-4 p-2 text-banker-navy/50 transition hover:bg-banker-light/40 hover:text-banker-navy"
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
