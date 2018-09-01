function DanhSachKhoaHoc(){
    this.DSKH = [];
}

DanhSachKhoaHoc.prototype.ThemKhoaHoc = function(khoaHoc){
    this.DSKH.push(khoaHoc);
}

DanhSachKhoaHoc.prototype.TimKhoaHocTheoMa = function(maKhoaHoc){
    for(var i = 0; i < this.DSKH.length; i++){
        if(this.DSKH[i].MaKhoaHoc === maKhoaHoc){
           return i;
        }
    }
}
DanhSachKhoaHoc.prototype.XoaKhoaHoc = function(maKhoaHoc){
        var index = this.TimKhoaHocTheoMa(maKhoaHoc);
        this.DSKH.splice(index,1);
}

DanhSachKhoaHoc.prototype.XoaNhieuKhoaHoc = function(mangKhoaHoc){
    for( var i = 0; i < mangKhoaHoc.length;i++ ){
        for(var j = 0; j < this.DSKH.length;j++){
            if(mangKhoaHoc[i] === this.DSKH[j].MaKhoaHoc)
            {
                this.DSKH.splice(j,1);
            }
        }
    }
}

DanhSachKhoaHoc.prototype.TimKhoaHocTheoMaLoc = function(tukhoa){
    var mangTimKiem = [];
    var maCanTim = tukhoa.toLowerCase().trim();
    for(var i = 0 ; i< this.DSKH.length ;i++)
    {
        if(this.DSKH[i].MaKhoaHoc.toLowerCase().trim().search(maCanTim) !== -1){
            mangTimKiem.push(this.DSKH[i]);
        }
    }
    return mangTimKiem;
}

DanhSachKhoaHoc.prototype.TimKhoaHocTheoTen = function(tukhoa){
    var mangTimKiem = [];
    var tenCanTim = tukhoa.toLowerCase().trim();
    for(var i = 0 ; i< this.DSKH.length ;i++)
    {
        if(this.DSKH[i].TenKhoaHoc.toLowerCase().trim().search(tenCanTim) !== -1){
            mangTimKiem.push(this.DSKH[i]);
        }
    }
    return mangTimKiem;
}

DanhSachKhoaHoc.prototype.CapNhatKhoaHoc = function(khoaHocEdit){
    var index = this.TimKhoaHocTheoMa(khoaHocEdit.MaKhoaHoc);
    var khoaHocHienTai = this.DSKH[index];
    khoaHocHienTai.TenKhoaHoc = khoaHocEdit.TenKhoaHoc;
    khoaHocHienTai.MoTa = khoaHocEdit.MoTa;
    khoaHocHienTai.LuotXem = khoaHocEdit.LuotXem;
    khoaHocHienTai.NguoiTao = khoaHocEdit.NguoiTao;
}
