export interface IResponseHotel<T> {
  readonly data: [T];
  readonly paging: {
    readonly previous: string;
    readonly next: string;
    readonly skipped: string;
    readonly results: number;
    readonly total_results: number;
  };
}
