﻿window.listStart = 0;
window.listEnd = 20;
$(document).ready(function () {
    loadData();
    $("#addBtn").click(function () {
        addAssetFunction();
    });
    $("#updateBtn").click(function () {
        updateAssetFunction();
    });
    $("#inputFile").change(function () {
        loadModelImage(this);
    });
    $("#inputFile1").change(function () {
        loadModelImage(this);
    });
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
        $("#acListBody").append('<tr> \
						<td>' + jData[i].id + '</td>\
						<td>' + jData[i].name + '</td>\
						<td> <img src="../assets/' + jData[i].id + '.png?' + Date.now() + '" height=100> </td>\
						<td>'

						+ "<button class='btn btn-info' style='margin-right:20px;' onclick='updateDialog(this)'>Update </button>"
						+ "<button class='btn btn-danger' onclick='deleteAssetFunction(" + jData[i].id + ")'>Delete </button>" +

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
        data: { listAssets: "yes", type: $("#assetType").val() },
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
function addRequest(imgUri) {
    if ($("#assetName").val() == "") {
        alert("Enter Name");
        return;
    }
    $.ajax({
        url: "dataModel.aspx",
        type: "POST",
        data: {
            "addAsset": "true",
            "name": $("#assetName").val(),
            "type": $("#assetType").val(),
            "imageData": imgUri
        },
        success: function (data) {
            console.log(data);
            if (data == "success") {
                loadData();
                $("#addDialog").hide(500);
            }
            else {
                alert("Error occured: ", data);
            }
        },
        error: function (err) {
            console.log("er: ", err.responseText)
            
        }
    });
}
function deleteAssetFunction(id) {
    $.ajax({
        url: "dataModel.aspx",
        type: "POST",
        data: {
            "deleteAsset": true,
            id: id
        },
        success: function (data) {
            console.log(data);
            if (data == "success") {
                
                loadData();
            }
            else {
                alert("Error occured: ", data);
            }
        },
        error: function (err) {
            console.log("er: ", err)
        }
    });
}
function updateRequest(imgUri) {
    if ($("#name1").val() == "") {
        alert("Enter Name");
        return;
    }
    $.ajax({
        url: "dataModel.aspx",
        type: "POST",
        data: {
            "updateAsset": "true",
            "name": $("#name1").val(),
            "type": $("#type1").val(),
            "imageData": imgUri,
            "id": $("#id1").val()
        },
        success: function (data) {
            console.log(data);
            if (data == "success") {
                loadData();
                $("#updateDialog").hide(500);
            }
            else {
                alert("Error occured: "+ data);
            }
        },
        error: function (err) {
            console.log("er: ", err)
        }
    });
}

function addAssetFunction() {
    var r = new FileReader();
    r.readAsDataURL($("#inputFile")[0].files[0]);
    $(this).hide();
    r.onload = function (d) {
        addRequest(d.target.result.replace('data:image/png;base64,', ''));

    }
}
function loadModelImage(e) {
    var r = new FileReader();
    r.readAsDataURL(e.files[0]);
    r.onload = function (d) {
        $("#modelImage")[0].src = d.target.result;
        $("#modelImage1")[0].src = d.target.result;
    }
}

function updateAssetFunction() {
    if ($("#inputFile1").val()=="") {
        updateRequest("no");
        return;
    }
    var r = new FileReader();
    r.readAsDataURL($("#inputFile1")[0].files[0]);
    r.onload = function (d) {
        updateRequest(d.target.result.replace('data:image/png;base64,', ''));

    }
}