require("dotenv").config();
const puppeteer = require("puppeteer");
const fs = require("fs");

const getNomeEscola = async page => {
  const selector = {
    nome:
      "body > section.subnav-section.gray-pattern > div.container.with-avatar-small > div:nth-child(4)"
  };

  let response = {};

  for (const [key, value] of Object.entries(selector)) {
    let content = await page.$(value);
    content = await content.getProperty("innerText");
    content = await content.jsonValue();
    response[key] = content;
  }

  return response;
};

const getDadosGerais = async page => {
  const selector = {
    codigo_inep:
      "body > section.container.censo-section.normal-section > div > div:nth-child(3) > div.group-educacenso.highlight > table > tbody > tr:nth-child(1) > td",
    localizacao_da_escola:
      "body > section.container.censo-section.normal-section > div > div:nth-child(3) > div.group-educacenso.highlight > table > tbody > tr:nth-child(2) > td",
    dependencia:
      "body > section.container.censo-section.normal-section > div > div:nth-child(3) > div.group-educacenso.highlight > table > tbody > tr:nth-child(3) > td",
    endereco:
      "body > section.container.censo-section.normal-section > div > div:nth-child(3) > div.group-educacenso.highlight > table > tbody > tr:nth-child(4) > td",
    telefone:
      "body > section.container.censo-section.normal-section > div > div:nth-child(3) > div.group-educacenso.highlight > table > tbody > tr:nth-child(5) > td",
    fax:
      "body > section.container.censo-section.normal-section > div > div:nth-child(3) > div.group-educacenso.highlight > table > tbody > tr:nth-child(6) > td"
  };

  let response = {};

  for (const [key, value] of Object.entries(selector)) {
    let content = await page.$(value);
    content = await content.getProperty("innerText");
    content = await content.jsonValue();
    response[key] = content;
  }

  return response;
};

const getOutrasInformacoes = async page => {
  const selector = {
    numero_de_funcionarios_da_escola:
      "body > section.container.censo-section.normal-section > div > div:nth-child(3) > div:nth-child(2) > table > tbody > tr:nth-child(1) > td",
    a_escola_possui_organizacao_por_ciclos:
      "body > section.container.censo-section.normal-section > div > div:nth-child(3) > div:nth-child(2) > table > tbody > tr:nth-child(2) > td"
  };

  let response = {};

  for (const [key, value] of Object.entries(selector)) {
    let content = await page.$(value);
    content = await content.getProperty("innerText");
    content = await content.jsonValue();
    response[key] = content;
  }

  return response;
};

const getAlimentacao = async page => {
  const selector = {
    alimentacao_e_fornecida_aos_alunos:
      "body > section.container.censo-section.normal-section > div > div:nth-child(3) > div:nth-child(3) > table > tbody > tr:nth-child(1) > td",
    a_escola_possui_agua_filtrada:
      "body > section.container.censo-section.normal-section > div > div:nth-child(3) > div:nth-child(3) > table > tbody > tr:nth-child(2) > td"
  };

  let response = {};

  for (const [key, value] of Object.entries(selector)) {
    let content = await page.$(value);
    content = await content.getProperty("innerText");
    content = await content.jsonValue();
    response[key] = content;
  }

  return response;
};

const getMatricula = async page => {
  const selector = {
    creche:
      "body > section.container.censo-section.normal-section > div > div:nth-child(3) > div:nth-child(4) > table > tbody > tr:nth-child(1) > td",
    pre_escola:
      "body > section.container.censo-section.normal-section > div > div:nth-child(3) > div:nth-child(4) > table > tbody > tr:nth-child(2) > td",
    anos_iniciais:
      "body > section.container.censo-section.normal-section > div > div:nth-child(3) > div:nth-child(4) > table > tbody > tr:nth-child(3) > td",
    anos_finais:
      "body > section.container.censo-section.normal-section > div > div:nth-child(3) > div:nth-child(4) > table > tbody > tr:nth-child(4) > td",
    ensino_medio:
      "body > section.container.censo-section.normal-section > div > div:nth-child(3) > div:nth-child(4) > table > tbody > tr:nth-child(5) > td",
    educacao_de_jovens_e_adultos:
      "body > section.container.censo-section.normal-section > div > div:nth-child(3) > div:nth-child(4) > table > tbody > tr:nth-child(6) > td",
    educacao_especial:
      "body > section.container.censo-section.normal-section > div > div:nth-child(3) > div:nth-child(4) > table > tbody > tr:nth-child(7) > td"
  };

  let response = {};

  for (const [key, value] of Object.entries(selector)) {
    let content = await page.$(value);
    content = await content.getProperty("innerText");
    content = await content.jsonValue();
    response[key] = content;
  }

  return response;
};

