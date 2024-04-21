# Documentação do Processo de Consolidação de Dados da CVM

Este documento descreve o processo de download, extração e consolidação dos dados de documentos financeiros disponibilizados pela Comissão de Valores Mobiliários (CVM) relativos a companhias abertas no Brasil.

## 1. Download dos Arquivos

Os arquivos são baixados dos seguintes endpoints da CVM:

- DFP (Demonstrações Financeiras Padronizadas): [DFP Dados](https://dados.cvm.gov.br/dados/CIA_ABERTA/DOC/DFP/DADOS/)
- ITR (Informações Trimestrais): [ITR Dados](https://dados.cvm.gov.br/dados/CIA_ABERTA/DOC/ITR/DADOS/)
- FRE (Formulário de Referência): [FRE Dados](https://dados.cvm.gov.br/dados/CIA_ABERTA/DOC/FRE/DADOS/)
- FCA (Formulário Cadastral): [FCA Dados](https://dados.cvm.gov.br/dados/CIA_ABERTA/DOC/FCA/DADOS/)


--- 

### Sobre os relatórios:

#### DFP - Demonstrações Financeiras Padronizadas: 

Este documento inclui as demonstrações financeiras anuais completas de uma empresa, como o balanço patrimonial, a demonstração de resultados, a demonstração de fluxos de caixa, entre outros.

É uma espécie de relatório anual que as empresas listadas na bolsa devem publicar para mostrar sua situação financeira e resultados do ano.

#### ITR - Informações Trimestrais: 

Este documento contém informações financeiras que as empresas devem divulgar trimestralmente. 

Inclui muitos dos mesmos tipos de dados financeiros que a DFP, mas é atualizado com mais frequência para fornecer uma visão mais atual da saúde financeira da empresa ao longo do ano.

#### FRE - Formulário de Referência: 

Este é um documento detalhado que as empresas devem preencher e atualizar anualmente ou sempre que houver alterações significativas. 

O FRE inclui uma ampla gama de informações sobre a empresa, incluindo dados organizacionais, descrição de atividades, fatores de risco, comentários sobre o mercado, controle acionário, administração, remuneração dos administradores, entre outras informações relevantes para os investidores.

#### FCA - Formulário Cadastral: 

Este formulário inclui informações cadastrais da empresa, como identificação, atividade principal, dados de contato e informações sobre seus administradores e controladores.

É uma forma de manter a CVM e o mercado informados sobre a estrutura organizacional e contatos principais da empresa.


--- 




Os arquivos são baixados para a pasta temporária `DATA/temp` e depois extraídos para a pasta `DATA/cvm/origin`. Os arquivos ZIP originais são excluídos após a extração.

## 2. Processo de Consolidação


Os seguintes documentos são processados de acordo com as especificações:

### 1. **DFP (Demonstrações Financeiras Padronizadas)**
- **Documentos Incluídos**: BPA_con, BPA_ind, BPP_con, BPP_ind, DFC_MI_con, DFC_MI_ind, DRE_con, DRE_ind, DVA_con, DVA_ind, DFC_MD_con, DFC_MD_ind, DMPL_con, DMPL_ind.
- **Transformações**: Conversão do campo `VL_CONTA` de string para float, alterando vírgulas por pontos.
- **Filtros**: Aplicados somente para DMPL_con e DMPL_ind, filtrando grupos e contas específicas.
- **Período**: 2010 a 2017.

### 2. **ITR (Informações Trimestrais)**
- **Documentos Incluídos**: Mesmos documentos que em DFP, ajustados para dados trimestrais.
- **Transformações e Filtros**: Semelhante ao DFP, ajustado para contexto trimestral.
- **Período**: 2011 a 2016.

### 3. **FRE (Formulário de Referência)**
- **Documentos Incluídos**: posicao_acionaria, distribuicao_capital.
- **Transformações**: Nenhuma transformação específica além da estruturação básica dos dados.
- **Período**: 2010 a 2021.

### 4. **FCA (Formulário Cadastral)**
- **Documentos Incluídos**: geral.
- **Transformações**: Nenhuma transformação específica além da estruturação básica dos dados.
- **Período**: 2010 a 2021.

## Processo de Consolidação

Para cada conjunto de documentos, o processo segue estas etapas principais:

1. **Leitura de Dados**: Os arquivos CSV correspondentes são lidos para cada nome de documento e ano especificado.
2. **Transformação e Filtragem**: As transformações são aplicadas e os filtros são usados para selecionar subconjuntos de dados relevantes.
3. **Concatenação de Dados**: Os dados de vários anos são combinados em um único conjunto.
4. **Gravação de Dados Consolidados**: Os dados consolidados são escritos em um novo arquivo CSV no diretório de saída especificado.

Este processo garante que os dados financeiros de companhias abertas sejam coletados, transformados e consolidados de forma eficiente, permitindo análises financeiras detalhadas e apoio à tomada de decisões baseadas em dados.





 