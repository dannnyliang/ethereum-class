var _biddingTime = 180;
var _beneficiary = b;
var simpleauctionContract = web3.eth.contract([
  {
    constant: false,
    inputs: [],
    name: 'bid',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'auctionClose',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'auctionEnd',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'beneficiary',
    outputs: [{ name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'withdraw',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'highestBidder',
    outputs: [{ name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'highestBid',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { name: '_biddingTime', type: 'uint256' },
      { name: '_beneficiary', type: 'address' },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: 'bidder', type: 'address' },
      { indexed: false, name: 'amount', type: 'uint256' },
    ],
    name: 'HighestBidIncreased',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: 'winner', type: 'address' },
      { indexed: false, name: 'amount', type: 'uint256' },
    ],
    name: 'AuctionEnded',
    type: 'event',
  },
]);
var simpleauction = simpleauctionContract.new(
  _biddingTime,
  _beneficiary,
  {
    from: web3.eth.accounts[0],
    data:
      '0x608060405234801561001057600080fd5b5060405160408061054983398101604052805160209091015160008054600160a060020a03909216600160a060020a031990921691909117905542016001556104eb8061005e6000396000f3006080604052600436106100825763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631998aeef811461008757806319c2a5b5146100915780632a24f46c146100b857806338af3eed146100cd5780633ccfd60b146100fe57806391f9015714610127578063d57bde791461013c575b600080fd5b61008f610151565b005b34801561009d57600080fd5b506100a661029f565b60408051918252519081900360200190f35b3480156100c457600080fd5b5061008f6102a5565b3480156100d957600080fd5b506100e2610416565b60408051600160a060020a039092168252519081900360200190f35b34801561010a57600080fd5b50610113610425565b604080519115158252519081900360200190f35b34801561013357600080fd5b506100e26104aa565b34801561014857600080fd5b506100a66104b9565b6001544211156101ab576040805160e560020a62461bcd02815260206004820152601660248201527f41756374696f6e20616c726561647920656e6465642e00000000000000000000604482015290519081900360640190fd5b6003543411610204576040805160e560020a62461bcd02815260206004820152601e60248201527f546865726520616c7265616479206973206120686967686572206269642e0000604482015290519081900360640190fd5b6003541561023157600354600254600160a060020a03166000908152600460205260409020805490910190555b6002805473ffffffffffffffffffffffffffffffffffffffff191633600160a060020a031690811790915534600381905560408051928352602083019190915280517ff4757a49b326036464bec6fe419a4ae38c8a02ce3e68bf0809674f6aab8ad3009281900390910190a1565b60015481565b6001544210156102ff576040805160e560020a62461bcd02815260206004820152601660248201527f41756374696f6e206e6f742079657420656e6465642e00000000000000000000604482015290519081900360640190fd5b60055460ff1615610380576040805160e560020a62461bcd02815260206004820152602360248201527f61756374696f6e456e642068617320616c7265616479206265656e2063616c6c60448201527f65642e0000000000000000000000000000000000000000000000000000000000606482015290519081900360840190fd5b6005805460ff1916600117905560025460035460408051600160a060020a039093168352602083019190915280517fdaec4582d5d9595688c8c98545fdd1c696d41c6aeaeb636737e84ed2f5c00eda9281900390910190a160008054600354604051600160a060020a039092169281156108fc029290818181858888f19350505050158015610413573d6000803e3d6000fd5b50565b600054600160a060020a031681565b600160a060020a033316600090815260046020526040812054818111156104a157600160a060020a0333166000818152600460205260408082208290555183156108fc0291849190818181858888f1935050505015156104a157600160a060020a033316600090815260046020526040812082905591506104a6565b600191505b5090565b600254600160a060020a031681565b600354815600a165627a7a723058202f3358a7020bbe454f6579a90359ef6ef48245485387feba78713b38daa1693b0029',
    gas: '4700000',
  },
  function(e, contract) {
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
      console.log(
        'Contract mined! address: ' +
          contract.address +
          ' transactionHash: ' +
          contract.transactionHash,
      );
    }
  },
);