
Partial Class Default5
    Inherits System.Web.UI.Page
    Dim db As New Database()
    Protected Sub Page_LoadComplete(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.LoadComplete
        Dim ds As New Data.DataSet()
        db.FillDs("select * from user_photos where user_id='" & Session("userLogged") & "'", "user_photos", ds)
        Dim tbl = ds.Tables("user_photos")
        For Each dr As Data.DataRow In tbl.Rows
            divPhotos.Text &= "<div class='col-lg-4 col-sm-6 portfolio-item'><div class='card h-100'><a href='#'><img class='card-img-top' src='user_photos/" & dr.Item("id") & ".png' alt=''></a><div class='card-body'><h4 class='card-title'><a href='#'>" & dr.Item("name") & "</a></h4></div></div></div>"
        Next

    End Sub
End Class
