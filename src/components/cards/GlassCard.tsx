import { styled, Box } from '@mui/material';

const GlassCard = styled(Box)`
    background: ${(p) => p.theme.glassCards.background || 'linear-gradient(219deg, rgb(215 39 210 / 5%) 0%, rgb(23 69 209 / 15%) 100%)'};
    -webkit-backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
    border-radius: ${(p) => p.theme.shape.borderRadius}px;
    box-shadow: ${(p) => p.theme.glassCards.boxShadow || 'inset 0px 0px 12px 1px rgb(228 101 237 / 3%)'};
    height: 100%;
    height: 100%;
`;

export default GlassCard;
