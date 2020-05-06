# medici

## [cTokens](https://compound.finance/ctokens)

### Portable Balances
cTokens represent balance in the Compound protocol. Accrue interest over time
As a market earns interest, its cToken becomes convertible into an increasing quantity of the underlying asset.

For example, you minted some cETH by supplying ETH to Compound. As the Ether market on compound earns interest, the cETH tokens become convertible into more ETH.

Each market has its own supply interest rate (APR). You earn interest when you hold cTokens.

cTokens accumulate interest through their exchange rate. 
Over time, each cToken becomes convertible into increasing amount of its underlying asset. 
So even if the number of cTokens in your wallet stays the same, the value of your holding increases.

**Example**
If you supply 1,000 DAI to the Compound protocol when the exchange rate is 0.020070, you would receive 1,000/0.020070 = 49,825.61 cDAI

A few months later, you decide its time to withdraw your DAI and the exchange rate is now 0.021591
- Your 49,825.61 cDAI is now equal to 49,825.61*0.021591 = 1,075.78 DAI -> A 7.6% increase 

### Useful Collateral
By holding or receiving cToken, you can borrow from the Compound protocol.