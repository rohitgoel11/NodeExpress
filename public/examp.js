var columnDefs = [ {
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
	headerName : "Aalance",
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
	rowModelType : 'pagination'
};

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

	// do http request to get our sample data - not using any framework to keep the example self contained.
	var httpRequest = new XMLHttpRequest();
	httpRequest.open('GET', 'http://localhost:8080/spring3/staff', true);
	httpRequest.send();
	httpRequest.onreadystatechange = function() {
		if (httpRequest.readyState == 4 && httpRequest.status == 200) {
			var httpResponse = JSON.parse(httpRequest.responseText);
			setRowData1(httpResponse);
		}
	};
	gridOptions.api.sizeColumnsToFit();
});
