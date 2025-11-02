import { expect } from "chai";
import { ethers } from "hardhat";

describe("MitchCoin", function () {
  it("mints initial supply to deployer", async () => {
    const [owner] = await ethers.getSigners();
    const MitchCoin = await ethers.getContractFactory("MitchCoin");
    const token = await MitchCoin.deploy(1000n);
    const balance = await token.balanceOf(owner.address);
    expect(balance).to.equal(1000n * (10n ** BigInt(await token.decimals())));
  });

  it("owner can mint", async () => {
    const [owner, user] = await ethers.getSigners();
    const MitchCoin = await ethers.getContractFactory("MitchCoin");
    const token = await MitchCoin.deploy(0n);
    await token.mint(user.address, 5n);
    expect(await token.balanceOf(user.address)).to.equal(5n);
  });

  it("has correct name and symbol", async () => {
    const MitchCoin = await ethers.getContractFactory("MitchCoin");
    const token = await MitchCoin.deploy(1000n);
    expect(await token.name()).to.equal("MitchCoin");
    expect(await token.symbol()).to.equal("MTC");
  });

  it("owner can burn tokens", async () => {
    const [owner] = await ethers.getSigners();
    const MitchCoin = await ethers.getContractFactory("MitchCoin");
    const token = await MitchCoin.deploy(1000n);
    const initialBalance = await token.balanceOf(owner.address);
    await token.burn(100n);
    const finalBalance = await token.balanceOf(owner.address);
    expect(initialBalance - finalBalance).to.equal(100n);
  });
});
