interface Review {
  id: number;
  rating: number;
  comment: string;
  user: User;
  image?: string;
  createdAt: Date;
}
