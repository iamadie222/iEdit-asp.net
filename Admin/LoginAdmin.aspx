<%@ Page Language="VB" AutoEventWireup="false" CodeFile="LoginAdmin.aspx.vb" Inherits="Admin_LoginAdmin" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    </div>
    <asp:Label ID="lblUsername" runat="server" Text="Label"></asp:Label>
&nbsp;
        <asp:TextBox ID="txtAdminUsername" runat="server"></asp:TextBox>
    <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" 
        ControlToValidate="txtAdminUsername" ErrorMessage="Enter Username" 
        ForeColor="Red"></asp:RequiredFieldValidator>
    <p>
        <asp:Label ID="lblPassword" runat="server" Text="Label"></asp:Label>
&nbsp;
        <asp:TextBox ID="txtAdminPassword" runat="server" Height="27px" TextMode="Password"></asp:TextBox>
        <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" 
            ControlToValidate="txtAdminPassword" ErrorMessage="Field is required" 
            ForeColor="#FF3300"></asp:RequiredFieldValidator>
    </p>
    <asp:Button ID="btnAdminLogin" runat="server" Text="Login" />
    <p>
        <asp:Label ID="lblError" runat="server" ForeColor="#FF3300" Text=""></asp:Label>
    </p>
    </form>
</body>
</html>
