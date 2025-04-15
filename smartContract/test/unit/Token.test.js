const { ethers, deployments, getNamedAccounts, network } = require("hardhat")
const { expect, assert } = require("chai")
const { developmentChains, INITIAL_SUPPLY } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Token Unit Tests", function () {
      //Multipler is used to make reading the math easier because of the 18 decimal points
      const multiplier = 10 ** 18
      let token, deployer, user1, signer, signer1

      beforeEach(async () => {
        const accounts = await ethers.getSigners()
        deployer = accounts[0].address
        user1 = accounts[1].address
        signer = accounts[0]
        signer1 = accounts[1]

        await deployments.fixture(["all"])

        token = await ethers.getContractAt(
          "Token",
          (
            await deployments.get("Token")
          ).address,
          signer
        )
      })
      it("was deployed successfully", async () => {
        assert.ok(token.target)
      })
      describe("Constructor", function () {
        it("should have the correct initial supply", async () => {
          const initialSupply = await token.totalSupply()
          assert.equal(initialSupply.toString(), INITIAL_SUPPLY)
        })
        it("initializes the token with the correct name and symbol", async () => {
          const name = await token.name()
          assert.equal(name, "Louigie")

          const symbol = await token.symbol()
          assert.equal(symbol, "LOUIE")
        })
      })
      describe("Transfer", function () {
        it("should transfer tokens between accounts", async () => {
          const amount = ethers.parseEther("1")
          await token.transfer(user1, amount)
          expect(await token.balanceOf(user1)).to.equal(amount)
        })
        it("should emit a transfer event", async () => {
          await expect(token.transfer(user1, (10 * multiplier).toString())).to.emit(
            token,
            "Transfer"
          )
        })
      })
      describe("Allowances", function () {
        const amount = (20 * multiplier).toString()
        beforeEach(async () => {
          playerToken = await ethers.getContractAt(
            "Token",
            (
              await deployments.get("Token")
            ).address,
            signer1
          )
        })
        it("should allow player to approve a token spend", async () => {
          const tokenToSpend = await ethers.parseEther("5")

          await token.approve(user1, tokenToSpend)
          await playerToken.transferFrom(deployer, user1, tokenToSpend)
          expect(await playerToken.balanceOf(user1)).to.equal(tokenToSpend)
        })
        it("doesn't allow an unapproved player to spend", async () => {
          await expect(
            playerToken.transferFrom(deployer, user1, amount)
          ).to.be.revertedWithCustomError(playerToken, "ERC20InsufficientAllowance")
        })
        it("emits an approval event when approving a token spend", async () => {
          await expect(token.approve(user1, amount)).to.emit(token, "Approval")
        })
        it("sets the allowance for the player", async () => {
          await token.approve(user1, amount)
          const allowance = await token.allowance(deployer, user1)
          assert.equal(allowance.toString(), amount)
        })
        it("won't allow a player to approve more than the allowance", async () => {
          await expect(
            playerToken.transferFrom(deployer, user1, (40 * multiplier).toString())
          ).to.be.revertedWithCustomError(playerToken, "ERC20InsufficientAllowance")
        })
      })
    })