const getMatriculaPorSerie = async page => {
  const selector = {
    matriculas_1_ano_ef:
      "body > section.container.censo-section.normal-section > div > div:nth-child(3) > div:nth-child(5) > table > tbody > tr:nth-child(1) > td",
    matriculas_2_ano_ef:
      "body > section.container.censo-section.normal-section > div > div:nth-child(3) > div:nth-child(5) > table > tbody > tr:nth-child(2) > td",
    matriculas_3_ano_ef:
      "body > section.container.censo-section.normal-section > div > div:nth-child(3) > div:nth-child(5) > table > tbody > tr:nth-child(3) > td",
    matriculas_4_ano_ef:
      "body > section.container.censo-section.normal-section > div > div:nth-child(3) > div:nth-child(5) > table > tbody > tr:nth-child(4) > td",
    matriculas_5_ano_ef:
      "body > section.container.censo-section.normal-section > div > div:nth-child(3) > div:nth-child(5) > table > tbody > tr:nth-child(5) > td",
    matriculas_6_ano_ef:
      "body > section.container.censo-section.normal-section > div > div:nth-child(3) > div:nth-child(5) > table > tbody > tr:nth-child(6) > td",
    matriculas_7_ano_ef:
      "body > section.container.censo-section.normal-section > div > div:nth-child(3) > div:nth-child(5) > table > tbody > tr:nth-child(7) > td",
    matriculas_8_ano_ef:
      "body > section.container.censo-section.normal-section > div > div:nth-child(3) > div:nth-child(5) > table > tbody > tr:nth-child(8) > td",
    matriculas_9_ano_ef:
      "body > section.container.censo-section.normal-section > div > div:nth-child(3) > div:nth-child(5) > table > tbody > tr:nth-child(9) > td",
    matriculas_1_ano_em:
      "body > section.container.censo-section.normal-section > div > div:nth-child(3) > div:nth-child(5) > table > tbody > tr:nth-child(10) > td",
    matriculas_2_ano_em:
      "body > section.container.censo-section.normal-section > div > div:nth-child(3) > div:nth-child(5) > table > tbody > tr:nth-child(11) > td",
    matriculas_3_ano_em:
      "body > section.container.censo-section.normal-section > div > div:nth-child(3) > div:nth-child(5) > table > tbody > tr:nth-child(12) > td"
  };

  let response = {};

  for (const [key, value] of Object.entries(selector)) {
    let content = await page.$(value);
    content = await content.getProperty("innerText");
    content = await content.jsonValue();
    response[key] = content;
  }

  return response;
};

const getAcessebilidade = async page => {
  const selector = {
    as_dependencias_da_escola_sao_acessiveis_aos_portadores_de_deficiencia:
      "body > section.container.censo-section.normal-section > div > div:nth-child(4) > div:nth-child(1) > table > tbody > tr:nth-child(1) > td",
    os_sanitários_sao_acessiveis_aos_portadores_de_deficiencia:
      "body > section.container.censo-section.normal-section > div > div:nth-child(4) > div:nth-child(1) > table > tbody > tr:nth-child(2) > td"
  };

  let response = {};

  for (const [key, value] of Object.entries(selector)) {
    let content = await page.$(value);
    content = await content.getProperty("innerText");
    content = await content.jsonValue();
    response[key] = content;
  }

  return response;
};

