const crypto = require('crypto');

class MonadNodeSimulator {
    constructor() {
        this.consensusBlockQueue = [];
        this.lastExecutedBlockNumber = 0;
        this.currentStateRoot = crypto.createHash('sha256').update('GENESIS_STATE').digest('hex');
    }

    /**
     * Phase 1: Consensus Layer
     * Achieves consensus on transaction order instantly without running execution logic.
     */
    receiveAndSequenceBlock(blockNumber, transactionPayloads) {
        console.log(`[Consensus Stage] Block #${blockNumber} finalized via MonadBFT consensus engine.`);
        
        const committedBlock = {
            blockNumber,
            transactions: transactionPayloads,
            status: "Consensus_Reached_Order_Locked"
        };
        
        this.consensusBlockQueue.push(committedBlock);
        console.log(` -> Block #${blockNumber} appended to deferred execution queue immediately.`);
    }

    /**
     * Phase 2: Deferred Execution Layer
     * Processes transaction logic asynchronously, lagging slightly behind consensus intentionally.
     */
    executeNextDeferredBlock() {
        if (this.consensusBlockQueue.length === 0) {
            console.log("[Execution Stage] No finalized blocks pending in the deferred queue.");
            return;
        }

        const blockToProcess = this.consensusBlockQueue.shift();
        console.log(`--- Processing Deferred State Execution for Block #${blockToProcess.blockNumber} ---`);

        let stateUpdateBuffer = Buffer.from(this.currentStateRoot);
        
        blockToProcess.transactions.forEach(tx => {
            console.log(` -> Executing dynamic transaction data payload: ${tx.id}`);
            stateUpdateBuffer = Buffer.concat([stateUpdateBuffer, Buffer.from(tx.payload)]);
        });

        // Compute the resulting state root hash deterministically after consensus
        this.currentStateRoot = crypto.createHash('sha256').update(stateUpdateBuffer).digest('hex');
        this.lastExecutedBlockNumber = blockToProcess.blockNumber;

        console.log(`[Execution Success] Block #${this.lastExecutedBlockNumber} State Root finalized: ${this.currentStateRoot}`);
    }
}

const nodeSim = new MonadNodeSimulator();

// Populate the architecture with continuous rapid consensus inputs
const mockTxSet = [{ id: "tx_01", payload: "transfer_10_mon" }, { id: "tx_02", payload: "swap_weth_usdc" }];
nodeSim.receiveAndSequenceBlock(101, mockTxSet);
nodeSim.receiveAndSequenceBlock(102, mockTxSet);

// Trigger background execution cycles later
nodeSim.executeNextDeferredBlock();
nodeSim.executeNextDeferredBlock();
