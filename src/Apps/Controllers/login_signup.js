var THONG_BAO_NHAP_HO_TEN = "Vui lòng kiểm tra lại nhập Họ Tên!";
var THONG_BAO_NHAP_RePASS = "Password Nhập lại không trùng. Vùi lòng kiểm tra lại!";
var THONG_BAO_NHAP_EMAIL = "Vui lòng kiểm tra lại nhập Email!";
var THONG_BAO_NHAP_SDT = "Vui lòng kiểm tra lại nhập số!";
var ID_MIN = 4;
var ID_TB_MIN_MAX = "Vui lòng nhập Tài khoản từ " + ID_MIN + " ký tự trở lên!";
var PASS_MIN = 6;
var PASS_TB_MIN_MAX = "Vui lòng nhập Mật Khẩu từ " + PASS_MIN + " ký tự trở lên!";

$(document).ready(function () {
    var dangNhapSV = new DangNhapServices();
    var dangKySV = new DangKyServices();

    $("#btn_Login").bind("click", DangNhap);
    $('#login input').bind("keypress", function (e) {
        if (e.which == 13) {
            $('#btn_Login').trigger("click");
        }
    })


    $('#btn_Signup').bind("click", DangKy);
    $('#signup input').bind("keypress", function (e) {
        if (e.which == 13) {
            $('#btn_Signup').trigger("click");
        }
    })
    
    function DangNhap() {
        var taiKhoan = $('#txtTaiKhoan_login').val();
        var matKhau = $('#txtMatKhau_login').val();

        dangNhapSV.AjaxDangNhap(taiKhoan, matKhau)
            .done(function (kq) {
                if (kq != "failed to login") {

                    let timerInterval
                    swal({
                        type: 'success',
                        title: 'Đăng nhập thành công !.',
                        showConfirmButton: false,
                        timer: 1000,
                        onOpen: function(){

                        },
                        onClose: function(){
                            clearInterval(timerInterval)
                        }
                    }).then(function(result){
                        if (
                            // Read more about handling dismissals
                            result.dismiss === swal.DismissReason.timer
                        ) {

                            localStorage.setItem('LocalUser', JSON.stringify(kq[0]));
                            window.location.assign('trang-chu.html');

                        }
                    })
                    // let timerInterval
                    // swal({
                    //     type: 'success',
                    //     title: 'Đăng nhập thành công !.',
                    //     showConfirmButton: false,
                    //     timer: 1000,
                    //     onOpen: () => {

                    //     },
                    //     onClose: () => {
                    //         clearInterval(timerInterval)
                    //     }
                    // }).then((result) => {
                    //     if (
                    //         // Read more about handling dismissals
                    //         result.dismiss === swal.DismissReason.timer
                    //     ) {

                    //         localStorage.setItem('LocalUser', JSON.stringify(kq[0]));
                    //         window.location.assign('trang-chu.html');

                    //     }
                    // })

                }
                else {
                    swal({
                        type: 'error',
                        title: 'Vui lòng kiểm tra lại Tài Khoản và Mật Khẩu !.',
                        showConfirmButton: false,
                        timer: 1800,
                        animation: false,
                        customClass: 'animated tada'

                    })
                }
            })
            .fail(function (kq) {
            })
    }

    function DangKy() {
        var hoTen = $('#txtHoTen_signup').val();
        var email = $('#txtEmail_signup').val();
        var id = $('#txtId_signup').val();
        var password = $('#txtPassword_signup').val();

        if (KiemTraDuLieu()) {
            var nguoiDung = new NguoiDung(id, password, hoTen, email, "", "HV");
            dangKySV.AjaxDangKy(nguoiDung)
                .done(function (kq) {
                    swal({
                        type: 'success',
                        title: 'Đăng ký thành công !.',
                        showConfirmButton: false,
                        timer: 1800,
                        animation: false,
                        customClass: 'animated tada'
                    })
                    Blank_value();
                    $('#login').click();
                })
                .fail(function (kq) {
                    $('#txtId_signup').focus();
                    swal({
                        type: 'error',
                        title: 'Tài Khoản đã tồn tại!',
                        showConfirmButton: false,
                        timer: 1800,
                        animation: false,
                        customClass: 'animated tada'
                    })
                })
            $('.tab a[href="#login"]').trigger('click');
        }
    }
    
    
    
    var elm = document.querySelector('#header__nav');
    var ms = new MenuSpy(elm);
})



function CheckBlank(id, chuoithongbao) {
    var ma = $(id).val();
    var kq = false;
    if (ma === '') {
        $(id).focus();
        swal({
            type: 'error',
            title: "`"+chuoithongbao+".`",
            //title: `${chuoithongbao}.`,
            showConfirmButton: false,
            timer: 1800,
            animation: false,
            customClass: 'animated tada'
        })
        kq = false;
    }
    else {
        kq = true;
    }
    return kq;
}

function CheckEmail(emails) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    var email = $(emails).val();
    var kq = false;

    if (email.match(mailformat)) {

        kq = true;
    }
    else {
        $(emails).focus();
        swal({
            type: 'error',
            title: "`"+THONG_BAO_NHAP_EMAIL+".`",
            //title: `${THONG_BAO_NHAP_EMAIL}.`,
            showConfirmButton: false,
            timer: 1800,
            animation: false,
            customClass: 'animated tada'
        })
        kq = false;
    }
    return kq;
}


function CheckKiTuNhap(min, id, chuoithongbao) {
    var idlength = $(id).val().length;
    var kq = false;
    if (idlength < min) {
        $(id).focus();
        swal({
            type: 'error',
            title: "`"+chuoithongbao+".`",
            //title: `${chuoithongbao}.`,
            showConfirmButton: false,
            timer: 1800,
            animation: false,
            customClass: 'animated tada'
        })
        kq = false;
    }
    else {

        kq = true;
    }
    return kq;
}

function CheckRePassword(password, rePassword, chuoithongbao) {
    var pass1 = $(password).val();
    var pass2 = $(rePassword).val();
    var kq = false;
    if (pass1 === pass2) {
        kq = true;
    }
    else {
        $(rePassword).focus();
        swal({
            type: 'error',
            title: "`"+chuoithongbao+".`",
            //title: `${chuoithongbao}.`,
            showConfirmButton: false,
            timer: 1800,
            animation: false,
            customClass: 'animated tada'
        })
        kq = false;
    }
    return kq;
}



function KiemTraDuLieu() {
    return CheckBlank('#txtHoTen_signup', THONG_BAO_NHAP_HO_TEN) &&
        CheckEmail('#txtEmail_signup') &&
        CheckKiTuNhap(4, '#txtId_signup', ID_TB_MIN_MAX) &&
        CheckKiTuNhap(6, '#txtPassword_signup', PASS_TB_MIN_MAX) &&
        CheckRePassword('#txtPassword_signup', '#txtRe_Password_signup', THONG_BAO_NHAP_RePASS)
}

function Blank_value() {
    $('#txtHoTen_signup').val("");
    $('#txtEmail_signup').val("");
    $('#txtId_signup').val("");
    $('#txtPassword_signup').val("");
    $('#txtRe_Password_signup').val("");
}