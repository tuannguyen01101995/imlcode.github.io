function DangKyServices(){

}
DangKyServices.prototype.AjaxDangKy = function(nguoiDung){
    return $.ajax({
        type:'POST',
        url:'http://sv.myclass.vn/api/QuanLyTrungTam/DangKy',
        dataType:'json',
        data: nguoiDung
    })
}