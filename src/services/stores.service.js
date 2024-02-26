export class StoresService {
  constructor(storesRepository) {
    this.storesRepository = storesRepository;
  }
  // 업장 생성
  createStore = async (category, storeName, addr, number, userId) => {
    const createdStore = await this.storesRepository.createStore(category, storeName, addr, number, userId);

    return createdStore;
  };

  // 업장 목록 조회
  getStores = async () => {
    const Stores = await this.storesRepository.getStores();

    return Stores;
  };

  // 업장 정보 수정
  updateStore = async (storeId, userId, category, storeName, addr, number) => {
    const Store = await this.storesRepository.getStore(storeId);
    if (!Store) throw new Error('존재하지 않는 업장입니다.');

    const updatedStore = await this.storesRepository.updateStore(storeId, userId, category, storeName, addr, number);
    return updatedStore;
  };

  // 업장 삭제
  deleteStore = async (storeId, userId) => {
    const Store = await this.storesRepository.getStore(storeId);
    if (!Store) throw new Error('존재하지 않는 업장입니다.');

    const deletedStore = await this.storesRepository.deleteStore(storeId, userId);
    return deletedStore;
  };
}
