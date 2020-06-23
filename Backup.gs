var config = [
  {
    source : {
      url: "https://docs.google.com/spreadsheets/d/1bPpypsvX3-5EH68kR0Dy_zQ9gHiOGnEq7N-9NgHkaaM/edit#gid=0",
      sheetName: "แผ่น1",
    },
    destination : {
      url: "https://docs.google.com/spreadsheets/d/1beALcbanQCG8d4vyS9kPYHDN3dsEIo5gZMQIa9cWrGI/edit#gid=0",
      sheetName: "Backup"
    } 
  }
]

function Backup() {
  if(Array.isArray(config)){
    config.forEach(function(c, i){
      run(c);
    });
  }
  else{
    run(config);
  }
}

function run(config){
  var source = config.source;
  var destination = config.destination;
  
  var sourceData = getData(source);
  var destinationSheet = SpreadsheetApp.openByUrl(destination.url).getSheetByName(destination.sheetName);
  
  if(destinationSheet == null)
    throw "Sheet "+ destination.sheetName + " doesn't exist";
  
  var lr = sourceData.getLastRow();
  var lc = sourceData.getLastColumn();
  var values = sourceData.getValues();
  destinationSheet.getRange(1, 1, lr, lc).setValues(values);

}

function getData(config){
  var spreadsheet = SpreadsheetApp.openByUrl(config.url);
  var sheet = spreadsheet.getSheetByName(config.sheetName);
  return sheet.getDataRange();
}
