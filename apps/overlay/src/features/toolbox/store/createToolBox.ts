import type { IToolBox } from "@/features/toolbox/types";
import { v4 as uuidv4 } from "uuid";

export const createToolBox = (): IToolBox => ({
  id: uuidv4(),
  type: "toolbox",
  locked: false,
  visible: true,
  x: 50,
  y: 50,
});
