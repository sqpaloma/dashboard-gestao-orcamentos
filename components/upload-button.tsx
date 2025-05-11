"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Upload } from "@/components/upload"
import { UploadIcon } from "lucide-react"

interface UploadButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

export function UploadButton({ variant = "default", size = "default" }: UploadButtonProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant={variant} size={size} onClick={() => setOpen(true)}>
        <UploadIcon className="mr-2 h-4 w-4" />
        Upload de Planilha
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Upload de Planilha</DialogTitle>
            <DialogDescription>Faça upload de um arquivo Excel (.xlsx) com os dados dos orçamentos</DialogDescription>
          </DialogHeader>
          <Upload onSuccess={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  )
}
