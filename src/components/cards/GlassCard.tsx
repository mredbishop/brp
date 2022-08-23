import { Box, styled } from '@mui/material';

const GlassCard = styled(Box)<{ background?: string }>`
    background: ${(p) => p.background || p.theme.glassCards.primaryBackground};
    border-radius: ${(p) => p.theme.shape.borderRadius}px;
    height: 100%;
`;

export default GlassCard;
