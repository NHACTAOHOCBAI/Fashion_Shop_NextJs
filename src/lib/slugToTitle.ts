export default function slugToTitle(slug: string): string {
    return slug
        .split('-')                        // tách theo dấu gạch ngang
        .map(word =>
            word.charAt(0).toUpperCase() +    // viết hoa ký tự đầu
            word.slice(1).toLowerCase()       // các ký tự còn lại viết thường
        )
        .join(' ')                           // ghép lại bằng khoảng trắng
}