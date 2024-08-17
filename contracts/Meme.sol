// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Meme is ERC721URIStorage, Ownable {

    uint256 private _tokenIds;

    constructor() ERC721("MemeNFT", "MEME") {}

    // Function to mint a new NFT with a custom URI
    function mintNFT(address recipient, string memory customUri) public returns (uint256) {
        _tokenIds += 1;
        uint256 newItemId = _tokenIds;

        _mint(recipient, newItemId);
        _setTokenURI(newItemId, customUri);

        return newItemId;
    }
}
