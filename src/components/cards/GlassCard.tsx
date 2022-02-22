import { Box, styled } from '@mui/material';
import theme from '../../Theme';

const GlassCard = styled(Box)<{background?: keyof typeof theme.glassCards}>`
    background: ${(p) => (p.background && p.theme.glassCards[p.background]) || p.theme.glassCards.primaryBackground};
    border-radius: ${(p) => p.theme.shape.borderRadius}px;
    height: 100%;
`;

export default GlassCard;
