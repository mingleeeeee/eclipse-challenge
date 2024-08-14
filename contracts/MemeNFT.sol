// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FractionalToken is ERC20, Ownable {
    IERC721 public nftContract;
    uint256 public nftTokenId;
    bool public redeemed = false;

    constructor(
        address _initialOwner,
        string memory name,
        string memory symbol,
        address _nftContract,
        uint256 _nftTokenId,
        uint256 _totalSupply
    ) ERC20(name, symbol) Ownable(_initialOwner) {
        nftContract = IERC721(_nftContract);
        nftTokenId = _nftTokenId;
        _mint(_initialOwner, _totalSupply);
    }

    function redeem(uint256 amount) public {
        require(!redeemed, "NFT already redeemed");
        require(balanceOf(msg.sender) >= amount, "Not enough tokens");

        _burn(msg.sender, amount);

        if (totalSupply() == 0) {
            redeemed = true;
            nftContract.transferFrom(address(this), msg.sender, nftTokenId);
        }
    }
}

contract MemeNFT is ERC721URIStorage, ERC721Enumerable, Ownable {
    address private _minter;
    string private _sbtBaseURI;
    uint256 private _tokenIdCounter;

    // Error declarations
    error MintNotAllowed();
    error NotEnoughTokens();
    error NFTAlreadyFractionalized();

    // Mapping from NFT token ID to its corresponding fractional token contract
    mapping(uint256 => address) public fractionalTokenContracts;

    constructor(address _initialOwner) ERC721("MemeNFT", "MNFT") Ownable(_initialOwner) {}

    // Function to mint a new NFT
    function mint(uint256 jsonUri, address to) public {
        if (msg.sender != _minter && msg.sender != owner()) {
            revert MintNotAllowed();
        }

        _tokenIdCounter = _tokenIdCounter + 1;
        _mint(to, _tokenIdCounter);

        string memory extension = ".json";
        string memory inputTokenURI = string(abi.encodePacked(Strings.toString(jsonUri), extension));
        _setTokenURI(_tokenIdCounter, inputTokenURI);
    }

    // Function to update the URI of an existing NFT
    function updateTokenUri(uint256 tokenId, uint256 jsonUri) public {
        if (msg.sender != _minter && msg.sender != owner()) {
            revert MintNotAllowed();
        }

        string memory extension = ".json";
        string memory inputTokenURI = string(abi.encodePacked(Strings.toString(jsonUri), extension));
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

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return ERC721URIStorage.tokenURI(tokenId);
    }

    function _increaseBalance(address account, uint128 value) internal override(ERC721Enumerable, ERC721) {
        ERC721Enumerable._increaseBalance(account, value);
    }

    function _update(address to, uint256 tokenId, address auth) internal override(ERC721, ERC721Enumerable) returns (address) {
        return ERC721Enumerable._update(to, tokenId, auth);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721URIStorage, ERC721Enumerable) returns (bool) {
        return ERC721Enumerable.supportsInterface(interfaceId) || ERC721URIStorage.supportsInterface(interfaceId);
    }

    // Function to fractionalize an NFT
    function fractionalizeNFT(
        uint256 nftTokenId,
        string memory tokenName,
        string memory tokenSymbol,
        uint256 totalSupply
    ) public {
        require(ownerOf(nftTokenId) == msg.sender, "Only the owner can fractionalize");
        require(fractionalTokenContracts[nftTokenId] == address(0), "NFT already fractionalized");

        FractionalToken fractionalToken = new FractionalToken(
            msg.sender,
            tokenName,
            tokenSymbol,
            address(this),
            nftTokenId,
            totalSupply
        );

        fractionalTokenContracts[nftTokenId] = address(fractionalToken);

        transferFrom(msg.sender, address(fractionalToken), nftTokenId);
    }
}
