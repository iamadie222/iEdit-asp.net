<%@ Page Title="" Language="VB" MasterPageFile="~/Front.master" AutoEventWireup="false" CodeFile="iEditor.aspx.vb" Inherits="Default4" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<%
    If Request.Params("user_photo") = "" Then
        Response.Write("<script> window.user_photo=-1;window.user_photo_name='Untitled';</script>")
    Else
        Response.Write("<script> window.user_photo='" & Request.Params("user_photo") & "';window.user_photo_name='Untitled';</script>")
    End If
%>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
 <!-- Page Content -->
    <div class="container-flued ieditor-workspace">
		<div class="row">
			<div class="col-md-12 col-xs-12">
				<div class="edit-area" id="editArea">
					<div class="upload-btn">
						<input type="file" id="uploadPhoto" >
					</div>
					<svg id="mainSvg" viewBox="0 0 1000 1000" style="border:0px solid red"  preserveAspectRatio="none">
						
					</svg>
	
				</div>
				
			</div>
			<div class="side-panel" id="sidePanel">
				<div class="effect-area">
					<img src="assets/5.png" alt="" class="effect-img">
					<img src="assets/5.png" alt="" class="effect-img">
					<img src="assets/5.png" alt="" class="effect-img">
					<img src="assets/5.png" alt="" class="effect-img">
					<img src="assets/5.png" alt="" class="effect-img">
					<img src="assets/5.png" alt="" class="effect-img">
					<img src="assets/5.png" alt="" class="effect-img">
					<img src="assets/5.png" alt="" class="effect-img">
					<img src="assets/5.png" alt="" class="effect-img">
					<img src="assets/5.png" alt="" class="effect-img">
					<img src="assets/5.png" alt="" class="effect-img">
					<img src="assets/5.png" alt="" class="effect-img">
					<img src="assets/5.png" alt="" class="effect-img">
					<img src="assets/5.png" alt="" class="effect-img">
				</div>
				
			</div>
		</div>
		<div class="row">
			<div class="tool-area container-flued">
					<div class="tool " onclick="actionCrop()"><i class="fa fa-crop"></i><small class="d-none d-sm-block">Crop</small></div>
					<div class="tool " onclick="actionResize()"><i class="fa fa-expand-arrows-alt"></i><small class="d-none d-sm-block">Resize</small></div>
					<div class="tool " onclick="actionClipart()"><i class="fa fa-asterisk"></i><small class="d-none d-sm-block">Clipart</small></div>
					<div class="tool " onclick="actionFrame()"><i class="far fa-square"></i><small class="d-none d-sm-block">Frame</small></div>
					<div class="tool " onclick="actionText()"><i class="fa fa-font"></i><small class="d-none d-sm-block">Add Text</small></div>
					<div class="tool " onclick="actionDownload()"><i class="fa fa-download"></i><small class="d-none d-sm-block">Download</small></div>
					<div class="tool " onclick="actionSave()"><i class="fa fa-save"></i><small class="d-none d-sm-block">Save</small></div>
				<div class="float-right" id="sidePanelToggle" data-on=""><i class="fa fa-star" style="font-size:30px;"></i></div>
			</div>

         	
        
		</div>
	</div>
 



<script src="vendor/snap-svg/snap.svg.js"></script>

<script src="js/ieditor.js"></script>
</asp:Content>

