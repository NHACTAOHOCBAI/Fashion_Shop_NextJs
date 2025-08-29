type GetAllResponse<T> = {
    statusCode: number,
    message: string,
    data: {
        pagination: {
            total: number,
            page: number,
            limit: number
        },
        data: T[]
    }
} 
