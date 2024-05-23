export interface IPagination {
  page: number;
  count: number;
  filters?:
    | {
        [key: string]: string;
      }
    | undefined;
}
