var columnDefs = [ {
	headerName : "#",
	width : 50,
	checkboxSelection : true,
	cellRenderer : function(params) {
		return params.node.id + 1;
	}
}, {
	headerName : "Id",
	field : "id",
	width : 150,
	sort : 'desc'
}, {
	headerName : "Index",
	field : "index",
	editable : true,
	width : 150,
	sort: 'desc'
}, {
	headerName : "Guid",
	field : "guid",
	width : 150
} ];

var gridOptions = {
	enableSorting : true,
	enableFilter : true,
	rowSelection : 'multiple',
	enableColResize : false,
	//paginationPageSize : 10,
	columnDefs : columnDefs,
	//rowModelType : 'pagination',
	suppressRowClickSelection: true,
	onRowSelected: rowSelectedFunc

};

function rowSelectedFunc(event){
	if(event.node.isSelected()){
		
	    $( "#DialogBox" ).dialog({
	    	title: "Edit Information",
	        resizable: false,
	        height: "auto",
	        width: 500,
	        show: {
	            effect: "blind",
	            duration: 500
	          },
	        modal: true,
	        closeOnEscape: false,
	        open: function(event, ui) { $(".ui-dialog-titlebar-close").hide();},
	        buttons: [
	                  {
	                    text: "Submit",
	                    icons: {
	                      primary: "ui-icon-heart"
	                    },
	                    click: function() {
	                      event.node.setSelected()==false;
	                      $(this).dialog('close');
	                    }
	                  },
	                  {
		                    text: "Cancel",
		                    icons: {
		                      primary: "ui-icon-heart"
		                    },
		                    click: function() {
		                      event.node.setSelected()==false;
		                      $(this).dialog('close');
		                    }
		                  }
	                ]
	    });
	    
	 		    document.getElementById('DialogBox').style.visibility = 'visible';
	    $("#Id").val(event.node.data._id);
	    $("#Index").val(event.node.data.index);
	    $("#Guid").val(event.node.data.guid);
	    $("#Balance").val(event.node.data.balance);
	    $("#Age").val(event.node.data.age);
	    $("#EyeColor").val(event.node.data.eyeColor);
	    $("#Phone").val(event.node.data.phone);
	    $("#Address").val(event.node.data.address);
	}
}

function createNewEntry(){
    $("#Id").val("");
    $("#Index").val("");
    $("#Guid").val("");
    $("#Balance").val("");
    $("#Age").val("");
    $("#EyeColor").val("");
    $("#Phone").val("");
    $("#Address").val("");
	 $( "#DialogBox" ).dialog({
		 	title: "Add Entry",
	        resizable: false,
	        height: "auto",
	        width: 500,
	        show: {
	            effect: "blind",
	            duration: 500
	          },
	        modal: true,
	        buttons: [
	                  {
	                    text: "Submit",
	                    icons: {
	                      primary: "ui-icon-heart"
	                    },
	                    click: function() {
	                      $(this).dialog('close');
	                    }
	                  },
	                  {
		                    text: "Cancel",
		                    icons: {
		                      primary: "ui-icon-heart"
		                    },
		                    click: function() {
		                      $(this).dialog('close');
		                    }
		                  }
	                ]
	    });
	    
	 		    document.getElementById('DialogBox').style.visibility = 'visible';
}


/*function onPageSizeChanged(newPageSize) {
	this.gridOptions.paginationPageSize = new Number(newPageSize);
	createNewDatasource();
}*/

var allOfTheData;

/*function createNewDatasource() {
	if (!allOfTheData) {
		// in case user selected 'onPageSizeChanged()' before the json was loaded
		return;
	}

	var dataSource = {
		//rowCount: ???, - not setting the row count, infinite paging will be used
		getRows : function(params) {
			// this code should contact the server for rows. however for the purposes of the demo,
			// the data is generated locally, a timer is used to give the experience of
			// an asynchronous call
			console.log('asking for ' + params.startRow + ' to '
					+ params.endRow);
			//console.log('allOfTheData object count: ' + _.size(allOfTheData.Data) );
			setTimeout(function() {
				// take a chunk of the array, matching the start and finish times
				var rowsThisPage = allOfTheData.slice(params.startRow,
						params.endRow);
				// see if we have come to the last page. if we have, set lastRow to
				// the very last row of the last page. if you are getting data from
				// a server, lastRow could be returned separately if the lastRow
				// is not in the current page.
				var lastRow = -1;
				if (allOfTheData.length <= params.endRow) {
					lastRow = allOfTheData.length;
				}
				console.log('rowsThisPage: ' + rowsThisPage + 'last row: '
						+ lastRow);
				params.successCallback(rowsThisPage, lastRow);
			}, 10);
		}
	};
	dataSource.rowCount = allOfTheData.length;
	gridOptions.api.setDatasource(dataSource);
}*/

function setRowData1(rowData) {
	allOfTheData = rowData;
	gridOptions.api.setRowData(rowData);
	//createNewDatasource();
}
var httpResponse1;
// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function() {
	var gridDiv = document.querySelector('#myGrid');
	new agGrid.Grid(gridDiv, gridOptions);
	var httpResponse;
	
	// do http request to get our sample data - not using any framework to keep the example self contained.
	var httpRequest = new XMLHttpRequest();
	httpRequest.open('GET', 'http://localhost:8080/spring3/staff', true);
	httpRequest.send();
	httpRequest.onreadystatechange = function() {
		if (httpRequest.readyState == 4 && httpRequest.status == 200) {
			 httpResponse = JSON.parse(httpRequest.responseText);
			 httpResponse1=httpResponse.mystaff;	
			 xyz(httpResponse1);
		}		
	
	};
	
	gridOptions.api.sizeColumnsToFit(); 	
});

function xyz(httpResponse1) {
	var myColumnDefs=[];
	 var deferreds = GetSomeDeferredStuff();
	 
	 $.when.apply($, deferreds).done(function() {
			$.each(arguments, function( index, value ) {
				myColumnDefs[index]=value[0];  
			});
			setRowData1(myColumnDefs);
			});
	 
	 
}

function GetSomeDeferredStuff() {
    var deferreds = [];

    var i = 1;
    for (i = 1; i <= 5000; i++) {
        var count = i;

        deferreds.push(
        		$.ajax( {
        			   url: 'http://localhost:8080/spring3/staff/' + i,
        			   data: {
        			      format: 'json'
        			   },
        			   type: 'GET'}));
    }
    return deferreds;
}







/*const async = require('async');
const request = require('request');

function httpGet(url, callback) {
	 console.log("1");
  const options = {
		  
    url :  url,
    json : true
  };
	 console.log("2");
  request(options,
    function(err, res, body) {
		 console.log("3");
      callback(err, body);
    }
  );
}

const urls= [];
for(i=0;i<5000;i++){
	urls.push("http://localhost:8080/spring3/staff/" + i);
}
async.map(urls, httpGet, function (err, res){
	 console.log("4");
  if (err) return console.log(err);
  console.log("5");
  console.log(res);
});*/