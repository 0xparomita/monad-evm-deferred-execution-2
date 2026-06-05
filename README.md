# Monad Deferred Execution Simulator

In 2026, **Monad** sets a new standard for EVM scaling by decoupling transaction consensus from actual state execution. In traditional EVM environments, nodes must execute a transaction and update the state root *before* agreeing on the next block. Monad uses **Deferred Execution**, where the official block order is reached first via the consensus layer, and nodes execute the state modifications independently with a slight delay.

This repository provides an advanced architectural simulation showing how separating these steps prevents execution latency from bottlenecking network consensus, enabling up to 10,000 TPS.

## Architectural Split
- **Consensus Layer:** Rapidly sequences and batches incoming transactions without waiting for state calculations.
- **Execution Pipeline:** Executes sequenced transactions in the background asynchronously using optimized parallel execution threads.

## Getting Started
1. Install testing metrics packages: `npm install`
2. Run the high-throughput simulation script: `node simulateDeferredPipeline.js`
