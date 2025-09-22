'use client'

import { use } from "react"

const UpdateItem = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params)
    return <>
        {id}
    </>
}
export default UpdateItem