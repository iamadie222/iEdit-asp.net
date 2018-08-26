<%@ Page Title="" Language="VB" MasterPageFile="~/Admin/Admin.master" AutoEventWireup="false" CodeFile="Cliparts.aspx.vb" Inherits="Admin_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
        <div class="table table-responsive">
        <div class="row">
					<div class="col">
						<button class="btn btn-primary" type="button" style="margin:10px;float:right;" onclick="addDialog()">Add Clipart</button>
					</div>
				</div>
            <table class="table table-candenced">
					<thead style="background:white"> 
						<tr> 
							<th># </th>
							<th>Name</th>
							<th>Image</th>
							
							<th width="20%">Action</th>
						</tr>
					</thead>
					<tbody id="acListBody"> 
					
					</tbody>
					
				</table>
                <div id="result"></div>
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
						<input type="file" name="file" class="form-control" id="inputFile" />
                        <br /><br />
                        <img src=""  id="modelImage" height=100 width=100/>
					</td>
				</tr>
				
				<tr>
					<td></td>
                    <input type="hidden" name="type" value="clipart" id="assetType">
					<td><input type="button" name="add" value="Submit" id="addBtn" class="btn btn-primary"> </td>
				</tr>
			</table>
		</div>


        <div class="container add-ac" id="updateDialog" style="display:none"> 
			<div class="close-btn btn btn-primary" onclick="$(this).parent().hide(500)" >
				X
			</div>
			<table class="table">
				
				<tr>
					<td>Name: </td>
					<td><input type="text" name="name" class="form-control" id="name1"> </td>
				</tr>
				<tr>
					<td>Image:</td>
					<td>
						<input type="file" name="file" class="form-control" id="inputFile1" />
                        <br /><br />
                        <img src=""  id="modelImage1" height=100 width=100/>
					</td>
				</tr>
				
				<tr>
					<td></td>
                    <input type="hidden" name="id" value="clipart" id="id1">
                    <input type="hidden" name="type" value="clipart" id="type1">
					<td><input type="button" name="add" value="Update" id="updateBtn" class="btn btn-primary"> </td>
				</tr>
			</table>
		</div>
		<script src="../js/assetManage.js"></script>
</asp:Content>

