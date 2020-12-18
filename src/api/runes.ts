export interface iTalentPath {
  id: string;
  title: string;
  runes: iRune[];
}

export interface iRune {
  id: string;
  active?: boolean;
}
export interface iRuneClickEvent {
  rune: iRune;
  path: iTalentPath;
  click: "left" | "right";
}
