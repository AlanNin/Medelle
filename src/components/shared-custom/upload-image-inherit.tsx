import uploadImage from "@/lib/cloudinary";
import { ImageUp, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  show_pencil?: boolean;
  pencil_width?: number;
  pencil_height?: number;
  component_height?: "small" | "medium";
  onComplete?: (image_url: string) => void;
  onDelete?: () => void;
  folder?: string;
  tooltip_title: string;
  tooptip_show_prescription?: boolean;
};

export default function UploadImageInheritComponent({
  children,
  show_pencil = true,
  pencil_width = 4,
  pencil_height = 4,
  component_height = "medium",
  onComplete,
  onDelete,
  folder,
  tooltip_title,
  tooptip_show_prescription,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleUploadImage = async (file: File | null) => {
    if (!file || !onComplete) {
      return;
    }
    const image_url = await uploadImage(file, folder);
    onComplete(image_url);
  };

  const handleDeleteImage = async () => {
    if (!onDelete) {
      return;
    }
    onDelete();
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => {
          const files = e.target.files;
          if (files && files[0]) {
            handleUploadImage(files[0]);
          }
        }}
      />

      <div className="cursor-pointer relative group">
        {show_pencil && (
          <div
            className={`absolute ${
              component_height === "medium"
                ? "top-0 right-0"
                : "-top-1 -right-1"
            }  z-10 p-1.5 bg-white/90 group-hover:bg-white/60 rounded-full transition-all duration-300 group-hover:shadow-xl flex items-center justify-center`}
            onClick={() => setDropdownOpen(true)}
          >
            <Pencil
              className={`w-${pencil_width} h-${pencil_height} text-muted-foreground`}
            />
          </div>
        )}

        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel
              className={`${tooptip_show_prescription && "-mb-2"}`}
            >
              {tooltip_title}
            </DropdownMenuLabel>
            {tooptip_show_prescription && (
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Se mostrará en las prescripciones
              </DropdownMenuLabel>
            )}

            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="gap-3 cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImageUp />
                <span>Subir imagen</span>
              </DropdownMenuItem>
              {onDelete && (
                <DropdownMenuItem
                  className="gap-3 cursor-pointer"
                  onClick={() => handleDeleteImage()}
                >
                  <Trash />
                  <span>Eliminar imagen</span>
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
