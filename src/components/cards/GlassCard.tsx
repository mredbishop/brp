import { Box, styled } from '@mui/material';
import theme from '../../Theme';

const GlassCard = styled(Box)<{background?: keyof typeof theme.glassCards}>`
    background: ${(p) => (p.background && p.theme.glassCards[p.background]) || p.theme.glassCards.primaryBackground};
    -webkit-backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
    border-radius: ${(p) => p.theme.shape.borderRadius}px;
    height: 100%;
    height: 100%;
`;

export default GlassCard;
