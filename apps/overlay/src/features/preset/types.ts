export interface IPreset {
  id: string;
  type: "preset";
  name: string;
  x: number;
  y: number;
  width: `${number}%`;
  height: `${number}%`;
}
