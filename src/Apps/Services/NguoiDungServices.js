function NguoiDungServices(){

}
NguoiDungServices.prototype.AjaxThemNguoiDung = function(nguoiDung){
    return $.ajax({
        type:'POST',
        url:'http://sv.myclass.vn/api/QuanLyTrungTam/ThemNguoiDung',
        dataType:'json',
        data: nguoiDung
    })
}
NguoiDungServices.prototype.AjaxLayDanhSachNguoiDung = function(){
    return $.ajax({
        type:"GET",
        url:'http://sv.myclass.vn/api/QuanLyTrungTam/danhsachnguoidung',
        dataType:'json'
    })
}
NguoiDungServices.prototype.AjaxXoaNguoiDung = function(id){
    return $.ajax({
        type:'DELETE',
        url: "http://sv.myclass.vn/api/QuanLyTrungTam/XoaNguoiDung/"+id
        //url:`http://sv.myclass.vn/api/QuanLyTrungTam/XoaNguoiDung/${id} `
    })
}
NguoiDungServices.prototype.AjaxCapNhatNguoiDung= function(nguoiDungEdit){
    var nguoiDung = JSON.stringify(nguoiDungEdit);
    return $.ajax({
        type:'PUT',
        url:'http://sv.myclass.vn/api/QuanLyTrungTam/CapNhatThongTinNguoiDung',
        data: nguoiDung,
        contentType:'application/json'
    })
}
NguoiDungServices.prototype.AjaxLayThongTinNguoiDung = function(id){
    return $.ajax({
        type:'GET',
        url: "http://sv.myclass.vn/api/QuanLyTrungTam/ThongTinNguoiDung?taikhoan="+id
        //url:`http://sv.myclass.vn/api/QuanLyTrungTam/ThongTinNguoiDung?taikhoan=${id} `
    })
}
