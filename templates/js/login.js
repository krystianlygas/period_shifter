$(function() {
    $( "#submit_button" ).on('click', function( event ) {
        event.preventDefault();
        var _username = ($('.form-group #UserNameInput').val())
        var _pass = ($('.form-group #PasswordInput').val())
        if (_username.length != 0 && _pass.length !=0){
          // $.get( "index.html", function( data ) {
          //   $( ".result" ).html( data );
          //   alert( "Load was performed." );
          // });
      
                $.post(" http://localhost:8000/api-token-auth/ ",
                {
                  username: _username,
                  password: _pass
                }).done(function(data){
                  $.cookie('token', data.token)
                  $.cookie('id', data.id)
                  window.location.href = "/";
                }).fail(function() {
                  alert( "bad password or username" );
                })
    };
    });
  });