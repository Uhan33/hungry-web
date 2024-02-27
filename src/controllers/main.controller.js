export class MainController {
  constructor(mainService) {
    this.mainService = mainService;
  }

  //키워드 기반 검색
  searchStore = async (req, res, next) => {
    try {
      return res.status(201).json(
        { data : await this.mainService.searchStore(req.query.keyword)});   
    } catch(error) {
      next(error);
    }
  }

  //랭킹 조회
  getRanking = async (req, res, next) => {
    try {
      return res.status(201).json(
        { data : await this.mainService.getRanking()});   
    } catch(error) {
      next(error);
    }
  }
}