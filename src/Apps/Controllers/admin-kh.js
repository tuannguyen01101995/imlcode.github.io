var THONG_BAO_NHAP_MAKH = "Vui lòng kiểm tra lại mã khóa học!";
var THONG_BAO_NHAP_TENKH = "Tên khóa học không được rỗng!";
var THONG_BAO_NHAP_HINHANH = "Hình ảnh hông được rỗng!";
var THONG_BAO_NHAP_LUOTXEM = "Lượt xem hông được rỗng!";
var ID_MIN = 100;
var MOTA_TB_MIN_MAX = "Vui lòng nhập Mô tả từ " + ID_MIN + " ký tự trở lên!";


$(document).ready(function () {
    var khoahocSV = new KhoaHocServices();
    var DSKhoaHoc = new DanhSachKhoaHoc();
    var ItemLocal = JSON.parse(localStorage.getItem('LocalUser'));  
    CKEDITOR.replace('txtMoTa',{
        allowedContent:'iframe[*]',
    });

    /*Lấy dữ liệu và hiển thị*/
    function DanhSachKhoaHocRAW() {
        
        khoahocSV.LayDanhSachKhoaHoc()
            .done(function (kq) {
                
                DSKhoaHoc = new DanhSachKhoaHoc();
                LocDanhSachKhoaHoc(kq);
                
                HienThiKhoaHoc(DSKhoaHoc.DSKH);
                HienThiKhoaHocTheoItem(DSKhoaHoc.DSKH);

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
                <tr>
                    <td><input type="checkbox" value="${khoaHoc.MaKhoaHoc}" class="cbkhoaHoc"></input></td>
                    <td><div>${khoaHoc.MaKhoaHoc}</div></td>
                    <td><img class="img-fluid" src="${khoaHoc.HinhAnh}"></img></td>
                    <td>${khoaHoc.TenKhoaHoc}</td>
                    <td><div class="tbl-Mota">${khoaHoc.MoTa}</div></td>
                    <td>${khoaHoc.LuotXem}</td>
                    <td>${khoaHoc.NguoiTao}</td>
                    <td>
                        <button class="btn btn-warning btn_Xoa m-1 " data-makhoahoc="${khoaHoc.MaKhoaHoc}"><i class="fa fa-trash"></i> Xóa</button>
                        <button 
                            class="btn btn-danger m-1 btn_HienPopUpSua" 
                            data-makhoahoc='${khoaHoc.MaKhoaHoc}'
                            data-tenkhoahoc='${khoaHoc.TenKhoaHoc}'
                            data-luotxem='${khoaHoc.LuotXem}'
                            data-hinhanh='${khoaHoc.HinhAnh}'
                            data-mota='${khoaHoc.MoTa}'
                            data-nguoitao='${khoaHoc.nguoitao}'
                            ><i class="fa fa-pencil"></i> Sửa</button>
                    </td>
                </tr>
            `
        }
        $('#tbody').html(khaohocContent);
    }
    DanhSachKhoaHocRAW();
    /*End lấy dữ liệu và hiển thị*/


    /*Thêm*/
    function autoTaoMaKH(){
        var maKhoaHoc = "IMLCODE_";
        var maLoai = $("#txtMaLoai option:selected").val();
        var length = DSKhoaHoc.TimKhoaHocTheoMaLoc(maKhoaHoc+maLoai).length;
        var dem = 1;
        for (var i = 0 ; i < length ; i++){
            if(DSKhoaHoc.TimKhoaHocTheoMaLoc(maKhoaHoc+maLoai+dem).length < 1){
                return maKhoaHoc+maLoai+dem;
            }
            dem++;
        }
    }
    function Them() {
       
        var luotxem = $('#txtLuotXem').val();
        var tenkhoahoc = $('#txtTenKH').val();
        var hinhanh = $('#txtHinhAnh').val();
        var makhoahoc = autoTaoMaKH();
        var mota = CKEDITOR.instances['txtMoTa'].getData();
        var nguoitao = ItemLocal.TaiKhoan;

        var khoaHoc = new KhoaHoc(makhoahoc, tenkhoahoc,mota,hinhanh,luotxem,nguoitao);
        
        if (KiemTraDuLieu()) {
            khoahocSV.ThemKhoaHoc(khoaHoc)
                .done(function (kq) {
                    if (kq !== "tai khoan da ton tai !") {
                        
                        swal({
                            type: 'success',
                            title: 'Thêm thành công !.',
                            showConfirmButton: false,
                            timer: 1800,
                            animation: false,
                            customClass: 'animated tada'
                        })
                        DanhSachKhoaHocRAW();
                        Blank_value();
                        $("#modal .close").click();
                    }
                    else {
                        
                        $('#txtMaKH').focus();
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

        $('#maloai').removeClass('d-none');
        $('#makh').addClass('d-none');
        /*Thêm button vào modal*/
        var noidungFooter = `
            <button class="button button-block btn-success" id="btnThemNguoiDung">Thêm</button>
        `
        $('#modal-footer').html(noidungFooter);

        Blank_value();
        $('#modal label').removeClass('active highlight');
        $('#txtMaKH').attr("readonly", false);
        $('#txtMaKH').css("cursor", "text");
    })

    $("body").delegate("#btnThemNguoiDung", "click", Them);
    /**/

    /*Xóa*/
    function Xoa() {
        var makh = $(this).attr("data-makhoahoc");
        
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
                khoahocSV.XoaKhoaHoc(makh)
                    .done(function (kq) {
                        swal({
                            type: 'success',
                            title: 'Xóa thành công !.',
                            showConfirmButton: false,
                            timer: 1800
                        })
                        DanhSachKhoaHocRAW();
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
    $("body").delegate(".btn_Xoa", "click", Xoa);
    /**/

    /*Sửa*/
    function HienMD() {
        $("#modal").modal();
        $("#modal h1").html("Sửa");

        $('#makh').removeClass('d-none');
        $('#maloai').addClass('d-none');

        var makhoahoc = $(this).attr("data-makhoahoc");
        var tenkhoahoc = $(this).attr("data-tenkhoahoc");
        var hinhanh = $(this).attr("data-hinhanh");
        var mota = $(this).attr("data-mota");
        var luotxem = $(this).attr("data-luotxem");


        var noidungFooter = `
        <button class="button button-block btn-success" id="btnSuaNguoiDung">Sửa</button>
    `
        $('#modal-footer').html(noidungFooter);

        $('#modal label').addClass('active highlight');

        // gắn data lên input
        $('#txtMaKH').val(makhoahoc);
        CKEDITOR.instances['txtMoTa'].setData(mota);
        $('#txtLuotXem').val(luotxem);
        $('#txtTenKH').val(tenkhoahoc);
        $('#txtHinhAnh').val(hinhanh);

        $('#txtMaKH').attr("readonly", true);
        $('#txtMaKH').css("cursor", "not-allowed");
    }
    function Sua() {

        var luotxem = $('#txtLuotXem').val();
        var tenkhoahoc = $('#txtTenKH').val();
        var hinhanh = $('#txtHinhAnh').val();
        var makhoahoc = $('#txtMaKH').val();
        var mota = CKEDITOR.instances['txtMoTa'].getData();
        var nguoitao = ItemLocal.TaiKhoan;

        var khoaHoc = new KhoaHoc(makhoahoc, tenkhoahoc,mota,hinhanh,luotxem,nguoitao);

        khoahocSV.SuaKhoaHoc(khoaHoc)
            .done(function (kq) {
                
                swal({
                    type: 'success',
                    title: 'Cập nhật thành công !.',
                    showConfirmButton: false,
                    timer: 1800
                });
                DanhSachKhoaHocRAW();
                $("#modal .close").click();
            })
            .fail(function (kq) {
                
            })
    }
    $("body").delegate(".btn_HienPopUpSua", "click", HienMD);
    $("body").delegate("#btnSuaNguoiDung", "click", Sua);
    /**/


    /*Tìm kiếm*/
    $('#input_Tim').keyup(function () {
        var tukhoa = $(this).val();
        if($("#select_search").prop('selectedIndex') === 1){
            var mangNDcantim = [];
            mangNDcantim = DSKhoaHoc.TimKhoaHocTheoTen(tukhoa);
            HienThiKhoaHoc(mangNDcantim);
            HienThiKhoaHocTheoItem(mangNDcantim);
        }
        else if($("#select_search").prop('selectedIndex') === 0){
            var mangNDcantim = [];
            mangNDcantim = DSKhoaHoc.TimKhoaHocTheoMaLoc(tukhoa);
            HienThiKhoaHoc(mangNDcantim);
            HienThiKhoaHocTheoItem(mangNDcantim);
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
                $('.cbkhoaHoc').each(function () {
                    if ($(this).is(':checked')) {
                        var makhoahoc = $(this).val();
                       

                        khoahocSV.XoaKhoaHoc(makhoahoc)
                            .done(function (kq) {
                                swal({
                                    type: 'success',
                                    title: 'Xóa thành công !.',
                                    showConfirmButton: false,
                                    timer: 1800
                                })
                                DanhSachKhoaHocRAW();
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
        
        DanhSachKhoaHocRAW();

    })

    /*Phân loại Table và item*/

    $('#btn_grid_table').bind('click',function(){
        $('#btn_grid_item').removeClass('actives');
        $('#btn_grid_table').addClass('actives');
        $('#grid__item').addClass('d-none');
        $('#grid__table').show();
    })
    $('#btn_grid_item').bind('click',function(){
        $('#btn_grid_table').removeClass('actives');
        $('#btn_grid_item').addClass('actives');
        $('#grid__item').removeClass('d-none');
        $('#grid__table').hide();
    })
    function HienThiKhoaHocTheoItem(ds) {
        var khaohocContent = '';
        for (var i = 0; i < ds.length; i++) {
            var khoaHoc = ds[i];
            khaohocContent += `
            <div class="col-4 p-2">
                <div class="card btnXemChiTiet" data-maKhoaHoc="${khoaHoc.MaKhoaHoc}">
                    <div class="card-img">
                        <a class="">
                            <img class="card-img-top" src="${khoaHoc.HinhAnh}" class="img-fluid w-100 h-100" alt="Card image cap">
                        </a>
                    </div>
                    <div class="card-body">
                            <p class="card-title">${khoaHoc.TenKhoaHoc}</p>
                            <div class="cardfooter">
                                <p>${khoaHoc.NguoiTao}</p>
                                <p>${khoaHoc.LuotXem}</p>
                            </div>
                    </div>
                    
                </div>
            </div>
                `
        }
        $('#grid__list__item').html(khaohocContent);
    }
    $('body').delegate('.btnXemChiTiet','click',function(){
        var maKhoaHoc = $(this).attr('data-maKhoaHoc');
        window.location.assign(`ChiTietKhoaHoc.html?${maKhoaHoc}`);
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



function CheckKiTuNhap(min, id, chuoithongbao) {
    var idlength = id.length;
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

function KiemTraDuLieu() {
    return CheckBlank('#txtTenKH',THONG_BAO_NHAP_TENKH) &&
        CheckBlank('#txtHinhAnh', THONG_BAO_NHAP_HINHANH) &&
        CheckBlank('#txtLuotXem', THONG_BAO_NHAP_LUOTXEM) &&
        CheckKiTuNhap(100,CKEDITOR.instances['txtMoTa'].getData(), MOTA_TB_MIN_MAX)
}

function Blank_value() {
    $('#txtMaKH').val("");
    $('#txtTenKH').val("");
    $('#txtHinhAnh').val("");
    $('#txtLuotXem').val("");
    CKEDITOR.instances['txtMoTa'].setData();
}