export class MainService {
  constructor(mainRepository) {
    this.mainRepository = mainRepository;
  }

  searchStore = async (keyword) => {
    return await this.mainRepository.searchStore(keyword);
  };

  getRanking = async () => {
    return await this.mainRepository.getRanking();
  };
}