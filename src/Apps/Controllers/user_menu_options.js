var THONG_BAO_NHAP_HO_TEN = "Vui lòng kiểm tra lại nhập Họ Tên!";
var THONG_BAO_NHAP_RePASS = "Password Nhập lại không trùng. Vùi lòng kiểm tra lại!";
var THONG_BAO_NHAP_EMAIL = "Vui lòng kiểm tra lại nhập Email!";
var THONG_BAO_NHAP_SDT = "Vui lòng nhập Số điện thoại!";
var ID_MIN = 4;
var ID_TB_MIN_MAX = "Vui lòng nhập Tài khoản từ " + ID_MIN + " ký tự trở lên!";
var PASS_MIN = 6;
var PASS_TB_MIN_MAX = "Vui lòng nhập Mật Khẩu từ " + PASS_MIN + " ký tự trở lên!";

$(document).ready(function () {

    var dangNhapSV = new DangNhapServices();
    var nguoiDungSV = new NguoiDungServices();

    $('#drop_update_btn').bind("click", function () {
        $('.tab a[href="#update"]').trigger('click');
        PutData();
    })

    $('#drop_change_pass_btn').bind("click", function () {
        $('.tab a[href="#changepass"]').trigger('click');
    })

    $('.tab a[href="#update"]').bind("click",PutData);

    $('#btn_Logout').click(function () {
        localStorage.removeItem('LocalUser');
        window.location.assign('trang-chu.html');
    })

    $('#btn_Update').bind("click", function () {
        Update_Info();
    })

    $('#update input').bind("keypress", function (e) {
        if (e.which == 13) {
            $('#btn_Update').trigger("click");
        }
    })

    /*Cụm nút sự kiện cho phím Enter*/
    $('#btn_ChangePass').bind("click", function () {
        Change_Pass();
    })

    $('#changepass input').bind("keypress", function (e) {
        if (e.which == 13) {
            $('#btn_ChangePass').trigger("click");
        }
    })

    function Update_Info() {

        var ItemLocal = JSON.parse(localStorage.getItem('LocalUser'));
        var id = ItemLocal.TaiKhoan;
        var hoTen = $('#txtHoTen_update').val();
        var email = $('#txtEmail_update').val();
        var sdt = $('#txtSdt_update').val();
        if (KiemTraDuLieu_Update()) {
            (async function getPassword() {
                const { value: password } = await swal({
                    title: 'Xác nhận',
                    text: 'Nhập mật khẩu để xác nhận đổi thông tin!.',
                    input: 'password',
                    inputPlaceholder: 'Enter your password',
                    confirmButtonText: 'OK',
                    cancelButtonText: "Hủy",
                    showCancelButton: true,
                    inputAttributes: {
                        autocapitalize: 'off',
                        autocorrect: 'off'
                    }
                })

                if (password) {

                    var nguoiDung = new NguoiDung(id, password, hoTen, email, sdt, "HV");

                    /*Lấy password vào id để check xem có đúng không*/
                    dangNhapSV.AjaxDangNhap(id, password)
                        .done(function (kq) {
                            if (kq != "failed to login") {
                                /*Update người dùng*/
                                nguoiDungSV.AjaxCapNhatNguoiDung(nguoiDung)
                                    .done(function (kq) {
                                        swal({
                                            type: 'success',
                                            title: 'Cập nhật thành công !.',
                                            showConfirmButton: false,
                                            timer: 1800,
                                        })
                                        localStorage.setItem('LocalUser', JSON.stringify(kq));
                                        $('#showName').html(kq.HoTen);

                                    })
                                    .fail(function (kq) {
                                        
                                    })
                            }
                            else {
                                swal({
                                    type: 'error',
                                    title: 'Mật Khẩu nhập sai !.',
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
            })()
        }


    }

    function Change_Pass() {

        var ItemLocal = JSON.parse(localStorage.getItem('LocalUser'));
        var old_pass = $('#txtPassword_old_changepass').val();
        var new_pass = $('#txtPassword_new_changepass').val();
        var nguoiDung = new NguoiDung(ItemLocal.TaiKhoan, new_pass, ItemLocal.HoTen, ItemLocal.Email, ItemLocal.SoDT, "HV");

        if (KiemTraDuLieu_ChangePass()) {

            /*Lấy password vào id để check xem có đúng không*/
            dangNhapSV.AjaxDangNhap(ItemLocal.TaiKhoan, old_pass)
                .done(function (kq) {
                    if (kq != "failed to login") {
                        /*Update người dùng*/
                        nguoiDungSV.AjaxCapNhatNguoiDung(nguoiDung)
                            .done(function () {
                                swal({
                                    type: 'success',
                                    title: 'Cập nhật thành công !.',
                                    showConfirmButton: false,
                                    timer: 1800,
                                })
                                Blank_value_chgPass();
                            })
                            .fail(function (kq) {
                                
                            })
                    }
                    else {
                        $('#txtPassword_old_changepass').focus();
                        swal({
                            type: 'error',
                            title: 'Mật Khẩu cũ không đúng !.',
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

    }

    function PutData(){
        var ItemLocal = JSON.parse(localStorage.getItem('LocalUser'));
        $('#txtHoTen_update').val(ItemLocal.HoTen);
        $('#txtEmail_update').val(ItemLocal.Email);
        $('#txtSdt_update').val(ItemLocal.SoDT);
        $('#update label').addClass('active highlight');
    }

    function Check() {
        if (KiemtraTonTai()) {


            var ItemLocal = JSON.parse(localStorage.getItem('LocalUser'));



            if (ItemLocal.MaLoaiNguoiDung === 'HV') {
                $('#user_btn').show();
                $('#admin_btn').hide();
                nguoiDungSV.AjaxLayThongTinNguoiDung(ItemLocal.TaiKhoan)
                    .done(function (kq) {
                        
                        localStorage.setItem('LocalUser', JSON.stringify(kq[0]));
                    })
                    .fail(function (kq) {
                        
                    })
            }
            else {
                $('#user_btn').hide();
                $('#admin_btn').show();
                $('#drop_update_btn').hide();
                $('#drop_change_pass_btn').hide();
            }

            $('#btn_Dropdownmenu').removeClass('d-none');
            $('#showName').html(ItemLocal.HoTen);
        }
        else {
            $('#btn_FormLogin').removeClass('d-none');
        }
    }

    function KiemtraTonTai() {
        var localItem = localStorage.getItem('LocalUser');
        if (localItem !== null) {
            return true;
        }
        return false;
    }

    Check();

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

function CheckEmails() {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var email = $('#txtEmail_update').val();
    var kq = false;

    if (email.match(mailformat)) {

        kq = true;
    }
    else {
        $(email).focus();
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


function KiemTraDuLieu_ChangePass() {
    return CheckKiTuNhap(6, '#txtPassword_old_changepass', PASS_TB_MIN_MAX) &&
        CheckKiTuNhap(6, '#txtPassword_new_changepass', PASS_TB_MIN_MAX) &&
        CheckRePassword('#txtPassword_new_changepass', '#txtRe_Password_new_changepass', THONG_BAO_NHAP_RePASS)
}

function KiemTraDuLieu_Update() {
    return CheckBlank('#txtHoTen_update', THONG_BAO_NHAP_HO_TEN) &&
        CheckEmails() &&
        CheckKiTuNhap(7, '#txtSdt_update', THONG_BAO_NHAP_SDT)
}

function Blank_value_chgPass() {
    $('#txtPassword_old_changepass').val("");
    $('#txtPassword_new_changepass').val("");
    $('#txtRe_Password_new_changepass').val("");
}