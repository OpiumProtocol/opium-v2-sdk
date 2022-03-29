// Positions
export const holderPositionsQuery = (holderAddress: string) => `
    query HolderPositions {
        holderPositions(where: {
            holder: "${holderAddress.toLowerCase()}"
        }) {
            longBalance
            shortBalance
            ticker {
                id
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

// Tickers
export const tickersByDerivativeHashQuery = (derivativeHash: string) => `
    query Tickers {
        tickers(where: {
            id: "${derivativeHash.toLowerCase()}"
        }) {
            id
            margin
            endTime
            params
            oracleId
            token
            syntheticId
            longPosition {
                id
                totalSupply
            }
            shortPosition {
                id
                totalSupply
            }
        }
    }
`;
export const tickersByLongPositionAddressQuery = (longPositionAddress: string) => `
    query Tickers {
        tickers(where: {
            longPosition: "${longPositionAddress.toLowerCase()}"
        }) {
            id
            margin
            endTime
            params
            oracleId
            token
            syntheticId
            longPosition {
                id
                totalSupply
            }
            shortPosition {
                id
                totalSupply
            }
        }
    }
`;
export const tickersByShortPositionAddressQuery = (shortPositionAddress: string) => `
    query Tickers {
        tickers(where: {
            shortPosition: "${shortPositionAddress.toLowerCase()}"
        }) {
            id
            margin
            endTime
            params
            oracleId
            token
            syntheticId
            longPosition {
                id
                totalSupply
            }
            shortPosition {
                id
                totalSupply
            }
        }
    }
`;
