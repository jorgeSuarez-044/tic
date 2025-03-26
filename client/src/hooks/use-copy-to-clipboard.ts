import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

export function useCopyToClipboard(): (text: string) => Promise<boolean> {
  const { toast } = useToast();

  const copyToClipboard = useCallback(async (text: string) => {
    if (!navigator.clipboard) {
      toast({
        title: "Error al copiar",
        description: "Tu navegador no soporta la API de portapapeles",
        variant: "destructive",
      });
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.error("Error al copiar al portapapeles:", error);
      toast({
        title: "Error al copiar",
        description: "No se pudo copiar el contenido al portapapeles",
        variant: "destructive",
      });
      return false;
    }
  }, [toast]);

  return copyToClipboard;
}
