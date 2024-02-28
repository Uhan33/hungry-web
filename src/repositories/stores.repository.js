export class StoresRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  createStore = async (category, storeName, addr, number, userId) => {
    const createdStore = await this.prisma.stores.create({
      data: {
        category,
        storeName,
        addr,
        number,
        userId,
      },
    });

    return createdStore;
  };

  getStores = async () => {
    const Stores = await this.prisma.stores.findMany();

    return Stores;
  };

  getStore = async (storeId) => {
    const Store = await this.prisma.stores.findFirst({
      where: { storeId: +storeId },
    });

    return Store;
  };

  updateStore = async (storeId, userId, category, storeName, addr, number) => {
    const updatedStore = await this.prisma.stores.update({
      where: { storeId: +storeId, userId: +userId },
      data: {
        category,
        storeName,
        addr,
        number,
      },
    });

    return updatedStore;
  };

  deleteStore = async (storeId, userId) => {
    const deletedStore = await this.prisma.stores.delete({
      where: { storeId: +storeId, userId: +userId },
    });

    return deletedStore;
  };
}
