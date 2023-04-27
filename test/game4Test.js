const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert } = require("chai");

describe("Game4", function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory("Game4");
    const game = await Game.deploy();

    const signer = await ethers.provider.getSigner(0);

    return { game, signer };
  }

  it("should be a winner", async function () {
    const { game, signer } = await loadFixture(deployContractAndSetVariables);

    // Gets the address of the caller.
    const address = await signer.getAddress();

    // Sets the value of the inner mapping for the caller's address and the caller.
    await game.connect(signer).write(address);

    // Checks whether the caller's address has been set for the caller in the inner mapping.
    // If it has, sets the isWon flag to true.
    await game.win(address);

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
