import { toast } from "sonner";

export const handleSuccess = (msg: string) => {
  toast.success(msg);
};

export const handleError = (msg: string) => {
  toast.error(msg);
};