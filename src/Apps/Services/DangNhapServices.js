function DangNhapServices(){

}
DangNhapServices.prototype.AjaxDangNhap = function(taikhoan,matkhau){
    return $.ajax({
        type:"GET",
        url: "http://sv.myclass.vn/api/QuanLyTrungTam/DangNhap?taikhoan="+taikhoan+"&matkhau="+matkhau
        //url: `http://sv.myclass.vn/api/QuanLyTrungTam/DangNhap?taikhoan=${taikhoan}&matkhau=${matkhau}`
    })
}