
Partial Class Admin_dataModel
    Inherits System.Web.UI.Page
    Dim db As New Database()
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        If Request.Params("listAssets") <> "" Then
            Dim type = Request.Params("type")
            Dim res = db.sqlQueryJson("select * from assets where type='" & type & "'")
            Response.Write(res)
        ElseIf Request.Params("addAsset") <> "" Then
            Dim type = Request.Params("type")
            Dim name = Request.Params("name")
            Dim fileData = Request.Params("fileData")
            Dim res = db.dbNonQuery("insert into assets (name,type) values ('" & name & "','" & type & "')")
            If res Then
                Response.Write("success")
            Else
                Response.Write("error")
            End If

        ElseIf Request.Params("updateAsset") <> "" Then
            'Response.Write("updating")
            Dim type = Request.Params("type")
            Dim name = Request.Params("name")
            Dim fileData = Request.Params("fileData")
            Dim id = Request.Params("id")
            Dim res = db.dbNonQuery("update assets set name='" & name & "', type='" & type & "' where id=" & id)
            If res Then
                Response.Write("success")
            Else
                Response.Write("error")
            End If
        ElseIf Request.Params("deleteAsset") <> "" Then
            Dim id = Request.Params("id")
            Dim res = db.dbNonQuery("delete from assets where id=" & id)
            If res Then
                Response.Write("success")
            Else
                Response.Write("error")
            End If
        End If
    End Sub
End Class
