// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract AiAgentNFT is ERC721URIStorage, ERC721Enumerable, Ownable {
    address private _minter;
    string private _sbtBaseURI;

    uint256 private _tokenIdCounter;
    error MintNotAllowed();

    constructor(
        address _initialOwner
    ) ERC721("AiAgentNFTTest", "AANFT") Ownable(_initialOwner) {}

    // jsonUri is the id of the json file in the s3 or ipfs
    function mint(uint256 jsonUri, address to) public {
        if (msg.sender != _minter && msg.sender != owner()) {
            revert MintNotAllowed();
        }

        _tokenIdCounter = _tokenIdCounter + 1;
        _mint(to, _tokenIdCounter);

        // Set the tokenURI for the new token
        string memory extension = ".json";
        string memory inputTokenURI = string(
            abi.encodePacked(Strings.toString(jsonUri), extension)
        );
        _setTokenURI(_tokenIdCounter, inputTokenURI);
    }

    function updateTokenUri(uint256 tokenId, uint256 jsonUri) public {
        if (msg.sender != _minter && msg.sender != owner()) {
            revert MintNotAllowed();
        }

        string memory extension = ".json";
        string memory inputTokenURI = string(
            abi.encodePacked(Strings.toString(jsonUri), extension)
        );
        _setTokenURI(tokenId, inputTokenURI);
    }

    function getMinter() public view returns (address) {
        return _minter;
    }

    function setMinter(address minter) public onlyOwner {
        _minter = minter;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _sbtBaseURI;
    }

    function setBaseURI(string memory newBaseURI) public onlyOwner {
        _sbtBaseURI = newBaseURI;
    }

    function getBaseURI() public view returns (string memory) {
        return _sbtBaseURI;
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return ERC721URIStorage.tokenURI(tokenId);
    }

    function _increaseBalance(
        address account,
        uint128 value
    ) internal override(ERC721Enumerable, ERC721) {
        ERC721Enumerable._increaseBalance(account, value);
    }

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721, ERC721Enumerable) returns (address) {
        return ERC721Enumerable._update(to, tokenId, auth);
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        virtual
        override(ERC721URIStorage, ERC721Enumerable)
        returns (bool)
    {
        return
            ERC721Enumerable.supportsInterface(interfaceId) ||
            ERC721URIStorage.supportsInterface(interfaceId);
    }
}
