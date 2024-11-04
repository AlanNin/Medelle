import axios from "axios";

export default async function uploadImage(image: File, folder?: string) {
  const formData = new FormData();
  formData.append("file", image);
  formData.append(
    "upload_preset",
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || ""
  );

  if (folder) {
    formData.append("folder", folder);
  }

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_NAME
      }/upload`,
      formData
    );
    return response.data.secure_url;
  } catch (error) {
    throw error;
  }
}
