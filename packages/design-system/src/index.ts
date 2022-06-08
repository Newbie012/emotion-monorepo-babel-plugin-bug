import { styled } from "theming";

export const Child = styled.div``;

export const Wrapper = styled.div`
    margin: 16px;
    padding: 8px;
    display: flex;
    gap: 8px;
    border: 1px solid;

    ${Child} {
        border: 1px solid;
    }
`;
