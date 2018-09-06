Imports System.IO
Imports System.Data.SqlClient
Partial Class Admin_dataModel
    Inherits System.Web.UI.Page
    Dim db As New Database()
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        If Request.Params("listAssets") <> "" Then
            Dim type = Request.Params("type")
            Dim res = db.sqlQueryJson("select * from assets where type='" & type & "'")
            Response.Write(res)

        ElseIf Request.Params("userRegister") <> "" Then
            Dim name = Request.Params("name")
            Dim username = Request.Params("username")
            Dim email = Request.Params("email")
            Dim password = Request.Params("password")
            Dim res = db.dbNonQuery("insert into users (name,username,email,password) values ('" & name & "','" & username & "','" & email & "','" & password & "')")
            If res = 1 Then
                Response.Write("success")
            Else
                Response.Write("problemInserting")
            End If
        ElseIf Request.Params("userLogin") <> "" Then
            Dim username = Request.Params("username")
            Dim password = Request.Params("password")
            Dim rc = db.dbScalar("select password from users where username='" & username & "'")

            If rc <> "0" Then
                If rc = password Then
                    Session("userLogged") = db.dbScalar("select id from users where username='" & username & "'")
                    Response.Write("success")
                Else
                    Response.Write("passwordDoNotMatch")
                End If
            Else
                Response.Write("userNotFound")
            End If
        ElseIf Request.Params("userLogOut") <> "" Then
            Session("userLogged") = ""
            Response.Redirect("Default.aspx")

        ElseIf Request.Params("listCliparts") <> "" Then
            Dim res = db.sqlQueryJson("select * from assets where type='clipart'")
            Response.Write(res)
        ElseIf Request.Params("listFrames") <> "" Then
            Dim res = db.sqlQueryJson("select * from assets where type='frame'")
            Response.Write(res)
        ElseIf Request.Params("user_photo") <> "" Then
            Dim photoId = Request.Params("user_photo")
            Dim imageData = Request.Params("image")
            Dim photoName = Request.Params("user_photo_name")
            If photoId = -1 Then
                Dim nextId = db.nextId("user_photos", "id")
                photoId = nextId
            End If
            Dim idCount = db.dbScalar("select count(id) from user_photos where id=" & photoId)
            Dim res
            If idCount = 0 Then
                'Response.Write("insert into user_photos (id,name,user_id) values (" & photoId & ",'" & photoName & "'," & Session("userLogged") & ")")
                res = db.dbNonQuery("insert into user_photos (id,name,user_id) values (" & photoId & ",'" & photoName & "'," & Session("userLogged") & ")")

            Else
                'Response.Write("update user_photos set name='" & photoName & "' where id=" & photoId)
                res = db.dbNonQuery("update user_photos set name='" & photoName & "' where id=" & photoId)
            End If
            If res = 0 Then
                Response.Write("dbError")
                Return
            End If
            Dim path = HttpContext.Current.Server.MapPath("./user_photos")
            Dim filename = path & "/" & Str(photoId).Trim & ".png"
            If Not imageData = "" Then
                If Not WriteFile(filename, imageData) Then
                    Response.Write("fileerror")
                    Return
                End If
            End If
            Response.Write("success:" & photoId)
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
