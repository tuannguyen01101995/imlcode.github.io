$(document).ready(function () {
    var nguoiDung = new NguoiDung();

    function Check_LoaiNguoiDung() {
        nguoiDung = GetLocal();
        if (KiemtraTonTai()){
            if(nguoiDung.MaLoaiNguoiDung === "GV"){
                
            }
        }
        else{
            window.location.assign('trang-chu.html');
        }

    }


    function GetLocal() {
        /// Xóa local
        //localStorage.removeItem('DanhSachNguoiDung');
        //// lấy ds người dùng 
        if (KiemtraTonTai()) {
            var ItemLocal = JSON.parse(localStorage.getItem('LocalUser'));
            return ItemLocal;
        }
        return [];
    }
    //Hàm kiểm tra tồn tại
    function KiemtraTonTai() {
        var localItem = localStorage.getItem('LocalUser');
        if (localItem !== null) {
            return true;
        }
        return false;
    }

    Check_LoaiNguoiDung();

});