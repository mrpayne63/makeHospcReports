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
var db = 'localhost';
var schema = 'HOSPC';
var table = 'hospc_2013_DATA';
var tmpSheetLetter = 'FIRST';
var lastEntity;
var lastReport;
var prod = false;
var baseDir = 'JSON2/';
var sql = "select ITEM from "+schema+"."+table+"  where RPT_REC_NUM  = "+entity+"  and  WKSHT_CD = 'S100000' and LINE_NUM = '00100'";

var sql2 = "SELECT *, 2013 myyear from "+schema+"."+table+"  where RPT_REC_NUM  = "+entity
+"  and WKSHT_CD = 'A000000' and CLMN_NUM in('1000') and LINE_NUM in ('01500','01600','01700','01800','01900')"
+ "union SELECT *, 2014 myyear from "+schema+"."+table+"  where RPT_REC_NUM  = "+entity
+"  and WKSHT_CD = 'A000000' and CLMN_NUM in('1000') and LINE_NUM in ('01500','01600','01700','01800','01900')";


if(prod) {	
	baseDir = 'JSON/';
	db = '10.10.10.11';
	entity = 101508;
	sql = "select ITEM from HOSPC.HOSPC_2009_CLXN  where cmsid  = "+entity+"  and  WKSHT_CD = 'S100000' and LINE_NUM = '00100'";
	sql2 = "SELECT *,2009 myyear FROM HOSPC.HOSPC_2009_CLXN where cmsid = " + entity + " and WKSHT_CD = 'A000000' and CLMN_NUM in('1000') and LINE_NUM in ('01500','01600','01700','01800','01900')"
	+ " union "+
	" SELECT *,2010 myyear FROM HOSPC.HOSPC_2010_CLXN where cmsid =  " + entity + "  and WKSHT_CD = 'A000000' and CLMN_NUM in('1000') and LINE_NUM in ('01500','01600','01700','01800','01900')"
	+ " union "+
	" SELECT *,2011 myyear FROM HOSPC.HOSPC_2011_CLXN where cmsid =  " + entity + "  and WKSHT_CD = 'A000000' and CLMN_NUM in('1000') and LINE_NUM in ('01500','01600','01700','01800','01900')"
	+ " union "+
	" SELECT *,2012 myyear FROM HOSPC.HOSPC_2012_CLXN where cmsid = " + entity + " and WKSHT_CD = 'A000000' and CLMN_NUM in('1000') and LINE_NUM in ('01500','01600','01700','01800','01900')"
	+ " union "+
	"SELECT *,2013 myyear FROM HOSPC.HOSPC_2013_CLXN where cmsid = " + entity + " and WKSHT_CD = 'A000000' and CLMN_NUM in('1000') and LINE_NUM in ('01500','01600','01700','01800','01900')"
	+ " union "+
	"SELECT *,2014 myyear FROM HOSPC.HOSPC_2014_CLXN where cmsid = " + entity + " and WKSHT_CD = 'A000000' and CLMN_NUM in('1000') and LINE_NUM in ('01500','01600','01700','01800','01900')";

}
if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir);
}


console.log(sql);

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
var myRows = new Array();

var dataArray = createArray(7,6);
connection.query(sql,function(err, rows) {
	//console.log(rows[0].ITEM + ',' + rows[1].ITEM + ',' +rows[2].ITEM + ',' +rows[3].ITEM + ',' +rows[4].ITEM);
	
	//var entityName = '';
	for (var i = 0; i < rows.length; i++) {
	//	for (i = 0; i < 1; i++) {
		//console.log(rows[i].ITEM);
		myRows[i] = rows[i].ITEM;
		//entityName +=  rows[i].ITEM.toString() + ',';
		//console.log("XXX " + entityName);
} // end top for loop
	//var entityName = myRows.join(':');//[0].ITEM + ',' + rows[1].ITEM; //+ ',' +rows[2].ITEM + ',' +rows[3].ITEM + ',' +rows[4].ITEM ; 
	//console.log(entityName);
	
	

}); // end connection callback
		

console.log(sql2);
connection2.query(sql2,    function(err, rows2) {
	console.log(myRows[0] + '\n'+ myRows[1] );
    dataArray[0][0] =  'Year';
    dataArray[0][1] =  '1500PHYSICIAN SERVICES';
    dataArray[0][2] = '1600NURSING CARE';
    	dataArray[0][3] = '1700PHYSICAL THERAPY';
    		dataArray[0][4] = '1800OCCUPATIONAL THERAPY';
    			dataArray[0][5] = '1900SPEECH/LANGUAGE PATHOLOGY';
 
    //, '1500PHYSICIAN SERVICES', , ,,];
   //                                                  // ['2013', 3833881, 21988746, 341064, 1790500, 1733100],
                                                     // ['2014', 4178930, 21329083, 409276, 1987400, 1819700],
                                                     // ['2015', 4555034, 20689211, 491132, 2206000, 1910700],
                                                      //['2016', 4964987, 20068534, 589358, 2448700, 2006200]
      
    
    for (var i = 0; i < rows2.length; i++) {
    	var thisIndex = 1;
        switch (rows2[i].myyear.toString())
        {
           case "2009":
        	   thisIndex = 1;
        	   dataArray[thisIndex][0] = '2009';
              break;
           case "2010":
        	   thisIndex = 2;
        	   dataArray[thisIndex][0] = '2010';
              break;
           case "2011":
        	   thisIndex = 3;
        	   dataArray[thisIndex][0] = '2011';
              break;
           case "2012":
        	   thisIndex = 4;
        	   dataArray[thisIndex][0] = '2012';
              break;
           case "2013":
        	   thisIndex = 5;
        	   dataArray[thisIndex][0] = '2013';
        	   
              break;
           case "2014":
        	   thisIndex = 6;
        	   dataArray[thisIndex][0] = '2014';
              break;
           default:
        }
    	
    	
    	
    	
        switch (rows2[i].LINE_NUM)
        {
           case "01500":
        	  dataArray[thisIndex][1]= parseInt(rows2[i].ITEM,10);
              break;
           case "01600":
         	  dataArray[thisIndex][2]= parseInt(rows2[i].ITEM,10);
               break;
           case "01700":
         	  dataArray[thisIndex][3]= parseInt(rows2[i].ITEM,10);
               break;
           case "01800":
         	  dataArray[thisIndex][4]= parseInt(rows2[i].ITEM,10);
               break;
           case "01900":
         	  dataArray[thisIndex][5]= parseInt(rows2[i].ITEM,10);
               break;
          default:
        }      	  
    	


    }  // end row2 for loop
    

    
    console.log(dataArray);
    
    var myfile2 = baseDir + entity + '.JSON';
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

   



