export interface DataObject<T> {
  data: T;
  extensions: {
    debug: { type: string; message: string }[];
  };
}
