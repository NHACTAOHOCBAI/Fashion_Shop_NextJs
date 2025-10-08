const provinces = [
    {
        "value": "Thành phố Hà Nội",
        "label": "Thành phố Hà Nội"
    },
    {
        "value": "Tỉnh Hà Giang",
        "label": "Tỉnh Hà Giang"
    },
    {
        "value": "Tỉnh Cao Bằng",
        "label": "Tỉnh Cao Bằng"
    },
    {
        "value": "Tỉnh Bắc Kạn",
        "label": "Tỉnh Bắc Kạn"
    },
    {
        "value": "Tỉnh Tuyên Quang",
        "label": "Tỉnh Tuyên Quang"
    },
    {
        "value": "Tỉnh Lào Cai",
        "label": "Tỉnh Lào Cai"
    },
    {
        "value": "Tỉnh Điện Biên",
        "label": "Tỉnh Điện Biên"
    },
    {
        "value": "Tỉnh Lai Châu",
        "label": "Tỉnh Lai Châu"
    },
    {
        "value": "Tỉnh Sơn La",
        "label": "Tỉnh Sơn La"
    },
    {
        "value": "Tỉnh Yên Bái",
        "label": "Tỉnh Yên Bái"
    },
    {
        "value": "Tỉnh Hoà Bình",
        "label": "Tỉnh Hoà Bình"
    },
    {
        "value": "Tỉnh Thái Nguyên",
        "label": "Tỉnh Thái Nguyên"
    },
    {
        "value": "Tỉnh Lạng Sơn",
        "label": "Tỉnh Lạng Sơn"
    },
    {
        "value": "Tỉnh Quảng Ninh",
        "label": "Tỉnh Quảng Ninh"
    },
    {
        "value": "Tỉnh Bắc Giang",
        "label": "Tỉnh Bắc Giang"
    },
    {
        "value": "Tỉnh Phú Thọ",
        "label": "Tỉnh Phú Thọ"
    },
    {
        "value": "Tỉnh Vĩnh Phúc",
        "label": "Tỉnh Vĩnh Phúc"
    },
    {
        "value": "Tỉnh Bắc Ninh",
        "label": "Tỉnh Bắc Ninh"
    },
    {
        "value": "Tỉnh Hải Dương",
        "label": "Tỉnh Hải Dương"
    },
    {
        "value": "Thành phố Hải Phòng",
        "label": "Thành phố Hải Phòng"
    },
    {
        "value": "Tỉnh Hưng Yên",
        "label": "Tỉnh Hưng Yên"
    },
    {
        "value": "Tỉnh Thái Bình",
        "label": "Tỉnh Thái Bình"
    },
    {
        "value": "Tỉnh Hà Nam",
        "label": "Tỉnh Hà Nam"
    },
    {
        "value": "Tỉnh Nam Định",
        "label": "Tỉnh Nam Định"
    },
    {
        "value": "Tỉnh Ninh Bình",
        "label": "Tỉnh Ninh Bình"
    },
    {
        "value": "Tỉnh Thanh Hóa",
        "label": "Tỉnh Thanh Hóa"
    },
    {
        "value": "Tỉnh Nghệ An",
        "label": "Tỉnh Nghệ An"
    },
    {
        "value": "Tỉnh Hà Tĩnh",
        "label": "Tỉnh Hà Tĩnh"
    },
    {
        "value": "Tỉnh Quảng Bình",
        "label": "Tỉnh Quảng Bình"
    },
    {
        "value": "Tỉnh Quảng Trị",
        "label": "Tỉnh Quảng Trị"
    },
    {
        "value": "Thành phố Huế",
        "label": "Thành phố Huế"
    },
    {
        "value": "Thành phố Đà Nẵng",
        "label": "Thành phố Đà Nẵng"
    },
    {
        "value": "Tỉnh Quảng Nam",
        "label": "Tỉnh Quảng Nam"
    },
    {
        "value": "Tỉnh Quảng Ngãi",
        "label": "Tỉnh Quảng Ngãi"
    },
    {
        "value": "Tỉnh Bình Định",
        "label": "Tỉnh Bình Định"
    },
    {
        "value": "Tỉnh Phú Yên",
        "label": "Tỉnh Phú Yên"
    },
    {
        "value": "Tỉnh Khánh Hòa",
        "label": "Tỉnh Khánh Hòa"
    },
    {
        "value": "Tỉnh Ninh Thuận",
        "label": "Tỉnh Ninh Thuận"
    },
    {
        "value": "Tỉnh Bình Thuận",
        "label": "Tỉnh Bình Thuận"
    },
    {
        "value": "Tỉnh Kon Tum",
        "label": "Tỉnh Kon Tum"
    },
    {
        "value": "Tỉnh Gia Lai",
        "label": "Tỉnh Gia Lai"
    },
    {
        "value": "Tỉnh Đắk Lắk",
        "label": "Tỉnh Đắk Lắk"
    },
    {
        "value": "Tỉnh Đắk Nông",
        "label": "Tỉnh Đắk Nông"
    },
    {
        "value": "Tỉnh Lâm Đồng",
        "label": "Tỉnh Lâm Đồng"
    },
    {
        "value": "Tỉnh Bình Phước",
        "label": "Tỉnh Bình Phước"
    },
    {
        "value": "Tỉnh Tây Ninh",
        "label": "Tỉnh Tây Ninh"
    },
    {
        "value": "Tỉnh Bình Dương",
        "label": "Tỉnh Bình Dương"
    },
    {
        "value": "Tỉnh Đồng Nai",
        "label": "Tỉnh Đồng Nai"
    },
    {
        "value": "Tỉnh Bà Rịa - Vũng Tàu",
        "label": "Tỉnh Bà Rịa - Vũng Tàu"
    },
    {
        "value": "Thành phố Hồ Chí Minh",
        "label": "Thành phố Hồ Chí Minh"
    },
    {
        "value": "Tỉnh Long An",
        "label": "Tỉnh Long An"
    },
    {
        "value": "Tỉnh Tiền Giang",
        "label": "Tỉnh Tiền Giang"
    },
    {
        "value": "Tỉnh Bến Tre",
        "label": "Tỉnh Bến Tre"
    },
    {
        "value": "Tỉnh Trà Vinh",
        "label": "Tỉnh Trà Vinh"
    },
    {
        "value": "Tỉnh Vĩnh Long",
        "label": "Tỉnh Vĩnh Long"
    },
    {
        "value": "Tỉnh Đồng Tháp",
        "label": "Tỉnh Đồng Tháp"
    },
    {
        "value": "Tỉnh An Giang",
        "label": "Tỉnh An Giang"
    },
    {
        "value": "Tỉnh Kiên Giang",
        "label": "Tỉnh Kiên Giang"
    },
    {
        "value": "Thành phố Cần Thơ",
        "label": "Thành phố Cần Thơ"
    },
    {
        "value": "Tỉnh Hậu Giang",
        "label": "Tỉnh Hậu Giang"
    },
    {
        "value": "Tỉnh Sóc Trăng",
        "label": "Tỉnh Sóc Trăng"
    },
    {
        "value": "Tỉnh Bạc Liêu",
        "label": "Tỉnh Bạc Liêu"
    },
    {
        "value": "Tỉnh Cà Mau",
        "label": "Tỉnh Cà Mau"
    }
]
const address = [
    {
        "provice": "Thành phố Hà Nội",
        "disctricts": [
            {
                "value": "Quận Ba Đình",
                "label": "Quận Ba Đình"
            },
            {
                "value": "Quận Hoàn Kiếm",
                "label": "Quận Hoàn Kiếm"
            },
            {
                "value": "Quận Tây Hồ",
                "label": "Quận Tây Hồ"
            },
            {
                "value": "Quận Long Biên",
                "label": "Quận Long Biên"
            },
            {
                "value": "Quận Cầu Giấy",
                "label": "Quận Cầu Giấy"
            },
            {
                "value": "Quận Đống Đa",
                "label": "Quận Đống Đa"
            },
            {
                "value": "Quận Hai Bà Trưng",
                "label": "Quận Hai Bà Trưng"
            },
            {
                "value": "Quận Hoàng Mai",
                "label": "Quận Hoàng Mai"
            },
            {
                "value": "Quận Thanh Xuân",
                "label": "Quận Thanh Xuân"
            },
            {
                "value": "Huyện Sóc Sơn",
                "label": "Huyện Sóc Sơn"
            },
            {
                "value": "Huyện Đông Anh",
                "label": "Huyện Đông Anh"
            },
            {
                "value": "Huyện Gia Lâm",
                "label": "Huyện Gia Lâm"
            },
            {
                "value": "Quận Nam Từ Liêm",
                "label": "Quận Nam Từ Liêm"
            },
            {
                "value": "Huyện Thanh Trì",
                "label": "Huyện Thanh Trì"
            },
            {
                "value": "Quận Bắc Từ Liêm",
                "label": "Quận Bắc Từ Liêm"
            },
            {
                "value": "Huyện Mê Linh",
                "label": "Huyện Mê Linh"
            },
            {
                "value": "Quận Hà Đông",
                "label": "Quận Hà Đông"
            },
            {
                "value": "Thị xã Sơn Tây",
                "label": "Thị xã Sơn Tây"
            },
            {
                "value": "Huyện Ba Vì",
                "label": "Huyện Ba Vì"
            },
            {
                "value": "Huyện Phúc Thọ",
                "label": "Huyện Phúc Thọ"
            },
            {
                "value": "Huyện Đan Phượng",
                "label": "Huyện Đan Phượng"
            },
            {
                "value": "Huyện Hoài Đức",
                "label": "Huyện Hoài Đức"
            },
            {
                "value": "Huyện Quốc Oai",
                "label": "Huyện Quốc Oai"
            },
            {
                "value": "Huyện Thạch Thất",
                "label": "Huyện Thạch Thất"
            },
            {
                "value": "Huyện Chương Mỹ",
                "label": "Huyện Chương Mỹ"
            },
            {
                "value": "Huyện Thanh Oai",
                "label": "Huyện Thanh Oai"
            },
            {
                "value": "Huyện Thường Tín",
                "label": "Huyện Thường Tín"
            },
            {
                "value": "Huyện Phú Xuyên",
                "label": "Huyện Phú Xuyên"
            },
            {
                "value": "Huyện Ứng Hòa",
                "label": "Huyện Ứng Hòa"
            },
            {
                "value": "Huyện Mỹ Đức",
                "label": "Huyện Mỹ Đức"
            }
        ]
    },
    {
        "provice": "Tỉnh Hà Giang",
        "disctricts": [
            {
                "value": "Thành phố Hà Giang",
                "label": "Thành phố Hà Giang"
            },
            {
                "value": "Huyện Đồng Văn",
                "label": "Huyện Đồng Văn"
            },
            {
                "value": "Huyện Mèo Vạc",
                "label": "Huyện Mèo Vạc"
            },
            {
                "value": "Huyện Yên Minh",
                "label": "Huyện Yên Minh"
            },
            {
                "value": "Huyện Quản Bạ",
                "label": "Huyện Quản Bạ"
            },
            {
                "value": "Huyện Vị Xuyên",
                "label": "Huyện Vị Xuyên"
            },
            {
                "value": "Huyện Bắc Mê",
                "label": "Huyện Bắc Mê"
            },
            {
                "value": "Huyện Hoàng Su Phì",
                "label": "Huyện Hoàng Su Phì"
            },
            {
                "value": "Huyện Xín Mần",
                "label": "Huyện Xín Mần"
            },
            {
                "value": "Huyện Bắc Quang",
                "label": "Huyện Bắc Quang"
            },
            {
                "value": "Huyện Quang Bình",
                "label": "Huyện Quang Bình"
            }
        ]
    },
    {
        "provice": "Tỉnh Cao Bằng",
        "disctricts": [
            {
                "value": "Thành phố Cao Bằng",
                "label": "Thành phố Cao Bằng"
            },
            {
                "value": "Huyện Bảo Lâm",
                "label": "Huyện Bảo Lâm"
            },
            {
                "value": "Huyện Bảo Lạc",
                "label": "Huyện Bảo Lạc"
            },
            {
                "value": "Huyện Hà Quảng",
                "label": "Huyện Hà Quảng"
            },
            {
                "value": "Huyện Trùng Khánh",
                "label": "Huyện Trùng Khánh"
            },
            {
                "value": "Huyện Hạ Lang",
                "label": "Huyện Hạ Lang"
            },
            {
                "value": "Huyện Quảng Hòa",
                "label": "Huyện Quảng Hòa"
            },
            {
                "value": "Huyện Hoà An",
                "label": "Huyện Hoà An"
            },
            {
                "value": "Huyện Nguyên Bình",
                "label": "Huyện Nguyên Bình"
            },
            {
                "value": "Huyện Thạch An",
                "label": "Huyện Thạch An"
            }
        ]
    },
    {
        "provice": "Tỉnh Bắc Kạn",
        "disctricts": [
            {
                "value": "Thành Phố Bắc Kạn",
                "label": "Thành Phố Bắc Kạn"
            },
            {
                "value": "Huyện Pác Nặm",
                "label": "Huyện Pác Nặm"
            },
            {
                "value": "Huyện Ba Bể",
                "label": "Huyện Ba Bể"
            },
            {
                "value": "Huyện Ngân Sơn",
                "label": "Huyện Ngân Sơn"
            },
            {
                "value": "Huyện Bạch Thông",
                "label": "Huyện Bạch Thông"
            },
            {
                "value": "Huyện Chợ Đồn",
                "label": "Huyện Chợ Đồn"
            },
            {
                "value": "Huyện Chợ Mới",
                "label": "Huyện Chợ Mới"
            },
            {
                "value": "Huyện Na Rì",
                "label": "Huyện Na Rì"
            }
        ]
    },
    {
        "provice": "Tỉnh Tuyên Quang",
        "disctricts": [
            {
                "value": "Thành phố Tuyên Quang",
                "label": "Thành phố Tuyên Quang"
            },
            {
                "value": "Huyện Lâm Bình",
                "label": "Huyện Lâm Bình"
            },
            {
                "value": "Huyện Na Hang",
                "label": "Huyện Na Hang"
            },
            {
                "value": "Huyện Chiêm Hóa",
                "label": "Huyện Chiêm Hóa"
            },
            {
                "value": "Huyện Hàm Yên",
                "label": "Huyện Hàm Yên"
            },
            {
                "value": "Huyện Yên Sơn",
                "label": "Huyện Yên Sơn"
            },
            {
                "value": "Huyện Sơn Dương",
                "label": "Huyện Sơn Dương"
            }
        ]
    },
    {
        "provice": "Tỉnh Lào Cai",
        "disctricts": [
            {
                "value": "Thành phố Lào Cai",
                "label": "Thành phố Lào Cai"
            },
            {
                "value": "Huyện Bát Xát",
                "label": "Huyện Bát Xát"
            },
            {
                "value": "Huyện Mường Khương",
                "label": "Huyện Mường Khương"
            },
            {
                "value": "Huyện Si Ma Cai",
                "label": "Huyện Si Ma Cai"
            },
            {
                "value": "Huyện Bắc Hà",
                "label": "Huyện Bắc Hà"
            },
            {
                "value": "Huyện Bảo Thắng",
                "label": "Huyện Bảo Thắng"
            },
            {
                "value": "Huyện Bảo Yên",
                "label": "Huyện Bảo Yên"
            },
            {
                "value": "Thị xã Sa Pa",
                "label": "Thị xã Sa Pa"
            },
            {
                "value": "Huyện Văn Bàn",
                "label": "Huyện Văn Bàn"
            }
        ]
    },
    {
        "provice": "Tỉnh Điện Biên",
        "disctricts": [
            {
                "value": "Thành phố Điện Biên Phủ",
                "label": "Thành phố Điện Biên Phủ"
            },
            {
                "value": "Thị xã Mường Lay",
                "label": "Thị xã Mường Lay"
            },
            {
                "value": "Huyện Mường Nhé",
                "label": "Huyện Mường Nhé"
            },
            {
                "value": "Huyện Mường Chà",
                "label": "Huyện Mường Chà"
            },
            {
                "value": "Huyện Tủa Chùa",
                "label": "Huyện Tủa Chùa"
            },
            {
                "value": "Huyện Tuần Giáo",
                "label": "Huyện Tuần Giáo"
            },
            {
                "value": "Huyện Điện Biên",
                "label": "Huyện Điện Biên"
            },
            {
                "value": "Huyện Điện Biên Đông",
                "label": "Huyện Điện Biên Đông"
            },
            {
                "value": "Huyện Mường Ảng",
                "label": "Huyện Mường Ảng"
            },
            {
                "value": "Huyện Nậm Pồ",
                "label": "Huyện Nậm Pồ"
            }
        ]
    },
    {
        "provice": "Tỉnh Lai Châu",
        "disctricts": [
            {
                "value": "Thành phố Lai Châu",
                "label": "Thành phố Lai Châu"
            },
            {
                "value": "Huyện Tam Đường",
                "label": "Huyện Tam Đường"
            },
            {
                "value": "Huyện Mường Tè",
                "label": "Huyện Mường Tè"
            },
            {
                "value": "Huyện Sìn Hồ",
                "label": "Huyện Sìn Hồ"
            },
            {
                "value": "Huyện Phong Thổ",
                "label": "Huyện Phong Thổ"
            },
            {
                "value": "Huyện Than Uyên",
                "label": "Huyện Than Uyên"
            },
            {
                "value": "Huyện Tân Uyên",
                "label": "Huyện Tân Uyên"
            },
            {
                "value": "Huyện Nậm Nhùn",
                "label": "Huyện Nậm Nhùn"
            }
        ]
    },
    {
        "provice": "Tỉnh Sơn La",
        "disctricts": [
            {
                "value": "Thành phố Sơn La",
                "label": "Thành phố Sơn La"
            },
            {
                "value": "Huyện Quỳnh Nhai",
                "label": "Huyện Quỳnh Nhai"
            },
            {
                "value": "Huyện Thuận Châu",
                "label": "Huyện Thuận Châu"
            },
            {
                "value": "Huyện Mường La",
                "label": "Huyện Mường La"
            },
            {
                "value": "Huyện Bắc Yên",
                "label": "Huyện Bắc Yên"
            },
            {
                "value": "Huyện Phù Yên",
                "label": "Huyện Phù Yên"
            },
            {
                "value": "Huyện Mộc Châu",
                "label": "Huyện Mộc Châu"
            },
            {
                "value": "Huyện Yên Châu",
                "label": "Huyện Yên Châu"
            },
            {
                "value": "Huyện Mai Sơn",
                "label": "Huyện Mai Sơn"
            },
            {
                "value": "Huyện Sông Mã",
                "label": "Huyện Sông Mã"
            },
            {
                "value": "Huyện Sốp Cộp",
                "label": "Huyện Sốp Cộp"
            },
            {
                "value": "Huyện Vân Hồ",
                "label": "Huyện Vân Hồ"
            }
        ]
    },
    {
        "provice": "Tỉnh Yên Bái",
        "disctricts": [
            {
                "value": "Thành phố Yên Bái",
                "label": "Thành phố Yên Bái"
            },
            {
                "value": "Thị xã Nghĩa Lộ",
                "label": "Thị xã Nghĩa Lộ"
            },
            {
                "value": "Huyện Lục Yên",
                "label": "Huyện Lục Yên"
            },
            {
                "value": "Huyện Văn Yên",
                "label": "Huyện Văn Yên"
            },
            {
                "value": "Huyện Mù Căng Chải",
                "label": "Huyện Mù Căng Chải"
            },
            {
                "value": "Huyện Trấn Yên",
                "label": "Huyện Trấn Yên"
            },
            {
                "value": "Huyện Trạm Tấu",
                "label": "Huyện Trạm Tấu"
            },
            {
                "value": "Huyện Văn Chấn",
                "label": "Huyện Văn Chấn"
            },
            {
                "value": "Huyện Yên Bình",
                "label": "Huyện Yên Bình"
            }
        ]
    },
    {
        "provice": "Tỉnh Hoà Bình",
        "disctricts": [
            {
                "value": "Thành phố Hòa Bình",
                "label": "Thành phố Hòa Bình"
            },
            {
                "value": "Huyện Đà Bắc",
                "label": "Huyện Đà Bắc"
            },
            {
                "value": "Huyện Lương Sơn",
                "label": "Huyện Lương Sơn"
            },
            {
                "value": "Huyện Kim Bôi",
                "label": "Huyện Kim Bôi"
            },
            {
                "value": "Huyện Cao Phong",
                "label": "Huyện Cao Phong"
            },
            {
                "value": "Huyện Tân Lạc",
                "label": "Huyện Tân Lạc"
            },
            {
                "value": "Huyện Mai Châu",
                "label": "Huyện Mai Châu"
            },
            {
                "value": "Huyện Lạc Sơn",
                "label": "Huyện Lạc Sơn"
            },
            {
                "value": "Huyện Yên Thủy",
                "label": "Huyện Yên Thủy"
            },
            {
                "value": "Huyện Lạc Thủy",
                "label": "Huyện Lạc Thủy"
            }
        ]
    },
    {
        "provice": "Tỉnh Thái Nguyên",
        "disctricts": [
            {
                "value": "Thành phố Thái Nguyên",
                "label": "Thành phố Thái Nguyên"
            },
            {
                "value": "Thành phố Sông Công",
                "label": "Thành phố Sông Công"
            },
            {
                "value": "Huyện Định Hóa",
                "label": "Huyện Định Hóa"
            },
            {
                "value": "Huyện Phú Lương",
                "label": "Huyện Phú Lương"
            },
            {
                "value": "Huyện Đồng Hỷ",
                "label": "Huyện Đồng Hỷ"
            },
            {
                "value": "Huyện Võ Nhai",
                "label": "Huyện Võ Nhai"
            },
            {
                "value": "Huyện Đại Từ",
                "label": "Huyện Đại Từ"
            },
            {
                "value": "Thành phố Phổ Yên",
                "label": "Thành phố Phổ Yên"
            },
            {
                "value": "Huyện Phú Bình",
                "label": "Huyện Phú Bình"
            }
        ]
    },
    {
        "provice": "Tỉnh Lạng Sơn",
        "disctricts": [
            {
                "value": "Thành phố Lạng Sơn",
                "label": "Thành phố Lạng Sơn"
            },
            {
                "value": "Huyện Tràng Định",
                "label": "Huyện Tràng Định"
            },
            {
                "value": "Huyện Bình Gia",
                "label": "Huyện Bình Gia"
            },
            {
                "value": "Huyện Văn Lãng",
                "label": "Huyện Văn Lãng"
            },
            {
                "value": "Huyện Cao Lộc",
                "label": "Huyện Cao Lộc"
            },
            {
                "value": "Huyện Văn Quan",
                "label": "Huyện Văn Quan"
            },
            {
                "value": "Huyện Bắc Sơn",
                "label": "Huyện Bắc Sơn"
            },
            {
                "value": "Huyện Hữu Lũng",
                "label": "Huyện Hữu Lũng"
            },
            {
                "value": "Huyện Chi Lăng",
                "label": "Huyện Chi Lăng"
            },
            {
                "value": "Huyện Lộc Bình",
                "label": "Huyện Lộc Bình"
            },
            {
                "value": "Huyện Đình Lập",
                "label": "Huyện Đình Lập"
            }
        ]
    },
    {
        "provice": "Tỉnh Quảng Ninh",
        "disctricts": [
            {
                "value": "Thành phố Hạ Long",
                "label": "Thành phố Hạ Long"
            },
            {
                "value": "Thành phố Móng Cái",
                "label": "Thành phố Móng Cái"
            },
            {
                "value": "Thành phố Cẩm Phả",
                "label": "Thành phố Cẩm Phả"
            },
            {
                "value": "Thành phố Uông Bí",
                "label": "Thành phố Uông Bí"
            },
            {
                "value": "Huyện Bình Liêu",
                "label": "Huyện Bình Liêu"
            },
            {
                "value": "Huyện Tiên Yên",
                "label": "Huyện Tiên Yên"
            },
            {
                "value": "Huyện Đầm Hà",
                "label": "Huyện Đầm Hà"
            },
            {
                "value": "Huyện Hải Hà",
                "label": "Huyện Hải Hà"
            },
            {
                "value": "Huyện Ba Chẽ",
                "label": "Huyện Ba Chẽ"
            },
            {
                "value": "Huyện Vân Đồn",
                "label": "Huyện Vân Đồn"
            },
            {
                "value": "Thành phố Đông Triều",
                "label": "Thành phố Đông Triều"
            },
            {
                "value": "Thị xã Quảng Yên",
                "label": "Thị xã Quảng Yên"
            },
            {
                "value": "Huyện Cô Tô",
                "label": "Huyện Cô Tô"
            }
        ]
    },
    {
        "provice": "Tỉnh Bắc Giang",
        "disctricts": [
            {
                "value": "Thành phố Bắc Giang",
                "label": "Thành phố Bắc Giang"
            },
            {
                "value": "Huyện Yên Thế",
                "label": "Huyện Yên Thế"
            },
            {
                "value": "Huyện Tân Yên",
                "label": "Huyện Tân Yên"
            },
            {
                "value": "Huyện Lạng Giang",
                "label": "Huyện Lạng Giang"
            },
            {
                "value": "Huyện Lục Nam",
                "label": "Huyện Lục Nam"
            },
            {
                "value": "Huyện Lục Ngạn",
                "label": "Huyện Lục Ngạn"
            },
            {
                "value": "Huyện Sơn Động",
                "label": "Huyện Sơn Động"
            },
            {
                "value": "Thị xã Việt Yên",
                "label": "Thị xã Việt Yên"
            },
            {
                "value": "Huyện Hiệp Hòa",
                "label": "Huyện Hiệp Hòa"
            },
            {
                "value": "Thị xã Chũ",
                "label": "Thị xã Chũ"
            }
        ]
    },
    {
        "provice": "Tỉnh Phú Thọ",
        "disctricts": [
            {
                "value": "Thành phố Việt Trì",
                "label": "Thành phố Việt Trì"
            },
            {
                "value": "Thị xã Phú Thọ",
                "label": "Thị xã Phú Thọ"
            },
            {
                "value": "Huyện Đoan Hùng",
                "label": "Huyện Đoan Hùng"
            },
            {
                "value": "Huyện Hạ Hoà",
                "label": "Huyện Hạ Hoà"
            },
            {
                "value": "Huyện Thanh Ba",
                "label": "Huyện Thanh Ba"
            },
            {
                "value": "Huyện Phù Ninh",
                "label": "Huyện Phù Ninh"
            },
            {
                "value": "Huyện Yên Lập",
                "label": "Huyện Yên Lập"
            },
            {
                "value": "Huyện Cẩm Khê",
                "label": "Huyện Cẩm Khê"
            },
            {
                "value": "Huyện Tam Nông",
                "label": "Huyện Tam Nông"
            },
            {
                "value": "Huyện Lâm Thao",
                "label": "Huyện Lâm Thao"
            },
            {
                "value": "Huyện Thanh Sơn",
                "label": "Huyện Thanh Sơn"
            },
            {
                "value": "Huyện Thanh Thuỷ",
                "label": "Huyện Thanh Thuỷ"
            },
            {
                "value": "Huyện Tân Sơn",
                "label": "Huyện Tân Sơn"
            }
        ]
    },
    {
        "provice": "Tỉnh Vĩnh Phúc",
        "disctricts": [
            {
                "value": "Thành phố Vĩnh Yên",
                "label": "Thành phố Vĩnh Yên"
            },
            {
                "value": "Thành phố Phúc Yên",
                "label": "Thành phố Phúc Yên"
            },
            {
                "value": "Huyện Lập Thạch",
                "label": "Huyện Lập Thạch"
            },
            {
                "value": "Huyện Tam Dương",
                "label": "Huyện Tam Dương"
            },
            {
                "value": "Huyện Tam Đảo",
                "label": "Huyện Tam Đảo"
            },
            {
                "value": "Huyện Bình Xuyên",
                "label": "Huyện Bình Xuyên"
            },
            {
                "value": "Huyện Yên Lạc",
                "label": "Huyện Yên Lạc"
            },
            {
                "value": "Huyện Vĩnh Tường",
                "label": "Huyện Vĩnh Tường"
            },
            {
                "value": "Huyện Sông Lô",
                "label": "Huyện Sông Lô"
            }
        ]
    },
    {
        "provice": "Tỉnh Bắc Ninh",
        "disctricts": [
            {
                "value": "Thành phố Bắc Ninh",
                "label": "Thành phố Bắc Ninh"
            },
            {
                "value": "Huyện Yên Phong",
                "label": "Huyện Yên Phong"
            },
            {
                "value": "Thị xã Quế Võ",
                "label": "Thị xã Quế Võ"
            },
            {
                "value": "Huyện Tiên Du",
                "label": "Huyện Tiên Du"
            },
            {
                "value": "Thành phố Từ Sơn",
                "label": "Thành phố Từ Sơn"
            },
            {
                "value": "Thị xã Thuận Thành",
                "label": "Thị xã Thuận Thành"
            },
            {
                "value": "Huyện Gia Bình",
                "label": "Huyện Gia Bình"
            },
            {
                "value": "Huyện Lương Tài",
                "label": "Huyện Lương Tài"
            }
        ]
    },
    {
        "provice": "Tỉnh Hải Dương",
        "disctricts": [
            {
                "value": "Thành phố Hải Dương",
                "label": "Thành phố Hải Dương"
            },
            {
                "value": "Thành phố Chí Linh",
                "label": "Thành phố Chí Linh"
            },
            {
                "value": "Huyện Nam Sách",
                "label": "Huyện Nam Sách"
            },
            {
                "value": "Thị xã Kinh Môn",
                "label": "Thị xã Kinh Môn"
            },
            {
                "value": "Huyện Kim Thành",
                "label": "Huyện Kim Thành"
            },
            {
                "value": "Huyện Thanh Hà",
                "label": "Huyện Thanh Hà"
            },
            {
                "value": "Huyện Cẩm Giàng",
                "label": "Huyện Cẩm Giàng"
            },
            {
                "value": "Huyện Bình Giang",
                "label": "Huyện Bình Giang"
            },
            {
                "value": "Huyện Gia Lộc",
                "label": "Huyện Gia Lộc"
            },
            {
                "value": "Huyện Tứ Kỳ",
                "label": "Huyện Tứ Kỳ"
            },
            {
                "value": "Huyện Ninh Giang",
                "label": "Huyện Ninh Giang"
            },
            {
                "value": "Huyện Thanh Miện",
                "label": "Huyện Thanh Miện"
            }
        ]
    },
    {
        "provice": "Thành phố Hải Phòng",
        "disctricts": [
            {
                "value": "Quận Hồng Bàng",
                "label": "Quận Hồng Bàng"
            },
            {
                "value": "Quận Ngô Quyền",
                "label": "Quận Ngô Quyền"
            },
            {
                "value": "Quận Lê Chân",
                "label": "Quận Lê Chân"
            },
            {
                "value": "Quận Hải An",
                "label": "Quận Hải An"
            },
            {
                "value": "Quận Kiến An",
                "label": "Quận Kiến An"
            },
            {
                "value": "Quận Đồ Sơn",
                "label": "Quận Đồ Sơn"
            },
            {
                "value": "Quận Dương Kinh",
                "label": "Quận Dương Kinh"
            },
            {
                "value": "Thành phố Thuỷ Nguyên",
                "label": "Thành phố Thuỷ Nguyên"
            },
            {
                "value": "Quận An Dương",
                "label": "Quận An Dương"
            },
            {
                "value": "Huyện An Lão",
                "label": "Huyện An Lão"
            },
            {
                "value": "Huyện Kiến Thuỵ",
                "label": "Huyện Kiến Thuỵ"
            },
            {
                "value": "Huyện Tiên Lãng",
                "label": "Huyện Tiên Lãng"
            },
            {
                "value": "Huyện Vĩnh Bảo",
                "label": "Huyện Vĩnh Bảo"
            },
            {
                "value": "Huyện Cát Hải",
                "label": "Huyện Cát Hải"
            },
            {
                "value": "Huyện Bạch Long Vĩ",
                "label": "Huyện Bạch Long Vĩ"
            }
        ]
    },
    {
        "provice": "Tỉnh Hưng Yên",
        "disctricts": [
            {
                "value": "Thành phố Hưng Yên",
                "label": "Thành phố Hưng Yên"
            },
            {
                "value": "Huyện Văn Lâm",
                "label": "Huyện Văn Lâm"
            },
            {
                "value": "Huyện Văn Giang",
                "label": "Huyện Văn Giang"
            },
            {
                "value": "Huyện Yên Mỹ",
                "label": "Huyện Yên Mỹ"
            },
            {
                "value": "Thị xã Mỹ Hào",
                "label": "Thị xã Mỹ Hào"
            },
            {
                "value": "Huyện Ân Thi",
                "label": "Huyện Ân Thi"
            },
            {
                "value": "Huyện Khoái Châu",
                "label": "Huyện Khoái Châu"
            },
            {
                "value": "Huyện Kim Động",
                "label": "Huyện Kim Động"
            },
            {
                "value": "Huyện Tiên Lữ",
                "label": "Huyện Tiên Lữ"
            },
            {
                "value": "Huyện Phù Cừ",
                "label": "Huyện Phù Cừ"
            }
        ]
    },
    {
        "provice": "Tỉnh Thái Bình",
        "disctricts": [
            {
                "value": "Thành phố Thái Bình",
                "label": "Thành phố Thái Bình"
            },
            {
                "value": "Huyện Quỳnh Phụ",
                "label": "Huyện Quỳnh Phụ"
            },
            {
                "value": "Huyện Hưng Hà",
                "label": "Huyện Hưng Hà"
            },
            {
                "value": "Huyện Đông Hưng",
                "label": "Huyện Đông Hưng"
            },
            {
                "value": "Huyện Thái Thụy",
                "label": "Huyện Thái Thụy"
            },
            {
                "value": "Huyện Tiền Hải",
                "label": "Huyện Tiền Hải"
            },
            {
                "value": "Huyện Kiến Xương",
                "label": "Huyện Kiến Xương"
            },
            {
                "value": "Huyện Vũ Thư",
                "label": "Huyện Vũ Thư"
            }
        ]
    },
    {
        "provice": "Tỉnh Hà Nam",
        "disctricts": [
            {
                "value": "Thành phố Phủ Lý",
                "label": "Thành phố Phủ Lý"
            },
            {
                "value": "Thị xã Duy Tiên",
                "label": "Thị xã Duy Tiên"
            },
            {
                "value": "Thị xã Kim Bảng",
                "label": "Thị xã Kim Bảng"
            },
            {
                "value": "Huyện Thanh Liêm",
                "label": "Huyện Thanh Liêm"
            },
            {
                "value": "Huyện Bình Lục",
                "label": "Huyện Bình Lục"
            },
            {
                "value": "Huyện Lý Nhân",
                "label": "Huyện Lý Nhân"
            }
        ]
    },
    {
        "provice": "Tỉnh Nam Định",
        "disctricts": [
            {
                "value": "Thành phố Nam Định",
                "label": "Thành phố Nam Định"
            },
            {
                "value": "Huyện Vụ Bản",
                "label": "Huyện Vụ Bản"
            },
            {
                "value": "Huyện Ý Yên",
                "label": "Huyện Ý Yên"
            },
            {
                "value": "Huyện Nghĩa Hưng",
                "label": "Huyện Nghĩa Hưng"
            },
            {
                "value": "Huyện Nam Trực",
                "label": "Huyện Nam Trực"
            },
            {
                "value": "Huyện Trực Ninh",
                "label": "Huyện Trực Ninh"
            },
            {
                "value": "Huyện Xuân Trường",
                "label": "Huyện Xuân Trường"
            },
            {
                "value": "Huyện Giao Thủy",
                "label": "Huyện Giao Thủy"
            },
            {
                "value": "Huyện Hải Hậu",
                "label": "Huyện Hải Hậu"
            }
        ]
    },
    {
        "provice": "Tỉnh Ninh Bình",
        "disctricts": [
            {
                "value": "Thành phố Tam Điệp",
                "label": "Thành phố Tam Điệp"
            },
            {
                "value": "Huyện Nho Quan",
                "label": "Huyện Nho Quan"
            },
            {
                "value": "Huyện Gia Viễn",
                "label": "Huyện Gia Viễn"
            },
            {
                "value": "Thành phố Hoa Lư",
                "label": "Thành phố Hoa Lư"
            },
            {
                "value": "Huyện Yên Khánh",
                "label": "Huyện Yên Khánh"
            },
            {
                "value": "Huyện Kim Sơn",
                "label": "Huyện Kim Sơn"
            },
            {
                "value": "Huyện Yên Mô",
                "label": "Huyện Yên Mô"
            }
        ]
    },
    {
        "provice": "Tỉnh Thanh Hóa",
        "disctricts": [
            {
                "value": "Thành phố Thanh Hóa",
                "label": "Thành phố Thanh Hóa"
            },
            {
                "value": "Thị xã Bỉm Sơn",
                "label": "Thị xã Bỉm Sơn"
            },
            {
                "value": "Thành phố Sầm Sơn",
                "label": "Thành phố Sầm Sơn"
            },
            {
                "value": "Huyện Mường Lát",
                "label": "Huyện Mường Lát"
            },
            {
                "value": "Huyện Quan Hóa",
                "label": "Huyện Quan Hóa"
            },
            {
                "value": "Huyện Bá Thước",
                "label": "Huyện Bá Thước"
            },
            {
                "value": "Huyện Quan Sơn",
                "label": "Huyện Quan Sơn"
            },
            {
                "value": "Huyện Lang Chánh",
                "label": "Huyện Lang Chánh"
            },
            {
                "value": "Huyện Ngọc Lặc",
                "label": "Huyện Ngọc Lặc"
            },
            {
                "value": "Huyện Cẩm Thủy",
                "label": "Huyện Cẩm Thủy"
            },
            {
                "value": "Huyện Thạch Thành",
                "label": "Huyện Thạch Thành"
            },
            {
                "value": "Huyện Hà Trung",
                "label": "Huyện Hà Trung"
            },
            {
                "value": "Huyện Vĩnh Lộc",
                "label": "Huyện Vĩnh Lộc"
            },
            {
                "value": "Huyện Yên Định",
                "label": "Huyện Yên Định"
            },
            {
                "value": "Huyện Thọ Xuân",
                "label": "Huyện Thọ Xuân"
            },
            {
                "value": "Huyện Thường Xuân",
                "label": "Huyện Thường Xuân"
            },
            {
                "value": "Huyện Triệu Sơn",
                "label": "Huyện Triệu Sơn"
            },
            {
                "value": "Huyện Thiệu Hóa",
                "label": "Huyện Thiệu Hóa"
            },
            {
                "value": "Huyện Hoằng Hóa",
                "label": "Huyện Hoằng Hóa"
            },
            {
                "value": "Huyện Hậu Lộc",
                "label": "Huyện Hậu Lộc"
            },
            {
                "value": "Huyện Nga Sơn",
                "label": "Huyện Nga Sơn"
            },
            {
                "value": "Huyện Như Xuân",
                "label": "Huyện Như Xuân"
            },
            {
                "value": "Huyện Như Thanh",
                "label": "Huyện Như Thanh"
            },
            {
                "value": "Huyện Nông Cống",
                "label": "Huyện Nông Cống"
            },
            {
                "value": "Huyện Quảng Xương",
                "label": "Huyện Quảng Xương"
            },
            {
                "value": "Thị xã Nghi Sơn",
                "label": "Thị xã Nghi Sơn"
            }
        ]
    },
    {
        "provice": "Tỉnh Nghệ An",
        "disctricts": [
            {
                "value": "Thành phố Vinh",
                "label": "Thành phố Vinh"
            },
            {
                "value": "Thị xã Thái Hoà",
                "label": "Thị xã Thái Hoà"
            },
            {
                "value": "Huyện Quế Phong",
                "label": "Huyện Quế Phong"
            },
            {
                "value": "Huyện Quỳ Châu",
                "label": "Huyện Quỳ Châu"
            },
            {
                "value": "Huyện Kỳ Sơn",
                "label": "Huyện Kỳ Sơn"
            },
            {
                "value": "Huyện Tương Dương",
                "label": "Huyện Tương Dương"
            },
            {
                "value": "Huyện Nghĩa Đàn",
                "label": "Huyện Nghĩa Đàn"
            },
            {
                "value": "Huyện Quỳ Hợp",
                "label": "Huyện Quỳ Hợp"
            },
            {
                "value": "Huyện Quỳnh Lưu",
                "label": "Huyện Quỳnh Lưu"
            },
            {
                "value": "Huyện Con Cuông",
                "label": "Huyện Con Cuông"
            },
            {
                "value": "Huyện Tân Kỳ",
                "label": "Huyện Tân Kỳ"
            },
            {
                "value": "Huyện Anh Sơn",
                "label": "Huyện Anh Sơn"
            },
            {
                "value": "Huyện Diễn Châu",
                "label": "Huyện Diễn Châu"
            },
            {
                "value": "Huyện Yên Thành",
                "label": "Huyện Yên Thành"
            },
            {
                "value": "Huyện Đô Lương",
                "label": "Huyện Đô Lương"
            },
            {
                "value": "Huyện Thanh Chương",
                "label": "Huyện Thanh Chương"
            },
            {
                "value": "Huyện Nghi Lộc",
                "label": "Huyện Nghi Lộc"
            },
            {
                "value": "Huyện Nam Đàn",
                "label": "Huyện Nam Đàn"
            },
            {
                "value": "Huyện Hưng Nguyên",
                "label": "Huyện Hưng Nguyên"
            },
            {
                "value": "Thị xã Hoàng Mai",
                "label": "Thị xã Hoàng Mai"
            }
        ]
    },
    {
        "provice": "Tỉnh Hà Tĩnh",
        "disctricts": [
            {
                "value": "Thành phố Hà Tĩnh",
                "label": "Thành phố Hà Tĩnh"
            },
            {
                "value": "Thị xã Hồng Lĩnh",
                "label": "Thị xã Hồng Lĩnh"
            },
            {
                "value": "Huyện Hương Sơn",
                "label": "Huyện Hương Sơn"
            },
            {
                "value": "Huyện Đức Thọ",
                "label": "Huyện Đức Thọ"
            },
            {
                "value": "Huyện Vũ Quang",
                "label": "Huyện Vũ Quang"
            },
            {
                "value": "Huyện Nghi Xuân",
                "label": "Huyện Nghi Xuân"
            },
            {
                "value": "Huyện Can Lộc",
                "label": "Huyện Can Lộc"
            },
            {
                "value": "Huyện Hương Khê",
                "label": "Huyện Hương Khê"
            },
            {
                "value": "Huyện Thạch Hà",
                "label": "Huyện Thạch Hà"
            },
            {
                "value": "Huyện Cẩm Xuyên",
                "label": "Huyện Cẩm Xuyên"
            },
            {
                "value": "Huyện Kỳ Anh",
                "label": "Huyện Kỳ Anh"
            },
            {
                "value": "Thị xã Kỳ Anh",
                "label": "Thị xã Kỳ Anh"
            }
        ]
    },
    {
        "provice": "Tỉnh Quảng Bình",
        "disctricts": [
            {
                "value": "Thành Phố Đồng Hới",
                "label": "Thành Phố Đồng Hới"
            },
            {
                "value": "Huyện Minh Hóa",
                "label": "Huyện Minh Hóa"
            },
            {
                "value": "Huyện Tuyên Hóa",
                "label": "Huyện Tuyên Hóa"
            },
            {
                "value": "Huyện Quảng Trạch",
                "label": "Huyện Quảng Trạch"
            },
            {
                "value": "Huyện Bố Trạch",
                "label": "Huyện Bố Trạch"
            },
            {
                "value": "Huyện Quảng Ninh",
                "label": "Huyện Quảng Ninh"
            },
            {
                "value": "Huyện Lệ Thủy",
                "label": "Huyện Lệ Thủy"
            },
            {
                "value": "Thị xã Ba Đồn",
                "label": "Thị xã Ba Đồn"
            }
        ]
    },
    {
        "provice": "Tỉnh Quảng Trị",
        "disctricts": [
            {
                "value": "Thành phố Đông Hà",
                "label": "Thành phố Đông Hà"
            },
            {
                "value": "Thị xã Quảng Trị",
                "label": "Thị xã Quảng Trị"
            },
            {
                "value": "Huyện Vĩnh Linh",
                "label": "Huyện Vĩnh Linh"
            },
            {
                "value": "Huyện Hướng Hóa",
                "label": "Huyện Hướng Hóa"
            },
            {
                "value": "Huyện Gio Linh",
                "label": "Huyện Gio Linh"
            },
            {
                "value": "Huyện Đa Krông",
                "label": "Huyện Đa Krông"
            },
            {
                "value": "Huyện Cam Lộ",
                "label": "Huyện Cam Lộ"
            },
            {
                "value": "Huyện Triệu Phong",
                "label": "Huyện Triệu Phong"
            },
            {
                "value": "Huyện Hải Lăng",
                "label": "Huyện Hải Lăng"
            },
            {
                "value": "Huyện Cồn Cỏ",
                "label": "Huyện Cồn Cỏ"
            }
        ]
    },
    {
        "provice": "Thành phố Huế",
        "disctricts": [
            {
                "value": "Quận Thuận Hóa",
                "label": "Quận Thuận Hóa"
            },
            {
                "value": "Quận Phú Xuân",
                "label": "Quận Phú Xuân"
            },
            {
                "value": "Thị xã Phong Điền",
                "label": "Thị xã Phong Điền"
            },
            {
                "value": "Huyện Quảng Điền",
                "label": "Huyện Quảng Điền"
            },
            {
                "value": "Huyện Phú Vang",
                "label": "Huyện Phú Vang"
            },
            {
                "value": "Thị xã Hương Thủy",
                "label": "Thị xã Hương Thủy"
            },
            {
                "value": "Thị xã Hương Trà",
                "label": "Thị xã Hương Trà"
            },
            {
                "value": "Huyện A Lưới",
                "label": "Huyện A Lưới"
            },
            {
                "value": "Huyện Phú Lộc",
                "label": "Huyện Phú Lộc"
            }
        ]
    },
    {
        "provice": "Thành phố Đà Nẵng",
        "disctricts": [
            {
                "value": "Quận Liên Chiểu",
                "label": "Quận Liên Chiểu"
            },
            {
                "value": "Quận Thanh Khê",
                "label": "Quận Thanh Khê"
            },
            {
                "value": "Quận Hải Châu",
                "label": "Quận Hải Châu"
            },
            {
                "value": "Quận Sơn Trà",
                "label": "Quận Sơn Trà"
            },
            {
                "value": "Quận Ngũ Hành Sơn",
                "label": "Quận Ngũ Hành Sơn"
            },
            {
                "value": "Quận Cẩm Lệ",
                "label": "Quận Cẩm Lệ"
            },
            {
                "value": "Huyện Hòa Vang",
                "label": "Huyện Hòa Vang"
            },
            {
                "value": "Huyện Hoàng Sa",
                "label": "Huyện Hoàng Sa"
            }
        ]
    },
    {
        "provice": "Tỉnh Quảng Nam",
        "disctricts": [
            {
                "value": "Thành phố Tam Kỳ",
                "label": "Thành phố Tam Kỳ"
            },
            {
                "value": "Thành phố Hội An",
                "label": "Thành phố Hội An"
            },
            {
                "value": "Huyện Tây Giang",
                "label": "Huyện Tây Giang"
            },
            {
                "value": "Huyện Đông Giang",
                "label": "Huyện Đông Giang"
            },
            {
                "value": "Huyện Đại Lộc",
                "label": "Huyện Đại Lộc"
            },
            {
                "value": "Thị xã Điện Bàn",
                "label": "Thị xã Điện Bàn"
            },
            {
                "value": "Huyện Duy Xuyên",
                "label": "Huyện Duy Xuyên"
            },
            {
                "value": "Huyện Quế Sơn",
                "label": "Huyện Quế Sơn"
            },
            {
                "value": "Huyện Nam Giang",
                "label": "Huyện Nam Giang"
            },
            {
                "value": "Huyện Phước Sơn",
                "label": "Huyện Phước Sơn"
            },
            {
                "value": "Huyện Hiệp Đức",
                "label": "Huyện Hiệp Đức"
            },
            {
                "value": "Huyện Thăng Bình",
                "label": "Huyện Thăng Bình"
            },
            {
                "value": "Huyện Tiên Phước",
                "label": "Huyện Tiên Phước"
            },
            {
                "value": "Huyện Bắc Trà My",
                "label": "Huyện Bắc Trà My"
            },
            {
                "value": "Huyện Nam Trà My",
                "label": "Huyện Nam Trà My"
            },
            {
                "value": "Huyện Núi Thành",
                "label": "Huyện Núi Thành"
            },
            {
                "value": "Huyện Phú Ninh",
                "label": "Huyện Phú Ninh"
            }
        ]
    },
    {
        "provice": "Tỉnh Quảng Ngãi",
        "disctricts": [
            {
                "value": "Thành phố Quảng Ngãi",
                "label": "Thành phố Quảng Ngãi"
            },
            {
                "value": "Huyện Bình Sơn",
                "label": "Huyện Bình Sơn"
            },
            {
                "value": "Huyện Trà Bồng",
                "label": "Huyện Trà Bồng"
            },
            {
                "value": "Huyện Sơn Tịnh",
                "label": "Huyện Sơn Tịnh"
            },
            {
                "value": "Huyện Tư Nghĩa",
                "label": "Huyện Tư Nghĩa"
            },
            {
                "value": "Huyện Sơn Hà",
                "label": "Huyện Sơn Hà"
            },
            {
                "value": "Huyện Sơn Tây",
                "label": "Huyện Sơn Tây"
            },
            {
                "value": "Huyện Minh Long",
                "label": "Huyện Minh Long"
            },
            {
                "value": "Huyện Nghĩa Hành",
                "label": "Huyện Nghĩa Hành"
            },
            {
                "value": "Huyện Mộ Đức",
                "label": "Huyện Mộ Đức"
            },
            {
                "value": "Thị xã Đức Phổ",
                "label": "Thị xã Đức Phổ"
            },
            {
                "value": "Huyện Ba Tơ",
                "label": "Huyện Ba Tơ"
            },
            {
                "value": "Huyện Lý Sơn",
                "label": "Huyện Lý Sơn"
            }
        ]
    },
    {
        "provice": "Tỉnh Bình Định",
        "disctricts": [
            {
                "value": "Thành phố Quy Nhơn",
                "label": "Thành phố Quy Nhơn"
            },
            {
                "value": "Huyện An Lão",
                "label": "Huyện An Lão"
            },
            {
                "value": "Thị xã Hoài Nhơn",
                "label": "Thị xã Hoài Nhơn"
            },
            {
                "value": "Huyện Hoài Ân",
                "label": "Huyện Hoài Ân"
            },
            {
                "value": "Huyện Phù Mỹ",
                "label": "Huyện Phù Mỹ"
            },
            {
                "value": "Huyện Vĩnh Thạnh",
                "label": "Huyện Vĩnh Thạnh"
            },
            {
                "value": "Huyện Tây Sơn",
                "label": "Huyện Tây Sơn"
            },
            {
                "value": "Huyện Phù Cát",
                "label": "Huyện Phù Cát"
            },
            {
                "value": "Thị xã An Nhơn",
                "label": "Thị xã An Nhơn"
            },
            {
                "value": "Huyện Tuy Phước",
                "label": "Huyện Tuy Phước"
            },
            {
                "value": "Huyện Vân Canh",
                "label": "Huyện Vân Canh"
            }
        ]
    },
    {
        "provice": "Tỉnh Phú Yên",
        "disctricts": [
            {
                "value": "Thành phố Tuy Hoà",
                "label": "Thành phố Tuy Hoà"
            },
            {
                "value": "Thị xã Sông Cầu",
                "label": "Thị xã Sông Cầu"
            },
            {
                "value": "Huyện Đồng Xuân",
                "label": "Huyện Đồng Xuân"
            },
            {
                "value": "Huyện Tuy An",
                "label": "Huyện Tuy An"
            },
            {
                "value": "Huyện Sơn Hòa",
                "label": "Huyện Sơn Hòa"
            },
            {
                "value": "Huyện Sông Hinh",
                "label": "Huyện Sông Hinh"
            },
            {
                "value": "Huyện Tây Hoà",
                "label": "Huyện Tây Hoà"
            },
            {
                "value": "Huyện Phú Hoà",
                "label": "Huyện Phú Hoà"
            },
            {
                "value": "Thị xã Đông Hòa",
                "label": "Thị xã Đông Hòa"
            }
        ]
    },
    {
        "provice": "Tỉnh Khánh Hòa",
        "disctricts": [
            {
                "value": "Thành phố Nha Trang",
                "label": "Thành phố Nha Trang"
            },
            {
                "value": "Thành phố Cam Ranh",
                "label": "Thành phố Cam Ranh"
            },
            {
                "value": "Huyện Cam Lâm",
                "label": "Huyện Cam Lâm"
            },
            {
                "value": "Huyện Vạn Ninh",
                "label": "Huyện Vạn Ninh"
            },
            {
                "value": "Thị xã Ninh Hòa",
                "label": "Thị xã Ninh Hòa"
            },
            {
                "value": "Huyện Khánh Vĩnh",
                "label": "Huyện Khánh Vĩnh"
            },
            {
                "value": "Huyện Diên Khánh",
                "label": "Huyện Diên Khánh"
            },
            {
                "value": "Huyện Khánh Sơn",
                "label": "Huyện Khánh Sơn"
            },
            {
                "value": "Huyện Trường Sa",
                "label": "Huyện Trường Sa"
            }
        ]
    },
    {
        "provice": "Tỉnh Ninh Thuận",
        "disctricts": [
            {
                "value": "Thành phố Phan Rang-Tháp Chàm",
                "label": "Thành phố Phan Rang-Tháp Chàm"
            },
            {
                "value": "Huyện Bác Ái",
                "label": "Huyện Bác Ái"
            },
            {
                "value": "Huyện Ninh Sơn",
                "label": "Huyện Ninh Sơn"
            },
            {
                "value": "Huyện Ninh Hải",
                "label": "Huyện Ninh Hải"
            },
            {
                "value": "Huyện Ninh Phước",
                "label": "Huyện Ninh Phước"
            },
            {
                "value": "Huyện Thuận Bắc",
                "label": "Huyện Thuận Bắc"
            },
            {
                "value": "Huyện Thuận Nam",
                "label": "Huyện Thuận Nam"
            }
        ]
    },
    {
        "provice": "Tỉnh Bình Thuận",
        "disctricts": [
            {
                "value": "Thành phố Phan Thiết",
                "label": "Thành phố Phan Thiết"
            },
            {
                "value": "Thị xã La Gi",
                "label": "Thị xã La Gi"
            },
            {
                "value": "Huyện Tuy Phong",
                "label": "Huyện Tuy Phong"
            },
            {
                "value": "Huyện Bắc Bình",
                "label": "Huyện Bắc Bình"
            },
            {
                "value": "Huyện Hàm Thuận Bắc",
                "label": "Huyện Hàm Thuận Bắc"
            },
            {
                "value": "Huyện Hàm Thuận Nam",
                "label": "Huyện Hàm Thuận Nam"
            },
            {
                "value": "Huyện Tánh Linh",
                "label": "Huyện Tánh Linh"
            },
            {
                "value": "Huyện Đức Linh",
                "label": "Huyện Đức Linh"
            },
            {
                "value": "Huyện Hàm Tân",
                "label": "Huyện Hàm Tân"
            },
            {
                "value": "Huyện Phú Quí",
                "label": "Huyện Phú Quí"
            }
        ]
    },
    {
        "provice": "Tỉnh Kon Tum",
        "disctricts": [
            {
                "value": "Thành phố Kon Tum",
                "label": "Thành phố Kon Tum"
            },
            {
                "value": "Huyện Đắk Glei",
                "label": "Huyện Đắk Glei"
            },
            {
                "value": "Huyện Ngọc Hồi",
                "label": "Huyện Ngọc Hồi"
            },
            {
                "value": "Huyện Đắk Tô",
                "label": "Huyện Đắk Tô"
            },
            {
                "value": "Huyện Kon Plông",
                "label": "Huyện Kon Plông"
            },
            {
                "value": "Huyện Kon Rẫy",
                "label": "Huyện Kon Rẫy"
            },
            {
                "value": "Huyện Đắk Hà",
                "label": "Huyện Đắk Hà"
            },
            {
                "value": "Huyện Sa Thầy",
                "label": "Huyện Sa Thầy"
            },
            {
                "value": "Huyện Tu Mơ Rông",
                "label": "Huyện Tu Mơ Rông"
            },
            {
                "value": "Huyện Ia H' Drai",
                "label": "Huyện Ia H' Drai"
            }
        ]
    },
    {
        "provice": "Tỉnh Gia Lai",
        "disctricts": [
            {
                "value": "Thành phố Pleiku",
                "label": "Thành phố Pleiku"
            },
            {
                "value": "Thị xã An Khê",
                "label": "Thị xã An Khê"
            },
            {
                "value": "Thị xã Ayun Pa",
                "label": "Thị xã Ayun Pa"
            },
            {
                "value": "Huyện KBang",
                "label": "Huyện KBang"
            },
            {
                "value": "Huyện Đăk Đoa",
                "label": "Huyện Đăk Đoa"
            },
            {
                "value": "Huyện Chư Păh",
                "label": "Huyện Chư Păh"
            },
            {
                "value": "Huyện Ia Grai",
                "label": "Huyện Ia Grai"
            },
            {
                "value": "Huyện Mang Yang",
                "label": "Huyện Mang Yang"
            },
            {
                "value": "Huyện Kông Chro",
                "label": "Huyện Kông Chro"
            },
            {
                "value": "Huyện Đức Cơ",
                "label": "Huyện Đức Cơ"
            },
            {
                "value": "Huyện Chư Prông",
                "label": "Huyện Chư Prông"
            },
            {
                "value": "Huyện Chư Sê",
                "label": "Huyện Chư Sê"
            },
            {
                "value": "Huyện Đăk Pơ",
                "label": "Huyện Đăk Pơ"
            },
            {
                "value": "Huyện Ia Pa",
                "label": "Huyện Ia Pa"
            },
            {
                "value": "Huyện Krông Pa",
                "label": "Huyện Krông Pa"
            },
            {
                "value": "Huyện Phú Thiện",
                "label": "Huyện Phú Thiện"
            },
            {
                "value": "Huyện Chư Pưh",
                "label": "Huyện Chư Pưh"
            }
        ]
    },
    {
        "provice": "Tỉnh Đắk Lắk",
        "disctricts": [
            {
                "value": "Thành phố Buôn Ma Thuột",
                "label": "Thành phố Buôn Ma Thuột"
            },
            {
                "value": "Thị xã Buôn Hồ",
                "label": "Thị xã Buôn Hồ"
            },
            {
                "value": "Huyện Ea H'leo",
                "label": "Huyện Ea H'leo"
            },
            {
                "value": "Huyện Ea Súp",
                "label": "Huyện Ea Súp"
            },
            {
                "value": "Huyện Buôn Đôn",
                "label": "Huyện Buôn Đôn"
            },
            {
                "value": "Huyện Cư M'gar",
                "label": "Huyện Cư M'gar"
            },
            {
                "value": "Huyện Krông Búk",
                "label": "Huyện Krông Búk"
            },
            {
                "value": "Huyện Krông Năng",
                "label": "Huyện Krông Năng"
            },
            {
                "value": "Huyện Ea Kar",
                "label": "Huyện Ea Kar"
            },
            {
                "value": "Huyện M'Đrắk",
                "label": "Huyện M'Đrắk"
            },
            {
                "value": "Huyện Krông Bông",
                "label": "Huyện Krông Bông"
            },
            {
                "value": "Huyện Krông Pắc",
                "label": "Huyện Krông Pắc"
            },
            {
                "value": "Huyện Krông A Na",
                "label": "Huyện Krông A Na"
            },
            {
                "value": "Huyện Lắk",
                "label": "Huyện Lắk"
            },
            {
                "value": "Huyện Cư Kuin",
                "label": "Huyện Cư Kuin"
            }
        ]
    },
    {
        "provice": "Tỉnh Đắk Nông",
        "disctricts": [
            {
                "value": "Thành phố Gia Nghĩa",
                "label": "Thành phố Gia Nghĩa"
            },
            {
                "value": "Huyện Đăk Glong",
                "label": "Huyện Đăk Glong"
            },
            {
                "value": "Huyện Cư Jút",
                "label": "Huyện Cư Jút"
            },
            {
                "value": "Huyện Đắk Mil",
                "label": "Huyện Đắk Mil"
            },
            {
                "value": "Huyện Krông Nô",
                "label": "Huyện Krông Nô"
            },
            {
                "value": "Huyện Đắk Song",
                "label": "Huyện Đắk Song"
            },
            {
                "value": "Huyện Đắk R'Lấp",
                "label": "Huyện Đắk R'Lấp"
            },
            {
                "value": "Huyện Tuy Đức",
                "label": "Huyện Tuy Đức"
            }
        ]
    },
    {
        "provice": "Tỉnh Lâm Đồng",
        "disctricts": [
            {
                "value": "Thành phố Đà Lạt",
                "label": "Thành phố Đà Lạt"
            },
            {
                "value": "Thành phố Bảo Lộc",
                "label": "Thành phố Bảo Lộc"
            },
            {
                "value": "Huyện Đam Rông",
                "label": "Huyện Đam Rông"
            },
            {
                "value": "Huyện Lạc Dương",
                "label": "Huyện Lạc Dương"
            },
            {
                "value": "Huyện Lâm Hà",
                "label": "Huyện Lâm Hà"
            },
            {
                "value": "Huyện Đơn Dương",
                "label": "Huyện Đơn Dương"
            },
            {
                "value": "Huyện Đức Trọng",
                "label": "Huyện Đức Trọng"
            },
            {
                "value": "Huyện Di Linh",
                "label": "Huyện Di Linh"
            },
            {
                "value": "Huyện Bảo Lâm",
                "label": "Huyện Bảo Lâm"
            },
            {
                "value": "Huyện Đạ Huoai",
                "label": "Huyện Đạ Huoai"
            }
        ]
    },
    {
        "provice": "Tỉnh Bình Phước",
        "disctricts": [
            {
                "value": "Thị xã Phước Long",
                "label": "Thị xã Phước Long"
            },
            {
                "value": "Thành phố Đồng Xoài",
                "label": "Thành phố Đồng Xoài"
            },
            {
                "value": "Thị xã Bình Long",
                "label": "Thị xã Bình Long"
            },
            {
                "value": "Huyện Bù Gia Mập",
                "label": "Huyện Bù Gia Mập"
            },
            {
                "value": "Huyện Lộc Ninh",
                "label": "Huyện Lộc Ninh"
            },
            {
                "value": "Huyện Bù Đốp",
                "label": "Huyện Bù Đốp"
            },
            {
                "value": "Huyện Hớn Quản",
                "label": "Huyện Hớn Quản"
            },
            {
                "value": "Huyện Đồng Phú",
                "label": "Huyện Đồng Phú"
            },
            {
                "value": "Huyện Bù Đăng",
                "label": "Huyện Bù Đăng"
            },
            {
                "value": "Thị xã Chơn Thành",
                "label": "Thị xã Chơn Thành"
            },
            {
                "value": "Huyện Phú Riềng",
                "label": "Huyện Phú Riềng"
            }
        ]
    },
    {
        "provice": "Tỉnh Tây Ninh",
        "disctricts": [
            {
                "value": "Thành phố Tây Ninh",
                "label": "Thành phố Tây Ninh"
            },
            {
                "value": "Huyện Tân Biên",
                "label": "Huyện Tân Biên"
            },
            {
                "value": "Huyện Tân Châu",
                "label": "Huyện Tân Châu"
            },
            {
                "value": "Huyện Dương Minh Châu",
                "label": "Huyện Dương Minh Châu"
            },
            {
                "value": "Huyện Châu Thành",
                "label": "Huyện Châu Thành"
            },
            {
                "value": "Thị xã Hòa Thành",
                "label": "Thị xã Hòa Thành"
            },
            {
                "value": "Huyện Gò Dầu",
                "label": "Huyện Gò Dầu"
            },
            {
                "value": "Huyện Bến Cầu",
                "label": "Huyện Bến Cầu"
            },
            {
                "value": "Thị xã Trảng Bàng",
                "label": "Thị xã Trảng Bàng"
            }
        ]
    },
    {
        "provice": "Tỉnh Bình Dương",
        "disctricts": [
            {
                "value": "Thành phố Thủ Dầu Một",
                "label": "Thành phố Thủ Dầu Một"
            },
            {
                "value": "Huyện Bàu Bàng",
                "label": "Huyện Bàu Bàng"
            },
            {
                "value": "Huyện Dầu Tiếng",
                "label": "Huyện Dầu Tiếng"
            },
            {
                "value": "Thành phố Bến Cát",
                "label": "Thành phố Bến Cát"
            },
            {
                "value": "Huyện Phú Giáo",
                "label": "Huyện Phú Giáo"
            },
            {
                "value": "Thành phố Tân Uyên",
                "label": "Thành phố Tân Uyên"
            },
            {
                "value": "Thành phố Dĩ An",
                "label": "Thành phố Dĩ An"
            },
            {
                "value": "Thành phố Thuận An",
                "label": "Thành phố Thuận An"
            },
            {
                "value": "Huyện Bắc Tân Uyên",
                "label": "Huyện Bắc Tân Uyên"
            }
        ]
    },
    {
        "provice": "Tỉnh Đồng Nai",
        "disctricts": [
            {
                "value": "Thành phố Biên Hòa",
                "label": "Thành phố Biên Hòa"
            },
            {
                "value": "Thành phố Long Khánh",
                "label": "Thành phố Long Khánh"
            },
            {
                "value": "Huyện Tân Phú",
                "label": "Huyện Tân Phú"
            },
            {
                "value": "Huyện Vĩnh Cửu",
                "label": "Huyện Vĩnh Cửu"
            },
            {
                "value": "Huyện Định Quán",
                "label": "Huyện Định Quán"
            },
            {
                "value": "Huyện Trảng Bom",
                "label": "Huyện Trảng Bom"
            },
            {
                "value": "Huyện Thống Nhất",
                "label": "Huyện Thống Nhất"
            },
            {
                "value": "Huyện Cẩm Mỹ",
                "label": "Huyện Cẩm Mỹ"
            },
            {
                "value": "Huyện Long Thành",
                "label": "Huyện Long Thành"
            },
            {
                "value": "Huyện Xuân Lộc",
                "label": "Huyện Xuân Lộc"
            },
            {
                "value": "Huyện Nhơn Trạch",
                "label": "Huyện Nhơn Trạch"
            }
        ]
    },
    {
        "provice": "Tỉnh Bà Rịa - Vũng Tàu",
        "disctricts": [
            {
                "value": "Thành phố Vũng Tàu",
                "label": "Thành phố Vũng Tàu"
            },
            {
                "value": "Thành phố Bà Rịa",
                "label": "Thành phố Bà Rịa"
            },
            {
                "value": "Huyện Châu Đức",
                "label": "Huyện Châu Đức"
            },
            {
                "value": "Huyện Xuyên Mộc",
                "label": "Huyện Xuyên Mộc"
            },
            {
                "value": "Huyện Long Đất",
                "label": "Huyện Long Đất"
            },
            {
                "value": "Thị xã Phú Mỹ",
                "label": "Thị xã Phú Mỹ"
            },
            {
                "value": "Huyện Côn Đảo",
                "label": "Huyện Côn Đảo"
            }
        ]
    },
    {
        "provice": "Thành phố Hồ Chí Minh",
        "disctricts": [
            {
                "value": "Quận 1",
                "label": "Quận 1"
            },
            {
                "value": "Quận 12",
                "label": "Quận 12"
            },
            {
                "value": "Quận Gò Vấp",
                "label": "Quận Gò Vấp"
            },
            {
                "value": "Quận Bình Thạnh",
                "label": "Quận Bình Thạnh"
            },
            {
                "value": "Quận Tân Bình",
                "label": "Quận Tân Bình"
            },
            {
                "value": "Quận Tân Phú",
                "label": "Quận Tân Phú"
            },
            {
                "value": "Quận Phú Nhuận",
                "label": "Quận Phú Nhuận"
            },
            {
                "value": "Thành phố Thủ Đức",
                "label": "Thành phố Thủ Đức"
            },
            {
                "value": "Quận 3",
                "label": "Quận 3"
            },
            {
                "value": "Quận 10",
                "label": "Quận 10"
            },
            {
                "value": "Quận 11",
                "label": "Quận 11"
            },
            {
                "value": "Quận 4",
                "label": "Quận 4"
            },
            {
                "value": "Quận 5",
                "label": "Quận 5"
            },
            {
                "value": "Quận 6",
                "label": "Quận 6"
            },
            {
                "value": "Quận 8",
                "label": "Quận 8"
            },
            {
                "value": "Quận Bình Tân",
                "label": "Quận Bình Tân"
            },
            {
                "value": "Quận 7",
                "label": "Quận 7"
            },
            {
                "value": "Huyện Củ Chi",
                "label": "Huyện Củ Chi"
            },
            {
                "value": "Huyện Hóc Môn",
                "label": "Huyện Hóc Môn"
            },
            {
                "value": "Huyện Bình Chánh",
                "label": "Huyện Bình Chánh"
            },
            {
                "value": "Huyện Nhà Bè",
                "label": "Huyện Nhà Bè"
            },
            {
                "value": "Huyện Cần Giờ",
                "label": "Huyện Cần Giờ"
            }
        ]
    },
    {
        "provice": "Tỉnh Long An",
        "disctricts": [
            {
                "value": "Thành phố Tân An",
                "label": "Thành phố Tân An"
            },
            {
                "value": "Thị xã Kiến Tường",
                "label": "Thị xã Kiến Tường"
            },
            {
                "value": "Huyện Tân Hưng",
                "label": "Huyện Tân Hưng"
            },
            {
                "value": "Huyện Vĩnh Hưng",
                "label": "Huyện Vĩnh Hưng"
            },
            {
                "value": "Huyện Mộc Hóa",
                "label": "Huyện Mộc Hóa"
            },
            {
                "value": "Huyện Tân Thạnh",
                "label": "Huyện Tân Thạnh"
            },
            {
                "value": "Huyện Thạnh Hóa",
                "label": "Huyện Thạnh Hóa"
            },
            {
                "value": "Huyện Đức Huệ",
                "label": "Huyện Đức Huệ"
            },
            {
                "value": "Huyện Đức Hòa",
                "label": "Huyện Đức Hòa"
            },
            {
                "value": "Huyện Bến Lức",
                "label": "Huyện Bến Lức"
            },
            {
                "value": "Huyện Thủ Thừa",
                "label": "Huyện Thủ Thừa"
            },
            {
                "value": "Huyện Tân Trụ",
                "label": "Huyện Tân Trụ"
            },
            {
                "value": "Huyện Cần Đước",
                "label": "Huyện Cần Đước"
            },
            {
                "value": "Huyện Cần Giuộc",
                "label": "Huyện Cần Giuộc"
            },
            {
                "value": "Huyện Châu Thành",
                "label": "Huyện Châu Thành"
            }
        ]
    },
    {
        "provice": "Tỉnh Tiền Giang",
        "disctricts": [
            {
                "value": "Thành phố Mỹ Tho",
                "label": "Thành phố Mỹ Tho"
            },
            {
                "value": "Thành phố Gò Công",
                "label": "Thành phố Gò Công"
            },
            {
                "value": "Thị xã Cai Lậy",
                "label": "Thị xã Cai Lậy"
            },
            {
                "value": "Huyện Tân Phước",
                "label": "Huyện Tân Phước"
            },
            {
                "value": "Huyện Cái Bè",
                "label": "Huyện Cái Bè"
            },
            {
                "value": "Huyện Cai Lậy",
                "label": "Huyện Cai Lậy"
            },
            {
                "value": "Huyện Châu Thành",
                "label": "Huyện Châu Thành"
            },
            {
                "value": "Huyện Chợ Gạo",
                "label": "Huyện Chợ Gạo"
            },
            {
                "value": "Huyện Gò Công Tây",
                "label": "Huyện Gò Công Tây"
            },
            {
                "value": "Huyện Gò Công Đông",
                "label": "Huyện Gò Công Đông"
            },
            {
                "value": "Huyện Tân Phú Đông",
                "label": "Huyện Tân Phú Đông"
            }
        ]
    },
    {
        "provice": "Tỉnh Bến Tre",
        "disctricts": [
            {
                "value": "Thành phố Bến Tre",
                "label": "Thành phố Bến Tre"
            },
            {
                "value": "Huyện Châu Thành",
                "label": "Huyện Châu Thành"
            },
            {
                "value": "Huyện Chợ Lách",
                "label": "Huyện Chợ Lách"
            },
            {
                "value": "Huyện Mỏ Cày Nam",
                "label": "Huyện Mỏ Cày Nam"
            },
            {
                "value": "Huyện Giồng Trôm",
                "label": "Huyện Giồng Trôm"
            },
            {
                "value": "Huyện Bình Đại",
                "label": "Huyện Bình Đại"
            },
            {
                "value": "Huyện Ba Tri",
                "label": "Huyện Ba Tri"
            },
            {
                "value": "Huyện Thạnh Phú",
                "label": "Huyện Thạnh Phú"
            },
            {
                "value": "Huyện Mỏ Cày Bắc",
                "label": "Huyện Mỏ Cày Bắc"
            }
        ]
    },
    {
        "provice": "Tỉnh Trà Vinh",
        "disctricts": [
            {
                "value": "Thành phố Trà Vinh",
                "label": "Thành phố Trà Vinh"
            },
            {
                "value": "Huyện Càng Long",
                "label": "Huyện Càng Long"
            },
            {
                "value": "Huyện Cầu Kè",
                "label": "Huyện Cầu Kè"
            },
            {
                "value": "Huyện Tiểu Cần",
                "label": "Huyện Tiểu Cần"
            },
            {
                "value": "Huyện Châu Thành",
                "label": "Huyện Châu Thành"
            },
            {
                "value": "Huyện Cầu Ngang",
                "label": "Huyện Cầu Ngang"
            },
            {
                "value": "Huyện Trà Cú",
                "label": "Huyện Trà Cú"
            },
            {
                "value": "Huyện Duyên Hải",
                "label": "Huyện Duyên Hải"
            },
            {
                "value": "Thị xã Duyên Hải",
                "label": "Thị xã Duyên Hải"
            }
        ]
    },
    {
        "provice": "Tỉnh Vĩnh Long",
        "disctricts": [
            {
                "value": "Thành phố Vĩnh Long",
                "label": "Thành phố Vĩnh Long"
            },
            {
                "value": "Huyện Long Hồ",
                "label": "Huyện Long Hồ"
            },
            {
                "value": "Huyện Mang Thít",
                "label": "Huyện Mang Thít"
            },
            {
                "value": "Huyện Vũng Liêm",
                "label": "Huyện Vũng Liêm"
            },
            {
                "value": "Huyện Tam Bình",
                "label": "Huyện Tam Bình"
            },
            {
                "value": "Thị xã Bình Minh",
                "label": "Thị xã Bình Minh"
            },
            {
                "value": "Huyện Trà Ôn",
                "label": "Huyện Trà Ôn"
            },
            {
                "value": "Huyện Bình Tân",
                "label": "Huyện Bình Tân"
            }
        ]
    },
    {
        "provice": "Tỉnh Đồng Tháp",
        "disctricts": [
            {
                "value": "Thành phố Cao Lãnh",
                "label": "Thành phố Cao Lãnh"
            },
            {
                "value": "Thành phố Sa Đéc",
                "label": "Thành phố Sa Đéc"
            },
            {
                "value": "Thành phố Hồng Ngự",
                "label": "Thành phố Hồng Ngự"
            },
            {
                "value": "Huyện Tân Hồng",
                "label": "Huyện Tân Hồng"
            },
            {
                "value": "Huyện Hồng Ngự",
                "label": "Huyện Hồng Ngự"
            },
            {
                "value": "Huyện Tam Nông",
                "label": "Huyện Tam Nông"
            },
            {
                "value": "Huyện Tháp Mười",
                "label": "Huyện Tháp Mười"
            },
            {
                "value": "Huyện Cao Lãnh",
                "label": "Huyện Cao Lãnh"
            },
            {
                "value": "Huyện Thanh Bình",
                "label": "Huyện Thanh Bình"
            },
            {
                "value": "Huyện Lấp Vò",
                "label": "Huyện Lấp Vò"
            },
            {
                "value": "Huyện Lai Vung",
                "label": "Huyện Lai Vung"
            },
            {
                "value": "Huyện Châu Thành",
                "label": "Huyện Châu Thành"
            }
        ]
    },
    {
        "provice": "Tỉnh An Giang",
        "disctricts": [
            {
                "value": "Thành phố Long Xuyên",
                "label": "Thành phố Long Xuyên"
            },
            {
                "value": "Thành phố Châu Đốc",
                "label": "Thành phố Châu Đốc"
            },
            {
                "value": "Huyện An Phú",
                "label": "Huyện An Phú"
            },
            {
                "value": "Thị xã Tân Châu",
                "label": "Thị xã Tân Châu"
            },
            {
                "value": "Huyện Phú Tân",
                "label": "Huyện Phú Tân"
            },
            {
                "value": "Huyện Châu Phú",
                "label": "Huyện Châu Phú"
            },
            {
                "value": "Thị xã Tịnh Biên",
                "label": "Thị xã Tịnh Biên"
            },
            {
                "value": "Huyện Tri Tôn",
                "label": "Huyện Tri Tôn"
            },
            {
                "value": "Huyện Châu Thành",
                "label": "Huyện Châu Thành"
            },
            {
                "value": "Huyện Chợ Mới",
                "label": "Huyện Chợ Mới"
            },
            {
                "value": "Huyện Thoại Sơn",
                "label": "Huyện Thoại Sơn"
            }
        ]
    },
    {
        "provice": "Tỉnh Kiên Giang",
        "disctricts": [
            {
                "value": "Thành phố Rạch Giá",
                "label": "Thành phố Rạch Giá"
            },
            {
                "value": "Thành phố Hà Tiên",
                "label": "Thành phố Hà Tiên"
            },
            {
                "value": "Huyện Kiên Lương",
                "label": "Huyện Kiên Lương"
            },
            {
                "value": "Huyện Hòn Đất",
                "label": "Huyện Hòn Đất"
            },
            {
                "value": "Huyện Tân Hiệp",
                "label": "Huyện Tân Hiệp"
            },
            {
                "value": "Huyện Châu Thành",
                "label": "Huyện Châu Thành"
            },
            {
                "value": "Huyện Giồng Riềng",
                "label": "Huyện Giồng Riềng"
            },
            {
                "value": "Huyện Gò Quao",
                "label": "Huyện Gò Quao"
            },
            {
                "value": "Huyện An Biên",
                "label": "Huyện An Biên"
            },
            {
                "value": "Huyện An Minh",
                "label": "Huyện An Minh"
            },
            {
                "value": "Huyện Vĩnh Thuận",
                "label": "Huyện Vĩnh Thuận"
            },
            {
                "value": "Thành phố Phú Quốc",
                "label": "Thành phố Phú Quốc"
            },
            {
                "value": "Huyện Kiên Hải",
                "label": "Huyện Kiên Hải"
            },
            {
                "value": "Huyện U Minh Thượng",
                "label": "Huyện U Minh Thượng"
            },
            {
                "value": "Huyện Giang Thành",
                "label": "Huyện Giang Thành"
            }
        ]
    },
    {
        "provice": "Thành phố Cần Thơ",
        "disctricts": [
            {
                "value": "Quận Ninh Kiều",
                "label": "Quận Ninh Kiều"
            },
            {
                "value": "Quận Ô Môn",
                "label": "Quận Ô Môn"
            },
            {
                "value": "Quận Bình Thuỷ",
                "label": "Quận Bình Thuỷ"
            },
            {
                "value": "Quận Cái Răng",
                "label": "Quận Cái Răng"
            },
            {
                "value": "Quận Thốt Nốt",
                "label": "Quận Thốt Nốt"
            },
            {
                "value": "Huyện Vĩnh Thạnh",
                "label": "Huyện Vĩnh Thạnh"
            },
            {
                "value": "Huyện Cờ Đỏ",
                "label": "Huyện Cờ Đỏ"
            },
            {
                "value": "Huyện Phong Điền",
                "label": "Huyện Phong Điền"
            },
            {
                "value": "Huyện Thới Lai",
                "label": "Huyện Thới Lai"
            }
        ]
    },
    {
        "provice": "Tỉnh Hậu Giang",
        "disctricts": [
            {
                "value": "Thành phố Vị Thanh",
                "label": "Thành phố Vị Thanh"
            },
            {
                "value": "Thành phố Ngã Bảy",
                "label": "Thành phố Ngã Bảy"
            },
            {
                "value": "Huyện Châu Thành A",
                "label": "Huyện Châu Thành A"
            },
            {
                "value": "Huyện Châu Thành",
                "label": "Huyện Châu Thành"
            },
            {
                "value": "Huyện Phụng Hiệp",
                "label": "Huyện Phụng Hiệp"
            },
            {
                "value": "Huyện Vị Thuỷ",
                "label": "Huyện Vị Thuỷ"
            },
            {
                "value": "Huyện Long Mỹ",
                "label": "Huyện Long Mỹ"
            },
            {
                "value": "Thị xã Long Mỹ",
                "label": "Thị xã Long Mỹ"
            }
        ]
    },
    {
        "provice": "Tỉnh Sóc Trăng",
        "disctricts": [
            {
                "value": "Thành phố Sóc Trăng",
                "label": "Thành phố Sóc Trăng"
            },
            {
                "value": "Huyện Châu Thành",
                "label": "Huyện Châu Thành"
            },
            {
                "value": "Huyện Kế Sách",
                "label": "Huyện Kế Sách"
            },
            {
                "value": "Huyện Mỹ Tú",
                "label": "Huyện Mỹ Tú"
            },
            {
                "value": "Huyện Cù Lao Dung",
                "label": "Huyện Cù Lao Dung"
            },
            {
                "value": "Huyện Long Phú",
                "label": "Huyện Long Phú"
            },
            {
                "value": "Huyện Mỹ Xuyên",
                "label": "Huyện Mỹ Xuyên"
            },
            {
                "value": "Thị xã Ngã Năm",
                "label": "Thị xã Ngã Năm"
            },
            {
                "value": "Huyện Thạnh Trị",
                "label": "Huyện Thạnh Trị"
            },
            {
                "value": "Thị xã Vĩnh Châu",
                "label": "Thị xã Vĩnh Châu"
            },
            {
                "value": "Huyện Trần Đề",
                "label": "Huyện Trần Đề"
            }
        ]
    },
    {
        "provice": "Tỉnh Bạc Liêu",
        "disctricts": [
            {
                "value": "Thành phố Bạc Liêu",
                "label": "Thành phố Bạc Liêu"
            },
            {
                "value": "Huyện Hồng Dân",
                "label": "Huyện Hồng Dân"
            },
            {
                "value": "Huyện Phước Long",
                "label": "Huyện Phước Long"
            },
            {
                "value": "Huyện Vĩnh Lợi",
                "label": "Huyện Vĩnh Lợi"
            },
            {
                "value": "Thị xã Giá Rai",
                "label": "Thị xã Giá Rai"
            },
            {
                "value": "Huyện Đông Hải",
                "label": "Huyện Đông Hải"
            },
            {
                "value": "Huyện Hoà Bình",
                "label": "Huyện Hoà Bình"
            }
        ]
    },
    {
        "provice": "Tỉnh Cà Mau",
        "disctricts": [
            {
                "value": "Thành phố Cà Mau",
                "label": "Thành phố Cà Mau"
            },
            {
                "value": "Huyện U Minh",
                "label": "Huyện U Minh"
            },
            {
                "value": "Huyện Thới Bình",
                "label": "Huyện Thới Bình"
            },
            {
                "value": "Huyện Trần Văn Thời",
                "label": "Huyện Trần Văn Thời"
            },
            {
                "value": "Huyện Cái Nước",
                "label": "Huyện Cái Nước"
            },
            {
                "value": "Huyện Đầm Dơi",
                "label": "Huyện Đầm Dơi"
            },
            {
                "value": "Huyện Năm Căn",
                "label": "Huyện Năm Căn"
            },
            {
                "value": "Huyện Phú Tân",
                "label": "Huyện Phú Tân"
            },
            {
                "value": "Huyện Ngọc Hiển",
                "label": "Huyện Ngọc Hiển"
            }
        ]
    }
]

const districts = (province: string) => {
    const found = address.find(item => item.provice === province);
    return found ? found.disctricts.map(d => ({ label: d.label, value: d.value })) : [];
};

export { provinces, address, districts }