# HealthcareRecords Smart Contract
## Overview
The **HealthcareRecords** project is a decentralized healthcare application developed with Ethereum blockchain technology. It allows authorized healthcare providers to securely store and manage patient health records, ensuring both privacy and data integrity. The contract leverages Solidity and integrates seamlessly with a React.js frontend, offering a user-friendly interface for interacting with the blockchain.
## Features
- **Owner-Based Control**: Only the deployer of the contract (owner) can authorize healthcare providers.
- **Provider Authorization**: Authorized providers can add and fetch patient records securely.
- **Patient Record Management**: Enables secure addition and retrieval of patient health records based on a unique `patientID`.
- **Event Logging**: Key actions such as adding records or provider authorization are logged via blockchain events.

## Technology Stack
**Smart Contract Development**:
- Solidity (version `^0.8.0`)
- Hardhat (for testing, deployment, and interaction)

**Frontend**:
- React.js (for user interfaces)
- ethers.js (for connecting with and interacting with the Ethereum blockchain)

## How It Works
1. **Contract Owner Actions**:
    - Deploy the contract.
    - Authorize healthcare providers to manage patient records.

2. **Authorized Providers**:
    - Add new patient records.
    - Fetch existing records for a specific patient ID.

3. **Frontend**:
    - Integrates with the smart contract using MetaMask for wallet interaction.
    - Provides an easy way to add and fetch records.

## Smart Contract **HealthcareRecords**
### Key Functionalities
1. **Only Owner Access**:
    - The owner has exclusive rights to manage providers.
    - Only providers authorized by the owner can interact with the contract's sensitive functions.

2. **Record Management**:
    - Providers add records (diagnosis and treatment) for a specific patient ID.
    - Records are stored permanently on the blockchain and can be fetched by patient ID.

### Events
- `RecordAdded`: Triggered when a new patient record is added.
- `ProviderAuthorized`: Triggered when a provider is successfully authorized.

## Installation
### Prerequisites
- **Node.js** (v14 or later)
- **npm** or **yarn** package manager
- **MetaMask** browser extension (for connecting your Ethereum wallet)

### Steps
1. Clone the repository:
``` bash
   git clone https://github.com/<BCMedChain>.git
   cd <BCMedChain>
```
1. Install dependencies:
``` bash
   npm install
```
1. Compile the smart contract:
``` bash
   npx hardhat compile
```
1. Deploy the smart contract:
``` bash
   npx hardhat run scripts/deploy.js --network <network-name>
```
Replace `<network-name>` with your desired network such as `localhost`, `rinkeby`, or `mainnet`.
1. **React Frontend Setup**:
    - Update the `contractAddress` in the `Healthcare.js` file to your deployed contract's address.
    - Run the React frontend:
``` bash
     npm start
```
## Usage
### 1. Deploy Contract
- Deploy the contract using the Hardhat deployment script (`scripts/deploy.js`).
- Note down the deployed contract address.

### 2. Interact with the Contract
- Use the React.js frontend to interact with smart contract functions.
- **Owner Functions**:
    - Authorize providers by entering their Ethereum address in the **"Authorize HealthCare Provider"** section.

- **Provider Functions**:
    - Add records for a patient by entering the `patientID`, `diagnosis`, and `treatment` in the **"Add Patient Record"** section.
    - Fetch a specific patient's records by entering `patientID` in the **"Fetch Patient Records"** section.

## Testing
The project includes end-to-end tests for the **HealthcareRecords** contract. To run tests:
1. Make sure Hardhat is installed:
``` bash
   npm install --save-dev hardhat
```
1. Run all tests:
``` bash
   npx hardhat test
```
### Test Cases Implemented
- Verify the contract owner.
- Ensure only the owner can authorize providers.
- Confirm authorized providers can add and fetch records.
- Validate failures for unauthorized actions or invalid inputs.

## Folder Structure
``` 
├── contracts
│   └── HealthcareRecords.sol        # The smart contract
├── scripts
│   └── deploy.js                    # Script for deploying the smart contract
├── test
│   └── Healthcare.test.js           # Smart contract test cases
├── src
│   ├── App.js                       # Main React component rendering the app
│   ├── Healthcare.js                # React component for interacting with the smart contract
│   ├── App.css                      # Styling for the app
│   └── index.js                     # React entry point
├── README.md                        # Documentation
├── package.json                     # Dependencies and scripts
├── hardhat.config.js                # Hardhat configurations
```
## Example Interactions
### Authorize a Provider (Owner-only action)
``` solidity
await healthcare.authorizeProvider('0xProviderAddress');
```
### Add a Patient Record (Provider-only action)
``` solidity
await healthcare.addRecord(
  1, 
  "Alice", 
  "Flu", 
  "Medication A"
);
```
### Fetch Patient Records (Provider-only action)
``` solidity
const records = await healthcare.getPatientRecords(1);
console.log(records);
```
## Contribution
### Reporting Issues
Found a bug? Please open an issue in the repository with the following details:
- Problem description
- Steps to reproduce
- Expected outcome

### Contribution Guidelines
1. Fork the repository.
2. Create a new branch:
``` bash
   git checkout -b feature-name
```
1. Commit changes:
``` bash
   git commit -m "Add meaningful message"
```
1. Push your branch and create a pull request.

## License
This project is licensed under the **MIT License**. See the [LICENSE]() file for details.
## Acknowledgments
Special thanks to the following libraries and tools:
- [Hardhat]()
- [ethers.js]()
- [React]()
- [OpenZeppelin]()
