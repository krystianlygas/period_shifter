$(function() {
    $( "#submit_button" ).on('click', function( event ) {
        event.preventDefault();
        var _remember_me = $('.form-group #customCheck').prop( "checked" )
        var _emailInput = ($('.form-group #EmailInput').val())
        var _pass = ($('.form-group #PasswordInput').val())
        if (_emailInput.length != 0 && _pass.length !=0){
          // $.get( "index.html", function( data ) {
          //   $( ".result" ).html( data );
          //   alert( "Load was performed." );
          // });      
          
          
                $.post(" http://localhost:8000/api-token-auth/ ",
                {
                  username: _emailInput,
                  password: _pass
                }).done(function(data){
                  if (_remember_me){
                    var expire = new Date();
                    //set expiry to current time plus 15 minutes in milliseconds
                    expire.setTime(expire.getTime() + (14 *24 *60 * 60 * 1000)); 
                    $.cookie('token', data.token, {expires: expire})
                    $.cookie('id', data.id, {expires: expire})
                  } else {
                    // $.cookie('token', data.token)
                    $.cookie('token', data.token)
                    $.cookie('id', data.id)
                  }
                
                    window.location.href = "/";
                }).fail(function() {
                  $('.form-group #PasswordInput').after('<br><span class="error text-danger"><p>E-mail or password are wrong.</p></span>'); // Insert content after matched selection
                })
    };
    });
  });