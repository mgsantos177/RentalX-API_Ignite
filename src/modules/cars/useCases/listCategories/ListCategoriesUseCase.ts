import { Category } from "../../model/category";
import { ICategoriesRepository } from "../../repositories/ICateroriesRepository";

class ListCategoriesUseCase {

  constructor(private categoriesRepository: ICategoriesRepository) { }

  execute(): Category[] {
    const categories = this.categoriesRepository.list();
    return categories;
  }

}

export { ListCategoriesUseCase };