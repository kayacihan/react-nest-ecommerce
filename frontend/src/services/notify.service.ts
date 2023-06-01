import toast from "react-hot-toast";

class NotifyService {
  showSuccessNotification(text: string) {
    toast.success(text);
  }

  showErrorNotification(text: string) {
    toast.error(text);
  }
}

export default new NotifyService();
