export interface ToastOptionsModel {
  message: string;
  type?: 'primary' | 'warning';
  duration?: number;
}

export interface ToastContextTypeModel {
  showToast: (options: ToastOptionsModel) => void;
}
