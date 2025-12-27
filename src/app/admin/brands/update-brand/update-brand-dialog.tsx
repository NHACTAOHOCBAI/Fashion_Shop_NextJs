"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Placeholder } from "@/constants/placeholder.num";
import { ImageUpload } from "@/components/image-upload/image-upload";
import { DialogSkeleton } from "@/components/skeleton/dialog-skeleton";
import useLocalUpdateBrand from "@/app/admin/brands/update-brand/use-local-update-brand";
import { Textarea } from "@/components/ui/textarea";
interface UpdateBrandDialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  updatedItem: Brand | undefined;
  setUpdatedItem: React.Dispatch<React.SetStateAction<Brand | undefined>>;
}
export function UpdateBrandDialog({
  open,
  setUpdatedItem,
  updatedItem,
  setOpen,
}: UpdateBrandDialogProps) {
  const closeDialog = () => {
    setOpen(false);
    setUpdatedItem(undefined);
  };
  const { form, isImageLoading, isPending, onSubmit, handleCancel } =
    useLocalUpdateBrand(updatedItem, closeDialog);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md  max-h-[98vh] overflow-y-auto">
        <DialogHeader>
          <h5>Update Brand</h5>
          <DialogDescription>
            Enter information of user below to update user to table.
          </DialogDescription>
        </DialogHeader>
        {isImageLoading ? (
          <DialogSkeleton />
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <ImageUpload
                    field={field}
                    label="Upload Images"
                    numOfImage={1}
                  />
                )}
              />
              <FormField
                disabled={isPending}
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={Placeholder.CategoryName}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={isPending}
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={Placeholder.CategoryDescription}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-3">
                <Button onLoading={isPending} type="submit" className="w-full">
                  Update
                </Button>
                <Button
                  disabled={isPending}
                  type="button"
                  onClick={handleCancel}
                  variant={"outline"}
                  className="w-full"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
