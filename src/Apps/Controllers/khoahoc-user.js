$(document).ready(function(){
    var khoahocSV = new KhoaHocServices();
    var DSToanBoKhoaHoc = new DanhSachKhoaHoc();
    var DSKhoaHocNguoiDung = new DanhSachKhoaHoc();

    function LayToanBoDanhSachKhoaHoc(){
        khoahocSV.LayDanhSachKhoaHoc()
        .done(function(kq){

            DSToanBoKhoaHoc.DSKH = kq;
            var nguoiDung = JSON.parse(localStorage.getItem('LocalUser'));
            console.log(nguoiDung);
            khoahocSV.LayKhoaHocNguoiDungHienTai(nguoiDung.TaiKhoan)
            .done(function(kq){
                for(var i = 0 ; i< kq.length;i++){
                    for(var k = 0 ; k< DSToanBoKhoaHoc.DSKH.length;k++){
                        if(kq[i].MaKhoaHoc === DSToanBoKhoaHoc.DSKH[k].MaKhoaHoc){
                            DSKhoaHocNguoiDung.DSKH.push(DSToanBoKhoaHoc.DSKH[k])
                        }
                    }
                }
                console.log(DSKhoaHocNguoiDung.DSKH);
                HienThiKhoaHoc();
            })
            .fail(function(kq){
                console.log(kq);
            })
        })
        .fail(function(kq){
            console.log(kq);
        })
    }
    function HienThiKhoaHoc(){
        var khoahocContent = '';

        for(var i = 0 ; i < DSKhoaHocNguoiDung.DSKH.length ; i++){
            var khoaHoc = DSKhoaHocNguoiDung.DSKH[i];
            khoahocContent+= `
            <div class=" col-sm-6 col-md-4 col-lg-2 p-3">
            <div class="card">
                <div class="card-img">
                    <a class="btnXemChiTiet" data-maKhoaHoc="${khoaHoc.MaKhoaHoc}">
                        <img class="card-img-top" src="${khoaHoc.HinhAnh}" class="img-fluid w-100 h-100" alt="Card image cap">
                    </a>
                    </div>

                    <div class="card-body">
                        <h5 class="card-title">${khoaHoc.TenKhoaHoc}</h5>
                    </div>
                </div>
            </div>
            `
        }
        $('#KhoaHocContent').html(khoahocContent);
    }
    LayToanBoDanhSachKhoaHoc();
    $('body').delegate('.btnXemChiTiet','click',function(){
        var maKhoaHoc = $(this).attr('data-maKhoaHoc');
        window.location.assign(`ChiTietKhoaHoc.html?${maKhoaHoc}`);
    })
})