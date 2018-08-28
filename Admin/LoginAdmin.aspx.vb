
Partial Class Admin_LoginAdmin
    Inherits System.Web.UI.Page
    Dim db As New Database()
    Protected Sub btnAdminLogin_Click(ByVal sender As Object, ByVal e As System.EventArgs) Handles btnAdminLogin.Click
        Dim res = db.dbScalar("select count(id) from admins where username='" & txtAdminUsername.Text & "' and password='" & txtAdminPassword.Text & "'")
        If res = "0" Then
            lblError.Text = "Username or password do not match"
        Else
            Session("adminLogged") = txtAdminUsername.Text
            Response.Redirect("Default.aspx")
        End If

    End Sub
End Class
