
import { Category } from "../../model/category";
import { Specification } from "../../model/Specification";
import { ISpecificationRepository, ICreateSpecificationDTO } from "../ISpecificationRepository";


class SpecificationRepository implements ISpecificationRepository {

  private specification: Specification[];

  constructor() {
    this.specification = [];
  }

  findByName(name: string): Category {
    const specification = this.specification.find((specification) => specification.name === name);
    return specification;
  }

  create({ name, description }: ICreateSpecificationDTO): void {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date()
    });

    this.specification.push(specification);
  }
}

export { SpecificationRepository };