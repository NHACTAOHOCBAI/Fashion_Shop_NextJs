"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { modalContent } from "@/lib/animations";
import { Loader2 } from "lucide-react";
import React from "react";

/**
 * BaseModal - Standardized modal component with consistent styling and animations
 *
 * Features:
 * - Icon support in header
 * - Standardized footer layout (Cancel left, Primary right)
 * - Smooth animations using Framer Motion
 * - Max height with scroll for long content
 * - Loading state support
 * - Consistent spacing and typography
 *
 * @example
 * <BaseModal
 *   open={open}
 *   onOpenChange={setOpen}
 *   title="Add New Address"
 *   icon={<MapPin size={20} />}
 *   footer={
 *     <>
 *       <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
 *       <Button onClick={handleSubmit}>Save</Button>
 *     </>
 *   }
 * >
 *   <FormContent />
 * </BaseModal>
 */

interface BaseModalProps {
  /** Whether the modal is open */
  open: boolean;
  /** Callback when open state changes */
  onOpenChange: (open: boolean) => void;
  /** Modal title text */
  title: string;
  /** Optional description text below title */
  description?: string;
  /** Optional icon to display before title */
  icon?: React.ReactNode;
  /** Modal content */
  children: React.ReactNode;
  /** Optional footer content (buttons, actions, etc.) */
  footer?: React.ReactNode;
  /** Whether the modal is in a loading state */
  isLoading?: boolean;
  /** Custom className for the content wrapper */
  className?: string;
  /** Max width class (default: max-w-lg) */
  maxWidth?: string;
  /** Whether to show close button (default: true) */
  showCloseButton?: boolean;
}

export function BaseModal({
  open,
  onOpenChange,
  title,
  description,
  icon,
  children,
  footer,
  isLoading = false,
  className,
  maxWidth = "max-w-lg",
  showCloseButton = true,
}: BaseModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(maxWidth, "max-h-[90vh] flex flex-col p-0 gap-0")}
        showCloseButton={showCloseButton}
      >
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#40BFFF]/10 text-[#40BFFF] flex-shrink-0">
                {icon}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h6 className="text-xs font-semibold text-gray-800 dark:text-gray-100">
                {title}
              </h6>
              {description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {description}
                </p>
              )}
            </div>
          </div>
        </DialogHeader>

        {/* Content with scroll */}
        <div className={cn("flex-1 overflow-y-auto px-6 py-5", className)}>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-[#40BFFF] animate-spin" />
            </div>
          ) : (
            <motion.div
              variants={modalContent}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {children}
            </motion.div>
          )}
        </div>

        {/* Footer */}
        {footer && (
          <DialogFooter className="px-6 pb-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex-shrink-0 gap-3">
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

/**
 * BaseModalFooter - Standardized footer with Cancel (left) and Primary (right) buttons
 *
 * @example
 * <BaseModalFooter
 *   onCancel={() => setOpen(false)}
 *   onConfirm={handleSubmit}
 *   confirmText="Save"
 *   isLoading={isPending}
 * />
 */
interface BaseModalFooterProps {
  /** Cancel button click handler */
  onCancel: () => void;
  /** Confirm button click handler */
  onConfirm: () => void;
  /** Cancel button text (default: "Cancel") */
  cancelText?: string;
  /** Confirm button text (default: "Confirm") */
  confirmText?: string;
  /** Whether confirm button is in loading state */
  isLoading?: boolean;
  /** Whether confirm button is disabled */
  isDisabled?: boolean;
  /** Confirm button variant */
  confirmVariant?: "default" | "destructive";
}

export function BaseModalFooter({
  onCancel,
  onConfirm,
  cancelText = "Cancel",
  confirmText = "Confirm",
  isLoading = false,
  isDisabled = false,
  confirmVariant = "default",
}: BaseModalFooterProps) {
  return (
    <>
      <button
        onClick={onCancel}
        disabled={isLoading}
        className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {cancelText}
      </button>
      <button
        onClick={onConfirm}
        disabled={isLoading || isDisabled}
        className={cn(
          "px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2",
          confirmVariant === "destructive"
            ? "bg-red-500 hover:bg-red-600"
            : "bg-[#40BFFF] hover:bg-[#33A0DD]"
        )}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        {isLoading ? "Loading..." : confirmText}
      </button>
    </>
  );
}
