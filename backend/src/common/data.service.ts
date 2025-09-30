import _ from 'lodash';

import type { Uuid } from './types';

export abstract class DataService<T extends { id: Uuid }> {
  abstract getByIds(ids: Uuid[]): Promise<T[]>;

  async fillData<X>(
    array: X[],
    getDataId: (entry: X) => Uuid | null,
    setData: (entry: X, data: T) => void,
  ) {
    const ids = _.uniq(_.compact(_.map(array, getDataId)));
    const foundData = await this.getByIds(ids);

    const dataMap = _.keyBy(foundData, (u) => u.id);

    for (const item of array) {
      const userId = getDataId(item);

      if (userId) {
        const data = dataMap[userId];

        if (data) {
          setData(item, data);
        }
      }
    }
  }
}
