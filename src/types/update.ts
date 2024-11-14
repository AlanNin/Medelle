export type UpdateProps = {
  status: "checking" | "available" | "not-available" | "downloaded" | "error";
  message?: string;
};
