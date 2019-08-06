$(function() {
    $.get('http://localhost:8000/users/'+$.cookie('id')).done(function(data, status){
        $('#userDropdown span').text(`${data.first_name} ${data.last_name}`);
        // alert("Data: " + data.first_name + data.last_name + "\nStatus: " + status);
        $.get(data.userprofile).done(function(data,status){
            $('.img-profile').attr('src',(data.profile_image))
        })
      }).fail(function() {
        window.location.href = "login.html";
      });
      ($('.modal-footer .btn')).on('click', function(event){
          if ($.cookie('token')){
          $.removeCookie('token')
          $.removeCookie('id')}
      })
  });