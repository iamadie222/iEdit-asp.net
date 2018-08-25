
$(document).ready(function () {
    //loadData();
    $("#addBtn").click(function () {
        addRequest();
    });
    $("#updateBtn").click(function () {
        updateRequest();
    });
});

function addAccountDialog() {
    $("#addDialog").show(500);
}


function loadData() {
    $.ajax({
        url: "dataModel.aspx",
        type: "POST",
        data: { all_accounts: "yes" },
        success: function (data) {
            var jData = JSON.parse(data);
            $("#acListBody").empty();
            for (i in jData) {
                $("#acListBody").append('<tr> \
						<td>' + jData[i].id + '</td>\
						<td>' + jData[i].ac_name + '</td>\
						<td>' + jData[i].ac_type + '</td>\
						<td>' + jData[i].ac_balance + '</td>\
						<td>'

						+ "<button class='btn btn-info' style='margin-right:20px;' onclick='updateAccountFunction(this)'>Update </button>"
						+ "<button class='btn btn-danger' onclick='deleteAccountRequest(" + jData[i].id + ")'>Delete </button>" +

						'</td>\
					</tr>');
            }

        },
        error: function () {
            alert("Problem with request");
        }
    });
}
function addRequest() {
    if ($("#acName").val() == "") {
        alert("Enter Name");
        return;
    }
    $.ajax({
        url: "dataModel.aspx",
        type: "POST",
        data: {
            "ac-add": "true",
            "ac-name": $("#acName").val(),
            "ac-type": $("#acType").val(),
            "ac-balance": $("#acBalance").val()
        },
        success: function (data) {
            console.log(data);
            if (data == "success") {
                //alert("Account Added Successfully");
                loadAccounts();
                $("#addAcDialog").hide(500);
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
function deleteAccountRequest(id) {
    $.ajax({
        url: "dataModel.aspx",
        type: "POST",
        data: {
            "ac-delete": true,
            id: id
        },
        success: function (data) {
            console.log(data);
            if (data == "success") {
                //alert("Account Deleted Successfully");
                loadAccounts();
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
function updateAccountRequest() {
    window.updateAccount = false;
    if ($("#acName").val() == "") {
        alert("Enter Name");
        return;
    }
    $.ajax({
        url: "dataModel.aspx",
        type: "POST",
        data: {
            "ac-update": "true",
            "ac-name": $("#acName").val(),
            "ac-type": $("#acType").val(),
            "id": window.id,
            "ac-balance": $("#acBalance").val()
        },
        success: function (data) {
            console.log(data);
            if (data == "success") {
                //alert("Account Added Successfully");
                loadAccounts();
                $("#addAcDialog").hide(500);
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
function updateAccountFunction(e) {
    window.e = e;
    allTds = $(e).parents("tr").eq(0).children();
    window.updateAccount = true;
    window.id = parseInt(allTds[0].innerHTML);
    $("#acName").val(allTds[1].innerHTML);
    $("#acType").val(allTds[2].innerHTML);
    $("#acBalance").val(allTds[3].innerHTML);
    $("#addAcDialog").show(500);
}