const getInfraestrutura = async page => {
  const selector = {
    existe_sanitario_dentro_do_predio_da_escola:
      "body > section.container.censo-section.normal-section > div > div:nth-child(4) > div:nth-child(2) > table > tbody > tr:nth-child(1) > td",
    existe_sanitario_fora_do_predio_da_escola:
      "body > section.container.censo-section.normal-section > div > div:nth-child(4) > div:nth-child(2) > table > tbody > tr:nth-child(2) > td",
    a_escola_possui_biblioteca:
      "body > section.container.censo-section.normal-section > div > div:nth-child(4) > div:nth-child(2) > table > tbody > tr:nth-child(3) > td",
    a_escola_possui_cozinha:
      "body > section.container.censo-section.normal-section > div > div:nth-child(4) > div:nth-child(2) > table > tbody > tr:nth-child(4) > td",
    a_escola_possui_laboratorio_de_informatica:
      "body > section.container.censo-section.normal-section > div > div:nth-child(4) > div:nth-child(2) > table > tbody > tr:nth-child(5) > td",
    a_escola_possui_laboratorio_de_ciências:
      "body > section.container.censo-section.normal-section > div > div:nth-child(4) > div:nth-child(2) > table > tbody > tr:nth-child(6) > td",
    a_escola_possui_sala_de_leitura:
      "body > section.container.censo-section.normal-section > div > div:nth-child(4) > div:nth-child(2) > table > tbody > tr:nth-child(7) > td",
    a_escola_possui_quadra_de_esportes:
      "body > section.container.censo-section.normal-section > div > div:nth-child(4) > div:nth-child(2) > table > tbody > tr:nth-child(8) > td",
    a_escola_possui_sala_para_a_diretoria:
      "body > section.container.censo-section.normal-section > div > div:nth-child(4) > div:nth-child(2) > table > tbody > tr:nth-child(9) > td",
    a_escola_possui_sala_para_os_professores:
      "body > section.container.censo-section.normal-section > div > div:nth-child(4) > div:nth-child(2) > table > tbody > tr:nth-child(10) > td",
    a_escola_possui_sala_de_atendimento_especial:
      "body > section.container.censo-section.normal-section > div > div:nth-child(4) > div:nth-child(2) > table > tbody > tr:nth-child(11) > td"
  };

  let response = {};

  for (const [key, value] of Object.entries(selector)) {
    let content = await page.$(value);
    content = await content.getProperty("innerText");
    content = await content.jsonValue();
    response[key] = content;
  }

  return response;
};

const getEquipamentos = async page => {
  const selector = {
    aparelho_de_dvd:
      "body > section.container.censo-section.normal-section > div > div:nth-child(4) > div:nth-child(3) > table > tbody > tr:nth-child(1) > td",
    impressora:
      "body > section.container.censo-section.normal-section > div > div:nth-child(4) > div:nth-child(3) > table > tbody > tr:nth-child(2) > td",
    copiadora:
      "body > section.container.censo-section.normal-section > div > div:nth-child(4) > div:nth-child(3) > table > tbody > tr:nth-child(3) > td",
    retroprojetor:
      "body > section.container.censo-section.normal-section > div > div:nth-child(4) > div:nth-child(3) > table > tbody > tr:nth-child(4) > td",
    televisao:
      "body > section.container.censo-section.normal-section > div > div:nth-child(4) > div:nth-child(3) > table > tbody > tr:nth-child(5) > td"
  };

  let response = {};

  for (const [key, value] of Object.entries(selector)) {
    let content = await page.$(value);
    content = await content.getProperty("innerText");
    content = await content.jsonValue();
    response[key] = content;
  }

  return response;
};

const getSaneamentoBasico = async page => {
  const selector = {
    abastecimento_de_agua:
      "body > section.container.censo-section.normal-section > div > div:nth-child(4) > div:nth-child(4) > table > tbody > tr:nth-child(1) > td",
    abastecimento_de_energia:
      "body > section.container.censo-section.normal-section > div > div:nth-child(4) > div:nth-child(4) > table > tbody > tr:nth-child(2) > td",
    destino_do_esgoto:
      "body > section.container.censo-section.normal-section > div > div:nth-child(4) > div:nth-child(4) > table > tbody > tr:nth-child(3) > td",
    destino_do_lixo:
      "body > section.container.censo-section.normal-section > div > div:nth-child(4) > div:nth-child(4) > table > tbody > tr:nth-child(4) > td"
  };

  let response = {};

  for (const [key, value] of Object.entries(selector)) {
    let content = await page.$(value);
    content = await content.getProperty("innerText");
    content = await content.jsonValue();
    response[key] = content;
  }

  return response;
};

