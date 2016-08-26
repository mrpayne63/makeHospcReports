var fs = require('fs');
var mysql = require('mysql');

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

if (process.argv.length <= 2) {
   // console.log("Usage: " + __filename + " SOME_PARAM");
   // process.exit(-1);
}
 
var entity = process.argv[2];
var schema = 'HOSPC';
var table = 'hospc_2013_DATA';
var tmpSheetLetter = 'FIRST';
var lastEntity;
var lastReport;
var prod = true;
var baseDir = 'static2/';
if(prod) {	baseDir = 'static2/';}
if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir);
}
var sql = "select RPT_REC_NUM,WKSHT_CD from "+schema+"."+table+" where RPT_REC_NUM in(31394,32352,32494,32589,32672,32675,33085,33229,33312,33471,33962) group by RPT_REC_NUM,WKSHT_CD order by RPT_REC_NUM,WKSHT_CD";// limit 100";
if(entity){
	sql = "select RPT_REC_NUM,WKSHT_CD from "+schema+"."+table+" where RPT_REC_NUM = "+entity+" group by RPT_REC_NUM,WKSHT_CD order by RPT_REC_NUM,WKSHT_CD";
}
var db = "localhost";
if(prod) {	
	
	db = '10.10.10.11';
	//entity = 101508;
	table = 'HOSPC_2009_CLXN';
	sql = "select cmsid RPT_REC_NUM,WKSHT_CD from "+schema+"."+table+" where RPT_REC_NUM in ('101537','101529','101500','101508','421555','101515','451520','101518','051511') group by RPT_REC_NUM,WKSHT_CD order by RPT_REC_NUM,WKSHT_CD";
		
}
//console.log(sql);
var spacerArray = createArray(4,6);
spacerArray[0][0] = '----------------';
spacerArray[0][1] = '----------------';
spacerArray[0][2] = '----------------';
spacerArray[0][3] = '----------------';
spacerArray[0][4] = '----------------';
spacerArray[0][5] = '----------------';
spacerArray[1][0] = '----------------';
spacerArray[1][1] = '----------------';
spacerArray[1][2] = '----------------';
spacerArray[1][3] = '----------------';
spacerArray[1][4] = '----------------';
spacerArray[1][5] = '----------------';

var connection = mysql.createConnection({
    host : db,
    user : 'nodeuser',
    password : 'Cheese2000',
    database : schema
});

connection.connect(function(err) {
    if (!err) {
        console.log("Database is connected ... nn");
    } else {
        console.log("Error connecting database ... nn");
    }
});

var connection2 = mysql.createConnection({
    host : db,
    user : 'nodeuser',
    password : 'Cheese2000',
    database : schema
});

connection2.connect(function(err) {
    if (!err) {
        console.log("Database2 is connected ... nn");
    } else {
        console.log("Error2 connecting database ... nn");
    }
});

