function DanhSachNguoiDung(){
    this.DSND = [];
}

DanhSachNguoiDung.prototype.ThemNguoiDung = function(nguoiDung){
    this.DSND.push(nguoiDung);
}

DanhSachNguoiDung.prototype.TimNguoiDungTheoTaiKhoan = function(taikhoan){
    for(var i = 0; i < this.DSND.length; i++){
        if(this.DSND[i].TaiKhoan === taikhoan){
           return i;
        }
    }
}
DanhSachNguoiDung.prototype.XoaNguoiDung = function(taikhoan){
        var index = this.TimNguoiDungTheoTaiKhoan(taikhoan);
        this.DSND.splice(index,1);
}

DanhSachNguoiDung.prototype.XoaNhieuNguoiDung = function(mangTaiKhoan){
    for( var i = 0; i < mangTaiKhoan.length;i++ ){
        for(var j = 0; j < this.DSND.length;j++){
            if(mangTaiKhoan[i] === this.DSND[j].TaiKhoan)
            {
                this.DSND.splice(j,1);
            }
        }
    }
}

DanhSachNguoiDung.prototype.TimNguoiDungTheoTen = function(tukhoa){
    var mangTimKiem = [];
    var tenCanTim = tukhoa.toLowerCase().trim();
    for(var i = 0 ; i< this.DSND.length ;i++)
    {
        if(this.DSND[i].HoTen.toLowerCase().trim().search(tenCanTim) !== -1){
            mangTimKiem.push(this.DSND[i]);
        }
    }
    return mangTimKiem;
}
DanhSachNguoiDung.prototype.TimNguoiDungTheoTaiKhoan_Keyup = function(tukhoa){
    var mangTimKiem = [];
    var tkCanTim = tukhoa.toLowerCase().trim();
    for(var i = 0 ; i< this.DSND.length ;i++)
    {
        if(this.DSND[i].TaiKhoan.toLowerCase().trim().search(tkCanTim) !== -1){
            mangTimKiem.push(this.DSND[i]);
        }
    }
    return mangTimKiem;
}

DanhSachNguoiDung.prototype.CapNhatNguoiDung = function(nguoiDungEdit){
    var index = this.TimNguoiDungTheoTaiKhoan(nguoiDungEdit.TaiKhoan);
    var nguoiDungHienTai = this.DSND[index];
    nguoiDungHienTai.MatKhau = nguoiDungEdit.MatKhau;
    nguoiDungHienTai.HoTen = nguoiDungEdit.HoTen;
    nguoiDungHienTai.Email = nguoiDungEdit.Email;
    nguoiDungHienTai.Sdt = nguoiDungEdit.Sdt;
}
