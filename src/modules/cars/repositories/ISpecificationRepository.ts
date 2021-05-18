import { Category } from "../model/category";

interface ICreateSpecificationDTO {
  name: string,
  description: string;
}


interface ISpecificationRepository {
  findByName(name: string): Promise<Category>;
  // list(): Category[];
  create({ name, description }: ICreateSpecificationDTO): Promise<void>;
}

export { ISpecificationRepository, ICreateSpecificationDTO };