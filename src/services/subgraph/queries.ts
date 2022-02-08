export const positionsQuery = `
query Positions {
  positions {
    id
    name
    symbol
    totalSupply
  }
}
`;

export const buyersQuery = `
query Buyers {
    buyers {
        id
        address
        p2pVaultBalances {
            id
            derivativeHash
            balance
        }
    }
}
`;

export const sellersQuery = `
query Sellers {
    sellers {
        id
        address
        p2pVaultBalances {
            id
            derivativeHash
            balance
        }
    }
}
`;
