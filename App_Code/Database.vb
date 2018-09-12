﻿Imports Microsoft.VisualBasic
Imports System.Data.SqlClient
Imports System.Data
Public Class Database
    Dim con As New SqlConnection("Data Source=.\SQLEXPRESS;AttachDbFilename='|DataDirectory|\Database.mdf';Integrated Security=True;User Instance=True")

    Function dbNonQuery(ByVal query As String) As Integer
        Dim cmd As New SqlCommand(query, con)

        Dim res = -1
        Try
            con.Open()
            res = cmd.ExecuteNonQuery()
            con.Close()
            Return res
        Catch ex As Exception

            MsgBox(ex.Message)
            Return 0
        Finally
            con.Close()
        End Try
        Return res
    End Function
    Function dbScalar(ByVal query As String) As String
        Dim cmd As New SqlCommand(query, con)
        Dim res = -1
        Try
            con.Open()
            res = cmd.ExecuteScalar()
            con.Close()
            Return res
        Catch ex As Exception
            Return res
        Finally
            con.Close()
        End Try
        Return res
    End Function
    Sub FillDs(ByVal query As String, ByVal tbl As String, ByRef ds As Data.DataSet)
        Dim cmd As New SqlCommand(query, con)
        Dim da As New SqlDataAdapter(cmd)
        da.Fill(ds, tbl)
    End Sub
    Function sqlQueryJson(ByVal query As String) As String
        Dim ds As New Data.DataSet
        Dim cmd As New SqlCommand(query, con)
        Dim da As New SqlDataAdapter(cmd)
        da.Fill(ds)
        Return GetJson(ds.Tables(0))
    End Function
    Private Function GetJson(ByVal dt As DataTable) As String
        Dim Jserializer As New System.Web.Script.Serialization.JavaScriptSerializer()
        Dim rowsList As New List(Of Dictionary(Of String, Object))()
        Dim row As Dictionary(Of String, Object)
        For Each dr As DataRow In dt.Rows
            row = New Dictionary(Of String, Object)()
            For Each col As DataColumn In dt.Columns
                row.Add(col.ColumnName, dr(col))
            Next
            rowsList.Add(row)
        Next
        Return Jserializer.Serialize(rowsList)
    End Function
    Function dbReader(ByVal query As String) As SqlDataReader
        Dim cmd As New SqlCommand(query, con)
        Dim res As SqlDataReader
        Try
            con.Open()
            res = cmd.ExecuteReader()

            Return res
        Catch ex As Exception
            MsgBox(ex.Message)
            Return res
        Finally
            con.Close()
        End Try
        Return res
    End Function
    Function nextId(ByVal table As String, ByVal col As String) As Integer
        Dim rs = dbScalar("select max(" & col & ") from " & table)
        If Not IsDBNull(rs) Then
            Return Val(rs) + 1
        End If
        Return 0
    End Function
End Class
