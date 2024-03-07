export interface UserData {
  accessToken?: string;
  idToken?: string;
  userData: User;
}

export interface User {
  id: number;
  name?: string;
  surname?: string;
  email: string;
  address?: string;
  phoneNumber?: number;
}

export interface UserPageProps {
  userData: User | null;
  onLogout: () => void;
}

export interface DataPageProps {
  userData: User;
}

export interface LoginFormProps {
  onLogin: (userData: UserData) => void;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imgUrl: string;
}

export interface BasketItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface BasketProps {
  userData: User | null;
}
