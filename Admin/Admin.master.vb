
Partial Class Admin_Admin
    Inherits System.Web.UI.MasterPage

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        If (Session("adminLogged") = "") Then
            Response.Redirect("LoginAdmin.aspx")
        End If
    End Sub
End Class

