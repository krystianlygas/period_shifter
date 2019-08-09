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
        $('#f_name').val(`${data.first_name}`);
        $('#l_name').val(`${data.last_name}`);
        // alert("Data: " + data.first_name + data.last_name + "\nStatus: " + status);
      }).fail(function() {
        window.location.href = "login.html";
      });
      ($('#logout_btn')).on('click', function(event){
          if ($.cookie('token')){
          $.removeCookie('token')
          $.removeCookie('id')}
      })
      $('.author img').on('click',function(event){
        $('#newAvatar').click();
    })
    $('#newAvatar').change(function(e){
      let files = new FormData();
      files.append('profile_image', $('#newAvatar')[0].files[0]);
      $.ajax({
        url: `http://localhost:8000/users/${$.cookie('id')}/`,
        type: 'PATCH',
        contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
        processData: false, // NEEDED, DON'T OMIT THIS
        // Fetch the stored token from localStorage and set in the header
        data: files,
        headers: {"Authorization": `Token ${$.cookie('token')}`}
      }).done(function(data, status){
        $.notify({
          icon: "now-ui-icons ui-1_bell-53",
          message: "Image changed successfully"
        }, {
          type: 'success',
          timer: 8000,
          placement: {
            from: 'top',
            align: 'center'
          }
        });
        location.reload();
      });

  });
    $('.image img').on('click',function(event){
      $('#newImage').click();
    })
  });

  