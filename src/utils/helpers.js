
export const onReaderLoad = (fileData) => {
  const obj = JSON.parse(fileData);
  return obj.data;
};

export const convertCSVToJson = (csvFile) => {
  const lines = [];
  const linesArray = csvFile.split("\n");

  // for trimming and deleting extra space
  linesArray.forEach((e) => {
    const row = e.replace(/[\s]+[,]+|[,]+[\s]+/g, ",").trim();
    lines.push(row);
  });

  // for removing empty record
  lines.splice(lines.length - 1, 1);
  const result = [];
  const headers = lines[0].split(",");
  const objHeaders = [headers[0].split("/")[1], headers[1].split("/")[1]];

  for (let i = 1; i < lines.length; i++) {
    const obj = {};
    const currentLine = lines[i].split(",");

    for (let j = 0; j < objHeaders.length; j++) {
      obj[objHeaders[j]] = toNumber(currentLine[j]);
    }
    result.push(obj);
  }

  const dataObj = {
    data: [...result],
  };

  return JSON.stringify(dataObj);
};

const toNumber = (value)=>{
  const isValidNumber = value.length > 0 && value !== " " && !isNaN(value);
  return isValidNumber? Number(value):value;
}
