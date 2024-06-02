import { getEnhancedPrisma } from 'server/enhanced-db';
import { NextRequestHandler } from '@zenstackhq/server/next';

export default NextRequestHandler({
    getPrisma: (req, res) => getEnhancedPrisma({ req, res }),
    zodSchemas: true,
});
