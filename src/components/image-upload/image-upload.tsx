/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useMemo, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { UploadCloud, X } from "lucide-react"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

interface ImageUploadProps {
    field: {
        value: File[] | undefined
        onChange: (files: File[] | undefined) => void
    }
    label?: string
    numOfImage: number
    disabled?: boolean
}

export function ImageUpload({ field, label, numOfImage, disabled }: ImageUploadProps) {
    const files = useMemo(() => field.value || [], [field])

    const onDrop = (acceptedFiles: File[]) => {
        if (disabled) return
        const remain = numOfImage - files.length
        field.onChange([...files, ...acceptedFiles.slice(0, remain)])
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
        multiple: true,
        disabled: disabled || files.length >= numOfImage,
    })

    const previews = useMemo(
        () =>
            files.map(file => ({
                file,
                url: (file as any).preview || URL.createObjectURL(file), // 👈 ưu tiên preview có sẵn
            })),
        [files]
    )


    useEffect(() => {
        return () => {
            previews.forEach(p => URL.revokeObjectURL(p.url))
        }
    }, [previews])

    const removeFile = (file: File) => {
        if (disabled) return
        field.onChange(files.filter(f => f !== file))
    }

    return (
        <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
                <div className="space-y-6">
                    {/* Dropzone */}
                    <Card
                        {...getRootProps()}
                        className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all
            ${isDragActive ? "border-blue-500 bg-blue-50 shadow-md scale-[1.02]" : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"}
            ${files.length >= numOfImage || disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                    >
                        <input {...getInputProps()} />
                        <div className="flex flex-col items-center justify-center space-y-3">
                            <UploadCloud
                                className={`h-10 w-10 ${isDragActive ? "text-blue-500" : "text-gray-400"}`}
                            />
                            <p className="text-sm text-gray-600">
                                {files.length >= numOfImage ? (
                                    <span className="text-gray-500 font-medium">
                                        Maximum number of images reached
                                    </span>
                                ) : isDragActive ? (
                                    <span className="text-blue-600 font-medium">Drop images here...</span>
                                ) : (
                                    <>
                                        <span className="font-medium text-blue-600">Click to select</span> or drag & drop
                                    </>
                                )}
                            </p>
                            <p className="text-xs text-gray-400">
                                Supported formats: JPG, PNG, GIF (max 5MB) – {files.length}/{numOfImage} images
                            </p>
                        </div>
                    </Card>

                    {/* Preview */}
                    {previews.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                            {previews.map(({ file, url }, idx) => (
                                <div
                                    key={idx}
                                    className="relative group rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
                                >
                                    <AspectRatio ratio={1 / 1}>
                                        <Image src={url} alt={file.name} fill className="rounded-md object-cover" />
                                    </AspectRatio>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="absolute top-2 right-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow"
                                        onClick={() => removeFile(file)}
                                        disabled={disabled}
                                    >
                                        <X />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </FormControl>
            <FormMessage />
        </FormItem>
    )
}
