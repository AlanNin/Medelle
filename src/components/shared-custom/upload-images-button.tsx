"use client";

import { useState, useCallback, useEffect } from "react";
import { Check, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import uploadImage from "@/lib/cloudinary";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import PDFIcon from "@/assets/icons/PDF.png";

type Props = {
  files: string[];
  setFiles: (files: string[]) => void;
  folder?: string;
};

export default function UploadFilesButtonComponent({
  files,
  setFiles,
  folder,
}: Props) {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files);
    setSelectedImages((prev) => {
      const combined = [...prev, ...newFiles];
      const limited = combined.slice(0, 3);
      updatePreviews(limited);
      return limited;
    });
  };

  const updatePreviews = (files: File[]) => {
    previewUrls.forEach((url) => URL.revokeObjectURL(url));

    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleFileChange(files);
  }, []);

  const removeFile = (index: number) => {
    setSelectedImages((prev) => {
      const newFiles = prev.filter((_, i) => i !== index);
      updatePreviews(newFiles);
      return newFiles;
    });
  };

  const removeUploadedFile = (image_url: string) => {
    const updatedImages = files.filter((image: any) => image !== image_url);
    setFiles(updatedImages);
  };

  useEffect(() => {
    setSelectedImages([]);
    setPreviewUrls([]);
  }, [isOpen]);

  const handleUpload = async () => {
    setIsUploading(true);

    toast.promise(
      (async () => {
        const uploadPromises = selectedImages.map((image) =>
          uploadImage(image, folder)
        );
        const uploadedUrls = await Promise.all(uploadPromises);

        setFiles([...files, ...uploadedUrls]);
        setSelectedImages([]);
        setPreviewUrls([]);
        setIsOpen(false);
      })(),
      {
        loading: "Subiendo imágen(es)...",
        success: "Imágen(es) subidas",
        error: "Ocurrió un error al subir las imágen(es)",
      }
    );

    setIsUploading(false);
  };

  return (
    <>
      <div>
        <Button
          variant="outline"
          size="default"
          className="w-max text-muted-foreground"
          onClick={() => setIsOpen(true)}
        >
          <Upload className="h-4 w-4 mr-2" />
          Subir imágenes ({files.length}/3)
        </Button>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Subir archivos</DialogTitle>
            <DialogDescription>
              Arrastra y suelta tus archivos o haz click para buscar.
            </DialogDescription>
          </DialogHeader>
          {selectedImages.length + files.length < 3 && (
            <>
              <input
                type="file"
                accept="image/*, application/pdf"
                multiple
                id="imageUpload"
                className="hidden"
                onChange={(e) => handleFileChange(e.target.files)}
              />
              <div
                className={`
               border-2 border-dashed rounded-lg p-8 py-16 md:py-8 cursor-pointer
              ${isDragging ? "border-primary bg-primary/10" : "border-muted"}
              transition-colors duration-200
            `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById("imageUpload")?.click()}
              >
                <div className="flex flex-col items-center gap-5 text-center">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <div className="flex flex-col items-center gap-1">
                    <p className="text-lg text-muted-foreground">
                      Arrastra tus archivos hasta aquí
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Puedes subir hasta 3 archivos (imágenes o PDFs)
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {files.length > 0 && (
            <div className=" space-y-3">
              {files.map((image: any, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 px-4 border rounded-lg w-full"
                >
                  <div className="flex items-center gap-3">
                    {image.endsWith(".pdf") ? (
                      <img
                        src={PDFIcon}
                        alt={`Preview`}
                        className="h-10 w-10 object-cover rounded-sm"
                      />
                    ) : (
                      <img
                        src={image}
                        alt={`Preview`}
                        className="h-10 w-10 object-cover rounded-sm"
                      />
                    )}

                    <div className="flex flex-col">
                      <span className="text-sm font-medium max-w-[200px] truncate">
                        {`Archivo - ${index + 1}`}{" "}
                      </span>
                      <span className="text-xs text-green-600 flex items-center gap-1">
                        Subida <Check className="h-3 w-3 text-green-600" />
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeUploadedFile(image)}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove file</span>
                  </Button>
                </div>
              ))}
            </div>
          )}

          {selectedImages.length > 0 && (
            <div className=" space-y-3">
              {selectedImages.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 px-4 border rounded-lg w-full"
                >
                  <div className="flex items-center gap-3">
                    {file.type.endsWith("pdf") ? (
                      <img
                        src={PDFIcon}
                        alt={`Preview`}
                        className="h-10 w-10 object-cover rounded-sm"
                      />
                    ) : (
                      <img
                        src={previewUrls[index]}
                        alt={`Preview`}
                        className="h-10 w-10 object-cover rounded-sm"
                      />
                    )}

                    <div className="flex flex-col">
                      <span className="text-sm font-medium max-w-[200px] truncate">
                        {file.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({Math.round(file.size / 1024)} KB)
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(index)}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove file</span>
                  </Button>
                </div>
              ))}
            </div>
          )}

          <DialogFooter className="flex items-center gap-0">
            <Button
              variant="outline"
              onClick={() => {
                setSelectedImages([]);
                setPreviewUrls([]);
                setFiles([]);
              }}
              disabled={
                isUploading ||
                (selectedImages.length === 0 && files.length === 0)
              }
            >
              Limpiar
            </Button>
            <Button
              onClick={handleUpload}
              disabled={selectedImages.length === 0 || isUploading}
            >
              {isUploading ? "Subiendo..." : "Subir"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
