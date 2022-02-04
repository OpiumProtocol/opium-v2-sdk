"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Registry__factory = void 0;
var ethers_1 = require("ethers");
var _abi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "_setter",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint32",
                name: "_derivativeAuthorExecutionFeeCap",
                type: "uint32",
            },
        ],
        name: "LogDerivativeAuthorExecutionFeeCapChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "_setter",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint32",
                name: "_derivativeAuthorRedemptionReservePart",
                type: "uint32",
            },
        ],
        name: "LogDerivativeAuthorRedemptionReservePartChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "_setter",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "_noDataCancellationPeriod",
                type: "uint256",
            },
        ],
        name: "LogNoDataCancellationPeriodChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "_setter",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "_protocolExecutionReserveClaimer",
                type: "address",
            },
        ],
        name: "LogProtocolExecutionReserveClaimerChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "_setter",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint32",
                name: "_protocolExecutionReservePart",
                type: "uint32",
            },
        ],
        name: "LogProtocolExecutionReservePartChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "_setter",
                type: "address",
            },
            {
                indexed: true,
                internalType: "bool",
                name: "_state",
                type: "bool",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "_role",
                type: "bytes32",
            },
        ],
        name: "LogProtocolPausableStateChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "_setter",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "_protocolRedemptionReserveClaimer",
                type: "address",
            },
        ],
        name: "LogProtocolRedemptionReserveClaimerChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "_setter",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint32",
                name: "_protocolRedemptionReservePart",
                type: "uint32",
            },
        ],
        name: "LogProtocolRedemptionReservePartChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "_setter",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "_whitelisted",
                type: "address",
            },
        ],
        name: "LogWhitelistAccountAdded",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "_setter",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "_unlisted",
                type: "address",
            },
        ],
        name: "LogWhitelistAccountRemoved",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "previousAdminRole",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "newAdminRole",
                type: "bytes32",
            },
        ],
        name: "RoleAdminChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address",
            },
        ],
        name: "RoleGranted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address",
            },
        ],
        name: "RoleRevoked",
        type: "event",
    },
    {
        inputs: [],
        name: "DEFAULT_ADMIN_ROLE",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_whitelisted",
                type: "address",
            },
        ],
        name: "addToWhitelist",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "getCore",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getProtocolAddresses",
        outputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "core",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "opiumProxyFactory",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "oracleAggregator",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "syntheticAggregator",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "tokenSpender",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "protocolExecutionReserveClaimer",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "protocolRedemptionReserveClaimer",
                        type: "address",
                    },
                    {
                        internalType: "uint32",
                        name: "__gapOne",
                        type: "uint32",
                    },
                    {
                        internalType: "uint32",
                        name: "__gapTwo",
                        type: "uint32",
                    },
                ],
                internalType: "struct RegistryEntities.ProtocolAddressesArgs",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getProtocolParameters",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint32",
                        name: "noDataCancellationPeriod",
                        type: "uint32",
                    },
                    {
                        internalType: "uint32",
                        name: "derivativeAuthorExecutionFeeCap",
                        type: "uint32",
                    },
                    {
                        internalType: "uint32",
                        name: "derivativeAuthorRedemptionReservePart",
                        type: "uint32",
                    },
                    {
                        internalType: "uint32",
                        name: "protocolExecutionReservePart",
                        type: "uint32",
                    },
                    {
                        internalType: "uint32",
                        name: "protocolRedemptionReservePart",
                        type: "uint32",
                    },
                    {
                        internalType: "uint32",
                        name: "__gapOne",
                        type: "uint32",
                    },
                    {
                        internalType: "uint32",
                        name: "__gapTwo",
                        type: "uint32",
                    },
                    {
                        internalType: "uint32",
                        name: "__gapThree",
                        type: "uint32",
                    },
                ],
                internalType: "struct RegistryEntities.ProtocolParametersArgs",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
        ],
        name: "getRoleAdmin",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "grantRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "hasRole",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_governor",
                type: "address",
            },
        ],
        name: "initialize",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_address",
                type: "address",
            },
        ],
        name: "isCoreConfigurationUpdater",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_address",
                type: "address",
            },
        ],
        name: "isCoreSpenderWhitelisted",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "isProtocolPaused",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "isProtocolPositionCancellationPaused",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "isProtocolPositionCreationPaused",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "isProtocolPositionExecutionPaused",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "isProtocolPositionMintingPaused",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "isProtocolPositionRedemptionPaused",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "isProtocolReserveClaimPaused",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_address",
                type: "address",
            },
        ],
        name: "isRegistryManager",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "pause",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "pauseProtocolPositionCancellation",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "pauseProtocolPositionCreation",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "pauseProtocolPositionExecution",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "pauseProtocolPositionMinting",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "pauseProtocolPositionRedemption",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "pauseProtocolReserveClaim",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_whitelisted",
                type: "address",
            },
        ],
        name: "removeFromWhitelist",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "renounceRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "revokeRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint32",
                name: "_derivativeAuthorExecutionFeeCap",
                type: "uint32",
            },
        ],
        name: "setDerivativeAuthorExecutionFeeCap",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint32",
                name: "_derivativeAuthorRedemptionReservePart",
                type: "uint32",
            },
        ],
        name: "setDerivativeAuthorRedemptionReservePart",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint32",
                name: "_noDataCancellationPeriod",
                type: "uint32",
            },
        ],
        name: "setNoDataCancellationPeriod",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_opiumProxyFactory",
                type: "address",
            },
            {
                internalType: "address",
                name: "_core",
                type: "address",
            },
            {
                internalType: "address",
                name: "_oracleAggregator",
                type: "address",
            },
            {
                internalType: "address",
                name: "_syntheticAggregator",
                type: "address",
            },
            {
                internalType: "address",
                name: "_tokenSpender",
                type: "address",
            },
        ],
        name: "setProtocolAddresses",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_protocolExecutionReserveClaimer",
                type: "address",
            },
        ],
        name: "setProtocolExecutionReserveClaimer",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint32",
                name: "_protocolExecutionReservePart",
                type: "uint32",
            },
        ],
        name: "setProtocolExecutionReservePart",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_protocolRedemptionReserveClaimer",
                type: "address",
            },
        ],
        name: "setProtocolRedemptionReserveClaimer",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint32",
                name: "_protocolRedemptionReservePart",
                type: "uint32",
            },
        ],
        name: "setProtocolRedemptionReservePart",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes4",
                name: "interfaceId",
                type: "bytes4",
            },
        ],
        name: "supportsInterface",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "unpause",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
var Registry__factory = /** @class */ (function () {
    function Registry__factory() {
    }
    Registry__factory.createInterface = function () {
        return new ethers_1.utils.Interface(_abi);
    };
    Registry__factory.connect = function (address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    };
    Registry__factory.abi = _abi;
    return Registry__factory;
}());
exports.Registry__factory = Registry__factory;
//# sourceMappingURL=Registry__factory.js.map