function UnionSheet(masterSheetName, dataSheetNames, labels){
  if(!Array.isArray(labels)){
    labels = labels.split(',');
  }
  
  labels = RemoveEmpty(labels);
  Logger.log("Combie "+labels.length+" comlumns");
  
  var spreadSheet = SpreadsheetApp.getActive();
  var masterSheet = GetSheet(spreadSheet, masterSheetName);
  var dataSheets = GetSheets(spreadSheet, dataSheetNames);
  
  var data = [];
  dataSheets.forEach(function(sheet, i){
    var result = GetData(sheet, labels);
    data = data.concat(result);
    
    Logger.log("["+sheet.getName()+"] has "+ result.length + " data , concat then total data = "+data.length);
  });
  
  Logger.log("Set "+ data.length + " data to sheet");
  SetData(masterSheet, labels, data);
}

function SetData(sheet, labels, data){
  var ranges = sheet.getRange(2, 1, data.length, labels.length);
  ranges.setValues(data);
}

function GetData(sheet, labels){

  var keys = GetColumnsIndex(sheet, labels);
  var lr = sheet.getLastRow();
  var lc = sheet.getLastColumn();
  var result = [];
  var values = sheet.getRange(2, 1, lr, lc).getValues();
  Logger.log("Data size = "+values.length+"rows and "+values[0].length + "columns");
  
  for(var i = 0 ; i < lr-1 ; i ++){
    var row = [];
    var isEmpty = true;
    
    if(values[i] == null)
      continue;
    
    labels.forEach(function(label, iLabel){
      var columnIndex = keys[label];
      row[iLabel] = "";
      
      if(columnIndex > 0){
        var value = values[i][columnIndex - 1]; 
        if(value != "" && value != null){
          isEmpty = false;
          row[iLabel] = value;
          //Logger.log(sheet.getName()+" with " + label + "at ["+i+","+columnIndex+"] = "+value)
        }
      }
      
    });
    
    if(!isEmpty){
      //Logger.log(sheet.getName()+"["+i+"] has "+row.length+" columns ");
      result.push(row);
    }
    
  }
  
  return result;
  
}

/*
@params{spreadSheet: SpreadSheet}
@params{sheetNames: Array}
*/
function GetSheets(spreadSheet, sheetNames){
  var sheets = new Array();
  var names = sheetNames;
  
  if(names == null || spreadSheet == null)
    return sheets;
  
  names.forEach(function(name, i){
    var sheet = GetSheet(spreadSheet, name);
    if(sheet != null)
      sheets.push(sheet);
  });
  
  Logger.log("found "+sheets.length+" sheets");
  return sheets;
}

function RemoveEmpty(labels){
  var result = [];
  labels.forEach(function(value, i){
    if(value != "" && value != null)
      result.push(value);
  });
  
  return result;
}

/**
* Get Sheet by name
* @params {SpreadSheet}
* @params {string}
**/
function GetSheet(spreadSheet, sheetName){
  if(sheetName != "" && sheetName != null){
      return spreadSheet.getSheetByName(sheetName);
  }
  
  return null;
}

function GetColumnsIndex(sheet, labels){
  var lc = sheet.getLastColumn();
  var ranges = sheet.getRange(1, 1, 1, lc).getValues()[0];
  
  var indexs = {};
  
  labels.forEach(function(label, i){
    var index = ranges.indexOf(label) + 1;
    indexs[label] = index;
  });
  
  return indexs;
}
