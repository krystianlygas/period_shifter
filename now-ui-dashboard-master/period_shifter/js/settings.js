$(function() {
    $.ajax({
        url: `http://localhost:8000/users/${$.cookie('id')}`,
        type: 'GET',
        // Fetch the stored token from localStorage and set in the header
        headers: {"Authorization": `Token ${$.cookie('token')}`}
      }).done(function(data, status){
        $('#navbarDropdownMenuLink span').text(`${data.first_name} ${data.last_name}`);
        
        $('.author img').attr('src',(data.profile_image));
        $('.image img').attr('src',(data.profile_image));
        $('.author .title').text(`${data.first_name} ${data.last_name}`);
        $('#email').val(`${data.email}`);
        
        // alert("Data: " + data.first_name + data.last_name + "\nStatus: " + status);
      }).fail(function() {
        window.location.href = "login.html";
      });
      ($('#logout_btn')).on('click', function(event){
          if ($.cookie('token')){
          $.removeCookie('token')
          $.removeCookie('id')}
      })
      
      $.ajax({
        url: `http://localhost:8000/periodplan/`,
        type: 'GET',
        // Fetch the stored token from localStorage and set in the header
        headers: {"Authorization": `Token ${$.cookie('token')}`}
      }).done(function(data, status){
        var pp_id = data.results[0].name;
        $('#name_of_plan').val(data.results[0].name);
        $('#placebo_tabs').val(data.results[0].number_of_placebo_tablets)
        $('#active_tabs').val(data.results[0].number_of_tablets)
        

        // alert("Data: " + data.first_name + data.last_name + "\nStatus: " + status);
      }).fail(function() {
        $.notify({
          icon: "now-ui-icons ui-1_bell-53",
          message: "Can not load data"
        }, {
          type: 'primary',
          timer: 8000,
          placement: {
            from: 'top',
            align: 'center'
          }
        });
      });
    
      $('#submit').on('click',function(ev){
          ev.preventDefault();
          var data_s = {'name': $('#name_of_plan').val(),
                  'number_of_placebo_tablets':$('#placebo_tabs').val(),
                  'number_of_tablets':$('#active_tabs').val() ,}

                  $.ajax({
                    url: `http://localhost:8000/periodplan/`,
                    type: 'GET',
                    // Fetch the stored token from localStorage and set in the header
                    headers: {"Authorization": `Token ${$.cookie('token')}`}
                  }).done(function(data, status){
                    var pp_id = data.results[0].id

                  $.ajax({
                    url: `http://localhost:8000/periodplan/${pp_id}/`,
                    type: 'PATCH',
                    data: data_s,
                    // Fetch the stored token from localStorage and set in the header
                    headers: {"Authorization": `Token ${$.cookie('token')}`}
                  }).done(function(data, status){

                    $.notify({
                      icon: "now-ui-icons ui-1_bell-53",
                      message: "Modified"
                    }, {
                      type: 'success',
                      timer: 8000,
                      placement: {
                        from: 'top',
                        align: 'center'
                      }
                    });
            
                    // alert("Data: " + data.first_name + data.last_name + "\nStatus: " + status);
                  }).fail(function() {
                    $.notify({
                      icon: "now-ui-icons ui-1_bell-53",
                      message: "Cant modified"
                    }, {
                      type: 'primary',
                      timer: 8000,
                      placement: {
                        from: 'top',
                        align: 'center'
                      }
                    });
                  });



      })
      })


  });

  