$(document).ready(function () {
    var khoahocSV = new KhoaHocServices();
    var DSKhoaHoc = new DanhSachKhoaHoc();

    function DanhSachKhoaHocRAW() {
        khoahocSV.LayDanhSachKhoaHoc()
            .done(function (kq) {

                LocDanhSachKhoaHoc(kq);
                HienThiKhoaHoc('_WD', $('#list__wd'));
                HienThiKhoaHoc('_MB', $('#list__mb'));
                HienThiKhoaHoc('_NT', $('#list__nt'));

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

    
    function HienThiKhoaHoc(tenLoai, vitri) {
        var khoahocContent = '';
        for (var i = 0; i < DSKhoaHoc.DSKH.length; i++) {
            if (DSKhoaHoc.DSKH[i].MaKhoaHoc.search(tenLoai) !== -1) {
                var khoaHoc = DSKhoaHoc.DSKH[i];

                khoahocContent +=                  
                '<div class="col-sm-6 col-md-4 col-lg-3 p-3"> \
                    <div class="card"> \
                        <div class="card-img"> \
                            <a class="btnXemChiTiet"><img class="card-img-top" src="' + khoaHoc.HinhAnh + '" class="img-fluid w-100 h-100" alt="Card image cap"/> \
                            </a> \
                        </div> \
                        <div class="card-body"> \
                            <h5 class="card-title">' + khoaHoc.TenKhoaHoc + '</h5> \
                            <div class="card-text">Khóa học lập trình trực tuyến với 100% thời gian học qua video. Do đó bạn có thể truy cập vào khóa học từ bất kỳ nơi đâu và vào bất kỳ thời điểm nào mà bạn muốn.</div> \
                        </div> \
                    </div> \
                </div> ';
            }
        }
        vitri.html(khoahocContent);
    }
    
    // function HienThiKhoaHoc(tenLoai,vitri) {
    //     var khoahocContent = '';
    //     for (var i = 0; i < DSKhoaHoc.DSKH.length; i++) {
    //         if (DSKhoaHoc.DSKH[i].MaKhoaHoc.search(tenLoai) !== -1) {
    //             var khoaHoc = DSKhoaHoc.DSKH[i];
    //             khoahocContent += `
    //                 <div class=" col-sm-6 col-md-4 col-lg-3 p-3">
    //                     <div class="card">
    //                         <div class="card-img">
    //                             <a class="btnXemChiTiet">
    //                                 <img class="card-img-top" src="${khoaHoc.HinhAnh}" class="img-fluid w-100 h-100" alt="Card image cap">
    //                             </a>
    //                             </div>

    //                             <div class="card-body">
    //                                 <h5 class="card-title">${khoaHoc.TenKhoaHoc}</h5>
    //                                 <div class="card-text">Khóa học lập trình trực tuyến với 100% thời gian học qua video. Do đó bạn có thể truy cập vào khóa học từ bất kỳ nơi đâu và vào bất kỳ thời điểm nào mà bạn muốn.</div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                     `
    //         }
    //     }
    //     vitri.html(khoahocContent);
    // }
    DanhSachKhoaHocRAW();
})