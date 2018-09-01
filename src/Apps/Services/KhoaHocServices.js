function KhoaHocServices(){

}
KhoaHocServices.prototype.ThemKhoaHoc = function(khoahoc){
    return $.ajax({
        type:"POST",
        url: 'http://sv.myclass.vn/api/QuanLyTrungTam/ThemKhoaHoc',
        dataType:'json',
        data:khoahoc
    })
}
KhoaHocServices.prototype.XoaKhoaHoc = function(makhoahoc){
    return $.ajax({
        type:"DELETE",
        url: "http://sv.myclass.vn/api/QuanLyTrungTam/XoaKhoaHoc/"+makhoahoc
        //url:`http://sv.myclass.vn/api/QuanLyTrungTam/XoaKhoaHoc/${makhoahoc}`
    })
}
KhoaHocServices.prototype.SuaKhoaHoc = function(khoahoc){
    return $.ajax({
        type:"PUT",
        url: 'http://sv.myclass.vn/api/QuanLyTrungTam/CapNhatKhoaHoc',
        dataType:'json',
        data:khoahoc
    })
}
KhoaHocServices.prototype.LayKhoaHocNguoiDungHienTai = function(taikhoan){
    return $.ajax({
        type:"GET",
        url: "http://sv.myclass.vn/api/QuanLyTrungTam/LayThongtinKhoaHoc?taikhoan="+taikhoan
        //url:`http://sv.myclass.vn/api/QuanLyTrungTam/LayThongtinKhoaHoc?taikhoan=${taikhoan}`
    })
}
KhoaHocServices.prototype.LayDanhSachKhoaHoc = function(){
    return $.ajax({
        type:"GET",
        url: "http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachKhoaHoc"
    })
}
KhoaHocServices.prototype.ChiTietKhoaHoc = function(id){
    return $.ajax({
        type:"GET",
        url: "http://sv.myclass.vn/api/QuanLyTrungTam/ChiTietKhoaHoc/"+id
        //url: `http://sv.myclass.vn/api/QuanLyTrungTam/ChiTietKhoaHoc/${id}`
    })
}
KhoaHocServices.prototype.GhiDanhKhoaHoc = function(khoahoc){
    return $.ajax({
        type:"POST",
        url: "http://sv.myclass.vn/api/QuanLyTrungTam/GhiDanhKhoaHoc",
        contentType:'application/json',
        data:khoahoc
    })
} 
