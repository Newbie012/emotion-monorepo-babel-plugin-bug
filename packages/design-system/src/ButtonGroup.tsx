import { styled } from "theming";
import Button from "./Button";

const ButtonGroup = styled.div`
    > ${Button} {
        border-radius: 0;
    }
`;

export default ButtonGroup;
