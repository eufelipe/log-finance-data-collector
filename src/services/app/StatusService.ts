import fs from "fs";
import path from "path";

interface Status {
  startedAt?: string;
}

export class StatusService {
  private filePath: string;

  constructor() {
    this.filePath = path.join("DATA", "status.json");
  }

  public async canSetup(): Promise<boolean> {
    try {
      if (fs.existsSync(this.filePath)) {
        const fileContent = await fs.promises.readFile(this.filePath, "utf-8");
        const data: Status = JSON.parse(fileContent);

        return !!data.startedAt;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Erro ao ler o arquivo:", error);
      return false;
    }
  }

  public async saveStatus(): Promise<boolean> {
    const status: Status = {
      startedAt: new Date().toISOString(),
    };

    try {
      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(status, null, 2),
        "utf-8"
      );
      return true;
    } catch (error) {
      console.error("Erro ao salvar o arquivo:", error);
      return false;
    }
  }
}
