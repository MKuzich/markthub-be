import { IFilter } from '../types/todos.type';

export const chooseFilter = (filter: string) => {
  const filterObj: IFilter = {
    ...(filter === 'private' && { public: false }),
    ...(filter === 'public' && { public: true }),
    ...(filter === 'complete' && { complited: true })
  };

  return filterObj;
};
