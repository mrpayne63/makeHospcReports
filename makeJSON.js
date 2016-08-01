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
var prod = false;
var baseDir = 'JSON2/';
if(prod) {	baseDir = 'JSON/';}
if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir);
}
var sql = "select ITEM from "+schema+"."+table+"  where RPT_REC_NUM  = "+entity+"  and  WKSHT_CD = 'S100000' and LINE_NUM = '00100'";

console.log(sql);

var connection = mysql.createConnection({
    host : 'localhost',
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
    host : 'localhost',
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
var myRows = new Array();

var dataArray = createArray(6,7);
connection.query(sql,function(err, rows) {
	//console.log(rows[0].ITEM + ',' + rows[1].ITEM + ',' +rows[2].ITEM + ',' +rows[3].ITEM + ',' +rows[4].ITEM);
	
	var entityName = '';
	for (i = 0; i < rows.length; i++) {
	//	for (i = 0; i < 1; i++) {
		console.log(rows[i].ITEM);
		myRows[i] = rows[i].ITEM;
		//entityName +=  rows[i].ITEM.toString() + ',';
		//console.log("XXX " + entityName);
} // end top for loop
	//var entityName = myRows.join(':');//[0].ITEM + ',' + rows[1].ITEM; //+ ',' +rows[2].ITEM + ',' +rows[3].ITEM + ',' +rows[4].ITEM ; 
	//console.log(entityName);
	
	console.log(myRows[0] + '\n'+ myRows[1] );

}); // end connection callback
		
		
		var sql2 = "SELECT * from "+schema+"."+table+"  where RPT_REC_NUM  = "+entity+"  and WKSHT_CD = 'A000000' and CLMN_NUM in('1000') and LINE_NUM in ('01500','01600','01700','01800','01900','02000');";

      console.log(sql2);
        connection2.query(sql2,    function(err, rows2) {
            
        	mydir = baseDir + rows2[0].RPT_REC_NUM;
            if (!fs.existsSync(mydir)) {
                fs.mkdirSync(mydir);
            }

            var myfile2 = mydir + '/A000000.JSON';
            
            
            dataArray[0][0] =  'Year';
            dataArray[0][1] =  '1500PHYSICIAN SERVICES';
            dataArray[0][2] = '1600NURSING CARE';
            	dataArray[0][3] = '1700PHYSICAL THERAPY';
            		dataArray[0][4] = '1800OCCUPATIONAL THERAPY';
            			dataArray[0][5] = '1900SPEECH/LANGUAGE PATHOLOGY';
            			dataArray[0][6] = '2000 NEED LABEL';
         
            //, '1500PHYSICIAN SERVICES', , ,,];
           //                                                  // ['2013', 3833881, 21988746, 341064, 1790500, 1733100],
                                                             // ['2014', 4178930, 21329083, 409276, 1987400, 1819700],
                                                             // ['2015', 4555034, 20689211, 491132, 2206000, 1910700],
                                                              //['2016', 4964987, 20068534, 589358, 2448700, 2006200]
              
            dataArray[1][0] = '2013';
            for (i = 0; i < rows2.length; i++) {
            	dataArray[1][i+1]= rows2[i].ITEM;


            }  // end row2 for loop
            

            
            console.log(dataArray);
            var csv4 = dataArray.map(function(d) {
				return JSON.stringify(d);
			}).join('\n');

            fs.writeFile(myfile2, csv4, function(err) {
                if (err)
                    throw err;
                console.log(myfile2 + ' saved');

                	process.exit(0);

            });
            
        }); // end connection2 callback

    



