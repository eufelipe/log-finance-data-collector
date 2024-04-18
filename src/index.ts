import axios from "axios";
import dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

dotenv.config();

const API_KEY = process.env.API_KEY || "";

const BASE_URL =
  "https://cloud.iexapis.com/stable/ref-data/exchange/BVMF/symbols";

if (!API_KEY) {
  throw new Error("API_KEY missing");
}

axios
  .get(BASE_URL, {
    params: {
      token: API_KEY,
    },
  })
  .then((response) => {
    const content = response.data;
    const dirPath = path.resolve();
    const outputPath = path.join(dirPath, "DATA", "symbols");

    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }

    const file = path.join(outputPath, "symbols.json");
    fs.writeFileSync(file, JSON.stringify(content, null, 2));
  })
  .catch((error) => {
    console.error("Erro ao recuperar dados", error);
  });
