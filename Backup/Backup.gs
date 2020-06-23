/*
array or object type with structure below
{
    source : {
      url: "https://docs.google.com/spreadsheets/d/1bPpypsvX3-5EH68kR0Dy_zQ9gHiOGnEq7N-9NgHkaaM/edit#gid=0",
      sheetName: "แผ่น1",
      columns: [ // if columns is null , clone everything in sheet
        "A", "D"
      ]
    },
    destination : {
      url: "https://docs.google.com/spreadsheets/d/1beALcbanQCG8d4vyS9kPYHDN3dsEIo5gZMQIa9cWrGI/edit#gid=0",
      sheetName: "Backup"
    } 
}
*/
function Execute(config) {
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
  
  var lr = sourceData.row; //sourceData.getLastRow();
  var lc = sourceData.column; //sourceData.getLastColumn();
  var values = sourceData.data;
  destinationSheet.getRange(1, 1, lr, lc).setValues(values);

}

function getData(config){
  var spreadsheet = SpreadsheetApp.openByUrl(config.url);
  var sheet = spreadsheet.getSheetByName(config.sheetName);
  
  var output = {
    data: [],
    row: 0,
    column: 0
  };
  
  if(config.columns != null){
    // Get only specific column
    var data = [];
   
    config.columns.forEach(function(column, i){
      var notation = column+"1:"+column; // Notation for query data in 1 column
      var ranges = sheet.getRange(notation);
      var values = ranges.getValues();
      var lr = ranges.getLastRow();
      if(lr > output.row)
        output.row = lr;
      
      for(var row = 0 ; row < lr ; row ++ ){
        if(data[row] == null){
          data[row] = [];
        }
        data[row][i] = values[row];
      }
      
    });
    
    output.column = config.columns.length;
    output.data = data;
    
  }else{
    //Get all data
    var ranges = sheet.getDataRange();
    output.row = ranges.getLastRow();
    output.column = ranges.getLastColumn();
    output.data = ranges.getValues();
  }
  
  return output;
}
