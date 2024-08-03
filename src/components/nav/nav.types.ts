export interface NavItemInterface {
  id: number;
  type: NavTypes;
  content: string;
}

enum NavTypes {
  LOGO = "logo",
  ITEM = "item",
  AVATAR = "avatar",
  TOGGLE = "toggle",
}

export interface NavGroupInterface {
  id: number;
  items: NavItemInterface[];
}

export type NavDataType = NavGroupInterface[];