const getComputadoresEInternet = async page => {
  const selector = {
    internet:
      "body > section.container.censo-section.normal-section > div > div:nth-child(4) > div:nth-child(5) > table > tbody > tr:nth-child(1) > td",
    banda_larga:
      "body > section.container.censo-section.normal-section > div > div:nth-child(4) > div:nth-child(5) > table > tbody > tr:nth-child(2) > td",
    computadores_para_uso_dos_alunos:
      "body > section.container.censo-section.normal-section > div > div:nth-child(4) > div:nth-child(5) > table > tbody > tr:nth-child(3) > td",
    computadores_para_uso_administrativo:
      "body > section.container.censo-section.normal-section > div > div:nth-child(4) > div:nth-child(5) > table > tbody > tr:nth-child(4) > td"
  };

  let response = {};

  for (const [key, value] of Object.entries(selector)) {
    let content = await page.$(value);
    content = await content.getProperty("innerText");
    content = await content.jsonValue();
    response[key] = content;
  }

  return response;
};

const writeToJsonFile = async (filename, data) => {
  try {
    // stringify JSON Object
    var jsonContent = JSON.stringify(data);
    console.log(jsonContent);
    fs.writeFileSync(filename, jsonContent, "utf8", function(err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      }
    });
  } catch (error) {
    throw error;
  }
};

const appendToJsonFile = async (filename, data) => {
  try {
    // stringify JSON Object
    var jsonContent = JSON.stringify(data);
    fs.appendFileSync(filename, jsonContent + "\n", "utf8", function(err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      }
    });
  } catch (error) {
    throw error;
  }
};

(async () => {
  const browser = await puppeteer.launch({
    headless: false
  });

  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);

  try {
    const dataset = [];
    await page.goto("https://www.qedu.org.br/busca");

    const states = await page.$$(
      "body > section:nth-child(9) > div > div > div.span3.sg-column.first.sg-entity-states > ul > li"
    );

    for (let i = 0; i < states.length; i++) {
      const state = states[i];
      let state_name = await state.getProperty("innerText");
      state_name = await state_name.jsonValue();
      console.log(state_name);

      await state.click();
      const selector =
        "body > section:nth-child(9) > div > div > div.span3.sg-column.sg-entity-cities > ul > li";

      while ((await page.$(selector)) === null) {
        await page.waitFor(500);
      }

      const cities = await page.$$(selector);

      for (let j = 0; j < cities.length; j++) {
        const city = cities[j];
        await city.click();

        const child_select =
          "body > section:nth-child(9) > div > div > div.sg-column.span6.sg-entity-schools > ul > li";

        while ((await page.$(child_select)) === null) {
          await page.waitFor(500);
        }

        const schools = await page.$$(child_select);
        for (let k = 0; k < schools.length; k++) {
          const school = schools[k];
          const newPagePromise = new Promise(x =>
            browser.once("targetcreated", target => x(target.page()))
          );
          await school.click({ button: "middle" });
          const page2 = await newPagePromise;
          await page2.bringToFront();
          await page2.waitForNavigation();
          const dados_gerais_selector =
            "body > section.container.censo-section.normal-section > div > div:nth-child(3) > div.group-educacenso.highlight > table";
          if ((await page2.$(dados_gerais_selector)) === null) {
            const censoTab =
              "body > section.subnav-section.gray-pattern > div.subnav.with-avatar-small-margin > ul > li:nth-child(7) > a";
            if ((await page2.$(censoTab)) === null) {
              await page2.close();
              continue;
            }
            await page2.click(censoTab);
            await page2.waitFor(500);
          }

          const nome = await getNomeEscola(page2);
          const dados_gerais = await getDadosGerais(page2);
          const outras_informacoes = await getOutrasInformacoes(page2);
          const alimentacao = await getAlimentacao(page2);
          const matricula = await getMatricula(page2);
          const matricula_por_serie = await getMatriculaPorSerie(page2);
          const acessibilidade = await getAcessebilidade(page2);
          const infraestrutura = await getInfraestrutura(page2);
          const equipamentos = await getEquipamentos(page2);
          const saneamentobasico = await getSaneamentoBasico(page2);
          const computadores_e_internet = await getComputadoresEInternet(page2);

          const data = {
            ...nome,
            ...dados_gerais,
            ...outras_informacoes,
            ...alimentacao,
            ...matricula,
            ...matricula_por_serie,
            ...acessibilidade,
            ...infraestrutura,
            ...equipamentos,
            ...saneamentobasico,
            ...computadores_e_internet
          };

          await appendToJsonFile("data.jsonl", data);

          dataset.push(data);
          await page2.close();
        }
      }
    }

    await browser.close();
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await browser.close();
  }

  await writeToJsonFile("output.json", dataset);
})();
