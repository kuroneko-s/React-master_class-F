import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    boardColor: string;
    titleColor: string;
    cardColor: string;
    cardTextColor: string;

    activeBoardColor: string;
    activeCardColor: string;
  }
}
