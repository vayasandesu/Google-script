var config = [
  {
    source : {
      url: "https://docs.google.com/spreadsheets/d/1bPpypsvX3-5EH68kR0Dy_zQ9gHiOGnEq7N-9NgHkaaM/edit#gid=0",
      sheetName: "แผ่น1",
      columns: [
        "A", "D"
      ]
    },
    destination : {
      url: "https://docs.google.com/spreadsheets/d/1beALcbanQCG8d4vyS9kPYHDN3dsEIo5gZMQIa9cWrGI/edit#gid=0",
      sheetName: "Backup"
    } 
  },
  {
    source : {
      url: "https://docs.google.com/spreadsheets/d/1bPpypsvX3-5EH68kR0Dy_zQ9gHiOGnEq7N-9NgHkaaM/edit#gid=0",
      sheetName: "แผ่น1",
      columns: [
        "A", "D"
      ]
    },
    destination : {
      url: "https://docs.google.com/spreadsheets/d/1beALcbanQCG8d4vyS9kPYHDN3dsEIo5gZMQIa9cWrGI/edit#gid=0",
      sheetName: "Backup"
    } 
  }
]

function RunTrigger(){
  Execute(config);
}