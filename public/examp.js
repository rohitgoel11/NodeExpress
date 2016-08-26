var columnDefs = [ {
	headerName : "#",
	width : 50,
	checkboxSelection : true,
	cellRenderer : function(params) {
		return params.node.id + 1;
	}
}, {
	headerName : "Id",
	field : "_id",
	width : 150,
	sort : 'desc'
}, {
	headerName : "Index",
	field : "index",
	editable : true,
	width : 150
}, {
	headerName : "Guid",
	field : "guid",
	width : 150
}, {
	headerName : "Balance",
	field : "balance",
	width : 150
}, {
	headerName : "Age",
	field : "age",
	width : 150
}, {
	headerName : "EyeColor",
	field : "eyeColor",
	width : 150
}, {
	headerName : "Phone",
	field : "phone",
	width : 150
}, {
	headerName : "Address",
	field : "address",
	width : 150
} ];

var gridOptions = {
	enableSorting : true,
	enableFilter : true,
	rowSelection : 'multiple',
	enableColResize : false,
	paginationPageSize : 10,
	columnDefs : columnDefs,
	rowModelType : 'pagination',
	suppressRowClickSelection: true,
	onRowSelected: rowSelectedFunc,

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


function onPageSizeChanged(newPageSize) {
	this.gridOptions.paginationPageSize = new Number(newPageSize);
	createNewDatasource();
}

var allOfTheData;

function createNewDatasource() {
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
}

function setRowData1(rowData) {
	allOfTheData = rowData;
	createNewDatasource();
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function() {
	var gridDiv = document.querySelector('#myGrid');
	new agGrid.Grid(gridDiv, gridOptions);
	var myColumnDefs = new Object();
	var httpResponse;
	var httpResponse1;
	// do http request to get our sample data - not using any framework to keep the example self contained.
	var httpRequest = new XMLHttpRequest();
	httpRequest.open('GET', 'http://localhost:8080/spring3/staff', true);
	httpRequest.send();
	httpRequest.onreadystatechange = function() {
		if (httpRequest.readyState == 4 && httpRequest.status == 200) {
			 httpResponse = JSON.parse(httpRequest.responseText);
			 httpResponse1=httpResponse.mystaff;	
		}
		setTimeout(xyz,2000);
	};
	gridOptions.api.sizeColumnsToFit(); 	
});

function xyz() {
	for ( var i=0 ; i < 1; i++) {
		var httpRequest1 = new XMLHttpRequest();
		httpRequest1.open('GET', 'http://localhost:8080/spring3/staff/' + httpResponse1[i].index, true);
		httpRequest1.send();
		httpRequest1.onreadystatechange = function() {
			if (httpRequest1.readyState == 4 && httpRequest1.status == 200) {
				var httpMyData = JSON.parse(httpRequest1.responseText);
				myColumnDefs[i]=httpMyData;
			}
	}
	}
	  //your code to be executed after 1 second



setRowData1(myColumnDefs); }
