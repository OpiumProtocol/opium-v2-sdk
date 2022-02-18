export const holderPositionsQuery = (holderAddress: string) => `
    query HolderPositions {
        holderPositions(where: {
            holder: "${holderAddress.toLowerCase()}"
        }) {
            longBalance
            shortBalance
            ticker {
                margin
                endTime
                params
                oracleId
                token
                syntheticId
                longPosition {
                    id
                }
                shortPosition {
                    id
                }
            }
        }
    }
`;
