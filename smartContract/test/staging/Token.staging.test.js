// const { ethers, deployments, getNamedAccounts, network } = require("hardhat")
// const { expect, assert } = require("chai")
// const { developmentChains, INITIAL_SUPPLY } = require("../../helper-hardhat-config")

// developmentChains.includes(network.name)
//   ? describe.skip
//   : describe("Token Staging Test", async () => {
//       let token, deployer, user1, signer, signer1

//       beforeEach(async () => {
//         const accounts = await ethers.getSigners()
//         deployer = accounts[0].address
//         user1 = accounts[1].address
//         signer = accounts[0]
//         signer1 = accounts[1]

//         token = await ethers.getContractAt(
//           "Token",
//           (
//             await deployments.get("Token")
//           ).address,
//           signer
//         )
//       })

//       describe("Constructor", () => {
//         it("sets the correct token name and symbol", async () => {
//           const name = await token.name()
//           assert.equal(name, "Louigie")

//           const symbol = await token.symbol()
//           assert.equal(symbol, "LOUIE")
//         })

//         it("mints initial supply to deployer", async () => {
//           const deployerBalance = await token.balanceOf(deployer)
//           const totalSupply = await token.totalSupply()
//           assert.equal(deployerBalance.toString(), totalSupply.toString())
//         })
//       })

//       describe("Transfers", () => {
//         it("allows token transfers between accounts", async () => {
//           const transferAmount = ethers.parseEther("100")
//           await token.transfer(user1, transferAmount)

//           const user1Balance = await token.balanceOf(user1)
//           assert.equal(user1Balance.toString(), transferAmount.toString())
//         })

//         it("emits Transfer event on successful transfer", async () => {
//           const transferAmount = ethers.parseEther("100")
//           const tx = await token.transfer(user1, transferAmount)
//           const receipt = await tx.wait()

//           const transferEvent = receipt.logs[0]
//           assert.equal(transferEvent.topics[0], token.interface.getEvent("Transfer").topicHash)
//         })
//       })

//       describe("Approvals", () => {
//         it("allows token approvals", async () => {
//           const approveAmount = ethers.parseEther("100")
//           await token.approve(user1, approveAmount)

//           const allowance = await token.allowance(deployer, user1)
//           assert.equal(allowance.toString(), approveAmount.toString())
//         })

//         it("allows approved accounts to transfer tokens", async () => {
//           const approveAmount = ethers.parseEther("100")
//           await token.approve(user1, approveAmount)

//           const tokenWithUser1 = token.connect(signer1)
//           await tokenWithUser1.transferFrom(deployer, user1, approveAmount)

//           const user1Balance = await token.balanceOf(user1)
//           assert.equal(user1Balance.toString(), approveAmount.toString())
//         })
//       })
//     })
