export type FormRefTypes<T> = {
  validate: () => boolean;
  getValue: () => T;
  setValue: (value: T) => void;
};
