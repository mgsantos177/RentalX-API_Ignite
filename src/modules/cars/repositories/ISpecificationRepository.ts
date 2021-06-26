import { Category } from "../infra/typeorm/entities/Category";
import { Specification } from "../infra/typeorm/entities/Specification";


interface ICreateSpecificationDTO {
  name: string,
  description: string;
}


interface ISpecificationRepository {
  findByName(name: string): Promise<Category>;
  findByIds(ids: string[]): Promise<Specification[]>;
  create({ name, description }: ICreateSpecificationDTO): Promise<Specification>;
}

export { ISpecificationRepository, ICreateSpecificationDTO };