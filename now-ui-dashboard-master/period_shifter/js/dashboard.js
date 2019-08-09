$(function() {
    $.ajax({
        url: `http://localhost:8000/users/${$.cookie('id')}`,
        type: 'GET',
        // Fetch the stored token from localStorage and set in the header
        headers: {"Authorization": `Token ${$.cookie('token')}`}
      }).done(function(data, status){
        $('#navbarDropdownMenuLink span').text(`${data.first_name} ${data.last_name}`);
        $('.img-profile').attr('src',(data.profile_image))
        // alert("Data: " + data.first_name + data.last_name + "\nStatus: " + status);
      }).fail(function() {
        window.location.href = "login.html";
      });
      ($('#logout_btn')).on('click', function(event){
          if ($.cookie('token')){
          $.removeCookie('token')
          $.removeCookie('id')}
      })
  });

  