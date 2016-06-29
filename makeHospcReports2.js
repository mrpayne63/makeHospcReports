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

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'nodeuser',
    password : 'Cheese2000',
    database : 'HOSPC'
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
    database : 'HOSPC'
});

connection2.connect(function(err) {
    if (!err) {
        console.log("Database2 is connected ... nn");
    } else {
        console.log("Error2 connecting database ... nn");
    }
});


var prod = false;
var baseDir = 'debug/';

//var sql = "select RPT_REC_NUM,WKSHT_CD from HOSPC.hospc_2013_DATA where RPT_REC_NUM = 33962 group by RPT_REC_NUM,WKSHT_CD order by RPT_REC_NUM,WKSHT_CD";
var sql = "select RPT_REC_NUM,WKSHT_CD from HOSPC.hospc_2013_DATA group by RPT_REC_NUM,WKSHT_CD order by RPT_REC_NUM,WKSHT_CD";

var spacerArray = new Array();
spacerArray[0] = '';
spacerArray[1] = '';

var tmpSheetLetter = 'FIRST';

if(prod) {
	baseDir = 'reports4/';
}

if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir);
}

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
     
	for (i = 0; i < rows.length; i++) {

        tmpLine0[0] = rows[i].WKSHT_CD + ' Report';
        sql2 = "select RPT_REC_NUM,WKSHT_CD,LINE_NUM,CLMN_NUM,item myvalue from hospc_2013_DATA where RPT_REC_NUM like '"
            
                + rows[i].RPT_REC_NUM
                + "' and WKSHT_CD like '"
                + rows[i].WKSHT_CD
              // + "' union select RPT_REC_NUM,WKSHT_CD,LINE_NUM,CLMN_NUM,item myvalue from HCRIS.STRONG_HEADERS4_2013 where RPT_REC_NUM like '"
               // + rows[i].RPT_REC_NUM
                //+ "' and WKSHT_CD like '"
                //+ rows[i].WKSHT_CD
                
                + "' order by RPT_REC_NUM,WKSHT_CD,LINE_NUM,CLMN_NUM";
      console.log(sql2);
        connection2.query(sql2,    function(err, rows2) {


            mydir = baseDir + rows2[0].RPT_REC_NUM;

            if (!fs.existsSync(mydir)) {
                fs.mkdirSync(mydir);
            }


            var myfile2 = mydir
                    + '/' + tmpReportID
                    + '.csv';

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

                //console.log(thisReportID);
switch (thisReportID.substring(0,4))
{
   case "A000":
      thisReportHearedCSV = 'headers/templates/A000Header.csv';
      fs.writeFileSync('headers/inserts2/'+thisReportID+'.csv', fs.readFileSync('headers/inserts/'+thisReportID+'.csv'));
       break;
   case "A600":
       thisReportHearedCSV = 'headers/templates/A600Header.csv';
       fs.writeFileSync('headers/inserts2/'+thisReportID+'.csv', fs.readFileSync('headers/inserts/A600Header.csv'));
        break;
   case "A700":
       thisReportHearedCSV = 'headers/templates/A700Header.csv';
       fs.writeFileSync('headers/inserts2/'+thisReportID+'.csv', fs.readFileSync('headers/inserts/'+thisReportID+'.csv'));
       //fs.writeFileSync('headers/inserts/'+thisReportID+'.csv', fs.readFileSync(thisReportHearedCSV));
       break;
   case "A800":
       thisReportHearedCSV = 'headers/templates/A800Header.csv';
       fs.writeFileSync('headers/inserts2/'+thisReportID+'.csv', fs.readFileSync('headers/inserts/'+thisReportID+'.csv'));
       //fs.writeFileSync('headers/inserts/'+thisReportID+'.csv', fs.readFileSync(thisReportHearedCSV));
       break;
   case "A810":
       thisReportHearedCSV = 'headers/templates/A810Header.csv';
       fs.writeFileSync('headers/inserts2/'+thisReportID+'.csv', fs.readFileSync('headers/inserts/A810Header.csv'));
       //fs.writeFileSync('headers/inserts/'+thisReportID+'.csv', fs.readFileSync(thisReportHearedCSV));
       break;
   case "A820":
       thisReportHearedCSV = 'headers/templates/A820Header.csv';
       fs.writeFileSync('headers/inserts2/'+thisReportID+'.csv', fs.readFileSync('headers/inserts/'+thisReportID+'.csv'));
       // fs.writeFileSync('headers/inserts/'+thisReportID+'.csv', fs.readFileSync(thisReportHearedCSV));
       break;
   case "B000":
		thisReportHearedCSV = 'headers/templates/'+thisReportID+ '.csv';
		fs.writeFileSync('headers/inserts2/'+thisReportID+'.csv', fs.readFileSync('headers/inserts/'+thisReportID+'.csv'));
		//fs.writeFileSync('headers/inserts/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
		break;
   case "B100":
		thisReportHearedCSV = 'headers/templates/B100Header.csv';
		fs.writeFileSync('headers/inserts2/'+thisReportID+'.csv', fs.readFileSync('headers/inserts/'+thisReportID+'.csv'));
		//fs.writeFileSync('headers/inserts/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
		break;
   case "B200":
		thisReportHearedCSV = 'headers/templates/B200Header.csv';
		fs.writeFileSync('headers/inserts2/'+thisReportID+'.csv', fs.readFileSync('headers/inserts/'+thisReportID+'.csv'));
		//fs.writeFileSync('headers/inserts2/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
		break;
   case "C000":
	    thisReportHearedCSV = 'headers/templates/'+thisReportID+ '.csv';
	    fs.writeFileSync('headers/inserts2/'+thisReportID+'.csv', fs.readFileSync('headers/inserts/'+thisReportID+'.csv'));
		//fs.writeFileSync('headers/inserts/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
		break;
  case "C100":
		thisReportHearedCSV = 'headers/templates/C100Header.csv';
		fs.writeFileSync('headers/inserts2/'+thisReportID+'.csv', fs.readFileSync('headers/inserts/'+thisReportID+'.csv'));
		//fs.writeFileSync('headers/inserts/'+thisReportID+ '.csv', fs.readFileSync('headers/inserts/'+thisReportID+'.csv'));
		break;
  case "D200":
      thisReportHearedCSV = 'headers/templates/D200Header.csv';
      fs.writeFileSync('headers/inserts/'+thisReportID+'.csv', fs.readFileSync('headers/inserts/D200XXX.csv'));
       break;
   case "X300":
       thisReportHearedCSV = 'headers/templates/D300Header.csv';
     //  fs.writeFileSync('headers/inserts/'+thisReportID+'.csv', fs.readFileSync(thisReportHearedCSV));
       break;
   case "X400":
       thisReportHearedCSV = 'headers/templates/D400Header.csv';
      // fs.writeFileSync('headers/inserts/'+thisReportID+'.csv', fs.readFileSync(thisReportHearedCSV));
       break;
   case "G000":
       thisReportHearedCSV = 'headers/templates/G000Header.csv';
      fs.writeFileSync('headers/inserts2/'+thisReportID+'.csv', fs.readFileSync(thisReportHearedCSV));
        break;
    case "G100":
        thisReportHearedCSV = 'headers/templates/G100Header.csv';
        fs.writeFileSync('headers/inserts2/'+thisReportID+'.csv', fs.readFileSync(thisReportHearedCSV));
        break;
    case "G200":
        thisReportHearedCSV = 'headers/templates/G200Header.csv';
       fs.writeFileSync('headers/inserts2/'+thisReportID+'.csv', fs.readFileSync(thisReportHearedCSV));
        break;
    case "G300":
        thisReportHearedCSV = 'headers/templates/G300Header.csv';
        fs.writeFileSync('headers/inserts2/'+thisReportID+'.csv', fs.readFileSync(thisReportHearedCSV));
        break;
    case "H010":
        thisReportHearedCSV = 'headers/templates/H010Header.csv';
        fs.writeFileSync('headers/inserts2/'+thisReportID+'.csv', fs.readFileSync(thisReportHearedCSV));
        break;                     
    case "S000":
		thisReportHearedCSV = 'headers/templates/'+thisReportID+ '.csv';
		fs.writeFileSync('headers/inserts2/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
		break;
    case "S100":
		thisReportHearedCSV = 'headers/templates/S100Header.csv';
		fs.writeFileSync('headers/inserts2/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
		break;
    case "S200":
		thisReportHearedCSV = 'headers/templates/'+thisReportID+ '.csv';
		fs.writeFileSync('headers/inserts2/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
		break;
    default:
	   thisReportHearedCSV = 'NoHeader.csv';
	   
	   switch (thisReportID.substring(0,2))
       {
       case "A8":
     	  if(thisReportID.substring(2,1)=='3'){
     		  thisReportHearedCSV = 'headers/inserts/A83000.csv';
			//fs.writeFileSync('headers/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
			fs.writeFileSync('headers/inserts2/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
     	  }else{
     		  console.log("New Report Number " + thisReportID);
     	  }
 
          break;
          
          
       case "D0":
     	  //console.log("CHECK "+thisReportID.substring(thisReportID.length-1,thisReportID.length));
           
    	   if(thisReportID.substring(thisReportID.length-1,thisReportID.length)=='3'){
      		  thisReportHearedCSV = 'headers/templates/D0_3Header.csv';
      		  fs.writeFileSync('headers/inserts2/'+thisReportID+'.csv', fs.readFileSync('headers/inserts/D0_3Header.csv'));
        	  }
      	  if(thisReportID.substring(thisReportID.length-1,thisReportID.length)=='4'){
      		thisReportHearedCSV = 'headers/templates/D0_4Header.csv';
    		  fs.writeFileSync('headers/inserts2/'+thisReportID+'.csv', fs.readFileSync('headers/inserts/D0_4Header.csv'));
      	  }
      	  if(thisReportID.substring(thisReportID.length-1,thisReportID.length)=='5'){
      		thisReportHearedCSV = 'headers/templates/D0_5Header.csv';
    		  fs.writeFileSync('headers/inserts2/'+thisReportID+'.csv', fs.readFileSync('headers/inserts/D0_5Header.csv'));
      	  }
      	  break;
       case "D1":
    	   thisReportHearedCSV = 'headers/inserts/D1_1Header.csv';
			//fs.writeFileSync('headers/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
    	   fs.writeFileSync('headers/inserts2/'+thisReportID+'.csv', fs.readFileSync('headers/inserts/D1_1Header.csv'));
           break;
       case "D3":
    	   thisReportHearedCSV = 'headers/inserts/D300Header.csv';
			//fs.writeFileSync('headers/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
    	   fs.writeFileSync('headers/inserts2/'+thisReportID+'.csv', fs.readFileSync('headers/inserts/D300Header.csv'));
           break;
       case "D4":
    	   thisReportHearedCSV = 'headers/inserts/D400Header.csv';
			//fs.writeFileSync('headers/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
    	   fs.writeFileSync('headers/inserts2/'+thisReportID+'.csv', fs.readFileSync('headers/inserts/D400Header.csv'));
           break;
       case "D5":
      	  if(thisReportID.substring(thisReportID.length-1,thisReportID.length)=='1'){
      		  thisReportHearedCSV = 'headers/templates/D500001.csv';
 			//fs.writeFileSync('headers/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
 			fs.writeFileSync('headers/inserts2/'+thisReportID+ '.csv', fs.readFileSync('headers/inserts/D500001.csv'));
      	  }
      	  if(thisReportID.substring(thisReportID.length-1,thisReportID.length)=='2'){
      		  thisReportHearedCSV = 'headers/templates/D500002.csv';
 				//fs.writeFileSync('headers/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
      		fs.writeFileSync('headers/inserts2/'+thisReportID+ '.csv', fs.readFileSync('headers/inserts/D500002.csv'));
        	  }
      	  if(thisReportID.substring(thisReportID.length-1,thisReportID.length)=='3'){
      		  thisReportHearedCSV = 'headers/templates/D500003.csv';
 				//fs.writeFileSync('headers/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
      		fs.writeFileSync('headers/inserts2/'+thisReportID+ '.csv', fs.readFileSync('headers/inserts/D500003.csv'));
        	  }
      	  if(thisReportID.substring(thisReportID.length-1,thisReportID.length)=='4'){
      		  thisReportHearedCSV = 'headers/templates/D500004.csv';
 				//fs.writeFileSync('headers/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
      		fs.writeFileSync('headers/inserts2/'+thisReportID+ '.csv', fs.readFileSync('headers/inserts/D500004.csv'));
        	  }
      	  break;
        case "E1":
     	  if(thisReportID.substring(thisReportID.length-1,thisReportID.length)=='1'){
     		  thisReportHearedCSV = 'headers/inserts/E100001.csv';
			//fs.writeFileSync('headers/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
			fs.writeFileSync('headers/inserts2/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
     	  }
     	  if(thisReportID.substring(thisReportID.length-1,thisReportID.length)=='2'){
     		  thisReportHearedCSV = 'headers/inserts/E100002.csv';
			//fs.writeFileSync('headers/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
			fs.writeFileSync('headers/inserts2/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
     	  }
          break;
        case "E2":
     	  
     	  thisReportHearedCSV = 'headers/inserts/E200000.csv';
			//fs.writeFileSync('headers/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
			fs.writeFileSync('headers/inserts2/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
     	 
          break;
       case "E3":
     	  if(thisReportID.substring(thisReportID.length-1,thisReportID.length)=='1'){
     		  thisReportHearedCSV = 'headers/inserts/E300001.csv';
			//fs.writeFileSync('headers/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
			fs.writeFileSync('headers/inserts2/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
     	  }
     	  if(thisReportID.substring(thisReportID.length-1,thisReportID.length)=='2'){
     		  thisReportHearedCSV = 'headers/inserts/E300002.csv';
				//fs.writeFileSync('headers/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
				fs.writeFileSync('headers/inserts2/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
       	  }
     	  if(thisReportID.substring(thisReportID.length-1,thisReportID.length)=='3'){
     		  thisReportHearedCSV = 'headers/inserts/E300003.csv';
				//fs.writeFileSync('headers/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
				fs.writeFileSync('headers/inserts2/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
       	  }
     	  if(thisReportID.substring(thisReportID.length-1,thisReportID.length)=='4'){
     		  thisReportHearedCSV = 'headers/inserts/E300004.csv';
				//fs.writeFileSync('headers/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
				fs.writeFileSync('headers/inserts2/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
       	  }
     	  if(thisReportID.substring(thisReportID.length-1,thisReportID.length)=='5'){
     		  thisReportHearedCSV = 'headers/inserts/E300005.csv';
				//fs.writeFileSync('headers/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
				fs.writeFileSync('headers/inserts2/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
       	  }
     	  if(thisReportID.substring(thisReportID.length-1,thisReportID.length)=='6'){
     		  thisReportHearedCSV = 'headers/inserts/E300006.csv';
				//fs.writeFileSync('headers/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
				fs.writeFileSync('headers/inserts2/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
       	  }
     	  if(thisReportID.substring(thisReportID.length-1,thisReportID.length)=='7'){
     		  thisReportHearedCSV = 'headers/inserts/E300007.csv';
				//fs.writeFileSync('headers/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
				fs.writeFileSync('headers/inserts2/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
       	  }

          break;
       case "E4":
     	  
     	  thisReportHearedCSV = 'headers/inserts/E400000.csv';
			//fs.writeFileSync('headers/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
			fs.writeFileSync('headers/inserts2/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
       	                    	 
 		  break;
          
          
          
          
          
       
       		case "E0":
        	  //console.log("CHECK "+thisReportID.substring(thisReportID.length-1,thisReportID.length));
              
        	  if(thisReportID.substring(thisReportID.length-1,thisReportID.length)=='A'){
        		  	thisReportHearedCSV = 'headers/inserts/E00000A.csv';
					//fs.writeFileSync('headers/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
					fs.writeFileSync('headers/inserts2/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
        	  }
				

        	  
        	  if(thisReportID.substring(thisReportID.length-1,thisReportID.length)=='B'){
        		  thisReportHearedCSV = 'headers/inserts/E00000B.csv';
					//fs.writeFileSync('headers/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
					fs.writeFileSync('headers/inserts2/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
        	  }
        	  
             break;
          case "E1":
        	  if(thisReportID.substring(thisReportID.length-1,thisReportID.length)=='1'){
        		  thisReportHearedCSV = 'headers/inserts/E100001.csv';
				//fs.writeFileSync('headers/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
				fs.writeFileSync('headers/inserts2/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
        	  }
        	  if(thisReportID.substring(thisReportID.length-1,thisReportID.length)=='2'){
        		  thisReportHearedCSV = 'headers/inserts/E100002.csv';
				//fs.writeFileSync('headers/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
				fs.writeFileSync('headers/inserts2/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
        	  }
             break;
          case "E2":
        	  
        	  thisReportHearedCSV = 'headers/inserts/E200000.csv';
			//fs.writeFileSync('headers/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
			fs.writeFileSync('headers/inserts2/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
        	 
             break;
          case "E3":
        	  if(thisReportID.substring(thisReportID.length-1,thisReportID.length)=='1'){
        		  thisReportHearedCSV = 'headers/inserts/E300001.csv';
				//fs.writeFileSync('headers/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
				fs.writeFileSync('headers/inserts2/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
        	  }
        	  if(thisReportID.substring(thisReportID.length-1,thisReportID.length)=='2'){
        		  thisReportHearedCSV = 'headers/inserts/E300002.csv';
					//fs.writeFileSync('headers/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
					fs.writeFileSync('headers/inserts2/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
          	  }
        	  if(thisReportID.substring(thisReportID.length-1,thisReportID.length)=='3'){
        		  thisReportHearedCSV = 'headers/inserts/E300003.csv';
					//fs.writeFileSync('headers/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
					fs.writeFileSync('headers/inserts2/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
          	  }
        	  if(thisReportID.substring(thisReportID.length-1,thisReportID.length)=='4'){
        		  thisReportHearedCSV = 'headers/inserts/E300004.csv';
					//fs.writeFileSync('headers/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
					fs.writeFileSync('headers/inserts2/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
          	  }
        	  if(thisReportID.substring(thisReportID.length-1,thisReportID.length)=='5'){
        		  thisReportHearedCSV = 'headers/inserts/E300005.csv';
					//fs.writeFileSync('headers/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
					fs.writeFileSync('headers/inserts2/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
          	  }
        	  if(thisReportID.substring(thisReportID.length-1,thisReportID.length)=='6'){
        		  thisReportHearedCSV = 'headers/inserts/E300006.csv';
					//fs.writeFileSync('headers/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
					fs.writeFileSync('headers/inserts2/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
          	  }
        	  if(thisReportID.substring(thisReportID.length-1,thisReportID.length)=='7'){
        		  thisReportHearedCSV = 'headers/inserts/E300007.csv';
					//fs.writeFileSync('headers/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
					fs.writeFileSync('headers/inserts2/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
          	  }

             break;
          case "E4":
        	  
        	  thisReportHearedCSV = 'headers/inserts/E400000.csv';
				//fs.writeFileSync('headers/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
				fs.writeFileSync('headers/inserts2/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
          	                    	 
    		  break;
    		  
          case "H1":
        	  if(thisReportID.substring(thisReportID.length-1,thisReportID.length)=='1'){
        		  thisReportHearedCSV = 'headers/inserts/H100001.csv';
				//fs.writeFileSync('headers/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
				fs.writeFileSync('headers/inserts2/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
        	  }
        	  if(thisReportID.substring(thisReportID.length-1,thisReportID.length)=='2'){
        		  thisReportHearedCSV = 'headers/inserts/H100002.csv';
				//fs.writeFileSync('headers/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
				fs.writeFileSync('headers/inserts2/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
        	  }
             break;
             

          case "H2":
        	  if(thisReportID.substring(thisReportID.length-1,thisReportID.length)=='1'){
        		  thisReportHearedCSV = 'headers/inserts/H200001.csv';
				//fs.writeFileSync('headers/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
				fs.writeFileSync('headers/inserts2/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
        	  }
        	  if(thisReportID.substring(thisReportID.length-1,thisReportID.length)=='2'){
        		  thisReportHearedCSV = 'headers/inserts/H200002.csv';
				//fs.writeFileSync('headers/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
				fs.writeFileSync('headers/inserts2/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
        	  }
             break;
          case "H3":
        	  if(thisReportID.substring(thisReportID.length-1,thisReportID.length)=='1'){
        		  thisReportHearedCSV = 'headers/inserts/H300001.csv';
				//fs.writeFileSync('headers/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
				fs.writeFileSync('headers/inserts2/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
        	  }
        	  if(thisReportID.substring(thisReportID.length-1,thisReportID.length)=='2'){
        		  thisReportHearedCSV = 'headers/inserts/H300002.csv';
				//fs.writeFileSync('headers/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
				fs.writeFileSync('headers/inserts2/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
        	  }
             break;
          case "H4":
        	  if(thisReportID.substring(thisReportID.length-1,thisReportID.length)=='1'){
        		  thisReportHearedCSV = 'headers/inserts/H400001.csv';
				//fs.writeFileSync('headers/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
				fs.writeFileSync('headers/inserts2/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
        	  }
        	  if(thisReportID.substring(thisReportID.length-1,thisReportID.length)=='2'){
        		  thisReportHearedCSV = 'headers/inserts/H400002.csv';
				//fs.writeFileSync('headers/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
				fs.writeFileSync('headers/inserts2/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
        	  }
             break;
             
          case "H5":
        	  
        	  thisReportHearedCSV = 'headers/inserts/H500000.csv';
				//fs.writeFileSync('headers/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
				fs.writeFileSync('headers/inserts2/'+thisReportID+ '.csv', fs.readFileSync(thisReportHearedCSV));
          	                    	 
    		  break;	
             
          default:
       
       }
                            	  
                	   
                	   
                       //console.log(' **************** NO HEADER for Report '+ rows2[i].WKSHT_CD +'******************');

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
                            + '/'
                            + rows2[i].WKSHT_CD
                            + '.csv';
                    newFile = false;
                }

                if (tmpLineNUM != thisLineNUM) {
                    if (tmpLineNUM) {
                        tmpArray2[0] = 'Line(' + tmpLineNUM +')';
                        reportArray2[lineCount++] = tmpArray2;
                        tmpArray = new Array();
                        tmpArray2 = new Array();

                    }
                    tmpLineNUM = thisLineNUM;

                }

                tmpColumnNUM = parseInt(thisColumnNUM) / 100;
                tmpLine0[tmpColumnNUM + 1] = rows2[i].WKSHT_CD + '[' +thisColumnNUM + ']';
                if (prod){
                	tmpLine0[tmpColumnNUM + 1] = '________________';
                }

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
                //console.log('******************');
                //console.log(lines.length );
                //console.log(lines );
                //console.log('******************');
                var getLines = lines.length -1;
                for (var i = 0; i < getLines; i++) {
                    cells.push(lines[i].toString().split(','));
                }

                //data2 = createArray(lines.length,people[0].length);
                for (var i = 0; i < cells.length; i++) {

                    for (var j = 1; j < cells[i].length; j++) {
                        //data2[i][j] = cells[i][j];
                        //console.log(cells[i][j]);
                    }
                   // console.log('\n');
                }
                //console.log('\n');
                //console.log(cells);
                //console.log('___________________________');
                //console.log('\n');
                data2 = cells;
            }


            reportArray2[0] = tmpLine0;
            if(data2){
                data2 = data2.concat(reportArray2);
                reportArray2 = data2;
            }

            
            if (!prod) {
				var mycsv = reportArray2.map(function(d) {
					return JSON.stringify(d);
				}).join('\n').replace(/(^\[)|(\]$)/mg, '').replace(/null/mg,
						' ');
				fs.writeFile(myfile2, mycsv, function(err) {
					if (err)
						throw err;
					console.log(myfile2 + ' saved');
				});
			}
			sheetArray = sheetArray.concat(reportArray2);
            sheetArray = sheetArray.concat(spacerArray);


            reportArray2 = new Array();
            tmpLine0 = new Array();
            
            // write sheet report
            
            tmpFile2 = mydir + '/Sheet_' + tmpSheetLetter + '.csv';

           
            
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
			var tmpFile3 = mydir + '/PRODSheet_' + tmpSheetLetter + '.csv';

            var csv5 = sheetArrayPROD.map(function(d) {
                return JSON.stringify(d);
            }).join('\n').replace(/(^\[)|(\]$)/mg, '')
            .replace(/null/mg, ' ');

            //console.log(csv3);

            fs.writeFile(tmpFile3, csv5, function(err) {
                if (err)
                    throw err;
                console.log(tmpFile3 + ' saved');
            });
            
            
            

            
        }); // end connection2 callback

    } // end top for loop
	

}); // end connection callback
