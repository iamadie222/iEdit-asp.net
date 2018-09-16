﻿<%@ Page Title="" Language="VB" MasterPageFile="~/Front.master" AutoEventWireup="false" CodeFile="Login.aspx.vb" Inherits="Default2" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">


<div class="container">
	<h1 class="mt-4 mb-3">Login to iEdit
        <small></small>
      </h1>
	<div class="row">
        <div class="col-lg-8 mb-4">
          <form id="formLogin" method="POST">
            <div class="control-group form-group">
              <div class="controls">
                <label>Username:</label>
                <input type="text" class="form-control" name="username">
                
              </div>
            </div>
            <div class="control-group form-group">
              <div class="controls">
                <label>Password:</label>
                <input type="password" class="form-control" name="password">
              </div>
            </div>
            
            
            <!-- For success/fail messages -->
            <button type="submit" class="btn btn-primary">Login</button>
          </form>
        </div>

      
	</div>
</div>
      

<script type="text/javascript" src="js/jquery.validate.min.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
        $("#formLogin").validate({
            rules: {
                username: {
                    required: true,
                    minlength: 8
                },
                password: {
                    required: true,
                    minlength: 8
                }

            },
            messages: {
                username: {
                    required: 'Username is Required',
                    minlength: "Username must be atleast 8 latters"
                },
                password: {
                    required: "Password is Required",
                    minlength: "Password must be atleast 8 latters"
                }
            }
        });
        $("#formLogin").submit(function () {
            var frm = this;

            if ($("#formLogin").valid()) {
                $.ajax({
                    url: "dataModel.aspx",
                    type: "POST",
                    data: {
                        userLogin: "true",
                        username: frm.elements.username.value,
                        password: frm.elements.password.value
                    },
                    success: function (data) {
                        console.log(data)
                        if (data == "success") {
                            notie.alert({ text: "Successfully Logged In.....", type: 1 });
                            setTimeout(function () { window.location.assign("MyGallery.aspx"); }, 1000)
                        }
                        else {
                            if (data == "userNotFound") {
                                notie.alert({ text: "User dose not exist with Username", type: 3 });
                            }
                            else if (data == "passwordDoNotMatch") {
                                notie.alert({ text: "You have entered wrong password. ", type: 3 });
                            }
                            else {
                                notie.alert({ text: "Unexpected Error.", type: 3 });
                            }
                        }
                    },
                    error: function (err) {
                        document.write(err.responseText);
                        console.log(err.responseText);
                    }
                });
            }
            return false;
        });
    });
</script>
</asp:Content>

