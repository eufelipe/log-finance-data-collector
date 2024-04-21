import { CVM_MERGED_DIR, CVM_ORIGIN_RAW_DIR } from "@/app/constants";

const encoding = "utf-8";

const startYear = 2010;

export const tasks = [
  {
    names: [
      "BPA_con",
      "BPA_ind",
      "BPP_con",
      "BPP_ind",
      "DFC_MI_con",
      "DFC_MI_ind",
      "DRE_con",
      "DRE_ind",
      "DVA_con",
      "DVA_ind",
      "DFC_MD_con",
      "DFC_MD_ind",
    ],
    baseDir: `${CVM_ORIGIN_RAW_DIR}/dfp`,
    basePath: "dfp_cia_aberta_",
    outputDir: `${CVM_MERGED_DIR}/DFP`,
    startYear,
    endYear: 2017,
    encoding,
    transformation: (row: any) => ({
      ...row,
      VL_CONTA: parseFloat(row.VL_CONTA.replace(",", ".")) || 0,
    }),
  },
  {
    names: ["DMPL_con", "DMPL_ind"],
    baseDir: `${CVM_ORIGIN_RAW_DIR}/dfp`,
    basePath: "dfp_cia_aberta_",
    outputDir: `${CVM_MERGED_DIR}/DFP`,
    startYear,
    endYear: 2017,
    encoding,
    transformation: (row: any) => ({
      ...row,
      VL_CONTA: parseFloat(row.VL_CONTA.replace(",", ".")) || 0,
      COLUNA_DF: row.COLUNA_DF || "PL CON",
    }),
    filter: (row: any) => {
      const validGroups = [
        "Patrimônio Líquido Consolidado",
        "Participação dos Não Controladores",
        "Patrimônio Líquido",
        "Reservas de Lucro",
        "Lucros ou Prejuízos Acumulados",
        "PL CON",
      ];
      const validAccounts = ["Saldos Iniciais", "Saldos Finais"];
      return (
        validGroups.includes(row.COLUNA_DF) &&
        validAccounts.includes(row.DS_CONTA)
      );
    },
  },
  {
    names: [
      "BPA_con",
      "BPA_ind",
      "BPP_con",
      "BPP_ind",
      "DFC_MI_con",
      "DFC_MI_ind",
      "DRE_con",
      "DRE_ind",
      "DVA_con",
      "DVA_ind",
      "DFC_MD_con",
      "DFC_MD_ind",
    ],
    baseDir: `${CVM_ORIGIN_RAW_DIR}/itr`,
    basePath: "itr_cia_aberta_",
    outputDir: `${CVM_MERGED_DIR}/ITR`,
    startYear: 2011,
    endYear: 2016,
    encoding,
    transformation: (row: any) => ({
      ...row,
      VL_CONTA: parseFloat(row.VL_CONTA.replace(",", ".")) || 0,
    }),
  },
  {
    names: ["DMPL_con", "DMPL_ind"],
    baseDir: `${CVM_ORIGIN_RAW_DIR}/itr`,
    basePath: "itr_cia_aberta_",
    outputDir: `${CVM_MERGED_DIR}/ITR`,
    startYear: 2011,
    endYear: 2016,
    encoding,
    transformation: (row: any) => ({
      ...row,
      VL_CONTA: parseFloat(row.VL_CONTA.replace(",", ".")) || 0,
      COLUNA_DF: row.COLUNA_DF || "PL CON",
    }),
    filter: (row: any) => {
      const validGroups = [
        "Patrimônio Líquido Consolidado",
        "Participação dos Não Controladores",
        "Patrimônio Líquido",
        "Reservas de Lucro",
        "Lucros ou Prejuízos Acumulados",
        "PL CON",
      ];
      return (
        validGroups.includes(row.COLUNA_DF) &&
        (row.DS_CONTA === "Saldos Iniciais" || row.DS_CONTA === "Saldos Finais")
      );
    },
  },
  {
    names: ["posicao_acionaria", "distribuicao_capital"],
    baseDir: `${CVM_ORIGIN_RAW_DIR}/fre`,
    basePath: "fre_cia_aberta_",
    outputDir: `${CVM_MERGED_DIR}/FRE`,
    startYear,
    endYear: 2021,
    encoding,
    transformation: (row: any) => ({ ...row }),
  },
  {
    names: ["geral"],
    baseDir: `${CVM_ORIGIN_RAW_DIR}/fca`,
    basePath: "fca_cia_aberta_",
    outputDir: `${CVM_MERGED_DIR}/FCA`,
    startYear,
    endYear: 2021,
    encoding,
    transformation: (row: any) => ({ ...row }),
  },
];
