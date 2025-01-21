export default interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  pages: number;
  genres: string[];
  calification: number;
  cover: string;
  pending: boolean;
  description?: string;
  saga: string;
}
