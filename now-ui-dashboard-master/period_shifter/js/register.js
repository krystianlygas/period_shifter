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
                  $.notify({
                    icon: "now-ui-icons ui-1_bell-53",
                    message: "Success"
                  }, {
                    type: 'success',
                    timer: 8000,
                    placement: {
                      from: 'top',
                      align: 'center'
                    }
                  });
                  $.ajax({
                    dataType: 'json',
                    url: `http://localhost:8000/periodplan/`,
                    type: 'POST',
                    data: {name: "default",
                    "number_of_tablets": 0,
                    "number_of_placebo_tablets": 0,},
                    // Fetch the stored token from localStorage and set in the header
                    headers: {"Authorization": `Token ${data.token}`},
                    }).done(function(data){
                      $.notify({
                        icon: "now-ui-icons ui-1_bell-53",
                        message: "Created default period plan"
                      }, {
                        type: 'success',
                        timer: 8000,
                        placement: {
                          from: 'top',
                          align: 'center'
                        }
                      });

                    $.cookie('token', data.token)
                    $.cookie('id', data.id)
                    window.location.href = "dashboard.html";
                  }).fail(function(){
                    $.notify({
                      icon: "now-ui-icons ui-1_bell-53",
                      message: "Didnt add period plan"
                    }, {
                      type: 'primary',
                      timer: 8000,
                      placement: {
                        from: 'top',
                        align: 'center'
                      }
                    });
                  })
  
                }).fail(function() {
                  $.notify({
                    icon: "now-ui-icons ui-1_bell-53",
                    message: "E-mail adress or password are invalid"
                  }, {
                    type: 'primary',
                    timer: 8000,
                    placement: {
                      from: 'top',
                      align: 'center'
                    }
                  });
                })
             
        }).fail(function() {
          $.notify({
            icon: "now-ui-icons ui-1_bell-53",
            message: "Something wrong"
          }, {
            type: 'primary',
            timer: 8000,
            placement: {
              from: 'top',
              align: 'center'
            }
          });
          })
    } else {
      $.notify({
        icon: "now-ui-icons ui-1_bell-53",
        message: "Inputs are invalid"
      }, {
        type: 'primary',
        timer: 8000,
        placement: {
          from: 'top',
          align: 'center'
        }
      });
    }
  });
});



    

