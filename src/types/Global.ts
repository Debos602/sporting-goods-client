
export type TUser = {
    id: string;
    name: string;
    email: string; // Ensure this property is present
    role: "user" | "admin";
    password?: string;
    confirmPassword?: string;
    needsPasswordChange?: boolean;
    passwordChangedAt?: Date;
    phone: string;
    createdAt?: Date;
    updatedAt?: Date;
};


