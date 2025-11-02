// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title MitchCoin (MTC) - Utility/Loyalty token for Mitch from Transylvania
/// @notice Simple ERC20 with owner-owned mint/burn hooks you can extend later.
contract MitchCoin is ERC20, Ownable {
    constructor(
        uint256 initialSupply
    ) ERC20("MitchCoin", "MTC") Ownable(msg.sender) {
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }

    /// @notice Owner can mint for loyalty promotions, grants, etc.
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    /// @notice Owner can burn its own tokens (e.g., treasury adjustments).
    function burn(uint256 amount) external onlyOwner {
        _burn(msg.sender, amount);
    }
}
