<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">Voting Dapp - myDapp</h3>

  <p align="center">
    Voting System on blockchain
  </p>
</div>

## About
<p>
    myDapp is decentralized application (dapp) powered by <a href="https://docs.cartesi.io/cartesi-rollups/1.3/">cartesi</a> rollups technology.
</p>
<p> 
    It's a simple voting system executed through a smart contract on the ethereum network. This DApp leverage blockchain security and decentralized structure to improve voting system, there by providing trust and confidence to the voters on the credibility of the result.
</p>

## Getting Started

Below you'll find instructions on how to setup this DApp locally.

### Prerequisites

Here are some packages needed to successfully run this application on your PC:

* [NodeJS](https://nodejs.org/en), [npm](https://docs.npmjs.com/cli/v10/configuring-npm/install), [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable) 

* [Docker](https://docs.docker.com/get-docker/) 

* [Cartesi-CLI](https://docs.cartesi.io/cartesi-rollups/1.3/development/migration/#install-cartesi-cli)
  ```sh
  npm install -g @cartesi/cli
  ```

For Windows, its recommended to have Ubuntu WSL installed then installing docker on the Linux sub system. This article provide step by step guide on how to successfully install docker on Ubuntu WSL 2 [here](https://dev.to/bartr/install-docker-on-windows-subsystem-for-linux-v2-ubuntu-5dl7)

### Installation

1. Clone this repo
   ```sh
   git clone https://github.com/Bibhestee/myDapp.git
   ```
2. Install NPM packages
   ```sh
   yarn  install
   ```
3. Build and run the dapp via `cartesi-cli`
   ```sh
   cartesi build 
   ```
   and
   ```sh
   cartesi run 
   ```
NB: Reliable internet connectivity is paramount for building cartesi docker image

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

Here you can access the examples of the dapp communication.

These are the resources available on this dapp:

### Advanced handlers
* #### Add Candidate
  ```js
    description — add a new candidate to the voting system.
    parameter * — { name: string} 
  ```

  data sample

  ```json
    {
        "action":"add_candidate", 
        "data":{
            "candidateName":"Ethereum"
        }
    } 
  ```

  interact
    - *via `cartesi cli`*, access your terminal in another window and input these instructions below:
  
    ```sh
    cartesi send generic \
        --dapp=0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e \
        --chain-id=31337 \
        --rpc-url=http://127.0.0.1:5000 \
        --mnemonic-passphrase='test test test test test test test test test test test junk' \
        --input=0x7b22616374696f6e223a226372656174655368656c66222c202264617461223a7b226f776e6572223a22307866333946643665353161616438384636463463653661423838323732373963666646623932323636227d7d
    ```


* #### Vote
  ```js
    description — cast vote for a candidate.
    parameter * — {voteFor: int}
  ```

  data sample

  ```json
    {
        "action":"vote", 
        "data":{
            "voteFor": 1,
        }
    }
  ```

  interact
    - *via `cartesi cli`*, access your terminal in another window and input these instructions below:
  
    ```sh
    cartesi send generic \
        --dapp=0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e \
        --chain-id=31337 \
        --rpc-url=http://127.0.0.1:8545 \
        --mnemonic-passphrase='test test test test test test test test test test test junk' \
        --input=0x7b22616374696f6e223a2261646452656164696e674974656d222c202264617461223a7b227368656c66223a2264386330346137622d653230372d346466622d613164322d633634653964303963396535222c20227469746c65223a224d79206669727374206e6f7465626f6f6b222c2022636f6e74656e74223a223c68313e68693c2f68313e222c2022636f6e74656e7454797065223a2268746d6c227d7d
    ```
    

### Inspect handlers 
* #### result
  ```js
    description — get election result.
  ```

  returned hex sample

  ```json
    {
        "status": "Accepted",
        "exception_payload": null,
        "reports": [
            {
                "payload": "0x..."
            }
        ],
        "processed_input_count": 2
    }
  ```

  Converted payload sample

  ```json 
        {
            "name": "Ethereum",
            "total": 200,
        }

  ```
  interact
    - access the cartesi inspect endpoint on your browser
  ```sh 
  http://localhost:8080/inspect/result
  ```
NB: Pending Implementation 

## Contact

Abdulbasit Abdullahi - [@Bibest22](https://twitter.com/bibest22) - bibhestee@gmail.com

Project Link: [https://github.com/bibhestee/myDapp](https://github.com/bibhestee/myDapp)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [DEV.TO](https://dev.to/bartr/install-docker-on-windows-subsystem-for-linux-v2-ubuntu-5dl7)
* [Cartesi Team](https://docs.cartesi.io/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
