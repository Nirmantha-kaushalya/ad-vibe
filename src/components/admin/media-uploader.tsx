"use client";

import Image from "next/image";
import { FileImage, FileVideo2, LoaderCircle, UploadCloud, X } from "lucide-react";
import { useRef, useState } from "react";

export type UploadedMedia = {
  type: "image" | "video";
  url: string;
  publicId: string;
  thumbnailUrl?: string;
};

type UploadSignature = {
  timestamp: number;
  signature: string;
  apiKey: string;
  cloudName: string;
  folder: string;
  uploadPreset?: string;
  allowedFormats: string[];
  maxBytes: number;
};

type CloudinaryResponse = {
  secure_url?: string;
  public_id?: string;
  resource_type?: string;
  error?: { message?: string };
};

const acceptedTypes = new Map<string, "image" | "video">([
  ["image/jpeg", "image"],
  ["image/png", "image"],
  ["image/webp", "image"],
  ["video/mp4", "video"],
  ["video/webm", "video"],
  ["video/quicktime", "video"],
]);

function videoThumbnail(url: string) {
  return url.replace("/video/upload/", "/video/upload/so_0,f_jpg,q_auto/").replace(/\.(mp4|webm|mov)(\?.*)?$/i, ".jpg");
}

export function MediaUploader({
  value,
  onChange,
}: {
  value: UploadedMedia | null;
  onChange: (media: UploadedMedia | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  async function upload(file: File) {
    const type = acceptedTypes.get(file.type);
    if (!type) {
      setError("Choose a JPG, PNG, WebP, MP4, WebM or MOV file.");
      return;
    }

    setError("");
    setIsUploading(true);
    setProgress(0);
    try {
      const signatureResponse = await fetch("/api/upload/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      });
      const signature = (await signatureResponse.json()) as UploadSignature & { error?: string };
      if (!signatureResponse.ok) throw new Error(signature.error ?? "Could not prepare the secure upload.");

      if (file.size > signature.maxBytes) {
        throw new Error(type === "image" ? "Images must be 10 MB or smaller." : "Videos must be 200 MB or smaller.");
      }

      const form = new FormData();
      form.append("file", file);
      form.append("api_key", signature.apiKey);
      form.append("timestamp", String(signature.timestamp));
      form.append("signature", signature.signature);
      form.append("folder", signature.folder);
      if (signature.uploadPreset) form.append("upload_preset", signature.uploadPreset);
      form.append("allowed_formats", signature.allowedFormats.join(","));

      const uploaded = await new Promise<CloudinaryResponse>((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open("POST", `https://api.cloudinary.com/v1_1/${encodeURIComponent(signature.cloudName)}/auto/upload`);
        request.upload.onprogress = (event) => {
          if (event.lengthComputable) setProgress(Math.round((event.loaded / event.total) * 100));
        };
        request.onerror = () => reject(new Error("Upload connection failed. Check your network and retry."));
        request.onload = () => {
          let result: CloudinaryResponse;
          try {
            result = JSON.parse(request.responseText) as CloudinaryResponse;
          } catch {
            reject(new Error("Cloudinary returned an invalid upload response."));
            return;
          }
          if (request.status < 200 || request.status >= 300) {
            reject(new Error(result.error?.message ?? "The media upload failed."));
            return;
          }
          resolve(result);
        };
        request.send(form);
      });

      if (!uploaded.secure_url || !uploaded.public_id || uploaded.resource_type !== type) {
        throw new Error("The upload completed, but its media details were incomplete.");
      }

      onChange({
        type,
        url: uploaded.secure_url,
        publicId: uploaded.public_id,
        ...(type === "video" ? { thumbnailUrl: videoThumbnail(uploaded.secure_url) } : {}),
      });
      setProgress(100);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "The media upload failed. Please retry.");
    } finally {
      setIsUploading(false);
    }
  }

  function handleFile(file?: File) {
    if (file) void upload(file);
  }

  return (
    <div>
      <div
        className={`relative overflow-hidden border border-dashed p-4 transition-colors sm:p-6 ${
          isDragging ? "border-[var(--gold)] bg-[var(--panel-hover)]" : "border-[var(--border)]"
        }`}
        onDragEnter={(event) => { event.preventDefault(); setIsDragging(true); }}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={(event) => {
          const relatedTarget = event.relatedTarget;
          if (!(relatedTarget instanceof Node) || !event.currentTarget.contains(relatedTarget)) setIsDragging(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          handleFile(event.dataTransfer.files[0]);
        }}
      >
        {value ? (
          <div className="grid gap-5 sm:grid-cols-[180px_1fr] sm:items-center">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#e8e4da]">
              {value.type === "video" ? (
                <video className="h-full w-full object-cover" muted playsInline preload="metadata" src={value.url} poster={value.thumbnailUrl} />
              ) : (
                <Image src={value.url} alt="Selected portfolio artwork preview" fill sizes="180px" className="object-cover" />
              )}
            </div>
            <div>
              <p className="flex items-center gap-2 text-sm text-[var(--ivory)]">
                {value.type === "video" ? <FileVideo2 size={17} /> : <FileImage size={17} />}
                {value.type === "video" ? "Video ready" : "Image ready"}
              </p>
              <p className="mt-2 break-all text-xs text-[var(--muted)]">Uploaded securely to Cloudinary</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" onClick={() => inputRef.current?.click()} disabled={isUploading} className="rounded-full border border-[var(--border)] px-4 py-2 text-[10px] uppercase tracking-[0.12em] hover:border-[var(--gold)]">Replace media</button>
                <button type="button" onClick={() => onChange(null)} disabled={isUploading} className="rounded-full border border-[var(--border)] px-4 py-2 text-[10px] uppercase tracking-[0.12em] hover:border-red-600 hover:text-red-700">Remove</button>
              </div>
            </div>
          </div>
        ) : (
          <button
            type="button"
            disabled={isUploading}
            onClick={() => inputRef.current?.click()}
            className="flex min-h-52 w-full flex-col items-center justify-center px-3 py-8 text-center disabled:cursor-wait"
          >
            {isUploading ? <LoaderCircle className="animate-spin text-[var(--gold)]" size={26} /> : <UploadCloud className="text-[var(--gold)]" size={26} />}
            <span className="mt-4 text-sm font-medium text-[var(--ivory)]">{isUploading ? `Uploading ${progress}%` : "Drop your artwork here"}</span>
            <span className="mt-2 text-xs leading-5 text-[var(--muted)]">or choose an image or video from your device</span>
            <span className="mt-3 text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]">JPG · PNG · WebP · MP4 · WebM · MOV</span>
          </button>
        )}
        {isUploading && <div className="absolute bottom-0 left-0 h-1 bg-[var(--gold)] transition-[width]" style={{ width: `${progress}%` }} />}
        <input
          ref={inputRef}
          accept="image/jpeg,image/png,image/webp,video/mp4,video/webm,video/quicktime"
          className="sr-only"
          onChange={(event) => {
            handleFile(event.currentTarget.files?.[0]);
            event.currentTarget.value = "";
          }}
          type="file"
        />
      </div>
      {error && (
        <p className="mt-3 flex items-start gap-2 text-sm text-red-700" role="alert">
          <X size={15} className="mt-0.5 shrink-0" /> {error}
        </p>
      )}
    </div>
  );
}
