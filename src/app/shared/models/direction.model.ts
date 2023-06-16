export interface Direction{
  id: number;
  order: number;
  instruction: string;
  video_name: string;
  video_data?: Blob | string;
}
