export class StoresController {
  constructor(storesService) {
    this.storesService = storesService;
  }

  // 업장 생성
  createStore = async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { category, storeName, addr, number } = req.body;

      if (!category || !storeName || !addr || !number) {
        throw new Error('InvalidParamsError');
      }

      const createdStore = await this.storesService.createStore(category, storeName, addr, number, userId);

      return res.status(201).json({ data: createdStore });
    } catch (err) {
      next(err);
    }
  };

  // 업장 조회
  getStores = async (req, res, next) => {
    try {
      const Stores = await this.storesService.getStores();

      return res.status(200).json({ data: Stores });
    } catch (err) {
      next(err);
    }
  };

  // 업장 정보 수정
  updateStore = async (req, res, next) => {
    try {
      const { storeId } = req.params;
      const { userId } = req.user;
      const { category, storeName, addr, number } = req.body;

      if (!category || !storeName || !addr || !number) throw new Error('업데이트 할 내용이 없습니다.');

      const updatedStore = await this.storesService.updateStore(storeId, userId, category, storeName, addr, number);

      return res.status(200).json({ data: updatedStore });
    } catch (err) {
      next(err);
    }
  };

  // 업장 삭제
  deleteStore = async (req, res, next) => {
    try {
      const { storeId } = req.params;
      const { userId } = req.user;

      const deletedStore = await this.storesService.deleteStore(storeId, userId);

      return res.status(200).json({ data: deletedStore });
    } catch (err) {
      next(err);
    }
  };
}
