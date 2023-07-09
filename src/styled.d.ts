//styled.d.ts
//theme.ts를 설명해주는 파일?
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
    innerBgColor: string;
  }
}
