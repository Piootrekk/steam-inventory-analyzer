export type FetchType = {
  url: string;
  type?: string;
};

export type FetchData<T> = {
  data: T | null;
  isLoading: boolean;
  error: any | null;
  promiseInfo: Response | null;
  setData: (data: T) => void;
};

export type FetchDataWithTrigger<T> = FetchData<T> & {
  activateFetch: () => void;
};
