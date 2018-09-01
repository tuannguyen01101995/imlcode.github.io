
$(document).ready(function(){
    var khoahocSV = new KhoaHocServices();
    var khoaHoc = new KhoaHoc();

    var thamso = window.location.search.substring(1);

    function XemChiTietKhoaHoc(){
        khoahocSV.ChiTietKhoaHoc(thamso)
        .done(function(kq){
            khoaHoc = kq;
            HienThiKhoaHoc();
        })
        .fail(function(kq){
        })
    }
    function HienThiKhoaHoc(){
        var khoahocContent = `
        <div class="container-fluid">
            <div class="row mx-0">
                <div class="col-md-2">
                    <img src="${khoaHoc.HinhAnh}" class="img-fluid" alt="">
                </div>
                <div class="col-md-10">
                    <h3>${khoaHoc.TenKhoaHoc}</h3>
                    <p>Lượt xem: ${khoaHoc.LuotXem}</p>
                    <p>Người tạo: ${khoaHoc.NguoiTao}</p>
                </div>
                <div class="col-12">
                    ${khoaHoc.MoTa}
                </div>
            </div>
        </div>
            `
        $('#product').html(khoahocContent);    
    }
    XemChiTietKhoaHoc();
})