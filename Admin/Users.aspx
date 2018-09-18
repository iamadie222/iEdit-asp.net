<%@ Page Title="" Language="VB" MasterPageFile="~/Admin/Admin.master" AutoEventWireup="false" CodeFile="Users.aspx.vb" Inherits="Admin_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
        
       
            <table class="table table-candenced">
					<thead style="background:white"> 
						<tr> 
							<th># </th>
							<th>Name</th>
							<th>Username</th>
							<th>Email</th>
							<th>Status</th>
							
							<th width="20%">Action</th>
						</tr>
					</thead>
					<tbody id="acListBody"> 
					
					</tbody>
					
				</table>
                <div id="result"></div>
          
         
        <ul class="pagination pagination-sm" id="pagination">
			    <li class="page-item"><a class="page-link" href="#" onclick="dataPrev()">Previous</a></li>
		  
				
                
                <li class="page-item"><a class="page-link" href="#" onclick="dataNext()">Next</a></li>
		</ul>
		<script src="../js/userManage.js"></script>
</asp:Content>

