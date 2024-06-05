export interface IPagination {
  page?: number;
  count?: number;
  filters?:
    | {
        [key: string]: any;
      }
    | undefined;
}
