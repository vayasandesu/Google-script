// Add union setting here.
var setup = [
  {
    MasterSheet : "Master2",
    DataSheet : [
      "FB_Mod2",
      "LN_Mod2"
    ],
    Notation: "A1:Z1"
  }
];


function onEdit(e) {
  
  var spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  var updateSheet = e.range.getSheet();
  
  if(!IsDataSheet(updateSheet)){
     Logger.log("User update file : "+updateSheet.getName() +" which not data sheet");
     return; 
  }  
     
  setup.forEach(function(input, i){
    var masterSheet = spreadSheet.getSheetByName(input.MasterSheet);
    if(masterSheet == null)
      return;
    
    var labelRanges = masterSheet.getRange(input.Notation);
    var labels = labelRanges.getValues()[0]+"";
    Logger.log("labels from Notation = "+labels);
    ClearSheet(masterSheet, labelRanges);
    UnionSheet(input.MasterSheet, input.DataSheet, labels);
  });
  
}

function ClearSheet(sheet, labelRange){
  var lastRow = sheet.getLastRow();
  var lastColumn = labelRange.getLastColumn();
  sheet.getRange(2, 1, lastRow, lastColumn).clear();
}

function IsDataSheet(sheet){
  var updateSheetName = sheet.getName();
  
    if(input.MasterSheet == updateSheetName)
      return false;
    
  
  for(var i = 0 ; i < setup.length ; i ++){
    var input = setup[i];
    
    for(var si = 0 ; si < input.DataSheet.length ; si ++ ){
      if(input.DataSheet[si] == updateSheetName)
        return true;
    }
  }
  
  return false;
}
