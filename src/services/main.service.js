export class MainService {
  constructor(mainRepository) {
    this.mainRepository = mainRepository;
  }

  //가게 조회
  searchStore = async (keyword) => {
    return await this.mainRepository.searchStore(keyword);
  };

  //랭킹 조회
  getRanking = async () => {
    return await this.mainRepository.getRanking();
  };
}