import uploadImage from "@/lib/cloudinary";
import { Pencil } from "lucide-react";

type Props = {
  children: React.ReactNode;
  pencil_style?: string;
  pencil_bg_style?: string;
  onComplete: (image_url: string) => void;
};

export default function UploadImageInheritComponent({
  children,
  pencil_style,
  pencil_bg_style,
  onComplete,
}: Props) {
  const handleUploadImage = async (file: File | null) => {
    if (!file) return;
    const image_url = await uploadImage(file);
    onComplete(image_url);
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        id="imageUpload"
        className="hidden"
        onChange={(e) => {
          const files = e.target.files;
          if (files && files[0]) {
            handleUploadImage(files[0]);
          }
        }}
      />
      <div
        onClick={() => document.getElementById("imageUpload")?.click()}
        className="cursor-pointer relative group"
      >
        <div
          className={`${
            pencil_style
              ? pencil_bg_style
              : "absolute right-0 top-0 z-10 p-1.5 bg-white/90 group-hover:bg-white/60 rounded-full transition-all duration-300 group-hover:shadow-xl flex items-center justify-center"
          }`}
        >
          <Pencil
            className={`${
              pencil_style ? pencil_style : "h-4 w-4 text-muted-foreground "
            }`}
          />
        </div>
        {children}
      </div>
    </>
  );
}
