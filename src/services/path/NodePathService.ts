import path from "path";

import { IPathService } from "@/contracts";

export class NodePathService implements IPathService {
  resolve(...pathSegments: string[]): string {
    return path.resolve(...pathSegments);
  }

  join(...pathSegments: string[]): string {
    return path.join(...pathSegments);
  }
}
