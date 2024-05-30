export type FormRefTypes<T> = {
  validate: () => boolean;
  getValue: () => T;
};
