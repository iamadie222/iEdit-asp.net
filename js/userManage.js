window.listStart = 0;
window.listEnd = 20;
$(document).ready(function () {
    loadData();
   
});

function addDialog() {
    $("#addDialog").show(500);
    $("#assetName").val("");
    $("#inputFile").val("");
    $("#modelImage")[0].src="";

}
function updateDialog(e) {
    allTds = $(e).parents("tr").eq(0).children();
    $("#id1").val(allTds[0].innerHTML);
    $("#name1").val(allTds[1].innerHTML);
    $("#modelImage1")[0].src = $(allTds[2]).find("img")[0].src;
    $("#updateDialog").show(500); 
}

function loadIntoTable(jData,start,end) {
    $("#acListBody").empty();
    for (var i = start; i < end; i++) {
        if(i>=jData.length){
            break;
        }
        var status ;
        if (jData[i].status == 1) {
            status = "<button class='btn btn-info' style='margin-right:20px;' data-status='"+jData[i].status+"' onclick='toggleRequest(this,"+jData[i].id+")' onmouseover='statusToggle(this)'>Active</button>";
        }
        else {
            status = "<button class='btn btn-info' style='margin-right:20px;' data-status='" + jData[i].status + "' onclick='toggleRequest(this," + jData[i].id + ")' onmouseover='statusToggle(this)'>Banned</button>";
        }
        $("#acListBody").append('<tr> \
						<td>' + jData[i].id + '</td>\
						<td>' + jData[i].name + '</td>\
						<td>' + jData[i].username + '</td>\
						<td>' + jData[i].email + '</td>\
						<td>' + status + '</td>\
						<td>'

						+ "<a class='btn btn-info' style='margin-right:20px;' href='UserProfile.aspx?username=" + jData[i].username + "' >View Profile</a>" +
						

						'</td>\
					</tr>');
    }
}

function dataNext() {
    if (listEnd + 20 < jData.length) {
        $(".page-item").removeClass("active");
        listEnd += 20;
        listStart += 20;
        loadIntoTable(jData, listStart, listEnd);
        $(".page-item").eq((listStart / 20)+1).addClass("active");
    }
}

function dataPrev() {
    if (listStart - 20 >= 0) {
        $(".page-item").removeClass("active");
        listEnd -= 20;
        listStart -= 20;
        loadIntoTable(jData, listStart, listEnd);
        $(".page-item").eq((listStart / 20)+1).addClass("active");
    }
}
function dataNum(num, e) {
    if (e) {
       
        $(".page-item").removeClass("active");
        $(e).parent().addClass("active");
    }
    if (num * 20 >= 0 || num * 20 < jData.length) {
        listStart = num * 20;
        listEnd = listStart + 20;
        loadIntoTable(jData, listStart, listEnd);
    }
}

function applyPagination(len) {
    $("#pagination").empty();
    $("#pagination").append('<li class="page-item"><a class="page-link" href="#" onclick="dataPrev()">Prev</a></li>');
    for (var i = 0; i < len; i += 20) {
        $("#pagination").append('<li class="page-item"><a class="page-link" href="#" onclick="dataNum(' + (i / 20) + ',this)">' + ((i / 20)+1) + '</a></li>');
    }
    $("#pagination").append('<li class="page-item"><a class="page-link" href="#" onclick="dataNext()">Next</a></li>');
    $(".page-item").eq((listStart / 20) + 1).addClass("active");
}

function loadData() {
    $.ajax({
        url: "dataModel.aspx",
        type: "POST",
        data: { listUsers: "yes" },
        success: function (data) {
            window.jData = JSON.parse(data);
            loadIntoTable(jData, listStart, listEnd);
            applyPagination(jData.length);
        },
        error: function () {
            alert("Problem with request");
        }
    });
}


function toggleRequest(e,id) {
    var st = parseInt($(e).attr("data-status"));
    $.ajax({
        url: "dataModel.aspx",
        type: "POST",
        data: { userStatusChange: id, status: (st + 1) % 2 },
        success: function (data) {
            if (data == "success") {
                loadData();
            }
            else {
                alert("cant change status");
                console.log(data);
            }
        },
        error: function () {
            alert("Problem with request");
        }
    });
}

function statusToggle(e) {
    e.onmouseout = statusToggleOut;
    var st = parseInt($(e).attr("data-status"));
    if (st == 0) {
        $(e).text("Active It");
    }
    else {
        $(e).text("Ban It");
    }
}

function statusToggleOut() {
    var st = parseInt($(this).attr("data-status"));
    if (st == 1) {
        $(this).text("Active");
    }
    else {
        $(this).text("Banned");
    }
}