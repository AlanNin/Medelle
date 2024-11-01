"use client";

import { useState, useCallback, useEffect } from "react";
import { Check, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import uploadImages from "@/lib/cloudinary";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

type Props = {
  images: string[];
  setImages: (images: string[]) => void;
};

export default function ImageUploadComponent({ images, setImages }: Props) {
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
    const updatedImages = images.filter((image: any) => image !== image_url);
    setImages(updatedImages);
  };

  useEffect(() => {
    setSelectedImages([]);
    setPreviewUrls([]);
  }, [isOpen]);

  const handleUpload = async () => {
    setIsUploading(true);
    try {
      const uploadPromises = selectedImages.map((image) => uploadImages(image));
      const uploadedUrls = await Promise.all(uploadPromises);
      setImages([...images, ...uploadedUrls]);
      await Promise.all(uploadPromises);
      toast.success("Imágenes subidas");
      setSelectedImages([]);
      setPreviewUrls([]);
      setIsOpen(false);
    } catch (error) {
      toast.error("Ocurrio un error al subir las imágenes");
    }
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
          Subir imágenes ({images.length}/3)
        </Button>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Subir imagenes</DialogTitle>
            <DialogDescription>
              Arrastra y suelta tus archivos o haz click para buscar.
            </DialogDescription>
          </DialogHeader>
          {selectedImages.length + images.length < 3 && (
            <>
              <input
                type="file"
                accept="image/*"
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
                      Puedes subir hasta 3 imágenes
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {images.length > 0 && (
            <div className=" space-y-3">
              {images.map((image: any, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 px-4 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={image}
                      alt={`Preview`}
                      className="h-10 w-10 object-cover rounded-sm"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium ">
                        {`Image - ${index + 1}`}{" "}
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
                  className="flex items-center justify-between p-2 px-4 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={previewUrls[index]}
                      alt={`Preview`}
                      className="h-10 w-10 object-cover rounded-sm"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{file.name}</span>
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
                setImages([]);
              }}
              disabled={
                isUploading ||
                (selectedImages.length === 0 && images.length === 0)
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
