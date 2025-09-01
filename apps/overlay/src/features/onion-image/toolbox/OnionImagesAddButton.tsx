import { useOnionImages } from "@/features/onion-image/hooks/useOnionImages";
import { createOnionImage } from "@/features/onion-image/store/createOnionImage";
import { ToolBoxLabeledButton } from "@/features/toolbox/components/ToolBoxLabeledButton";
import { IconPlus } from "@tabler/icons-react";

export function OnionImagesAddButton() {
  const { addImage } = useOnionImages();

  return (
    <ToolBoxLabeledButton
      className="o:col-span-2"
      label="Add Image"
      Icon={<IconPlus size={16} />}
      onClick={async () => {
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
              img.onload = () => {
                const { width, height } = img;
                const onionImage = createOnionImage(file.name, {
                  data: base64,
                  width,
                  height,
                });
                addImage(onionImage);
              };

              img.onerror = (error) => {
                console.error("Error loading image:", error);
              };
            };
            reader.readAsDataURL(file);
          }
        };
        fileInput.click();
      }}
    />
  );
}
