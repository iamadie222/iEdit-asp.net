<%@ Page Title="" Language="VB" MasterPageFile="~/Admin/Admin.master" AutoEventWireup="false" CodeFile="Cliparts.aspx.vb" Inherits="Admin_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
        <div class="table table-responsive">
        <div class="row">
					<div class="col">
						<button class="btn btn-primary" type="button" style="margin:10px;float:right;" onclick="addAccountDialog()">Add Clipart</button>
					</div>
				</div>
            <table class="table table-candenced">
					<thead style="background:white"> 
						<tr> 
							<th># </th>
							<th>Name</th>
							<th>Type</th>
							<th>Balance</th>
							<th width="20%">Action</th>
						</tr>
					</thead>
					<tbody id="acListBody"> 
					
					</tbody>
					
				</table>
          </div>
          <div class="container add-ac" id="addDialog" style="display:none"> 
			<div class="close-btn btn btn-primary" onclick="$(this).parent().hide(500)" >
				X
			</div>
			<table class="table">
				
				<tr>
					<td>Name: </td>
					<td><input type="text" name="name" class="form-control" id="assetName"> </td>
				</tr>
				<tr>
					<td>Image:</td>
					<td>
						<input type="file" name="file" class="form-control" />
					</td>
				</tr>
				
				<tr>
					<td></td>
                    <input type="hidden" name="type" value="clipart">
					<td><input type="button" name="add" value="Add " id="addBtn" class="btn btn-primary"> </td>
				</tr>
			</table>
		</div>
		<script src="../js/assetManage.js"></script>
</asp:Content>

