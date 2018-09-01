$(document).ready(function () {
    $("#btn_Exit").click(function(){
        localStorage.removeItem('LocalUser');
        window.location.assign('trang-chu.html');
    })
    var ItemLocal = JSON.parse(localStorage.getItem('LocalUser'));
    $('#nav_user_name').html('Chào '+ItemLocal.HoTen);
})