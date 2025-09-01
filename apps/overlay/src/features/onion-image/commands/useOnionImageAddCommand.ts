import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { createOnionImage } from "@/features/onion-image/store/createOnionImage";
import { useOnionImageAddMutation } from "@/features/onion-image/store/useOnionImageAddMutation";
import { useOnionImageRemoveMutation } from "@/features/onion-image/store/useOnionImageRemoveMutation";
import { useSetSelectedTool } from "@/features/tools/store/tools";
import { type IOnionImage } from "../types";

export function useOnionImageAddCommand() {
  const setSelectedTool = useSetSelectedTool();
  const { execute: executeCommand } = useCommands();
  const addOnionImage = useOnionImageAddMutation();
  const removeOnionImage = useOnionImageRemoveMutation();

  return {
    execute: () => {
      let onionImage: IOnionImage | null = null;
      const command = new Command(
        "Onion Image - Add",
        () => {
          return new Promise((resolve) => {
            const fileInput = document.createElement("input");
            fileInput.type = "file";
            fileInput.accept = "image/*";
            fileInput.onchange = async (event) => {
              const file = (event.target as HTMLInputElement)?.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                  const base64 = e.target?.result as string;

                  const img = new Image();
                  img.src = URL.createObjectURL(file);
                  img.onload = async () => {
                    const { width, height } = img;
                    onionImage = createOnionImage(file.name, {
                      data: base64,
                      width,
                      height,
                    });
                    await addOnionImage.mutateAsync({
                      onionImage,
                    });
                    setSelectedTool(onionImage);
                    resolve(onionImage);
                  };

                  img.onerror = (error) => {
                    console.error("Error loading image:", error);
                  };
                };
                reader.readAsDataURL(file);
              }
            };
            fileInput.click();
          });
        },
        () => {
          return new Promise((resolve, reject) => {
            if (onionImage) {
              removeOnionImage
                .mutateAsync({
                  onionImage,
                })
                .then(() => {
                  setSelectedTool(null);
                  resolve(onionImage);
                });
            } else {
              reject();
            }
          });
        }
      );
      return executeCommand(command);
    },
  };
}
