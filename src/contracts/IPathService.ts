export interface IPathService {
  resolve(...pathSegments: string[]): string;
  join(...pathSegments: string[]): string;
}
