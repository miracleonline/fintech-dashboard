export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  accountType: "Single" | "Joint" | "Corporate";
  secondaryEmail?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}
