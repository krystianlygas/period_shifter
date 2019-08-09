$(function() {
    function validateEmail($email) {
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailReg.test( $email );
      }
    $( "#submit_button" ).on('click', function( event ) {
        event.preventDefault();
        var _first_name = $('#FirstName').val()
        var _last_name = $('#LastName').val()
        var _email_adress = ($('#InputEmail').val())
        var _pass_one = ($('#InputPassword').val())
        var _pass_two = ($('#RepeatPassword').val())
        if (_pass_one===_pass_two && _pass_one.length > 6 && _first_name.length != 0 && _last_name.length != 0 && validateEmail(_email_adress) ) {
            $.post(" http://localhost:8000/users/ ",
                {
                  email: _email_adress,
                  first_name: _first_name,
                  last_name: _last_name,
                  password: _pass_one
                }).done(function(data){
                    $.post(" http://localhost:8000/api-token-auth/ ",
                {
                  username: _email_adress,
                  password: _pass_one
                }).done(function(data){
                    $.cookie('token', data.token)
                    $.cookie('id', data.id)
                    window.location.href = "/";
                }).fail(function() {
                  alert( "Bad password or username" );
                })
             
        }).fail(function() {
            alert('someting wrong')
          })
    } else {
        console.log($('.form-group #submit_button'))
        $('#submit_button').before('<br><span class="error text-danger"><p>Something wrong...</p></span>');
    }
  });
});



    
