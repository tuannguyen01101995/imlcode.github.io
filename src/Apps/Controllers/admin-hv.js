var THONG_BAO_NHAP_HO_TEN = "Vui lòng kiểm tra lại nhập Họ Tên!";
var THONG_BAO_NHAP_RePASS = "Password Nhập lại không trùng. Vùi lòng kiểm tra lại!";
var THONG_BAO_NHAP_EMAIL = "Vui lòng kiểm tra lại nhập Email!";
var THONG_BAO_NHAP_SDT = "Vui lòng kiểm tra lại nhập số!";
var ID_MIN = 4;
var ID_TB_MIN_MAX = "Vui lòng nhập Tài khoản từ " + ID_MIN + " ký tự trở lên!";
var PASS_MIN = 6;
var PASS_TB_MIN_MAX = "Vui lòng nhập Mật Khẩu từ " + PASS_MIN + " ký tự trở lên!";

$(document).ready(function () {
    var nguoiDungSV = new NguoiDungServices();
    var DSNguoiDung = new DanhSachNguoiDung();
    var DSKhoaHoc = new DanhSachKhoaHoc();
    var khoahocSV = new KhoaHocServices();

    /*Lấy dữ liệu và hiển thị*/
    function DanhSachNguoiDungRAW() {

        nguoiDungSV.AjaxLayDanhSachNguoiDung()
            .done(function (kq) {
                DSNguoiDung = new DanhSachNguoiDung();
                LocDanhSachNguoiDung(kq);
                HienThiNguoiDung(DSNguoiDung.DSND);

            })
            .fail(function (kq) {
                console.log(kq);
            })
    }
    function LocDanhSachNguoiDung(kq) {
        for (var i = 0; i < kq.length; i++) {
            if (kq[i].MaLoaiNguoiDung === "HV" || kq[i].MaLoaiNguoiDung === null) {
                DSNguoiDung.ThemNguoiDung(kq[i]);
            }
        }
    }
    function HienThiNguoiDung(dsNguoiDung) {
        var nguoidungContent = '';
        for (var i = 0; i < dsNguoiDung.length; i++) {
            var nguoiDung = dsNguoiDung[i];
            nguoidungContent += `
                <tr>
                    <td><input type="checkbox" value="${nguoiDung.TaiKhoan}" class="cbNguoiDung"></input></td>
                    <td><div class="tbl-text">${nguoiDung.HoTen}</div></td>
                    <td><div class="tbl-text">${nguoiDung.Email}</div></td>
                    <td><div class="tbl-text">${nguoiDung.SoDT}</div></td>
                    <td><div class="tbl-text">${nguoiDung.TaiKhoan}</div></td>
                    <td><div class="tbl-text">${nguoiDung.MatKhau}</div></td>
                    <td>
                        <button class="btn btn-warning btn_Xoa" data-taikhoan="${nguoiDung.TaiKhoan}"><i class="fa fa-trash"></i> Xóa</button>
                        <button 
                            class="btn btn-danger btn_HienPopUpSua" 
                            data-taikhoan='${nguoiDung.TaiKhoan}'
                            data-matkhau='${nguoiDung.MatKhau}'
                            data-hoten='${nguoiDung.HoTen}'
                            data-email='${nguoiDung.Email}'
                            data-sdt='${nguoiDung.SoDT}'
                            ><i class="fa fa-pencil"></i> Sửa</button>
                    </td>
                    <td>
                        <button class="btn btn-info btn_MoMDHienGhiDanh" data-taikhoan="${nguoiDung.TaiKhoan}"><i class="fa fa-sign-in"></i> Ghi Danh</button>
                    </td>
                </tr>
            `
        }
        $('#tbody').html(nguoidungContent);
    }
    DanhSachNguoiDungRAW();
    /*End lấy dữ liệu và hiển thị*/


    /*Thêm*/
    function Them() {
        var hoTen = $('#txtHoTen').val();
        var email = $('#txtEmail').val();
        var sdt = $('#txtSDT').val();
        var id = $('#txtId').val();
        var password = $('#txtPassword').val();


        if (KiemTraDuLieu()) {
            var nguoiDung = new NguoiDung(id, password, hoTen, email, sdt, "HV");
            nguoiDungSV.AjaxThemNguoiDung(nguoiDung)
                .done(function (kq) {
                    if (kq !== "tai khoan da ton tai !") {
                        console.log(kq);
                        swal({
                            type: 'success',
                            title: 'Thêm thành công !.',
                            showConfirmButton: false,
                            timer: 1800,
                            animation: false,
                            customClass: 'animated tada'
                        })
                        DanhSachNguoiDungRAW();
                        Blank_value();
                        $("#modal .close").click();
                    }
                    else {
                        console.log(kq);
                        $('#txtId').focus();
                        swal({
                            type: 'error',
                            title: 'Tài Khoản đã tồn tại!',
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
    $('#btn_Them').bind("click", function () {
        $("#modal").modal();
        $("#modal h1").html("Thêm");
        $("#btn_Confirm").html("Thêm");

        /*Thêm button vào modal*/
        var noidungFooter = `
            <button class="button button-block btn-success" id="btnThemNguoiDung">Thêm</button>
        `
        $('#modal-footer').html(noidungFooter);

        Blank_value();
        $('#modal label').removeClass('active highlight');
        $('#TaiKhoan').attr("readonly", false);
        $('#TaiKhoan').css("cursor", "text");
    })

    $("body").delegate("#btnThemNguoiDung", "click", Them);
    /**/

    /*Xóa*/
    function Xoa() {
        var taikhoan = $(this).attr("data-taikhoan");
        console.log(taikhoan);
        swal({
            title: 'Xóa?',
            text: "Bạn có chắc xóa!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xóa!'
        }).then((result) => {
            if (result.value) {
                nguoiDungSV.AjaxXoaNguoiDung(taikhoan)
                    .done(function (kq) {
                        swal({
                            type: 'success',
                            title: 'Xóa thành công !.',
                            showConfirmButton: false,
                            timer: 1800
                        })
                        DanhSachNguoiDungRAW();
                    })
                    .fail(function (kq) {
                        swal({
                            type: 'error',
                            title: 'Xóa Thất Bại !.',
                            showConfirmButton: false,
                            timer: 1800,
                            animation: false,
                            customClass: 'animated tada'
                        })
                    })
            }
        })

    }
    $("body").delegate(".btn_Xoa", "click", Xoa)
    /**/

    /*Sửa*/
    function HienMD() {
        $("#modal").modal();
        $("#modal h1").html("Sửa");

        var taikhoan = $(this).attr("data-taikhoan");
        var matkhau = $(this).attr("data-matkhau");
        var hoten = $(this).attr("data-hoten");
        var email = $(this).attr("data-email");
        var sdt = $(this).attr("data-sdt");


        var noidungFooter = `
        <button class="button button-block btn-success" id="btnSuaNguoiDung">Sửa</button>
    `
        $('#modal-footer').html(noidungFooter);

        $('#modal label').addClass('active highlight');
        // gắn data lên input
        $('#txtId').val(taikhoan);
        $('#txtPassword').val(matkhau);
        $('#txtHoTen').val(hoten);
        $('#txtEmail').val(email);
        $('#txtSDT').val(sdt);

        $('#txtId').attr("readonly", true);
        $('#txtId').css("cursor", "not-allowed");
    }
    function Sua() {

        var hoTen = $('#txtHoTen').val();
        var email = $('#txtEmail').val();
        var sdt = $('#txtSDT').val();
        var id = $('#txtId').val();
        var password = $('#txtPassword').val();

        var nguoiDung = new NguoiDung(id, password, hoTen, email, sdt, "HV");
        nguoiDungSV.AjaxCapNhatNguoiDung(nguoiDung)
            .done(function (kq) {
                swal({
                    type: 'success',
                    title: 'Cập nhật thành công !.',
                    showConfirmButton: false,
                    timer: 1800
                });
                DanhSachNguoiDungRAW();
                $("#modal .close").click();
            })
            .fail(function (kq) {
                console.log(kq);
            })
    }
    $("body").delegate(".btn_HienPopUpSua", "click", HienMD);
    $("body").delegate("#btnSuaNguoiDung", "click", Sua);
    /**/


    /*Tìm kiếm*/
    $('#input_Tim').keyup(function () {
        var tukhoa = $(this).val();
        if ($("#select_search").prop('selectedIndex') === 1) {
            var mangNDcantim = [];
            mangNDcantim = DSNguoiDung.TimNguoiDungTheoTen(tukhoa);
            HienThiNguoiDung(mangNDcantim);
            console.log(mangNDcantim);
        }
        else if ($("#select_search").prop('selectedIndex') === 0) {
            var mangNDcantim = [];
            mangNDcantim = DSNguoiDung.TimNguoiDungTheoTaiKhoan_Keyup(tukhoa);
            HienThiNguoiDung(mangNDcantim);
            console.log(mangNDcantim);
        }


    })
    /**/


    $('#btn_XoaNhieu').click(function () {
        swal({
            title: 'Xóa?',
            text: "Bạn có chắc xóa!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xóa!'
        }).then((result) => {
            if (result.value) {


                $('.cbNguoiDung').each(function () {
                    if ($(this).is(':checked')) {
                        var taikhoan = $(this).val();
                        console.log(taikhoan);

                        nguoiDungSV.AjaxXoaNguoiDung(taikhoan)
                            .done(function (kq) {
                                swal({
                                    type: 'success',
                                    title: 'Xóa thành công !.',
                                    showConfirmButton: false,
                                    timer: 1800
                                })
                                DanhSachNguoiDungRAW();
                            })
                            .fail(function (kq) {
                                swal({
                                    type: 'error',
                                    title: 'Xóa Thất Bại !.',
                                    showConfirmButton: false,
                                    timer: 1800,
                                    animation: false,
                                    customClass: 'animated tada'
                                })
                            })
                    }
                })
            }
        })
    })

    $('#btn_Refresh').click(function () {

        DanhSachNguoiDungRAW();

    })

    /*Phần Ghi Danh*/

    function LoadDSKH() {

        khoahocSV.LayDanhSachKhoaHoc()
            .done(function (kq) {

                DSKhoaHoc = new DanhSachKhoaHoc();
                LocDanhSachKhoaHoc(kq);

                HienThiKhoaHoc(DSKhoaHoc.DSKH);

            })
            .fail(function (kq) {

            })
    }
    function LocDanhSachKhoaHoc(kq) {
        for (var i = 0; i < kq.length; i++) {
            if (kq[i].MaKhoaHoc.search('IMLCODE') !== -1) {
                DSKhoaHoc.ThemKhoaHoc(kq[i]);
            }
        }

    }
    function HienThiKhoaHoc(ds) {
        var khaohocContent = '';
        for (var i = 0; i < ds.length; i++) {
            var khoaHoc = ds[i];
            khaohocContent += `
            <div class=" col-sm-6 col-md-4 col-lg-4 p-2">
            <div class="card ghidanh__user">
                <input type="checkbox" value="${khoaHoc.MaKhoaHoc}" class="cbKhoaHoc"></input>
                <div class="card-img ">
                    <a class="">
                        <img class="card-img-top" src="${khoaHoc.HinhAnh}" class="img-fluid w-100 h-100" alt="Card image cap">
                    </a>
                    </div>
                    <div class="card-body">
                        <p class="card-title">${khoaHoc.TenKhoaHoc}</p>
                    </div>
                </div>
            </div>
                `
        }
        $('#content').html(khaohocContent);
    }
    LoadDSKH();

    $('#input_TimKH').keyup(function () {
        var tukhoa = $(this).val();
        if ($("#select_searchKH").prop('selectedIndex') === 0) {
            var mangNDcantim = [];
            mangNDcantim = DSKhoaHoc.TimKhoaHocTheoTen(tukhoa);
            HienThiKhoaHoc(mangNDcantim);
            console.log(mangNDcantim);
        }
        else if ($("#select_searchKH").prop('selectedIndex') === 1) {
            var mangNDcantim = [];
            mangNDcantim = DSKhoaHoc.TimKhoaHocTheoMaLoc(tukhoa);
            HienThiKhoaHoc(mangNDcantim);
            console.log(mangNDcantim);
        }
    })

    $('body').delegate('.btn_MoMDHienGhiDanh', 'click', function () {
        $('#modal_GhiDanh').modal();
        $('#id_hocvien').html($(this).attr('data-taikhoan'));
        $('.cbKhoaHoc').each(function () {
            $(this).prop('checked', false);
        })
        $('.ghidanh__user').removeClass('actives');
    })
    $("#btn_GhiDanh").click(function () {

        swal({
            text: "Bạn có muốn ghi danh!.",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ghi danh!'
        }).then((result) => {
            if (result.value) {
                $('.cbKhoaHoc').each(function () {
                    if ($(this).is(':checked')) {
                        var makhoahoc = $(this).val();
                        var taikhoan = $("#id_hocvien").text();

                        var ghidanh = { 
                            MaKhoaHoc: makhoahoc,
                            TaiKhoan:taikhoan
                        };

                        console.log(JSON.stringify(ghidanh));
                        khoahocSV.GhiDanhKhoaHoc(JSON.stringify(ghidanh))
                            .done(function (kq) {
                                console.log(kq);
                                swal({
                                    type: 'success',
                                    title: 'Ghi Danh thành công !.',
                                    showConfirmButton: false,
                                    timer: 1800
                                })
                                $("#modal_GhiDanh .close").click();
                            })
                            .fail(function (kq) {
                                console.log(kq);
                                swal({
                                    type: 'error',
                                    title: 'Khóa học đã được ghi danh hoặc bị lỗi!.',
                                    text: "",
                                    showConfirmButton: false,
                                    timer: 2000,
                                    animation: false,
                                    customClass: 'animated tada'
                                })
                            })
                    }
                })
            }

        })
    })
    $("body").delegate('.ghidanh__user','click',function(){
        if($(this).find('.cbKhoaHoc').is(':checked')){
            $(this).find('.cbKhoaHoc').prop('checked',false);
            $(this).removeClass('actives');
        }
        else{
            $(this).find('.cbKhoaHoc').prop('checked',true);
            $(this).addClass('actives');
        }
    })
    $("body").delegate('.cbKhoaHoc','click',function(){
        if($(this).is(':checked')){
            $(this).prop('checked',false);
            $(this).removeClass('actives');
        }
        else{
            $(this).prop('checked',true);
            $(this).addClass('actives');
        }
    })
    /**/

    
})


function CheckBlank(id, chuoithongbao) {
    var ma = $(id).val();
    var kq = false;
    if (ma === '') {
        $(id).focus();
        swal({
            type: 'error',
            title: `${chuoithongbao}.`,
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

function CheckEmail() {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var email = $('#txtEmail');
    var kq = false;

    if (email.val().match(mailformat)) {

        kq = true;
    }
    else {
        $(email).focus();
        swal({
            type: 'error',
            title: `${THONG_BAO_NHAP_EMAIL}.`,
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
            title: `${chuoithongbao}.`,
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
            title: `${chuoithongbao}.`,
            showConfirmButton: false,
            timer: 1800,
            animation: false,
            customClass: 'animated tada'
        })
        kq = false;
    }
    return kq;
}

function CheckSDT(id, chuoithongbao) {

    var idphone = $(id).val();

    var numbers = /^[0-9]+$/;

    var kq = false;

    if (idphone.match(numbers)) {

        kq = true;
    }
    else {
        $(id).focus();
        swal({
            type: 'error',
            title: `${chuoithongbao}.`,
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
    return CheckBlank('#txtHoTen', THONG_BAO_NHAP_HO_TEN) &&
        CheckEmail() &&
        CheckSDT('#txtSDT', THONG_BAO_NHAP_SDT) &&
        CheckKiTuNhap(4, '#txtId', ID_TB_MIN_MAX) &&
        CheckKiTuNhap(6, '#txtPassword', PASS_TB_MIN_MAX)
}

function Blank_value() {
    $('#txtHoTen').val("");
    $('#txtEmail').val("");
    $('#txtSDT').val("");
    $('#txtId').val("");
    $('#txtPassword').val("");
}