connection.query(sql,function(err, rows) {
	 var tmpHospID = rows[0].RPT_REC_NUM;
     var tmpReportID = rows[0].WKSHT_CD;
     var tmpSheetLetter = 'FIRST';
     var sheetArray = new Array();
     var sheetArrayPROD = new Array();
     var reportArray2 = new Array();
     var thisReportHeared = new Array();
     var thisReportHearedCSV = '';
     var tmpLine0 = new Array();
     lastEntity = rows[rows.length-1].RPT_REC_NUM;
     lastReport = rows[rows.length-1].WKSHT_CD;
     //console.log("Last Report " + lastEntity + " " +lastReport );     
	for (i = 0; i < rows.length; i++) {

        tmpLine0[0] = rows[i].WKSHT_CD + ' Report';
       var sql2 = "select RPT_REC_NUM,WKSHT_CD,LINE_NUM,CLMN_NUM,item myvalue from "
        	+ schema + "." + table + " where RPT_REC_NUM like '" + rows[i].RPT_REC_NUM 
        	+ "' and WKSHT_CD like '"  + rows[i].WKSHT_CD
            + "' order by RPT_REC_NUM,WKSHT_CD,LINE_NUM,CLMN_NUM";
       if(prod){
    	   sql2 = "select cmsid RPT_REC_NUM,WKSHT_CD,LINE_NUM,CLMN_NUM,item myvalue from "
           	+ schema + "." + table + " where RPT_REC_NUM like '" + rows[i].RPT_REC_NUM 
           	+ "' and WKSHT_CD like '"  + rows[i].WKSHT_CD
               + "' order by RPT_REC_NUM,WKSHT_CD,LINE_NUM,CLMN_NUM";
       }
      console.log(sql2);
        connection2.query(sql2,    function(err, rows2) {
            mydir = baseDir + rows2[0].RPT_REC_NUM;

            if (!fs.existsSync(mydir)) {
                fs.mkdirSync(mydir);
            }

            var myfile2 = mydir + '/' + thisHospID + '-'
                    + tmpReportID + '.csv';
            var tmpLineNUM = '';
            var tmpColumnNUM = '';
            var newFile = true;
            var tmpArray2 = new Array();
            var tmpLine = '';
            var lineCount = 1;

            for (i = 0; i < rows2.length; i++) {

                var thisHospID = rows2[i].RPT_REC_NUM;
                var thisReportID = rows2[i].WKSHT_CD;
                var thisLineNUM = rows2[i].LINE_NUM;
                var thisColumnNUM = rows2[i].CLMN_NUM;
                var thisSheetLetter = rows2[i].WKSHT_CD.substring(0,1);
                
                thisReportHearedCSV = 'headers/templates/'+thisReportID+'.csv';
                
                if (!fs.existsSync(thisReportHearedCSV)) {
                	thisReportHearedCSV = 'NoHeader.csv';
                }
                
                if(tmpSheetLetter != thisSheetLetter){
                     sheetArray = new Array();
                    tmpSheetLetter = thisSheetLetter;
                }
                if (tmpHospID != thisHospID) {
                    tmpHospID = thisHospID;
                    newFile = true;
                }
                if (tmpReportID != thisReportID) {

                	tmpReportID = thisReportID;
                    newFile = true;
                }
                if (newFile) {

                    myfile2 = mydir
                    + '/' + thisHospID + '-'
                    + tmpReportID
                    + '.csv';
                    newFile = false;
                }

                if (tmpLineNUM != thisLineNUM) {
                    if (tmpLineNUM) {
                    	tmpArray2[0] = schema;
                    	tmpArray2[1] = table;
                    	tmpArray2[2] = thisHospID;
                    	tmpArray2[3] = thisReportID;
                        tmpArray2[4] = 'Line(' + tmpLineNUM +')';
                        //console.log(tmpArray2);
                        reportArray2[lineCount++] = tmpArray2;
                        //tmpArray = new Array();
                        tmpArray2 = new Array();

                    }
                    tmpLineNUM = thisLineNUM;

                }

                tmpColumnNUM = parseInt(thisColumnNUM) / 100 + 4;
                tmpLine0[tmpColumnNUM + 1] = 'Entity[' +thisHospID + '] Report(' + rows2[i].WKSHT_CD + '[' +thisColumnNUM + '])';
                

                var someText = rows2[i].myvalue;
                someText = someText.replace(
                        /(\r\n|\n|\r)/gm, "");
                tmpArray2[tmpColumnNUM + 1] = someText;

            }  // end row2 for loop
            
            tmpLine0[0] =  'Entity[' +thisHospID + '] Report(' + thisReportID + ')';
    
            var data2 ;
            //data2[0] = '';
            if(thisReportHearedCSV)
            {
                var cells = [];
                var fileContents = fs.readFileSync(thisReportHearedCSV);
                var lines = fileContents.toString().split('\n');
               
                var headerString = schema +"," + table + ', ' +thisHospID + ',' 
                	+ thisReportID + ' ,-------------,-------------,-----------,';
                cells.push(headerString.toString().split(','));
                var getLines = lines.length;
                for (var i = 1; i < getLines; i++) {
                	
                	if(lines[i].length){
                    	
                    	cells.push(lines[i].toString().split(','));
                    }
                }
               
                data2 = createArray(lines.length,cells[0].length+4);
                
                for (var i = 0; i < cells.length; i++) {
                	data2[i][0]= '-------------';
                    data2[i][1]= '-------------';
                    data2[i][2]= '-------------';
                    for (var j = 0; j < cells[i].length; j++) {
                    	data2[i][j+4] = cells[i][j];
                    }
                }
            }


            reportArray2[0] = tmpLine0;
            if(data2){
                data2 = data2.concat(reportArray2);
                reportArray2 = data2;
            }


			sheetArray = sheetArray.concat(reportArray2);
            sheetArray = sheetArray.concat(spacerArray);


            reportArray2 = new Array();
            tmpLine0 = new Array();
            
            // write sheet report
            
            tmpFile2 = mydir + '/'+ schema + '-' + table + '-'+ thisHospID 
            	+ '-Sheet' + tmpSheetLetter + '.csv';
            
            sheetArrayPROD = createArray(sheetArray.length, 20);

                for (var s = 0; s < sheetArray.length; s++) {
                    //console.log(sheetArray[s].length);
                    for (var t = 1; t < sheetArray[s].length; t++) {
                    	sheetArrayPROD[s][t - 1] = sheetArray[s][t];
                    }

                }
        
            if (!prod) {
				var csv4 = sheetArray.map(function(d) {
					return JSON.stringify(d);
				}).join('\n').replace(/(^\[)|(\]$)/mg, '').replace(/null/mg,
						' ');
				fs.writeFile(tmpFile2, csv4, function(err) {
					if (err)
						throw err;
					console.log(tmpFile2 + ' saved');
				});
			}
			var tmpFile3 = mydir + '/'+ thisHospID +'-Sheet_' + tmpSheetLetter + '.csv';

            var csv5 = sheetArrayPROD.map(function(d) {
                return JSON.stringify(d);
            }).join('\n').replace(/(^\[)|(\]$)/mg, '')
            .replace(/null/mg, ' ');

            //console.log(csv3);

            fs.writeFile(tmpFile3, csv5, function(err) {
                if (err)
                    throw err;
                //console.log(tmpFile3 + ' saved');
                if(lastEntity + lastReport == thisHospID + thisReportID){
                	process.exit(0);
                }
            });
            
        }); // end connection2 callback

    } // end top for loop
	

}); // end connection callback



