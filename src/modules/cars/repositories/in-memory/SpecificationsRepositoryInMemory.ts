import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import { ICreateSpecificationDTO, ISpecificationRepository } from '../ISpecificationRepository';

class SpecificationsRepositoryInMemory implements ISpecificationRepository {

  specifications: Specification[] = [];

  async findByName(name: string): Promise<Category> {
    return this.specifications.find((spec) => spec.name === name);
  };

  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecifications = this.specifications.filter((spec) => ids.includes(spec.id));

    return allSpecifications;
  };

  async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();
    Object.assign(specification, {
      description,
      name
    });

    this.specifications.push(specification);

    return specification;
  }

}
export { SpecificationsRepositoryInMemory };