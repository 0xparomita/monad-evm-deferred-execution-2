// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

/**
 * @title StateRootVerification
 * @dev Illustrates how Monad smart contracts reference the state root from previous delayed sequences.
 */
contract StateRootVerification {
    uint256 public constant EXECUTION_DELAY_OFFSET = 1;
    
    mapping(uint256 => bytes32) public historicalStateRoots;
    uint256 public latestConsensusBlock;

    event RootAnchored(uint256 indexed blockNumber, bytes32 stateRoot);

    /**
     * @notice Anchor state roots onto the canonical ledger.
     * @dev Notice that the root for block N is submitted inside block N + 1.
     */
    function anchorDeferredRoot(uint256 blockNumber, bytes32 stateRoot) external {
        historicalStateRoots[blockNumber] = stateRoot;
        latestConsensusBlock = blockNumber + EXECUTION_DELAY_OFFSET;
        
        emit RootAnchored(blockNumber, stateRoot);
    }
}
