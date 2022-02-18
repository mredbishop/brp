import {
    Button, ButtonProps, styled, Typography
} from '@mui/material';

export const StyledButton = styled(Button)`
    background: ${(p) => p.color && p.color !== 'inherit' && p.theme.gradients[p.color]?.main};
    color: ${(p) => p.color && p.color !== 'inherit' && p.theme.gradients[p.color]?.contrastText};
`;

type Props = {
    text: string;
} & ButtonProps;

const GradientButton = ({ text, color = 'primary', ...rest }: Props) => (
    <StyledButton color={color} {...rest}>
        <Typography variant="button">{text}</Typography>
    </StyledButton>
);

export default GradientButton;
