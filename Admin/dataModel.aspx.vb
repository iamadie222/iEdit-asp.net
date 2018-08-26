Imports System.IO

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
            Dim fileData = Request.Params("imageData")
            Dim nextId = db.nextId("assets", "id")
            Dim path = HttpContext.Current.Server.MapPath("../assets")
            Dim filename = path & "/" & Str(nextId).Trim & ".png"
            If Not WriteFile(filename, fileData) Then
                Response.Write("fileerror")
                Return
            End If
            Dim res = db.dbNonQuery("insert into assets (id,name,type) values (" & nextId & ",'" & name & "','" & type & "')")
            If res Then
                Response.Write("success")
            Else
                Response.Write("error")
            End If

        ElseIf Request.Params("updateAsset") <> "" Then
            Dim type = Request.Params("type")
            Dim name = Request.Params("name")
            Dim fileData = Request.Params("imageData")
            Dim id = Request.Params("id")
            Dim path = HttpContext.Current.Server.MapPath("../assets")
            Dim filename = path & "/" & id.Trim & ".png"
            If Not fileData = "no" Then
                If Not WriteFile(filename, fileData) Then
                    Response.Write("fileerror")
                    Return
                End If
            End If

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


    Function WriteFile(ByVal filename As String, ByVal fileData As String) As Boolean
        Try
            Dim fs As New FileStream(filename, FileMode.Create)
            Dim br As New BinaryWriter(fs)
            Dim data = Convert.FromBase64String(fileData)
            br.Write(data)
            br.Close()
            Return True
        Catch ex As Exception
            MsgBox(ex.Message)
            Return False
        End Try
    End Function

End Class
