import {shadowColor} from "./Colors";
import {Button} from "rebass";
import styled from "styled-components";


const ButtonWithShadow = styled(Button)`
  cursor: pointer;
  box-shadow: 0 0 3px ${shadowColor};
`;

export {
    ButtonWithShadow
}