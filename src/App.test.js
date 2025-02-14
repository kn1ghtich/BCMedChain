import { render, screen } from '@testing-library/react';
import App from './App';
const { ethers } = require("hardhat");

describe("Healthcare Smart Contract Tests", function () {
  let Healthcare, healthcare, owner, addr1, addr2;

  beforeEach(async function () {
    // Deploy the contract before running each test
    Healthcare = await ethers.getContractFactory("Healthcare");
    [owner, addr1, addr2] = await ethers.getSigners();
    healthcare = await Healthcare.deploy();
    await healthcare.deployed();
  });

  describe("Owner Functions", function () {
    it("Should set the correct contract owner", async function () {
      const contractOwner = await healthcare.getOwner();
      expect(contractOwner).to.equal(owner.address);
    });

    it("Should allow the owner to authorize a provider", async function () {
      await expect(healthcare.authorizeProvider(addr1.address))
          .to.emit(healthcare, "ProviderAuthorized")
          .withArgs(addr1.address);
    });

    it("Should fail if a non-owner tries to authorize a provider", async function () {
      await expect(
          healthcare.connect(addr1).authorizeProvider(addr2.address)
      ).to.be.revertedWith("Only the owner can authorize providers");
    });
  });

  describe("Patient Record Management", function () {
    it("Should allow adding a new patient record", async function () {
      await expect(
          healthcare.addRecord(1, "Alice", "Flu", "Medication X")
      )
          .to.emit(healthcare, "RecordAdded")
          .withArgs(1, "Alice", "Flu", "Medication X");

      const records = await healthcare.getPatientRecords(1);
      expect(records.length).to.equal(1);
      expect(records[0].patientName).to.equal("Alice");
      expect(records[0].diagnosis).to.equal("Flu");
      expect(records[0].treatment).to.equal("Medication X");
    });

    it("Should fail when adding a record with an invalid patient ID", async function () {
      await expect(
          healthcare.addRecord(0, "Alice", "Flu", "Medication X")
      ).to.be.revertedWith("Invalid patient ID");
    });

    it("Should fetch patient records correctly", async function () {
      // Add records
      await healthcare.addRecord(1, "Alice", "Cold", "Medicine A");
      await healthcare.addRecord(1, "Alice", "Headache", "Medicine B");

      const records = await healthcare.getPatientRecords(1);
      expect(records.length).to.equal(2);

      // Validate the first record
      expect(records[0].diagnosis).to.equal("Cold");
      expect(records[0].treatment).to.equal("Medicine A");

      // Validate the second record
      expect(records[1].diagnosis).to.equal("Headache");
      expect(records[1].treatment).to.equal("Medicine B");
    });

    it("Should fail when fetching records for a non-existent patient", async function () {
      await expect(healthcare.getPatientRecords(10)).to.be.revertedWith(
          "No records found for this patient"
      );
    });
  });

  describe("Edge Cases and Input Validations", function () {
    it("Should fail if a non-owner tries to call an owner-only function", async function () {
      await expect(
          healthcare.connect(addr1).authorizeProvider(addr2.address)
      ).to.be.revertedWith("Only the owner can authorize providers");
    });

    it("Should fail when adding a record with empty diagnosis or treatment", async function () {
      await expect(
          healthcare.addRecord(1, "Alice", "", "Medicine A")
      ).to.be.revertedWith("Invalid diagnosis or treatment");

      await expect(
          healthcare.addRecord(1, "Alice", "Cold", "")
      ).to.be.revertedWith("Invalid diagnosis or treatment");
    });
  });

  describe("Events", function () {
    it("Should emit RecordAdded when a new record is added", async function () {
      await expect(
          healthcare.addRecord(1, "Alice", "Fever", "Medicine A")
      )
          .to.emit(healthcare, "RecordAdded")
          .withArgs(1, "Alice", "Fever", "Medicine A");
    });

    it("Should emit ProviderAuthorized when a new provider is authorized", async function () {
      await expect(healthcare.authorizeProvider(addr1.address))
          .to.emit(healthcare, "ProviderAuthorized")
          .withArgs(addr1.address);
    });
  });
});