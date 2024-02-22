function onOpen() {
  var ui = SpreadsheetApp.getUi();
  var menu = ui.createMenu("BigQuery");
  menu.addItem("JSONスキーマ出力", "outputJsonSchema");
  menu.addToUi();
}

function outputJsonSchema() {
  let lines = getLines();
  let json = getJson(lines);
  Browser.msgBox(JSON.stringify(json, null, 2));
}

function getLines() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastRow = sheet.getLastRow();
  const bodyRowNum = 9;
  let lines = Array();
  // lines に全データを格納
  for (let i = bodyRowNum; i <= lastRow; i++) {
    // カラム日本語名
    let jp = sheet.getRange(i, 3).getValue();
    // Column name (Field name)
    let en = sheet.getRange(i, 4).getValue();
    // Type
    let type = sheet.getRange(i, 5).getValue();
    // Max Length
    let max_length = sheet.getRange(i, 6).getValue();
    // Mode
    let mode = sheet.getRange(i, 7).getValue();
    // Default Value Expression
    let dve = sheet.getRange(i, 8).getValue();

    // すべて空の場合は終了
    if (!jp && !en && !type && !max_length && !mode && !dve) {
      break;
    }

    lines.push({
      jp: jp,
      en: en,
      type: type,
      max_length: max_length,
      mode: mode,
      dve: dve,
    });
  }
  return lines;
}

function getJson(lines, parentCol = "") {
  let json = [];
  let fields = null;
  let i = 0;
  while (i < lines.length) {
    if (lines[i].en.indexOf(parentCol) === -1) {
      break;
    }
    if (lines[i].type === "RECORD") {
      fields = getJson(lines.slice(i + 1), lines[i].en + ".");
      json.push({
        name: lines[i].en.replace(parentCol, ""),
        type: lines[i].type,
        // maxLength: lines[i].max_length, // TODO ERROR if empty 
        // defaultValueExpression: lines[i].dve, // TODO ERROR if empty 
        mode: lines[i].mode,
        fields: fields,
      });
      i += getChildCount(lines.slice(i + 1), lines[i].en);
    } else {
      json.push({
        name: lines[i].en.replace(parentCol, ""),
        type: lines[i].type,
        // maxLength: lines[i].max_length, // TODO ERROR if empty 
        // defaultValueExpression: lines[i].dve, // TODO ERROR if empty 
        mode: lines[i].mode,
      });
    }
    i++;
  }
  return json;
}

function getChildCount(lines, parentCol) {
  let count = 0;
  for (const l of lines) {
    if (l.en.indexOf(parentCol + ".") !== -1) {
      count++;
    }
  }
  return count;
}
