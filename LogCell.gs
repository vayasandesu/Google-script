/*
Use for log the update of specific cell
*/

// Configuration

//// Example of Sheet logger instance
var parseJsonSheet = {
    SheetName: "Parse_Json",
    Cells: {
      "B1": "C5", //cell which want to observe, the first cell which record the update (from top to buttom)
      "B2": "D5"
    }
};


/// Add the logger sheet instance to this variable
var _sheetLoggers = [
  parseJsonSheet
];

// End Configuration



// Event
function onEdit(e){
  var sheet = e.source.getActiveSheet();
  var range = e.range;
  var value = sheet.getRange(range.getA1Notation()).getValue();
  
  Logger.log("Execute on edit at "+range.getA1Notation()+" with value : "+e.value);
  
  if(value == "" || value == null || value == undefined)
    return;
  
  var sheetLogger = GetSheetLogger(sheet.getName());
  var updateColumn = GetColumn(sheetLogger, range);
  
  if(sheetLogger != null && updateColumn != null)
    Log(sheet, updateColumn, value);
  
}

// Functions
function Log(sheet, startCell, value){
  var cellNotation = GetLastEmptyCell(sheet, startCell);
  var ranges = sheet.getRange(startCell+":"+cellNotation);
  
  if(!IsContainValue(ranges, value))
    WriteText(sheet, cellNotation, value);
  else
    Logger.log("ranges ["+startCell+":"+cellNotation+"] has already exist value : "+value);
}

function GetLastEmptyCell(sheet, startCell) {
  
  var column = startCell.replace(/[0-9]/, "");
  var lastIndex = sheet.getLastRow() + 1; // get next cell of last content cell.
  var startIndex = sheet.getRange(startCell).getRowIndex();
  
  if(lastIndex < startIndex)
    lastIndex = startIndex;
  else{
    var previousCell = column + (lastIndex - 1);
    while(lastIndex > startIndex && sheet.getRange(previousCell).isBlank()){
      lastIndex = lastIndex - 1;
      previousCell = column + (lastIndex - 1);
      Logger.log("cell ["+previousCell+"] is empty then backward to {"+lastIndex+"}");
    }
  }
  
  Logger.log("last cell is -> "+column+""+lastIndex);
  
  return column+""+lastIndex;
  
}

function IsContainValue(ranges, value){
  var values = ranges.getValues();
  for(var i = 0 ; i < values.length; i++){
    if(values[i] == value)
      return true;
  }
  
  return false;
}

function WriteText(sheet, range, value){
  sheet.getRange(range).setValue(value);
}

/**
get start cell which is append the update text.
@params {sheetName} name of sheetLogger.sheetName
@return {SheetLogger} sheet logger which is same name.
**/
function GetSheetLogger(sheetName){
  return _sheetLoggers.find( element => element.SheetName == sheetName);
}

/**
get start cell which is append the update text.
@params {sheetLogger} sheetLogger Object 
@params {editCell} a cell was edited.
@return {string} first position of cell which record the update value. (cell Notation format)
**/
function GetColumn(sheetLogger, editCell){
  if(sheetLogger == null)
    return null;
  
  var rangeNotation = editCell.getA1Notation();
  return sheetLogger.Cells[rangeNotation];
}
